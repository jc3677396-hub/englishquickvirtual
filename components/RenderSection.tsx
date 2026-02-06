import React from 'react';
import { Section } from '../types';
import { Laptop, Facebook, Instagram, Youtube, Phone, Video, CheckCircle, GraduationCap, Building2, Link, Image as ImageIcon } from 'lucide-react';

interface RenderSectionProps {
  section: Section;
  onClick: () => void;
  isSelected: boolean;
}

const RenderSection: React.FC<RenderSectionProps> = ({ section, onClick, isSelected }) => {
  const { content, styles } = section;

  const containerStyle = {
    backgroundColor: styles.backgroundColor,
    color: styles.textColor,
    textAlign: styles.textAlign,
  };

  const selectedBorder = isSelected ? 'ring-4 ring-blue-500 ring-opacity-50 z-10 relative' : '';
  
  // Calculate brightness filter
  const brightness = content.imageBrightness !== undefined ? content.imageBrightness : 100;
  const imageFilter = `brightness(${brightness}%)`;

  // --- Components for specific sections ---

  const Header = () => (
    <div className={`container mx-auto px-4 flex items-center justify-between ${styles.paddingY}`}>
      <div className="flex items-center gap-2">
        <Laptop className="w-8 h-8" style={{ color: styles.accentColor }} />
        <span className={`font-bold ${styles.fontSizeTitle}`}>{content.logoText}</span>
      </div>
    </div>
  );

  const Hero = () => (
    <div className={`relative ${styles.paddingY} min-h-[500px] flex items-center justify-center overflow-hidden`}>
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-300" 
        style={{ 
          backgroundImage: `url(${content.imageUrl})`,
          filter: imageFilter
        }}
      />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-60" /> {/* Dark overlay */}
      
      <div className="relative z-10 container mx-auto px-4">
        <h1 className={`font-bold mb-4 ${styles.fontSizeTitle}`} style={{ color: styles.textColor }}>
          {content.title}
        </h1>
        <p className={`mb-8 max-w-2xl mx-auto ${styles.fontSizeBody}`} style={{ color: '#E5E7EB' }}>
          {content.subtitle}
        </p>
      </div>
    </div>
  );

  const WhyUs = () => (
    <div className={`container mx-auto px-4 ${styles.paddingY}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={styles.textAlign}>
          <h2 className={`font-bold mb-6 ${styles.fontSizeTitle}`} style={{ color: styles.accentColor }}>{content.title}</h2>
          <p className={`mb-8 opacity-80 ${styles.fontSizeBody} whitespace-pre-line`}>{content.description}</p>
          <div className="space-y-4">
            {content.features?.map((feat, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 mt-1 flex-shrink-0" style={{ color: styles.accentColor }} />
                <div>
                  <h4 className="font-bold">{feat.title}</h4>
                  <p className="text-sm opacity-70">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img 
            src={content.imageUrl} 
            alt="Why us" 
            className="rounded-xl shadow-xl w-full h-auto object-cover transition-all duration-300"
            style={{ filter: imageFilter }} 
          />
        </div>
      </div>
    </div>
  );

  const Academic = () => (
    <div className={`container mx-auto px-4 ${styles.paddingY}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <img 
            src={content.imageUrl} 
            alt="Academic" 
            className="rounded-xl shadow-xl w-full h-auto object-cover transition-all duration-300" 
            style={{ filter: imageFilter }}
          />
        </div>
        <div className={`order-1 md:order-2 ${styles.textAlign}`}>
          <h2 className={`font-bold mb-6 ${styles.fontSizeTitle}`} style={{ color: styles.accentColor }}>
            <span className="flex items-center gap-3 justify-center md:justify-start">
              <GraduationCap className="w-10 h-10" />
              {content.title}
            </span>
          </h2>
          <p className={`opacity-80 ${styles.fontSizeBody} whitespace-pre-line`}>{content.description}</p>
        </div>
      </div>
    </div>
  );

  const Jobs = () => (
    <div className={`container mx-auto px-4 ${styles.paddingY}`}>
      <h2 className={`font-bold mb-4 ${styles.fontSizeTitle}`}>{content.title}</h2>
      <p className={`mb-12 max-w-2xl mx-auto opacity-90 ${styles.fontSizeBody}`}>{content.description}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {content.items?.map((item, idx) => (
          <div key={idx} className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg border border-white border-opacity-20 hover:bg-opacity-20 transition-all flex flex-col items-center gap-4">
             {item.imageUrl ? (
               <img src={item.imageUrl} alt={item.text} className="w-40 h-40 object-cover rounded-lg shadow-md" />
             ) : (
                <div className="w-40 h-40 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 opacity-50" />
                </div>
             )}
            <p className="font-semibold text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const Institutional = () => (
    <div className={`container mx-auto px-4 ${styles.paddingY}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={styles.textAlign}>
           <h2 className={`font-bold mb-6 ${styles.fontSizeTitle}`} style={{ color: styles.accentColor }}>
            <span className="flex items-center gap-3 justify-center md:justify-start">
              <Building2 className="w-10 h-10" />
              {content.title}
            </span>
          </h2>
          {content.ceoImageUrl && (
            <div className={`mb-6 ${styles.textAlign === 'center' ? 'flex justify-center' : ''}`}>
               <img src={content.ceoImageUrl} alt="CEO" className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-gray-100" />
            </div>
          )}
          <p className={`opacity-80 ${styles.fontSizeBody} whitespace-pre-line`}>{content.description}</p>
        </div>
        <div>
          <img 
            src={content.imageUrl} 
            alt="Institutional" 
            className="rounded-xl shadow-xl w-full h-auto object-cover transition-all duration-300" 
            style={{ filter: imageFilter }}
          />
        </div>
      </div>
    </div>
  );

  const Footer = () => (
    <div className={`container mx-auto px-4 ${styles.paddingY}`}>
      {content.ceoImageUrl && (
         <div className="flex justify-center mb-6">
             <img src={content.ceoImageUrl} alt="CEO" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
         </div>
      )}
      <h2 className={`font-bold mb-2 ${styles.fontSizeTitle}`}>{content.title}</h2>
      <p className="mb-8 opacity-70 whitespace-pre-line">{content.subtitle}</p>
      
      <div className="flex flex-wrap justify-center gap-4">
        {content.socialLinks?.instagram && (
          <a href={content.socialLinks.instagram} target="_blank" rel="noreferrer" className="bg-gradient-to-tr from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform text-white">
            <Instagram className="w-6 h-6" />
          </a>
        )}
        {content.socialLinks?.facebook && (
          <a href={content.socialLinks.facebook} target="_blank" rel="noreferrer" className="bg-blue-600 p-3 rounded-full hover:scale-110 transition-transform text-white">
            <Facebook className="w-6 h-6" />
          </a>
        )}
        {content.socialLinks?.youtube && (
          <a href={content.socialLinks.youtube} target="_blank" rel="noreferrer" className="bg-red-600 p-3 rounded-full hover:scale-110 transition-transform text-white">
            <Youtube className="w-6 h-6" />
          </a>
        )}
        {content.socialLinks?.tiktok && (
          <a href={content.socialLinks.tiktok} target="_blank" rel="noreferrer" className="bg-black p-3 rounded-full hover:scale-110 transition-transform text-white">
             {/* Lucide doesn't have a perfect TikTok, using Video as placeholder */}
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
          </a>
        )}
         {content.socialLinks?.linktree && (
          <a href={content.socialLinks.linktree} target="_blank" rel="noreferrer" className="bg-green-600 p-3 rounded-full hover:scale-110 transition-transform text-white flex items-center justify-center">
             <Link className="w-6 h-6" />
          </a>
        )}
      </div>

      <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
        {content.socialLinks?.whatsappLatam && (
           <a href={`https://wa.me/${content.socialLinks.whatsappLatam.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" 
              className="flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-colors">
              <Phone className="w-5 h-5" />
              <span>WhatsApp LATAM</span>
           </a>
        )}
         {content.socialLinks?.whatsappUS && (
           <a href={`https://wa.me/${content.socialLinks.whatsappUS.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" 
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition-colors">
              <Phone className="w-5 h-5" />
              <span>WhatsApp US</span>
           </a>
        )}
      </div>

      <div className="mt-12 text-sm opacity-50 border-t border-gray-700 pt-8">
        &copy; {new Date().getFullYear()} English Quick Academy. Todos los derechos reservados.
      </div>
    </div>
  );

  return (
    <section 
      id={section.id}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`transition-all duration-200 cursor-pointer hover:opacity-95 ${selectedBorder}`}
      style={containerStyle}
    >
      {section.type === 'header' && <Header />}
      {section.type === 'hero' && <Hero />}
      {section.type === 'why-us' && <WhyUs />}
      {section.type === 'academic' && <Academic />}
      {section.type === 'jobs' && <Jobs />}
      {section.type === 'institutional' && <Institutional />}
      {section.type === 'footer' && <Footer />}
    </section>
  );
};

export default RenderSection;