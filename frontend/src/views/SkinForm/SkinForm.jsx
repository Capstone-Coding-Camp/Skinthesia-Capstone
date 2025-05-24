const SkinForm = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white text-gray-800 px-6 py-10 font-sans">
        {/* Header (judul dan nav kecil) */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-pink-700 mb-2">Skinthesia</h1>
          <div className="border-t border-pink-300 mb-2" />
          <nav className="text-sm text-pink-500 space-x-4 overflow-x-auto whitespace-nowrap font-medium tracking-wide">
            <span>AI-Powered Recommendations</span>
            <span>AI-Powered Recommendations</span>
            <span>AI-Powered Recommendations</span>
          </nav>
        </header>

        {/* Intro Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-gray-200 py-8 mb-8">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-snug">
              GAIN INSIGHTS<br />TO FURTHER CARE<br />FOR YOUR SKIN
            </h2>
          </div>
          <div className="flex-1 text-center">
            <img
              src="https://images.unsplash.com/photo-1619895862022-0a1b4ba2bb5e"
              alt="Facial treatment"
              className="mx-auto w-72 h-44 object-cover rounded-[20px]"
            />
          </div>
        </section>

        {/* Note */}
        <p className="text-sm text-gray-600 italic text-center mb-8 max-w-2xl mx-auto">
          * Please answer the questions provided to get a preference of the content
          of beauty and skin care products that are suitable for your facial care
          according to your skin characteristics. *
        </p>

        {/* Form */}
        <form className="space-y-8 text-left">
          {/* Skin Condition */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">• What is your general skin condition?</h3>
            <div className="space-y-2 ml-4">
              {["Oily", "Dry", "Combination (Like oily in T area and dry in other areas)"].map((opt, idx) => (
                <label key={idx} className="block">
                  <input type="radio" name="skinCondition" className="mr-2" /> {opt}
                </label>
              ))}
            </div>
          </div>

          {/* Skin Problems */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">
              • What skin problems are you currently experiencing or would like to address?
            </h3>
            <div className="space-y-2 ml-4">
              {["No special problems", "Blackheads", "Acne", "Dull skin", "Blackish acne scars"].map((item, i) => (
                <label key={i} className="block">
                  <input type="checkbox" className="mr-2" /> {item}
                </label>
              ))}
            </div>
          </div>

          {/* Age Group */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">• How old are you?</h3>
            <div className="space-y-2 ml-4">
              {["Teen", "Young Adult", "Adult"].map((age, i) => (
                <label key={i} className="block">
                  <input type="radio" name="ageGroup" className="mr-2" /> {age}
                </label>
              ))}
            </div>
          </div>

          {/* Skincare Products */}
          <div>
            <h3 className="font-semibold mb-2 text-lg">• What kind of skincare products are you looking for?</h3>
            <div className="space-y-2 ml-4">
              {["Face wash", "Moisturizer", "Sunscreen", "Toner", "Serum"].map((product, i) => (
                <label key={i} className="block">
                  <input type="checkbox" className="mr-2" /> {product}
                </label>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default SkinForm;
