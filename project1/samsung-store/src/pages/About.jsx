import React from 'react';

function About() {
  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="py-20 px-6 bg-gray-50 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
          Innovating for <span className="text-blue-600">Everyone.</span>
        </h1>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
          At Samsung Store, we believe technology should be a bridge to a better world. 
          Our mission is to bring the latest in mobile, computing, and lifestyle tech 
          directly to your doorstep.
        </p>
      </div>

      {/* Stats Section */}
      <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <h3 className="text-3xl font-bold text-gray-900">50M+</h3>
          <p className="text-gray-500 text-sm mt-1 uppercase font-semibold">Users Globally</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">120+</h3>
          <p className="text-gray-500 text-sm mt-1 uppercase font-semibold">Countries</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">15K+</h3>
          <p className="text-gray-500 text-sm mt-1 uppercase font-semibold">Service Centers</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-gray-900">100%</h3>
          <p className="text-gray-500 text-sm mt-1 uppercase font-semibold">Quality Assured</p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="max-w-6xl mx-auto py-20 px-6 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-900">Our Vision</h4>
            <p className="text-gray-600 leading-relaxed">
              To inspire the world with innovative technologies, products, and designs that enrich people's lives.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-900">Innovation</h4>
            <p className="text-gray-600 leading-relaxed">
              We never stop pushing the boundaries of what's possible, from foldable displays to advanced AI.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-gray-900">Sustainability</h4>
            <p className="text-gray-600 leading-relaxed">
              Building a greener future by using recycled materials and eco-friendly packaging in every device.
            </p>
          </div>
        </div>
      </div>

      {/* Image/Brand Section */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/vision/about-us_brand_vision_main_pc.jpg" 
            alt="Samsung Vision"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <p className="text-white text-2xl font-light italic px-10 text-center">
              "We create the future by anticipating the needs of tomorrow."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;