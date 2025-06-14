import React from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const TestimonialsView = ({
  visibleTestimonials,
  userHasTestimonial,
  currentUserId,
  canPrev,
  canNext,
  modalOpen,
  form,
  errors,
  editMode,
  onPrevClick,
  onNextClick,
  onAddEditTestimonialClick,
  onModalClose,
  onFormChange,
  onAvatarChange,
  onFormSubmit,
  onDelete,
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      id="testimonials"
      className="py-8 mb-6 md:mb-8 bg-white text-center"
    >
      <div className="text-4xl font-bold text-black font-serif mb-3">
        WHAT <span className="font-cursive italic" style={{ color: 'oklch(0.7589 0.1029 20.48)' }}>our</span>
      </div>
      <div className="text-4xl font-bold font-serif text-black mb-8 md:mb-12">
        CUSTOMER SAYS...
      </div>
      <div className="flex justify-center mb-8 md:mb-12">
        {!userHasTestimonial && (
          <button
            className="px-6 py-2 rounded-full text-white text-[20px] rounded cursor-pointed shadow transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'oklch(0.7589 0.1029 20.48)' }}
            onClick={onAddEditTestimonialClick}
          >
            Add Testimoni
          </button>
        )}
        {userHasTestimonial && (
          <button
            className="px-6 py-2 bg-pink rounded-full text-white text-[20px] transition hover:opacity-90 cursor-pointed disabled:bg-gray-300 disabled:cursor-not-allowed"
            style={{ backgroundColor: 'oklch(0.7589 0.1029 20.48)' }}
            onClick={() => {
              const userTestimonial = visibleTestimonials.find(t => t.userId === currentUserId);
              if (userTestimonial) {
                onAddEditTestimonialClick(userTestimonial);
              }
            }}
          >
            Edit Your Testimoni
          </button>
        )}
      </div>

      {/* Carousel */}
      <div className="flex items-center justify-center gap-4 py-2">
        {/* Prev Button */}
        <button
          className={`p-2 rounded-full border-pink text-pink border transition ${
            canPrev
              ? "hover:bg-gray-200 hover:border-gray-400 cursor-pointed border-pink"
              : "bg-gray-100 border-gray-300 cursor-not-allowed"
          }`}
          onClick={onPrevClick}
          disabled={!canPrev}
          aria-label="Sebelumnya"
        >
          <FaChevronLeft />
        </button>

        {/* Cards */}
        <div className="flex gap-4 overflow-hidden w-full justify-center md:w-auto">
          {visibleTestimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-lg shadow-md pb-6 pl-6 pr-6 pt-10 w-64 flex flex-col items-center flex-shrink-0
                         max-w-[calc(100vw-4rem)] sm:max-w-[calc(100vw-8rem)]
                        "
              style={{ backgroundColor: 'white', border: '1px solid oklch(0.7589 0.1029 20.48)' }}
            >
              <img
                src={t.avatar || '/default-testimoni-user.svg'}
                alt={t.name}
                className="w-16 h-16 rounded-full mb-3 object-cover"
              />
              <div className="font-bold mb-2 text-black text-xl md:text-2xl">{t.name}</div>
              <div className="text-gray-700 text-base">{t.content}</div>
              {t.userId === currentUserId && (
                <button
                  className="mt-4 px-6 py-2 bg-pink rounded-full text-white text-[20px] transition hover:opacity-90"
                  onClick={() => onAddEditTestimonialClick(t)} // Pass testimonial for editing
                >
                  Edit
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Next Button */}
        <button
          className={`p-2 rounded-full border-pink  text-pink border transition ${
            canNext
              ? "hover:bg-gray-200 hover:border-gray-400 border-pink cursor-pointed"
              : "bg-gray-100 border-gray-300 cursor-not-allowed"
          }`}
          onClick={onNextClick}
          disabled={!canNext}
          aria-label="Berikutnya"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[1000] overflow-y-auto bg-gray-400/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white z-[2000] rounded-lg p-8 w-[80vw] md:w-[75vw] max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-2xl md:text-4xl lg:text-5xl text-primary-pink cursor-pointer hover:text-tersier-pink"
              onClick={onModalClose}
              aria-label="Tutup"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-black">
              {editMode ? "Edit Testimoni" : "Tambah Testimoni"}
            </h2>
            <form onSubmit={onFormSubmit}>
              {/* Avatar Input */}
              <div className="mb-4">
                <label htmlFor="avatar" className="block text-gray-700 text-sm font-bold mb-2">
                  Foto Profil
                </label>
                <input
                  type="file"
                  id="avatar"
                  name="avatar"
                  accept="image/*"
                  onChange={onAvatarChange}
                  className="w-full border rounded p-2 text-black"
                  style={{ borderColor: 'oklch(0.7589 0.1029 20.48)' }}
                />
                {errors.avatar && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.avatar}</p>
                )}
                {form.avatar && (
                  <div className="mt-2 text-center">
                    <img src={form.avatar ? form.avatar : '/logo-skinthesia.svg'} alt="Preview" className="w-20 h-20 rounded-full object-cover mx-auto" />
                  </div>
                )}
              </div>

              {/* Name Input */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onFormChange}
                  className="w-full border rounded p-2 text-black"
                  style={{ borderColor: 'oklch(0.7589 0.1029 20.48)' }}
                  placeholder="Nama Anda"
                  maxLength={12}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
                )}
              </div>

              {/* Testimonial Content */}
              <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
                  Testimoni
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="w-full border rounded p-2 mb-4 text-black"
                  style={{ borderColor: 'oklch(0.7589 0.1029 20.48)' }}
                  rows={4}
                  value={form.content}
                  onChange={onFormChange}
                  placeholder="Tulis testimoni Anda..."
                  maxLength={50}
                  required
                />
                {errors.content && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.content}</p>
                )}
              </div>

              <div className="flex gap-2 justify-end">
                {editMode && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-200 text-primary-pink rounded-2xl hover:bg-gray-400"
                    onClick={onDelete}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-2xl text-bold bg-primary-pink hover:bg-tersier-pink"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default TestimonialsView;