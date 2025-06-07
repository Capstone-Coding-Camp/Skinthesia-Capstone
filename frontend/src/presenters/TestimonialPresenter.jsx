// src/pages/TestimonialsPresenter.jsx
import React, { useState, useEffect } from "react";
import TestimonialsView from "@views/LandingPage/sections/Testimonials";

// Simulasi user login (bisa diganti dengan Context API/Auth System nyata)
const currentUserId = 1;

const TestimonialsPresenter = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState(null); // The testimonial being edited
  const [maxVisible, setMaxVisible] = useState(5); // Default for desktop

  // Modal form state
  const [form, setForm] = useState({ id: null, name: "", content: "", avatar: "" });
  const [errors, setErrors] = useState({});

  // 1. Fetch initial testimonials data
  useEffect(() => {
    fetch('/testimonialModel.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTestimonials(data);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  // 2. Effect to determine maxVisible based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMaxVisible(1); // Smartphone
      } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        setMaxVisible(2); // Tablet
      } else if (window.innerWidth >= 1024 && window.innerWidth < 1560) {
        setMaxVisible(4); // Mini Monitor
      } else {
        setMaxVisible(5); // Desktop
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter testimonial milik user saat ini
  const myTestimonials = testimonials.filter((t) => t.userId === currentUserId);
  const userHasTestimonial = myTestimonials.length > 0;

  // Carousel logic
  const visibleTestimonials = testimonials.slice(
    carouselIndex,
    carouselIndex + maxVisible
  );

  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex + maxVisible < testimonials.length;

  // Handlers
  const handlePrevClick = () => {
    if (canPrev) {
      setCarouselIndex(carouselIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (canNext) {
      setCarouselIndex(carouselIndex + 1);
    }
  };

  const handleAddEditTestimonialClick = (testimonialToEdit = null) => {
    setEditTestimonial(testimonialToEdit);
    setForm({
      id: testimonialToEdit ? testimonialToEdit.id : null,
      name: testimonialToEdit ? testimonialToEdit.name : "",
      content: testimonialToEdit ? testimonialToEdit.content : "",
      avatar: testimonialToEdit ? testimonialToEdit.avatar : "",
    });
    setErrors({}); // Clear errors when opening modal
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTestimonial(null);
    setForm({ id: null, name: "", content: "", avatar: "" }); // Reset form state
    setErrors({}); // Clear errors
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on change
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) { // Max 3MB
        setErrors((prev) => ({ ...prev, avatar: "Ukuran gambar maksimal 3MB." }));
        setForm((prev) => ({ ...prev, avatar: "" })); // Clear avatar if too large
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setForm((prev) => ({ ...prev, avatar: reader.result }));
          setErrors((prev) => ({ ...prev, avatar: "" }));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleFormSubmit = (e) => {
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
    if (!form.avatar && !editTestimonial?.avatar) { // If adding new and no avatar, or editing and current avatar is empty
      newErrors.avatar = "Foto profil tidak boleh kosong.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (form.id) {
      // Edit
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === form.id ? { ...t, name: form.name, content: form.content, avatar: form.avatar } : t
        )
      );
    } else {
      // Add
      const newTestimonial = {
        id: Date.now(),
        userId: currentUserId,
        name: form.name,
        content: form.content,
        avatar: form.avatar || "https://randomuser.me/api/portraits/lego/1.jpg", // Default avatar if none uploaded and adding
      };
      setTestimonials((prev) => [newTestimonial, ...prev]);
    }
    handleModalClose(); // Close modal and reset form
  };

  const handleDelete = () => {
    if (editTestimonial) {
      setTestimonials((prev) =>
        prev.filter((t) => t.id !== editTestimonial.id)
      );
      handleModalClose(); // Close modal and reset form
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
      currentUserId={currentUserId}
      canPrev={canPrev}
      canNext={canNext}
      modalOpen={modalOpen}
      form={form}
      errors={errors}
      editMode={!!editTestimonial} // Pass a boolean indicating edit mode
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