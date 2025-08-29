import React from "react";

const AboutSection = () => {
  return (
    <section 
      id="about"
      className="flex w-full h-dvh items-center bg-gray-50 dark:bg-gray-900 py-16 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Why Shop With Us?</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          We provide high-quality products with excellent customer service. Our goal is to make your shopping experience smooth, enjoyable, and satisfying.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Quality Products
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Only the best items, carefully selected for you.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Fast Shipping
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get your orders delivered quickly and safely.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Customer Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              We’re here to help you 24/7 with any inquiries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
