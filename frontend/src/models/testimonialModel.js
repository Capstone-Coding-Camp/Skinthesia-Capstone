// src/models/testimonialModel.jsx

// Base URL API Anda (harus sama dengan yang di authService.js)
const API_BASE_URL = "https://skinthesia-backend.andzuru.space"; // Ganti jika API Anda berjalan di port/host lain

// Helper untuk mendapatkan access token dari authService
// Asumsi authService.js sudah diekspor fungsi getAccessToken
import { getAccessToken, refreshAccessToken, logoutService  } from "./authService"; // Sesuaikan path jika perlu

// Fungsi helper untuk melakukan fetch dengan otentikasi dan retry refresh token
async function fetchWithAuth(url, options) {
    let accessToken = getAccessToken();
    let headers = options.headers || {};

    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }

    let response = await fetch(url, { ...options, headers });

    if (response.status === 401 && response.headers.get('WWW-Authenticate')?.includes('Bearer error="invalid_token"')) { 
        console.log("Access Token Expired (Status 401 detected). Attempting to refresh...");
        console.log("WWW-Authenticate Header:", response.headers.get('WWW-Authenticate')); 
        try {
            const newAccessToken = await refreshAccessToken();
            headers['Authorization'] = `Bearer ${newAccessToken}`;
            response = await fetch(url, { ...options, headers });
        } catch (refreshError) {
            console.error("Failed to refresh token, forcing logout:", refreshError);
            logoutService();
            throw new Error("Sesi berakhir, mohon login ulang.");
        }
    }

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Permintaan API gagal.");
    }

    return response;
    
}

// Fungsi untuk mendapatkan semua testimoni (akan menerima Base64 string)
export async function fetchAllTestimonials() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/testimonials`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal memuat testimoni.');
    }

    const data = await response.json();
    // Data.avatar sudah berupa Base64 dari backend
    return data;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
}


// Fungsi untuk menambah testimoni baru (menggunakan FormData untuk avatar)
export async function addTestimonial({ name, content, avatarFile, userId }) {
  const formData = new FormData();
  formData.append('name', name);
  formData.append('content', content);
  formData.append('userId', userId);
  if (avatarFile) {
    formData.append('avatar', avatarFile); // Hapi akan membaca ini sebagai stream/buffer
  }

  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/testimonials`, {
      method: 'POST',
      headers: {
        // 'Content-Type': 'application/json', // JANGAN gunakan ini untuk FormData
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || "Gagal menambahkan testimoni.");
    }
    // API akan mengembalikan Base64 string, jadi tidak perlu konversi URL
    return data;
  } catch (error) {
    console.error("Error adding testimonial:", error);
    throw error;
  }
}


// Fungsi untuk mengedit testimoni yang sudah ada (menggunakan FormData untuk avatar)
export async function updateTestimonial({ id, name, content, avatarFile, currentAvatarDataUrl }) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('content', content);

    if (avatarFile) {
        formData.append('avatar', avatarFile);
    } else if (currentAvatarDataUrl === null || currentAvatarDataUrl === '') {
        // Jika avatarFile tidak ada DAN currentAvatarDataUrl dikosongkan (explicitly removed)
        formData.append('avatar', ''); // Kirim string kosong untuk menandakan penghapusan avatar
    }
    // Jika tidak ada avatarFile dan currentAvatarDataUrl tidak kosong, berarti tidak ada perubahan avatar,
    // maka tidak perlu append 'avatar' ke formData agar server mempertahankan yang lama.


    try {
        const response = await fetchWithAuth(`${API_BASE_URL}/api/testimonials/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getAccessToken()}`
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || (data.errors && data.errors[0] && data.errors[0].msg) || "Gagal memperbarui testimoni.");
        }
        // API akan mengembalikan Base64 string
        return data;
    } catch (error) {
        console.error("Error updating testimonial:", error);
        throw error;
    }
}


// Fungsi untuk menghapus testimoni
export async function deleteTestimonial(id) {
  try {
    const response = await fetchWithAuth(`${API_BASE_URL}/api/testimonials/${id}`, { // Perhatikan '/api/testimonials'
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Gagal menghapus testimoni.');
    }

    // Tidak ada body yang dikembalikan untuk DELETE biasanya
    return true; // Indikasi sukses
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
}