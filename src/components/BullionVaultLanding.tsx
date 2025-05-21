import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Font styles using CSS
const fontStyles = `
  @font-face {
    font-family: 'Trajan Pro';
    src: url('/fonts/TrajanPro-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Trajan Pro';
    src: url('/fonts/TrajanPro-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
  }
  
  body {
    font-family: 'Trajan Pro', serif;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Trajan Pro', serif;
  }
  
  p, a, button, input, textarea {
    font-family: 'Trajan Pro', sans-serif;
  }
`;

type FormData = {
  name: string;
  phone: string;
  message: string;
};

type VisibilityState = {
  hero: boolean;
  whatWeBuy: boolean;
  partnership: boolean;
};

const BullionVaultLanding: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    message: ''
  });
  
  const [isVisible, setIsVisible] = useState<VisibilityState>({
    hero: false,
    whatWeBuy: false,
    partnership: false
  });
  
  // Mobile detection
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Set initial visibility
    setIsVisible({
      hero: true,
      whatWeBuy: false,
      partnership: false
    });
    
    // Check if screen is mobile
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Run once on mount
    checkMobile();
    
    // Add event listeners
    const handleScroll = (): void => {
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
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (): void => {
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
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Add font styles */}
      <style>{fontStyles}</style>
      
      {/* Header - Updated with black background and contact info */}
      <motion.header 
        className="bg-black text-white p-4 sticky top-0 z-50 shadow-lg"
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
            <img src="/bullionvaultlogo.png" alt="The Bullion Vault Logo" className="h-34 w-auto" />
          </motion.div>
          
          {/* Updated Contact Info with WhatsApp */}
          <div className="hidden md:flex items-center">
            <motion.div 
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="tel:07453498937" className="flex items-center">
                Call us now on 074534-98937 or 
                <span className="flex items-center ml-2">
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.449C18.24 1.245 15.24 0.05 12.045 0.05C5.463 0.05 0.102 5.412 0.102 11.992C0.102 14.097 0.735 16.137 1.923 17.879L0 24.05L6.335 22.165C8.01 23.236 9.93 23.791 11.895 23.791H11.9C18.48 23.791 23.85 18.429 23.85 11.849C23.85 8.685 22.65 5.715 20.52 3.449ZM12.045 21.781H12.04C10.275 21.781 8.55 21.25 7.05 20.251L6.69 20.029L2.895 21.131L4.01 17.435L3.765 17.057C2.677 15.493 2.096 13.638 2.096 11.722C2.096 6.497 6.48 2.24 12.05 2.24C14.7 2.24 17.175 3.239 19.025 5.04C20.875 6.841 21.855 9.316 21.851 11.972C21.85 17.201 17.465 21.781 12.045 21.781ZM17.672 14.602C17.367 14.454 15.875 13.718 15.6 13.619C15.322 13.52 15.127 13.471 14.932 13.775C14.737 14.08 14.151 14.766 13.982 14.962C13.817 15.156 13.652 15.182 13.347 15.034C13.042 14.886 12.027 14.547 10.82 13.469C9.878 12.629 9.243 11.582 9.078 11.277C8.913 10.973 9.063 10.822 9.208 10.682C9.34 10.556 9.498 10.353 9.643 10.189C9.788 10.025 9.838 9.903 9.938 9.707C10.038 9.512 9.988 9.348 9.913 9.199C9.838 9.051 9.208 7.559 8.963 6.95C8.727 6.358 8.488 6.436 8.313 6.427C8.152 6.419 7.957 6.416 7.762 6.416C7.567 6.416 7.242 6.491 6.968 6.796C6.693 7.1 5.91 7.837 5.91 9.329C5.91 10.821 7.035 12.264 7.18 12.459C7.325 12.654 9.242 15.619 12.172 16.939C12.95 17.279 13.559 17.48 14.036 17.628C14.816 17.875 15.527 17.84 16.088 17.764C16.716 17.68 17.922 17.032 18.168 16.322C18.412 15.612 18.412 15.004 18.337 14.883C18.262 14.762 18.067 14.689 17.762 14.541L17.672 14.602Z"/>
                  </svg>
                  WhatsApp us
                </span>
              </a>
            </motion.div>
          </div>
          
          {/* Mobile only contact - simplified for small screens */}
          <div className="md:hidden flex items-center">
            <a href="tel:07453498937" className="mr-3 text-white hover:text-[#D4AF37]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <a href="https://wa.me/447453498937" className="text-[#25D366] hover:text-[#128C7E]">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.449C18.24 1.245 15.24 0.05 12.045 0.05C5.463 0.05 0.102 5.412 0.102 11.992C0.102 14.097 0.735 16.137 1.923 17.879L0 24.05L6.335 22.165C8.01 23.236 9.93 23.791 11.895 23.791H11.9C18.48 23.791 23.85 18.429 23.85 11.849C23.85 8.685 22.65 5.715 20.52 3.449ZM12.045 21.781H12.04C10.275 21.781 8.55 21.25 7.05 20.251L6.69 20.029L2.895 21.131L4.01 17.435L3.765 17.057C2.677 15.493 2.096 13.638 2.096 11.722C2.096 6.497 6.48 2.24 12.05 2.24C14.7 2.24 17.175 3.239 19.025 5.04C20.875 6.841 21.855 9.316 21.851 11.972C21.85 17.201 17.465 21.781 12.045 21.781Z"/>
              </svg>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Conditionally modified for mobile */}
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
          <div className="absolute inset-0 bg-black opacity-80"></div>
        </motion.div>
        
        {/* Mobile-optimized content - Only shown on mobile */}
        {isMobile ? (
          <div className="container mx-auto px-4 h-full relative z-10 flex flex-col items-center pt-8">
            {/* Main heading - WHITE BACKGROUND */}
            <motion.div 
              className="w-full bg-white text-black p-4 rounded-md mt-8"
              initial="hidden"
              animate={isVisible.hero ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <motion.h1 
                className="text-3xl font-bold mb-2 text-black leading-tight"
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
                Sell Your Gold today in person with people you can trust.
              </motion.h1>
            </motion.div>
            
            {/* Subheading - BLACK BACKGROUND WITH WHITE TEXT */}
            <motion.div
              className="w-full bg-black text-white p-4 rounded-md mt-4"
              initial="hidden"
              animate={isVisible.hero ? "visible" : "hidden"}
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
              <motion.p 
                className="text-lg mb-2 text-white"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      duration: 0.8,
                      delay: 0.6
                    }
                  }
                }}
              >
                Visit us in-store at MC Watches, 66 George Street, Altrincham. 
                No pressure to sell — get your items tested for free.
              </motion.p>
              
              <motion.a 
                href="#contact" 
                className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-2 px-6 rounded-md text-lg shadow-lg shadow-[#D4AF37]/30 hover:shadow-[#D4AF37]/50 hover:translate-y-[-2px] transition duration-300 mt-2"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      duration: 0.8,
                      delay: 0.8
                    }
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Free Testing Today
              </motion.a>
            </motion.div>
          </div>
        ) : (
          // Original desktop layout - with updated background colors
          <div className="container mx-auto px-4 h-full relative z-10 flex items-center">
            <motion.div 
              className="w-full md:w-1/2"
              initial="hidden"
              animate={isVisible.hero ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <motion.div className="bg-white text-black p-6 rounded-md">
                <motion.h1 
                  className="text-4xl font-bold mb-4 text-black leading-tight"
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
                  Sell Your Gold, Silver, Jewellery or Coins Today
                </motion.h1>
              </motion.div>
              
              <motion.div className="bg-black p-6 rounded-md mt-4">
                <motion.h2
                  className="text-2xl font-bold mb-4 text-[#D4AF37] leading-tight"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        duration: 0.8,
                        delay: 0.3
                      }
                    }
                  }}
                >
                  In Person, With People You Can Trust.
                </motion.h2>
                
                <motion.p 
                  className="text-xl mb-8 text-white"
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
            </motion.div>
          </div>
        )}
      </section>

      {/* What We Buy Section - Updated background to gold */}
      <section id="what-we-buy" className="py-16 bg-gradient-to-b from-[#D4AF37] to-[#B8960B]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 text-black"
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
              <div className="mb-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105">
                <img src="/gold-bars.png" alt="Gold" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-black">Gold</h3>
            </motion.div>
            
            {/* Silver */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105">
                <img src="/silver-coin.png" alt="Silver" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-black">Silver</h3>
            </motion.div>
            
            {/* Platinum */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105">
                <img src="/platinum-ring.png" alt="Platinum" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-black">Platinum</h3>
            </motion.div>
            
            {/* Jewellery */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105">
                <img src="/jewellery.png" alt="Jewellery" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-black">Jewellery</h3>
            </motion.div>
            
            {/* Coins */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105">
                <img src="/coins.png" alt="Coins" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-black">Coins</h3>
            </motion.div>
            
            {/* Bullion */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <div className="mb-4 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105">
                <img src="/bullion.png" alt="Bullion" className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-xl font-semibold text-black">Bullion</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Updated to gold background */}
      <section id="contact" className="py-16 bg-gradient-to-b from-[#D4AF37] to-[#B8960B] relative overflow-hidden">
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="flex flex-col md:flex-row"
            initial="hidden"
            animate={isVisible.partnership ? "visible" : "hidden"}
            variants={fadeIn}
          >
            {/* Left Column - Updated with two logo images */}
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
                <div className="mb-6 flex items-center justify-center">
                  {/* First Logo */}
                  <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-lg p-2 backdrop-blur-sm transform hover:scale-105 transition duration-300 mr-4">
                    <img src="/bullionvaultlogo.png" alt="The Bullion Vault Logo" className="w-full h-full object-contain" />
                  </div>
                  
                  {/* "X" symbol */}
                  <div className="text-4xl font-bold text-black mx-2">×</div>
                  
                  {/* Second Logo */}
                  <div className="w-32 h-32 flex items-center justify-center bg-white rounded-full shadow-lg p-2 backdrop-blur-sm transform hover:scale-105 transition duration-300 ml-4">
                    <img src="/mcwatcheslogo.png" alt="MC Watches Logo" className="w-full h-full object-contain" />
                  </div>
                </div>
                <p className="text-2xl font-medium text-black leading-relaxed drop-shadow-sm text-center">
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
                className="bg-black p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-[#D4AF37]/20"
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
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
      <footer className="bg-[#D4AF37] text-black py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bold">© {new Date().getFullYear()} The Bullion Vault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BullionVaultLanding;