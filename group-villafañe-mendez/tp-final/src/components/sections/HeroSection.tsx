import React from "react";
import { SecondaryLinkButton } from "../buttons/Links";

const HeroSection = () => {
  return (
    <section className="flex bg-center bg-no-repeat bg-fixed bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/conference.jpg')] bg-gray-700 bg-blend-multiply h-dvh items-center">
      <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
          Discover the Best Deals
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
          Shop the latest products with unbeatable prices and quality you can trust.
        </p>
        <div className="flex justify-center">
          <SecondaryLinkButton href="#about">
            Shop Now
          </SecondaryLinkButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
