// src/sections/Contact.jsx
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

// ✅ Import Footer here
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  useModernScrollReveal();
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    reason: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current.querySelector(".contact-heading"),
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await emailjs.sendForm(
        "service_ec6uvv4",
        "template_ifxi8iv",
        formRef.current,
        "2J7MxQtB47nOOr14W"
      );
      await emailjs.send(
        "service_ec6uvv4",
        "template_q4leu5r",
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "2J7MxQtB47nOOr14W"
      );

      toast.success("Message sent successfully to sudarshan!");
      setFormData({
        reason: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send failed:", error);
      toast.error("Oops! Something went wrong.");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 px-4 sm:px-6 lg:px-8 text-white"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight contact-heading">
            LET&apos;S WORK{" "}
            <span className="text-gray-500 block">TOGETHER</span>
          </h1>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 contact-form"
        >
          {/* form fields */}
          {/* (same as yours, not changed) */}
        </form>
      </div>

      {/* ✅ Render Footer component inline after contact form */}
      <Footer />
    </section>
  );
};

export default Contact;
