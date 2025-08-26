import React from "react";

const AboutSection = () => {
  return (
    <section 
    id="about"
    className="flex w-full h-dvh items-center bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">About Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          We are a passionate team dedicated to creating innovative solutions
          that make a difference. Our goal is to provide exceptional value and
          deliver outstanding user experiences through creativity, technology,
          and collaboration.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To empower individuals and businesses by building scalable and
              impactful digital products.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              Becoming a global leader in technology innovation, creating
              meaningful solutions for everyone.
            </p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Values
            </h3>
            <p className="text-gray-600">
              Integrity, innovation, and teamwork are at the core of everything
              we do.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
