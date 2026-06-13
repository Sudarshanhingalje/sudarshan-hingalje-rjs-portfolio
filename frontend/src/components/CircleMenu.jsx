import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaLinkedinIn, FaGithub, FaLock } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CONSTANTS = {
  itemSize: 48,
  openStagger: 0.05,
  closeStagger: 0.05,
};

const pointOnCircleLeftArc = (i, n, r, cx = 0, cy = 0) => {
  // Spreads items in a left-facing arc (from 90 degrees/bottom to 270 degrees/top)
  // i=0: pointing straight down (90 deg)
  // i=n-1: pointing straight up (270 deg)
  const minAngle = Math.PI / 2; // 90 deg (bottom)
  const maxAngle = (3 * Math.PI) / 2; // 270 deg (top)
  const angleRange = maxAngle - minAngle;
  
  const theta = minAngle + (i * angleRange) / (n - 1);
  const x = cx + r * Math.cos(theta);
  const y = cy + r * Math.sin(theta);
  return { x, y };
};

export default function CircleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const [links, setLinks] = useState({
    whatsapp: "https://wa.me/919579853955",
    linkedin: "https://linkedin.com/in/sudarshan-hingalje-b07993158",
    github: "https://github.com/Sudarshanhingalje",
    admin: "/admin/login",
  });

  // Load dynamic links from settings API with local fallback
  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}/settings`);
        if (res.ok) {
          const result = await res.json();
          if (result?.success && result?.data) {
            const d = result.data;
            setLinks({
              whatsapp: d.whatsappNumber ? `https://wa.me/91${d.whatsappNumber}` : "https://wa.me/919579853955",
              linkedin: d.linkedinUrl || "https://linkedin.com/in/sudarshan-hingalje-b07993158",
              github: d.githubUrl || "https://github.com/Sudarshanhingalje",
              admin: "/admin/login",
            });
          }
        }
      } catch (err) {
        // Fall back gracefully
      }
    };
    fetchSettings();
  }, []);

  // Hide menu when scrolled past hero section
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY < window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const items = [
    {
      id: "whatsapp",
      label: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      href: links.whatsapp,
      color: "bg-green-500 hover:bg-green-600 border-green-400 text-white shadow-green-500/20",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      icon: <FaLinkedinIn size={18} />,
      href: links.linkedin,
      color: "bg-blue-600 hover:bg-blue-700 border-blue-500 text-white shadow-blue-600/20",
    },
    {
      id: "github",
      label: "GitHub",
      icon: <FaGithub size={20} />,
      href: links.github,
      color: "bg-neutral-800 hover:bg-neutral-900 border-neutral-700 text-white shadow-neutral-800/20",
    },
    {
      id: "admin",
      label: "Admin Dashboard",
      icon: <FaLock size={16} />,
      href: links.admin,
      color: "bg-amber-600 hover:bg-amber-700 border-amber-500 text-white shadow-amber-600/20",
    },
  ];

  const handleItemClick = (e, item) => {
    e.preventDefault();
    setIsOpen(false);
    if (item.id === "admin") {
      navigate(item.href);
    } else {
      window.open(item.href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center w-14 h-14 pointer-events-none"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translateY(-50%) translateX(${visible ? "0" : "60px"})`,
        transition: "opacity 0.4s ease, transform 0.4s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      {/* Central Trigger Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg border cursor-pointer select-none outline-none focus:outline-none transition-all duration-300 pointer-events-auto
          ${
            isOpen
              ? "bg-gradient-to-tr from-rose-500 to-red-600 border-red-400 text-white shadow-red-500/40 rotate-90"
              : "bg-gradient-to-tr from-purple-600 to-indigo-600 border-purple-400 text-white shadow-purple-500/40 hover:from-purple-500 hover:to-indigo-500"
          }`}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isOpen ? (
            <motion.div
              key="close-icon"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="menu-icon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Radial Menu Items - fanned out from the center of trigger button */}
      <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center">
        {items.map((item, index) => {
          const { x, y } = pointOnCircleLeftArc(
            index,
            items.length,
            85, // Radius from center of trigger
            0,
            0
          );

          return (
            <MenuItem
              key={item.id}
              item={item}
              x={x}
              y={y}
              isOpen={isOpen}
              index={index}
              onClick={(e) => handleItemClick(e, item)}
            />
          );
        })}
      </div>
    </div>
  );
}

function MenuItem({ item, x, y, isOpen, index, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
      animate={{
        x: isOpen ? x : 0,
        y: isOpen ? y : 0,
        scale: isOpen ? 1 : 0,
        opacity: isOpen ? 1 : 0,
      }}
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.1 },
      }}
      transition={{
        type: "spring",
        stiffness: 350,
        damping: 25,
        delay: isOpen
          ? index * CONSTANTS.openStagger
          : (4 - 1 - index) * CONSTANTS.closeStagger,
      }}
      style={{
        width: CONSTANTS.itemSize,
        height: CONSTANTS.itemSize,
      }}
      className={`absolute flex items-center justify-center rounded-full border shadow-md cursor-pointer select-none outline-none focus:outline-none transition-colors duration-200 pointer-events-auto ${item.color}`}
      title={item.label}
    >
      {item.icon}

      {/* Hover tooltip - placed on the left side */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, x: -10, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.8 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1.5 text-xs font-semibold text-white bg-slate-950/90 border border-slate-800 rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-50 backdrop-blur-sm"
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
