// useAuthPresenter.js
import { useState, useEffect, useCallback } from "react";
import * as authService from "@models/authService"; // Sesuaikan path jika perlu

// Fungsi helper untuk mendekode JWT secara parsial
function decodeJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default function useAuthPresenter() {
  // `user` sekarang akan menyimpan objek dengan id, email, dan mungkin token
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Efek untuk memuat user saat inisialisasi dan mencoba me-refresh token
  useEffect(() => {
    async function initializeAuth() {
      setIsLoading(true);
      const storedAccessToken = authService.getAccessToken();
      const storedRefreshToken = authService.getRefreshToken();

      if (storedAccessToken) {
        // Coba dekode access token untuk mendapatkan info user
        const decoded = decodeJwt(storedAccessToken);
        if (decoded && decoded.publicId && decoded.email) {
            setUser({
                id: decoded.publicId,
                email: decoded.email,
                accessToken: storedAccessToken,
                // Kita tidak perlu menyimpan refresh token di state `user` karena sudah di authService/cookie
            });
            // TODO: Tambahkan logika untuk memeriksa apakah access token sudah expired secara lokal
            // Jika iya, panggil refreshAccessToken secara proaktif
        } else {
            // Token tidak valid atau rusak, coba refresh
            console.warn("Stored access token invalid, attempting to refresh...");
            try {
                const newAccessToken = await authService.refreshAccessToken();
                const newDecoded = decodeJwt(newAccessToken);
                if (newDecoded) {
                    setUser({
                        id: newDecoded.publicId,
                        email: newDecoded.email,
                        accessToken: newAccessToken,
                    });
                }
            } catch (err) {
                console.error("Failed to refresh token on init:", err);
                authService.logoutService(); // Hapus token jika gagal refresh
                setUser(null);
            }
        }
      } else if (storedRefreshToken) {
          // Jika tidak ada access token tapi ada refresh token, coba refresh
          console.log("No access token, but found refresh token. Attempting to refresh...");
          try {
              const newAccessToken = await authService.refreshAccessToken();
              const newDecoded = decodeJwt(newAccessToken);
              if (newDecoded) {
                  setUser({
                      id: newDecoded.publicId,
                      email: newDecoded.email,
                      accessToken: newAccessToken,
                  });
              }
          } catch (err) {
              console.error("Failed to refresh token on init (no access token):", err);
              authService.logoutService();
              setUser(null);
          }
      }
      setIsLoading(false);
    }
    initializeAuth();
  }, []);

  // Fungsi login disesuaikan untuk memanggil API
  const login = useCallback(async ({ email, password }) => {
    setError("");
    setIsLoading(true);
    try {
      const userData = await authService.loginApi({ email, password });
      // `userData` sekarang berisi id, email, accessToken, refreshToken dari API response
      setUser({
        id: userData.id,
        email: userData.email,
        accessToken: userData.accessToken,
      });
      setIsLoading(false);
      return true;
    } catch (err) {
      setError(err.message || "Login gagal.");
      setIsLoading(false);
      return false;
    }
  }, []);

  // Fungsi signup disesuaikan untuk memanggil API
  const signup = useCallback(async ({ email, password, confirmPassword }) => {
    console.log("Data yang akan dikirim ke register API:", email, password );
    setError("");
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return false;
    }
    try {
      const userData = await authService.registerApi({ email, password });
      // `userData` sekarang berisi id, email, accessToken, refreshToken dari API response
      setUser({
        id: userData.id,
        email: userData.email,
        accessToken: userData.accessToken,
      });
      setIsLoading(false);
      return true;
    } catch (err) {
      console.error("Signup error:", err); // Ini akan menangkap error dari authService.js
      setError(err.message || "Pendaftaran gagal.");
      setIsLoading(false);
      return false;
    }
  }, []);

  // Fungsi logout disesuaikan
  const logout = useCallback(() => {
    authService.logoutService(); // Hapus semua token lokal
    setUser(null);
    setError(""); // Bersihkan error
  }, []);

  return {
    user,
    error,
    login,
    signup,
    logout,
    isLoading,
  };
}

// import { useState, useEffect } from "react";
// import * as authService from "@models/authService";

// export default function useAuthPresenter() {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const storedUser = authService.getCurrentUser();
//     if (storedUser) setUser(storedUser);
//     setIsLoading(false);
//   }, []);

//   function login({ email, password }) {
//     setError("");
//     const foundUser = authService.findUser(email, password);
//     if (!foundUser) {
//       setError("Invalid email or password");
//       return false;
//     }
//     authService.saveCurrentUser(foundUser);
//     setUser(foundUser);
//     return true;
//   }

//   function signup({ email, password, confirmPassword }) {
//     setError("");
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return false;
//     }
//     const users = authService.getStoredUsers();
//     if (users.some((u) => u.email === email)) {
//       setError("Email already registered");
//       return false;
//     }
//     const newUser = { email, password };
//     authService.saveUser(newUser);
//     authService.saveCurrentUser(newUser);
//     setUser(newUser);
//     return true;
//   }

//   function logout() {
//     authService.removeCurrentUser();
//     setUser(null);
//   }

//   return {
//     user,
//     error,
//     login,
//     signup,
//     logout,
//     isLoading,
//   };
// }
