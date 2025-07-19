export const projectsDone = [
  {
    title: "The Wild Oasis (Cabin Booking App)",
    description:
      "A full-stack hotel booking platform with both admin and customer interfaces. Built using React, Supabase, styled-components, and React Query.",
    tech: [
      "React",
      "Supabase",
      "Styled-components",
      "React Query",
      "React Router",
    ],
    link: "https://the-wild-oasis-website-cabins.vercel.app/",
    github: "https://github.com/Sudarshanhingalje/the-wild-oasis-website",
  },
  {
    title: "The Wild Oasis (Admin Dashboard)",
    description:
      "Admin panel for managing cabin bookings, users, and availability with charts and filters. Developed using React and Supabase.",
    tech: ["React", "Supabase", "React Query", "Styled-components"],
    link: "https://hotelthe-wild-oasis.netlify.app/",
    github: "https://github.com/Sudarshanhingalje/the-wild-oasis",
  },
  {
    title: "Fast React Pizza (Redux E-commerce)",
    description:
      "A modern pizza ordering app built with React and Redux Toolkit. Features real-time cart, checkout, and dynamic UI with Tailwind CSS.",
    tech: ["React", "Redux Toolkit", "Tailwind CSS"],
    link: "https://redux-fast-react-pizza.netlify.app/",
    github: "https://github.com/Sudarshanhingalje/fast-react-pizza",
  },
  {
    title: "ScrapSavvy - Waste Management System",
    description:
      "A collaborative scrap collection platform. Users can schedule pickups, vendors manage listings. Built using Firebase for backend.",
    tech: ["HTML", "CSS", "JavaScript", "Firebase"],
    link: "https://the-wild-oasis-website-cabins.vercel.app/", // fallback
    github: "https://github.com/ScrapSavvym24/ScrapSavvy_M24",
  },
  {
    title: "Pizza Delivery Application",
    description:
      "A full-featured pizza ordering system with real-time cart updates, authentication, Razorpay payment integration, and MongoDB database. Includes REST API, Axios, Redux, and React Router. Watch demo: https://youtu.be/ynnvcnA_rqg?si=MsRwBd-RGUaKEeX0",
    tech: [
      "React",
      "Redux",
      "React Router",
      "MongoDB",
      "Razorpay",
      "Axios",
      "REST API",
      "CSS",
    ],
    link: "https://pizza-delivery-application-rose.vercel.app/",
    github: "https://github.com/Sudarshanhingalje/Pizza-Delivery-Application",
  },
];
gsap.registerPlugin(Draggable, InertiaPlugin, Flip);

const items = gsap.utils.toArray(".item");
const bgs = gsap.utils.toArray(".bg1, .bg2, .bg3");
gsap.set([bgs[0], bgs[1]], { scale: 2, opacity: 0 });

const panal = document.querySelector(".content-body");
const cards = document.querySelector(".item-list");
const spacer = document.createElement("div");
let bgIndex = bgs.length - 1;
let itemIndex;

function activate(index) {
  if (!items[index]) {
    return;
  }
  let item = items[index],
    img = item.querySelector(".item-img"),
    description = item.querySelector(".item-description"),
    itemGetter = gsap.getProperty(item),
    state = Flip.getState([item, img, description], {
      props: "borderRadius,maxWidth,zIndex",
    });
  // swap a spacer <div> into the item's spot, matching its width/height/marginLeft/marginRight to avoid collapsing
  gsap.set(spacer, {
    width: itemGetter("width"),
    height: itemGetter("height"),
    marginLeft: itemGetter("marginLeft") + "px",
    marginRight: itemGetter("marginRight") + "px",
  });
  item.parentNode.insertBefore(spacer, item);
  panal.appendChild(item);
  item.classList.add("active");
  // do a Flip animation to make it appear as if it was in the prior state
  Flip.from(state, { duration: 0.5, ease: "power1.inOut", nested: true });
  itemIndex = index;
  setTimeout(() => item.addEventListener("click", deactivate), 100); // since we're calling this from within a click event handler, wait 100ms before listening for another one to avoid an immediate trigger.
}

function deactivate() {
  let item = items[itemIndex],
    img = item.querySelector(".item-img"),
    description = item.querySelector(".item-description"),
    state = Flip.getState([item, img, description], {
      props: "borderRadius,maxWidth",
    });
  spacer.parentNode.insertBefore(item, spacer);
  spacer.parentNode.removeChild(spacer);
  item.classList.remove("active");
  Flip.from(state, { duration: 0.5, ease: "power1.inOut", nested: true });
  itemIndex = null;
  item.removeEventListener("click", deactivate);
}

Draggable.create((panal, cards), {
  type: "x",
  edgeResistance: 0.5,
  snap: { x: [0, -360, -680] },
  zIndexBoost: false,
  onDragEnd: function () {
    let index = this.endX === 0 ? 2 : this.endX === -360 ? 1 : 0;
    gsap.to(bgs, {
      scale: (i) => (i === index ? 1 : 2),
      opacity: (i) => (i === index ? 1 : 0),
    });
  },
  onClick(e) {
    activate(items.indexOf(e.target.closest(".item")));
  },
  inertia: true,
  allowContextMenu: false,
  bounds: {
    minX: -cards.offsetWidth + panal.offsetWidth,
    maxX: 0,
  },
});
