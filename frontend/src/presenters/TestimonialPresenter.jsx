// src/pages/TestimonialsPresenter.jsx
import React, { useState, useEffect, useCallback } from "react";
import TestimonialsView from "@views/LandingPage/sections/Testimonials";
import {
  fetchAllTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@models/testimonialModel"; // Impor fungsi API
import { getAccessToken } from "@models/authService"; // Perlu untuk mendapatkan user ID dari token

const TestimonialsPresenter = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [editTestimonial, setEditTestimonial] = useState(null);
  const [maxVisible, setMaxVisible] = useState(5);

const [form, setForm] = useState({ id: null, name: "", content: "", avatar: "", avatarFile: null }); // `avatar` untuk Base64 string/URL preview, `avatarFile` untuk upload
const [errors, setErrors] = useState({});

  // Dapatkan ID pengguna saat ini dari Access Token yang tersimpan
  const currentUserId = useCallback(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.publicId; // Menggunakan publicId dari JWT
      } catch (e) {
        console.error("Failed to decode token:", e);
        return null;
      }
    }
    return null;
  }, []);

  // 1. Fetch initial testimonials data dari API
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const data = await fetchAllTestimonials();
        setTestimonials(data);
      } catch (err) {
        setError(err);
      } 
    };
    loadTestimonials();
  }, []); // [] agar hanya berjalan sekali saat mount

  // 2. Effect to determine maxVisible based on screen width (tidak berubah)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMaxVisible(1);
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setMaxVisible(2);
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1560) {
        setMaxVisible(4);
      } else {
        setMaxVisible(5);

      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();


    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter testimonial milik user saat ini
  const userPublicId = currentUserId();
  const myTestimonials = testimonials.filter((t) => t.userId === userPublicId);
  const userHasTestimonial = myTestimonials.length > 0;

  // Carousel logic (tidak berubah)
  const visibleTestimonials = testimonials.slice(
    carouselIndex,
    carouselIndex + maxVisible
  );

  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex + maxVisible < testimonials.length;


  // Handlers (beberapa diubah untuk interaksi API)
  const handlePrevClick = () => {
    if (canPrev) {
      setCarouselIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (canNext) {
      setCarouselIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Di TestimonialsView, pastikan `form.avatar` masih bisa digunakan untuk preview.
  // Saat inisialisasi form untuk edit, Anda perlu mengisi `form.avatar` dengan URL avatar Base64 yang ada.
  const handleAddEditTestimonialClick = (testimonialToEdit = null) => {
    setEditTestimonial(testimonialToEdit);
    setForm({
      id: testimonialToEdit ? testimonialToEdit.id : null,
      name: testimonialToEdit ? testimonialToEdit.name : "",
      content: testimonialToEdit ? testimonialToEdit.content : "",
      avatar: testimonialToEdit ? testimonialToEdit.avatar : "",
      avatarFile: null, // Reset file input
    });

    setErrors({});
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTestimonial(null);

    setForm({ id: null, name: "", content: "", avatar: "", avatarFile: null }); // Reset form state termasuk avatarFile
    setErrors({});
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });

  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, avatar: "Ukuran gambar maksimal 3MB." }));
        setForm((prev) => ({ ...prev, avatar: "", avatarFile: null })); // Clear avatar and file
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, avatar: reader.result, avatarFile: file })); // Simpan base64 untuk preview, file object untuk upload
          setErrors((prev) => ({ ...prev, avatar: "" }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setForm((prev) => ({ ...prev, avatar: "", avatarFile: null })); // Jika file dibatalkan
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Nama tidak boleh kosong.";
    } else if (form.name.length > 12) {
      newErrors.name = "Nama maksimal 12 karakter.";
    }
    if (!form.content.trim()) {
      newErrors.content = "Testimoni tidak boleh kosong.";
    } else if (form.content.length > 50) {
      newErrors.content = "Testimoni maksimal 50 karakter.";
    }
    if (!form.avatar && !editTestimonial?.avatar) {
      newErrors.avatar = "Foto profil tidak boleh kosong.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      if (form.id) {
        // Edit existing testimonial
        const updated = await updateTestimonial({
          id: form.id,
          name: form.name,
          content: form.content,
          avatarFile: form.avatarFile, 
          currentAvatarDataUrl: form.avatar 
        });
        setTestimonials((prev) =>
          prev.map((t) => (t.id === updated.id ? updated : t))
        );
      } else {
        // Add new testimonial
        const newTestimonial = await addTestimonial({
          name: form.name,
          content: form.content,
          avatarFile: form.avatarFile, 
          userId: userPublicId,
        });
        setTestimonials((prev) => [newTestimonial, ...prev]);
      }
      handleModalClose();
    } catch (err) {
      setError(err);
      alert(`Gagal menyimpan testimoni: ${err.message}`);
    } 
  };


  const handleDelete = async () => {
    if (!editTestimonial || !window.confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      return;
    }

    try {
      await deleteTestimonial(editTestimonial.id);
      setTestimonials((prev) =>
        prev.filter((t) => t.id !== editTestimonial.id)
      );
      handleModalClose();
    } catch (err) {
      setError(err);
      alert(`Gagal menghapus testimoni: ${err.message}`);
    } 
  };

  if (error) {
    return <div className="p-4 text-red-500">Error: {error.message}</div>;
  }

  return (
    <TestimonialsView
      testimonials={testimonials}
      visibleTestimonials={visibleTestimonials}
      userHasTestimonial={userHasTestimonial}
      currentUserId={userPublicId} // Gunakan userPublicId
      canPrev={canPrev}
      canNext={canNext}
      modalOpen={modalOpen}
      form={form}
      errors={errors}
      editMode={!!editTestimonial}
      onPrevClick={handlePrevClick}
      onNextClick={handleNextClick}
      onAddEditTestimonialClick={userHasTestimonial ? () => handleAddEditTestimonialClick(myTestimonials[0]) : () => handleAddEditTestimonialClick(null)}
      onModalClose={handleModalClose}
      onFormChange={handleFormChange}
      onAvatarChange={handleAvatarChange}
      onFormSubmit={handleFormSubmit}
      onDelete={handleDelete}
    />
  );
};

export default TestimonialsPresenter;