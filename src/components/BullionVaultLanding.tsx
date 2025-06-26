import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Font styles using CSS
const fontStyles = `
  @font-face {
    font-family: 'Trajan Pro';
    src: url('/fonts/TrajanPro-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  
  @font-face {
    font-family: 'Trajan Pro';
    src: url('/fonts/TrajanPro-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  
  body {
    font-family: 'Trajan Pro', serif;
    scroll-behavior: smooth;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: 'Trajan Pro', serif;
  }
  
  p, a, button, input, textarea {
    font-family: 'Trajan Pro', sans-serif;
  }

  /* Smooth scrolling for the whole page */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar for modern browsers */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: #D4AF37;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #B8960B;
  }

  /* Modern text highlighting */
  ::selection {
    background: #D4AF37;
    color: black;
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

  // Refs for scroll animations
  const heroRef = useRef<HTMLDivElement>(null);
  const whatWeBuyRef = useRef<HTMLDivElement>(null);
  const partnershipRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for parallax effects
  const { scrollYProgress } = useScroll();
  const heroTextY = useTransform(scrollYProgress, [0, 0.3], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -300]);

  useEffect(() => {
    // Set initial visibility with animation delay for a smoother initial load
    setTimeout(() => {
      setIsVisible({
        hero: true,
        whatWeBuy: false,
        partnership: false
      });
    }, 100);
    
    // Check if screen is mobile
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Run once on mount
    checkMobile();
    
    // Add event listeners
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.7;
      
      if (whatWeBuyRef.current && scrollPosition > whatWeBuyRef.current.offsetTop) {
        setIsVisible(prev => ({ ...prev, whatWeBuy: true }));
      }
      
      if (partnershipRef.current && scrollPosition > partnershipRef.current.offsetTop) {
        setIsVisible(prev => ({ ...prev, partnership: true }));
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    // Initial check for elements in viewport
    handleScroll();
    
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
    // Create email content
    const subject = encodeURIComponent('Contact Form Submission - The Bullion Vault');
    const body = encodeURIComponent(`
Name: ${formData.name}
Phone: ${formData.phone}
Message: ${formData.message}

--
This message was sent from The Bullion Vault website contact form.
    `);
    
    // Create mailto link
    const mailtoLink = `mailto:Thebullionvaultuk@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation and reset form
    alert('Thank you for your message. Your email client will open to send the message.');
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

  const textReveal = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 50,
        damping: 20
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white overflow-hidden">
      {/* Add font styles */}
      <style>{fontStyles}</style>
      
      {/* Header - Reduced horizontal padding */}
      <motion.header 
        className="bg-black bg-opacity-90 backdrop-filter backdrop-blur-md text-white py-4 px-2 sticky top-0 z-50 shadow-lg border-b border-[#D4AF37]/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo with smooth hover effect */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <img src="/bullionvaultlogo.png" alt="The Bullion Vault Logo" className="h-24 w-auto" />
          </motion.div>
          
          {/* Contact Info with modern styling for desktop */}
          <div className="hidden md:flex items-center">
            <motion.div 
              className="text-white hover:text-[#D4AF37] transition-colors duration-300"
              whileHover={{ scale: 1.05, x: -5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <a href="tel:07453498937" className="flex items-center group">
                <span className="relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] after:transition-all after:duration-300 group-hover:after:w-full">
                  Call us now on 074534-98937 or 
                </span>
                <span className="flex items-center ml-2 group-hover:translate-x-1 transition-transform duration-300">
                  <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24" fill="#25D366" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M20.52 3.449C18.24 1.245 15.24 0.05 12.045 0.05C5.463 0.05 0.102 5.412 0.102 11.992C0.102 14.097 0.735 16.137 1.923 17.879L0 24.05L6.335 22.165C8.01 23.236 9.93 23.791 11.895 23.791H11.9C18.48 23.791 23.85 18.429 23.85 11.849C23.85 8.685 22.65 5.715 20.52 3.449ZM12.045 21.781H12.04C10.275 21.781 8.55 21.25 7.05 20.251L6.69 20.029L2.895 21.131L4.01 17.435L3.765 17.057C2.677 15.493 2.096 13.638 2.096 11.722C2.096 6.497 6.48 2.24 12.05 2.24C14.7 2.24 17.175 3.239 19.025 5.04C20.875 6.841 21.855 9.316 21.851 11.972C21.85 17.201 17.465 21.781 12.045 21.781ZM17.672 14.602C17.367 14.454 15.875 13.718 15.6 13.619C15.322 13.52 15.127 13.471 14.932 13.775C14.737 14.08 14.151 14.766 13.982 14.962C13.817 15.156 13.652 15.182 13.347 15.034C13.042 14.886 12.027 14.547 10.82 13.469C9.878 12.629 9.243 11.582 9.078 11.277C8.913 10.973 9.063 10.822 9.208 10.682C9.34 10.556 9.498 10.353 9.643 10.189C9.788 10.025 9.838 9.903 9.938 9.707C10.038 9.512 9.988 9.348 9.913 9.199C9.838 9.051 9.208 7.559 8.963 6.95C8.727 6.358 8.488 6.436 8.313 6.427C8.152 6.419 7.957 6.416 7.762 6.416C7.567 6.416 7.242 6.491 6.968 6.796C6.693 7.1 5.91 7.837 5.91 9.329C5.91 10.821 7.035 12.264 7.18 12.459C7.325 12.654 9.242 15.619 12.172 16.939C12.95 17.279 13.559 17.48 14.036 17.628C14.816 17.875 15.527 17.84 16.088 17.764C16.716 17.68 17.922 17.032 18.168 16.322C18.412 15.612 18.412 15.004 18.337 14.883C18.262 14.762 18.067 14.689 17.762 14.541L17.672 14.602Z"/>
                  </svg>
                  WhatsApp us
                </span>
              </a>
            </motion.div>
          </div>
          
          {/* Mobile contact icons with pulse effect */}
          <div className="md:hidden flex items-center">
            <motion.a 
              href="tel:07453498937" 
              className="mr-5 text-white hover:text-[#D4AF37] relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-10"></span>
            </motion.a>
            <motion.a 
              href="https://wa.me/447453498937" 
              className="text-[#25D366] hover:text-[#128C7E] relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-10"></span>
            </motion.a>
          </div>
        </div>
      </motion.header>

      {/* Hero Section - Enhanced with parallax and removed white background */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div 
          className="absolute inset-0 bg-center bg-cover z-0"
          style={{ 
            backgroundImage: `url('/bghero.png')`,
            y: parallaxY
          }}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.0 }}
          transition={{ duration: 30, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </motion.div>
        
        {/* Floating particles effect */}
        <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
          <div className="absolute w-4 h-4 rounded-full bg-[#D4AF37] opacity-20 animate-float1" style={{ top: '10%', left: '20%' }}></div>
          <div className="absolute w-3 h-3 rounded-full bg-[#D4AF37] opacity-30 animate-float2" style={{ top: '30%', left: '70%' }}></div>
          <div className="absolute w-5 h-5 rounded-full bg-[#D4AF37] opacity-15 animate-float3" style={{ top: '65%', left: '35%' }}></div>
          <div className="absolute w-2 h-2 rounded-full bg-[#D4AF37] opacity-25 animate-float4" style={{ top: '45%', left: '85%' }}></div>
          <div className="absolute w-6 h-6 rounded-full bg-[#D4AF37] opacity-10 animate-float5" style={{ top: '80%', left: '10%' }}></div>
        </div>
        
        {/* Mobile-optimized content */}
        {isMobile ? (
          <motion.div 
            className="container mx-auto px-4 h-full relative z-10 flex flex-col items-center"
            style={{ y: heroTextY, opacity: heroOpacity }}
          >
            {/* Main heading - Now directly on background, positioned higher */}
            <motion.div 
              className="w-full backdrop-filter backdrop-blur-sm bg-black bg-opacity-30 p-6 rounded-lg border border-[#D4AF37]/20 mt-16" // Added margin-top to push content higher
              initial="hidden"
              animate={isVisible.hero ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <AnimatePresence>
                <motion.h1 
                  className="text-3xl font-bold mb-4 text-white leading-tight"
                  variants={textReveal}
                >
                  Sell Your <span className="text-[#D4AF37]">Gold</span> today <span className="text-[#D4AF37]">in person</span> with people you can trust.
                </motion.h1>
              </AnimatePresence>
              
              <motion.p 
                className="text-xl mb-4 text-white font-semibold"
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
                <span className="text-2xl">Visit us in-store</span> at MC Watches, 66 George Street, Altrincham.
              </motion.p>
              
              <motion.p 
                className="text-lg mb-6 text-white"
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
                No pressure to sell — get your items tested for free.
              </motion.p>
              
              <motion.a 
                href="#contact" 
                className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-3 px-8 rounded-md text-lg shadow-lg shadow-black/30 hover:shadow-[#D4AF37]/50 hover:translate-y-[-2px] transition duration-300"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      delay: 0.4
                    }
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a Free Testing Today
              </motion.a>
            </motion.div>
          </motion.div>
        ) : (
          // Desktop layout - enhanced with modern styling
          <motion.div 
            className="container mx-auto px-4 h-full relative z-10 flex items-center"
            style={{ y: heroTextY, opacity: heroOpacity }}
          >
            <motion.div 
              className="w-full md:w-3/5 backdrop-filter backdrop-blur-sm bg-black bg-opacity-30 p-8 rounded-lg border border-[#D4AF37]/20"
              initial="hidden"
              animate={isVisible.hero ? "visible" : "hidden"}
              variants={fadeIn}
            >
              <motion.h1 
                className="text-5xl font-bold mb-4 text-white leading-tight"
                variants={textReveal}
              >
                Sell Your <span className="text-[#D4AF37]">Gold, Silver, Jewellery</span> or Coins Today
              </motion.h1>
              
              <motion.h2
                className="text-3xl font-bold mb-6 text-white leading-tight"
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
                In Person, With People You Can <span className="text-[#D4AF37]">Trust</span>.
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
                      delay: 0.3
                    }
                  }
                }}
              >
                Visit us in-store at MC Watches, 66 George Street, Altrincham. 
                No pressure to sell — get your items tested for free.
              </motion.p>
              
              <motion.a 
                href="#contact" 
                className="inline-block bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-3 px-8 rounded-md text-lg shadow-lg shadow-black/30 hover:shadow-[#D4AF37]/50 hover:translate-y-[-2px] transition duration-300"
                variants={{
                  hidden: { opacity: 0, scale: 0.9 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: { 
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                      delay: 0.4
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
        )}
        
        {/* Scroll down indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1.5 h-3 bg-white rounded-full"
              animate={{ 
                y: [0, 12, 0],
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </section>

      {/* Google Maps Section - Clean map only */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#D4AF37" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#mapGrid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-5xl font-bold text-[#D4AF37] mb-6"
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Visit Our Store
            </motion.h2>
            <motion.p 
              className="text-xl text-white max-w-2xl mx-auto"
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              Find us at MC Watches in the heart of Altrincham
            </motion.p>
          </motion.div>

          {/* Google Maps Embed */}
          <motion.div 
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="relative rounded-xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/30 group"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px -10px rgba(212, 175, 55, 0.4)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Map overlay with glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
              
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2374.7234567890123!2d-2.3467890000000002!3d53.3876540000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb3c0c0c0c0c0%3A0x1234567890abcdef!2s66%20George%20Street%2C%20Altrincham%20WA14%201RQ%2C%20UK!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="relative z-0"
              ></iframe>
              
              {/* Floating location pin animation */}
              <motion.div 
                className="absolute top-4 right-4 w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg z-20"
                animate={{ 
                  y: [0, -10, 0],
                  boxShadow: [
                    "0 4px 15px rgba(212, 175, 55, 0.3)",
                    "0 8px 25px rgba(212, 175, 55, 0.5)",
                    "0 4px 15px rgba(212, 175, 55, 0.3)"
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </motion.div>
            </motion.div>
            
            {/* Directions button */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://maps.google.com/?q=66+George+Street,+Altrincham+WA14+1RQ,+UK"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-[#D4AF37]/50 transition-all duration-300 group"
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 group-hover:animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Get Directions
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What We Buy Section - Enhanced with smooth animations */}
      <section 
        id="what-we-buy" 
        ref={whatWeBuyRef}
        className="py-20 bg-gradient-to-b from-[#D4AF37] to-[#B8960B] relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#smallGrid)" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.h2 
            className="text-5xl font-bold text-center mb-16 text-black"
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
              <motion.div 
                className="mb-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <img src="/gold1.png" alt="Gold" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-black">Gold</h3>
            </motion.div>
            
            {/* Silver */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <motion.div 
                className="mb-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <img src="/silver1.png" alt="Silver" className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-black">Silver</h3>
            </motion.div>
            
            {/* Platinum */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <motion.div 
                className="mb-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <img src="/platnium.png" alt="Platinum" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-black">Platinum</h3>
            </motion.div>
            
            {/* Jewellery */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <motion.div 
                className="mb-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <img src="/jewlerry.png" alt="Jewellery" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-black">Jewellery</h3>
            </motion.div>
            
            {/* Coins */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <motion.div 
                className="mb-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <img src="/coins.png" alt="Coins" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-black">Coins</h3>
            </motion.div>
            
            {/* Bullion */}
            <motion.div className="flex flex-col items-center" variants={itemAnimation}>
              <motion.div 
                className="mb-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg shadow-black/30 hover:shadow-black/50 transition duration-300 transform hover:scale-105 group"
                whileHover={{ y: -5 }}
              >
                <img src="/bullions.png" alt="Bullion" className="w-16 h-16 object-contain group-hover:scale-110 transition-transform duration-300" />
              </motion.div>
              <h3 className="text-2xl font-semibold text-black">Bullion</h3>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Enhanced with modern styling */}
      <section 
        id="contact" 
        ref={partnershipRef}
        className="py-20 bg-gradient-to-b from-[#D4AF37] to-[#B8960B] relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-5" style={{ 
            backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`,
            backgroundSize: "30px 30px"
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="flex flex-col md:flex-row items-center gap-12"
            initial="hidden"
            animate={isVisible.partnership ? "visible" : "hidden"}
            variants={fadeIn}
          >
            {/* Left Column - Updated with two logo images */}
            <motion.div 
              className="w-full md:w-1/2 md:pr-8"
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
                <div className="mb-10 flex items-center justify-center">
                  {/* First Logo with hover effect */}
                  <motion.div 
                    className="w-36 h-36 flex items-center justify-center bg-black rounded-full shadow-lg p-2 backdrop-blur-sm transform transition duration-300 mr-4 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img src="/bullionvaultlogo.png" alt="The Bullion Vault Logo" className="w-full h-full object-contain relative z-10" />
                  </motion.div>
                  
                  {/* "X" symbol with animation */}
                  <motion.div 
                    className="text-5xl font-bold text-black mx-4"
                    animate={{ 
                      rotate: [0, 5, 0, -5, 0],
                      scale: [1, 1.1, 1, 1.1, 1]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 5,
                      ease: "easeInOut" 
                    }}
                  >
                    ×
                  </motion.div>
                  
                  {/* Second Logo with hover effect */}
                  <motion.div 
                    className="w-36 h-36 flex items-center justify-center bg-white rounded-full shadow-lg p-2 backdrop-blur-sm transform transition duration-300 ml-4 relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img src="/mclogo.png" alt="MC Watches Logo" className="w-full h-full object-contain relative z-10" />
                  </motion.div>
                </div>
                <motion.p 
                  className="text-2xl font-medium text-black leading-relaxed drop-shadow-sm text-center mb-2"
                  variants={textReveal}
                >
                  We are proud to partner with MC Watches, an established local watch store in Altrincham.
                </motion.p>
                <motion.p 
                  className="text-lg text-black/80 text-center"
                  variants={textReveal}
                  transition={{ delay: 0.2 }}
                >
                  Visit us in-store today and experience our professional service.
                </motion.p>
              </div>
            </motion.div>
            
            {/* Right Column - Contact Form with enhanced styling */}
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
                className="bg-black p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-[#D4AF37]/20 relative overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                  y: -5
                }}
                transition={{ duration: 0.4 }}
              >
                {/* Form glow effect */}
                <div className="absolute -left-20 -top-20 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
                <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-[#D4AF37]/20 rounded-full blur-3xl"></div>
                
                <motion.h3 
                  className="text-2xl font-bold text-[#D4AF37] mb-6 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Get In Touch
                </motion.h3>
                
                <motion.div 
                  className="mb-6 relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="w-full p-3 bg-transparent border-b-2 border-[#D4AF37] text-white focus:outline-none focus:border-[#FFC832] transition-colors duration-300 placeholder-white/50"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC832] group-hover:w-full transition-all duration-300"></div>
                </motion.div>
                
                <motion.div 
                  className="mb-6 relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="w-full p-3 bg-transparent border-b-2 border-[#D4AF37] text-white focus:outline-none focus:border-[#FFC832] transition-colors duration-300 placeholder-white/50"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC832] group-hover:w-full transition-all duration-300"></div>
                </motion.div>
                
                <motion.div 
                  className="mb-8 relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Message"
                    rows={4}
                    className="w-full p-3 bg-transparent border-b-2 border-[#D4AF37] text-white focus:outline-none focus:border-[#FFC832] transition-colors duration-300 placeholder-white/50 resize-none"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFC832] group-hover:w-full transition-all duration-300"></div>
                </motion.div>
                
                <motion.button
                  onClick={handleSubmit}
                  className="w-full relative overflow-hidden bg-gradient-to-r from-[#D4AF37] to-[#B8960B] text-black font-bold py-3 px-6 text-lg rounded shadow-lg shadow-[#D4AF37]/30 group"
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(212, 175, 55, 0.4)" 
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Submit</span>
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer - Enhanced with modern styling */}
      <footer className="bg-[#D4AF37] text-black py-10 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="0.5"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#footer-grid)" />
          </svg>
        </div>
      
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              className="mb-6 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <img src="/bullionvaultlogo.png" alt="The Bullion Vault Logo" className="h-24 w-auto" />
            </motion.div>
            
            <motion.div 
              className="text-center md:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-lg font-bold mb-1">© {new Date().getFullYear()} The Bullion Vault. All rights reserved.</p>
              <p className="text-sm">66 George Street, Altrincham · 074534-98937</p>
            </motion.div>
          </div>
          
          {/* Back to top button */}
          <motion.a 
            href="#" 
            className="absolute bottom-10 right-10 w-10 h-10 bg-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#B8960B] transition-colors duration-300"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </motion.a>
        </div>
      </footer>
      
      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-30px) translateX(20px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-15px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(-20px); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(25px) translateX(15px); }
        }
        @keyframes float5 {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(30px); }
        }
        
        .animate-float1 {
          animation: float1 15s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 18s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 20s ease-in-out infinite;
        }
        .animate-float4 {
          animation: float4 12s ease-in-out infinite;
        }
        .animate-float5 {
          animation: float5 16s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BullionVaultLanding;