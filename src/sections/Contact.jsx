// src/sections/Contact.jsx
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import useModernScrollReveal from "../hooks/useModernScrollReveal";

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
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE1,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE,
        import.meta.env.VITE_EMAILJS_TEMPLATE2,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      toast.success("Message sent successfully to Sudarshan!");
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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 text-black dark:text-white "
    >
      <div className="w-full max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight contact-heading">
            LET&apos;S WORK{" "}
            <span className="text-gray-500 block">TOGETHER</span>
          </h1>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-6 confim-form"
        >
          {/* Reason */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium mb-1">
              Reason
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
              autoComplete="reason"
              className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
            >
              <option value="">Select a reason</option>
              <option value="Job Opportunity">Job Opportunity</option>
              <option value="Collaborate with you">Collaborate with you</option>
              <option value="I liked your project">I liked your project</option>
              <option value="Freelance Project">Freelance Project</option>
              <option value="Just Saying Hi">Just Saying Hi</option>
            </select>
          </div>

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
                className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              autoComplete="tel"
              className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
              autoComplete="off"
              rows={5}
              className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 transition text-black font-semibold py-3 rounded"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
