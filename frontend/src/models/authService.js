// authService.js
// Base URL API Anda
const API_BASE_URL = "https://skinthesia-backend.andzuru.space"; // Ganti jika API Anda berjalan di port/host lain

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken"; // Kita akan simpan refresh token di localStorage juga, meskipun server mengirim HttpOnly cookie

// Fungsi untuk mendapatkan access token yang tersimpan
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

// Fungsi untuk menyimpan access token
export function saveAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

// Fungsi untuk menghapus access token
export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Fungsi untuk mendapatkan refresh token yang tersimpan di localStorage
export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

// Fungsi untuk menyimpan refresh token di localStorage
export function saveRefreshToken(token) {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

// Fungsi untuk menghapus refresh token dari localStorage
export function removeRefreshToken() {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

// --- Fungsi untuk Interaksi API ---

// Fungsi untuk pendaftaran pengguna (Register API)
export async function registerApi({ email, password }) {
  if (!email || !password) {
    throw new Error("Email dan password harus diisi.");
  }
  console.log('data mentahan :', {email, password});
  const rawData = { email: email, password: password };
  console.log("Mengirim payload:", rawData ); // Log payload sebelum fetch
  try {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Gagal mendaftar.");
    }

    // Simpan token yang diterima dari server
    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken); // Simpan juga di localStorage jika diperlukan oleh klien

    // Kembalikan data yang relevan untuk user (sesuai output Hapi: id, email, dll.)
    return {
      id: data.id,
      email: data.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      refreshTokenExpired: data.refreshTokenExpired,
      message: data.message
    };
  } catch (error) {
    console.error("Registrasi API Error:", error);
    throw error;
  }
}

// Fungsi untuk login pengguna (Login API)
export async function loginApi({ email, password }) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Email atau password salah.");
    }

    // Simpan token yang diterima dari server
    saveAccessToken(data.accessToken);
    saveRefreshToken(data.refreshToken); // Simpan juga di localStorage jika diperlukan oleh klien

    // Kembalikan data yang relevan untuk user
    return {
      id: data.id,
      email: data.email,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      refreshTokenExpired: data.refreshTokenExpired,
      message: data.message
    };
  } catch (error) {
    console.error("Login API Error:", error);
    throw error;
  }
}

// Fungsi untuk me-refresh access token (Refresh Token API)
export async function refreshAccessToken() {
  try {
    // Saat memanggil refresh-token, browser akan otomatis mengirim httpOnly cookie.
    // Kita tidak perlu mengirim refresh token dari localStorage secara eksplisit di header/body.
    const response = await fetch(`${API_BASE_URL}/api/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tetap kirim header ini meskipun body kosong
      },
      // body: JSON.stringify({ refreshToken: getRefreshToken() }), // TIDAK PERLU, KARENA DIKIRIM VIA COOKIE
    });

    const data = await response.json();

    if (!response.ok) {
      // Jika refresh token expired/compromised, server akan menolak.
      throw new Error(data.message || "Gagal memperbarui token. Mohon login ulang.");
    }

    // Simpan access token yang baru
    saveAccessToken(data.accessToken);

    return data.accessToken;
  } catch (error) {
    console.error("Refresh Token API Error:", error);
    // Jika refresh token gagal, pastikan untuk menghapus semua token lokal
    removeAccessToken();
    removeRefreshToken();
    throw error;
  }
}

// Fungsi untuk logout (menghapus token lokal dan bisa juga memanggil API logout jika ada di server)
export function logoutService() {
  removeAccessToken();
  removeRefreshToken();
  // TODO: Jika ada endpoint logout di server untuk mencabut refresh token di DB, panggil di sini
}

// const USER_KEY = "users";
// const CURRENT_USER_KEY = "currentUser";

// export function getStoredUsers() {
//   const users = localStorage.getItem(USER_KEY);
//   return users ? JSON.parse(users) : [];
// }

// export function saveUser(user) {
//   const users = getStoredUsers();
//   users.push(user);
//   localStorage.setItem(USER_KEY, JSON.stringify(users));
// }

// export function findUser(email, password) {
//   const users = getStoredUsers();
//   return (
//     users.find((u) => u.email === email && u.password === password) || null
//   );
// }

// export function saveCurrentUser(user) {
//   localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
// }

// export function getCurrentUser() {
//   const user = localStorage.getItem(CURRENT_USER_KEY);
//   return user ? JSON.parse(user) : null;
// }

// export function removeCurrentUser() {
//   localStorage.removeItem(CURRENT_USER_KEY);
// }
