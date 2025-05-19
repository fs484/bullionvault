import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BullionVaultLanding = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  
  const [isVisible, setIsVisible] = useState({
    hero: false,
    whatWeBuy: false,
    partnership: false
  });

  useEffect(() => {
    setIsVisible({
      hero: true,
      whatWeBuy: false,
      partnership: false
    });
    
    const handleScroll = () => {
      const whatWeBuySection = document.getElementById('what-we-buy');
      const partnershipSection = document.getElementById('contact');
      
      if (whatWeBuySection && window.scrollY > whatWeBuySection.offsetTop - window.innerHeight * 0.7) {
        setIsVisible(prev => ({ ...prev, whatWeBuy: true }));
      }
      
      if (partnershipSection && window.scrollY > partnershipSection.offsetTop - window.innerHeight * 0.7) {
        setIsVisible(prev => ({ ...prev, partnership: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // Form submission logic would go here
    alert('Thank you for your message. We will get back to you shortly.');
    setFormData({ name: '', phone: '', message: '' });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };
  
  const staggerItems = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemAnimation = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      {/* Header */}
      <motion.header 
        className="bg-black bg-opacity-80 backdrop-blur-md text-white p-4 sticky top-0 z-50 shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Brand Name */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <svg width="60" height="60" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 10L110 35V85L60 110L10 85V35L60 10Z" stroke="#D4AF37" strokeWidth="4" fill="none" />
              <circle cx="60" cy="60" r="25" stroke="#D4AF37" strokeWidth="4" fill="none" />
              <path d="M60 35V85" stroke="#D4AF37" strokeWidth="4" />
              <path d="M35 60H85" stroke="#D4AF37" strokeWidth="4" />
            </svg>
            <div className="ml-3">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFC832] tracking-wide">THE BULLION</div>
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFC832] tracking-wide">VAULT</div>
            </div>
          </motion.div>
          
          {/* Contact Info */}
          <div className="flex items-center">
            <motion.div 
              className="mr-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="tel:0161XXXXXX" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                Call us now: 0161 XXXXXX
              </a>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="#contact" className="text-white hover:text-[#D4AF37] transition-colors duration-300">
                Contact
              </a>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image with parallax effect */}
        <motion.div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: `url('/storefront.jpg')`,
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 20, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-70"></div>
        </motion.div>
        
        {/* Content */}
        <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
          <motion.div 
            className="w-full md:w-1/2"
            initial="hidden"
            animate={isVisible.hero ? "visible" : "hidden"}
            variants={fadeIn}
          >
            <motion.h1 
              className="text-5xl font-bold mb-4 text-white leading-tight drop-shadow-lg"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    delay: 0.2
                  }
                }
              }}
            >
              Sell Your Gold, Silver, Jewellery or Coins Today—
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFC832]">
                In Person, With People You Can Trust.
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl mb-8 text-white drop-shadow-md"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    delay: 0.4
                  }
                }
              }}
            >
              Visit us in-store at MC Watches, 66 George Street, Altrincham. 
              No pressure to sell — get your items tested for free.
            </motion.p>
            <motion.a 
              href="#contact" 
              className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-3 px-8 rounded-md text-lg shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:translate-y-[-2px] transition duration-300"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8,
                    delay: 0.6
                  }
                }
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Free Testing or Valuation Today
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>

      {/* What We Buy Section */}
      <section id="what-we-buy" className="py-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] to-[#FFC832]"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible.whatWeBuy ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            What We Buy
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8"
            variants={staggerItems}
            initial="hidden"
            animate={isVisible.whatWeBuy ? "visible" : "hidden"}
          >
            {/* Gold */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-gradient-to-br from-[#FFD700] to-[#B8860B] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 transition duration-300 transform hover:scale-105">
                <img src="/gold-bars.png" alt="Gold" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white">Gold</h3>
            </motion.div>
            
            {/* Silver */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-gradient-to-br from-[#C0C0C0] to-[#A9A9A9] rounded-full flex items-center justify-center shadow-lg shadow-gray-500/30 hover:shadow-gray-500/50 transition duration-300 transform hover:scale-105">
                <img src="/silver-coin.png" alt="Silver" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white">Silver</h3>
            </motion.div>
            
            {/* Platinum */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-gradient-to-br from-[#E5E4E2] to-[#CECECE] rounded-full flex items-center justify-center shadow-lg shadow-gray-300/30 hover:shadow-gray-300/50 transition duration-300 transform hover:scale-105">
                <img src="/platinum-ring.png" alt="Platinum" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white">Platinum</h3>
            </motion.div>
            
            {/* Jewellery */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-gradient-to-br from-[#E6C555] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 transition duration-300 transform hover:scale-105">
                <img src="/jewellery.png" alt="Jewellery" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white">Jewellery</h3>
            </motion.div>
            
            {/* Coins */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-gradient-to-br from-[#FFC832] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 transition duration-300 transform hover:scale-105">
                <img src="/coins.png" alt="Coins" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white">Coins</h3>
            </motion.div>
            
            {/* Bullion */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-gradient-to-br from-[#D4AF37] to-[#B8960B] rounded-full flex items-center justify-center shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 transition duration-300 transform hover:scale-105">
                <img src="/bullion.png" alt="Bullion" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-white">Bullion</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>

      {/* Partnership Section */}
      <section id="contact" className="py-16 bg-gradient-to-r from-[#B8960B] to-[#E6C555] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E')" }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="flex flex-col md:flex-row"
            initial="hidden"
            animate={isVisible.partnership ? "visible" : "hidden"}
            variants={fadeIn}
          >
            {/* Left Column */}
            <motion.div 
              className="w-full md:w-1/2 md:pr-8 flex items-center mb-8 md:mb-0"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.2
                  }
                }
              }}
            >
              <div>
                <div className="mb-6 w-32 h-32 flex items-center justify-center bg-white bg-opacity-20 rounded-full shadow-lg p-4 backdrop-blur-sm transform hover:scale-105 transition duration-300">
                  <img src="/handshake.png" alt="Handshake Icon" className="w-24" />
                </div>
                <p className="text-2xl font-medium text-black leading-relaxed drop-shadow-sm">
                  We are proud to partner with MC Watches, an established local watch store in Altrincham.
                </p>
              </div>
            </motion.div>
            
            {/* Right Column - Contact Form */}
            <motion.div 
              className="w-full md:w-1/2"
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: { 
                  opacity: 1, 
                  x: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: 0.4
                  }
                }
              }}
            >
              <motion.div 
                className="bg-black bg-opacity-90 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-[#D4AF37]/20"
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.25)",
                  y: -5
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-3 bg-transparent border-b-2 border-[#D4AF37] text-white focus:outline-none focus:border-[#FFC832] transition-colors duration-300"
                  />
                </motion.div>
                <motion.div 
                  className="mb-6"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-3 bg-transparent border-b-2 border-[#D4AF37] text-white focus:outline-none focus:border-[#FFC832] transition-colors duration-300"
                  />
                </motion.div>
                <motion.div 
                  className="mb-8"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    className="w-full p-3 bg-transparent border-b-2 border-[#D4AF37] text-white focus:outline-none focus:border-[#FFC832] transition-colors duration-300"
                  />
                </motion.div>
                <motion.button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-3 px-6 text-lg rounded shadow-lg shadow-[#D4AF37]/30"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Submit
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-500 py-6">
        <div className="container mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} The Bullion Vault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BullionVaultLanding;