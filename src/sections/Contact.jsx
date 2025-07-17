import emailjs from "@emailjs/browser";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
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
      // 1. Send message to yourself
      await emailjs.sendForm(
        "service_xyz123", // ✅ Your EmailJS service ID
        "template_to_owner", // ✅ Template to send message to you
        formRef.current,
        "YOUR_PUBLIC_KEY" // ✅ Your EmailJS public key
      );

      // 2. Send auto-reply to the user
      await emailjs.send(
        "service_xyz123",
        "template_auto_reply", // ✅ Auto-reply template
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"
      );

      alert("Message sent successfully!");
      setFormData({
        reason: "",
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Email send failed:", error);
      alert("Oops! Something went wrong.");
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
          <h1 className="contact-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            LET&apos;S WORK{" "}
            <span className="text-gray-500 block">TOGETHER</span>
          </h1>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Reason</label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              required
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              name="message"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-3 rounded bg-neutral-900 border border-neutral-700 focus:outline-none"
            />
          </div>

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
