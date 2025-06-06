import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Dummy data for testimonials
const initialTestimonials = [
  {
    id: 1,
    userId: 1,
    name: "Alice",
    content: "Aplikasi ini sangat membantu saya!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    userId: 2,
    name: "Bob",
    content: "Fitur-fiturnya lengkap dan mudah digunakan.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    userId: 3,
    name: "Charlie",
    content: "Saya suka tampilannya yang modern.",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: 4,
    userId: 4,
    name: "Diana",
    content: "Customer service sangat responsif.",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: 5,
    userId: 5,
    name: "Eve",
    content: "Rekomendasi banget buat teman-teman!",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    userId: 1,
    name: "Alice",
    content: "Saya sudah pakai aplikasi ini selama 1 tahun.",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
  },
];

// Simulasi user login
const currentUserId = 1;

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTestimonial, setEditTestimonial] = useState(null);

  // Filter testimonial milik user saat ini
  const myTestimonials = testimonials.filter((t) => t.userId === currentUserId);

  // Carousel logic
  const maxVisible = 5;
  const visibleTestimonials = testimonials.slice(
    carouselIndex,
    carouselIndex + maxVisible
  );

  const canPrev = carouselIndex > 0;
  const canNext = carouselIndex + maxVisible < testimonials.length;

  // Modal form state
  const [form, setForm] = useState({ id: null, content: "" });

  const openEditModal = (testimonial) => {
    setEditTestimonial(testimonial);
    setForm({
      id: testimonial ? testimonial.id : null,
      content: testimonial ? testimonial.content : "",
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, content: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      // Edit
      setTestimonials((prev) =>
        prev.map((t) =>
          t.id === form.id ? { ...t, content: form.content } : t
        )
      );
    } else {
      // Add
      const newTestimonial = {
        id: Date.now(),
        userId: currentUserId,
        name: "You",
        content: form.content,
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      };
      setTestimonials((prev) => [newTestimonial, ...prev]);
    }
    setModalOpen(false);
    setEditTestimonial(null);
    setForm({ id: null, content: "" });
  };

  const handleDelete = () => {
    if (editTestimonial) {
      setTestimonials((prev) =>
        prev.filter((t) => t.id !== editTestimonial.id)
      );
      setModalOpen(false);
      setEditTestimonial(null);
      setForm({ id: null, content: "" });
    }
  };

  return (
    <section id="testimonials" className="py-16 bg-white text-center min-h-screen">
      <div className="text-4xl font-bold text-black font-serif mb-3">
        WHAT <span className="font-cursive italic" style={{ color: 'oklch(0.7589 0.1029 20.48)' }}>our</span>
      </div>
      <div className="text-4xl font-bold font-serif text-black mb-6">
        CUSTOMER SAYS...
      </div>
      <div className="flex justify-center mb-8">
        <button
          className="px-6 py-2 text-white rounded shadow transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          style={{ backgroundColor: 'oklch(0.7589 0.1029 20.48)', hover: { backgroundColor: 'oklch(0.6589 0.1029 20.48)' } }}
          onClick={() => openEditModal(myTestimonials[0] || null)}
        >
          {myTestimonials.length > 0 ? "Edit Testimoni Anda" : "Tambah Testimoni"}
        </button>
      </div>
      {/* Carousel */}
      <div className="flex items-center justify-center gap-4">
        {/* Prev Button */}
        <button
          className={`p-2 rounded-full border text-skpink transition ${
            canPrev
              ? "bg-white border-skpink cursor-pointer"
              : "hover:bg-gray-200 hover:border-skpink-70 cursor-not-allowed"
          }`}
          // style={{ borderColor: canPrev ? 'oklch(0.7589 0.1029 20.48)' : undefined, color: 'black' }}
          onClick={() => canPrev && setCarouselIndex(carouselIndex - 1)}
          disabled={!canPrev}
          aria-label="Sebelumnya"
        >
          <FaChevronLeft />
        </button>
        {/* Cards */}
        <div className="flex gap-4 transition-transform duration-300">
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-lg shadow-md p-6 w-64 flex flex-col items-center"
              style={{ backgroundColor: 'white', border: '1px solid oklch(0.7589 0.1029 20.48)' }}
            >
              <img
                src={t.avatar}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-3 object-cover"
              />
              <div className="font-semibold mb-2 text-black">{t.name}</div>
              <div className="text-gray-700 text-sm">{t.content}</div>
              {t.userId === currentUserId && (
                <button
                  className="mt-4 text-xs underline hover:text-gray-800"
                  style={{ color: 'oklch(0.7589 0.1029 20.48)' }}
                  onClick={() => openEditModal(t)}
                >
                  Edit
                </button>
              )}
            </motion.div>
          ))}
        </div>
        {/* Next Button */}
        <button
          className={`p-2 rounded-full border text-skpink transition ${
            canNext
              ? "bg-white border-skpink  cursor-pointer"
              : "hover:bg-gray-200 hover:border-skpink-70 cursor-not-allowed"
          }`}
          // style={{ borderColor: canNext ? 'oklch(0.7589 0.1029 20.48)' : undefined, color: 'black' }}
          onClick={() => canNext && setCarouselIndex(carouselIndex + 1)}
          disabled={!canNext}
          aria-label="Berikutnya"
        >
          <FaChevronRight />
        </button>
      </div>
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-lg relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
              onClick={() => setModalOpen(false)}
              aria-label="Tutup"
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-4 text-black">
              {editTestimonial ? "Edit Testimoni" : "Tambah Testimoni"}
            </h2>
            <form onSubmit={handleFormSubmit}>
              <textarea
                className="w-full border rounded p-2 mb-4 text-black"
                style={{ borderColor: 'oklch(0.7589 0.1029 20.48)' }}
                rows={4}
                value={form.content}
                onChange={handleFormChange}
                placeholder="Tulis testimoni Anda..."
                required
              />
              <div className="flex gap-2 justify-end">
                {editTestimonial && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={handleDelete}
                  >
                    Hapus
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded hover:bg-blue-700"
                  style={{ backgroundColor: 'oklch(0.7589 0.1029 20.48)', hover: { backgroundColor: 'oklch(0.6589 0.1029 20.48)' } }}
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;