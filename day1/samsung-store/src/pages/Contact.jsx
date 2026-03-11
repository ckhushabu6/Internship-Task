import React from 'react';

function Contact() {
  return (
    <div className="bg-white min-h-screen py-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Simple Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Contact Us</h1>
          <div className="h-1 w-12 bg-blue-600 mt-2"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          
          {/* Form Section */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full border-b border-gray-300 py-2 focus:border-blue-600 focus:outline-none transition-colors" 
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full border-b border-gray-300 py-2 focus:border-blue-600 focus:outline-none transition-colors" 
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-2">Message</label>
              <textarea 
                rows="4" 
                className="w-full border-b border-gray-300 py-2 focus:border-blue-600 focus:outline-none transition-colors resize-none" 
                placeholder="How can we help?"
              ></textarea>
            </div>

            <button className="bg-black text-white px-10 py-3 text-sm font-bold hover:bg-gray-800 transition-all uppercase tracking-widest">
              Send Message
            </button>
          </div>

          {/* Info Section */}
          <div className="flex flex-col justify-between py-2">
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase mb-2">Customer Support</h4>
                <p className="text-gray-600">support@samsungstore.com</p>
                <p className="text-gray-600">+1 (800) 123-4567</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-gray-900 uppercase mb-2">Main Office</h4>
                <p className="text-gray-600">123 Tech Avenue, Innovation Park</p>
                <p className="text-gray-600">Seoul, South Korea</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-sm font-bold text-gray-900 uppercase mb-4">Follow Us</h4>
              <div className="flex gap-6 text-gray-400">
                <span className="hover:text-blue-600 cursor-pointer text-xs font-bold">INSTAGRAM</span>
                <span className="hover:text-blue-600 cursor-pointer text-xs font-bold">TWITTER</span>
                <span className="hover:text-blue-600 cursor-pointer text-xs font-bold">LINKEDIN</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;