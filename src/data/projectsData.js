import genz1 from "../assets/images/genz/genz1.webp";
import genz2 from "../assets/images/genz/genz2.webp";
import genz3 from "../assets/images/genz/zenz3.webp";

import udupi1 from "../assets/images/udupi/udupi1.webp";
import udupi2 from "../assets/images/udupi/udupi2.webp";
import udupi3 from "../assets/images/udupi/udupi3.webp";

import portfolioImg from "../assets/images/portfolio_mockup.webp";
import taskManagerImg from "../assets/images/task_manager_mockup.webp";

export const projectsData = [
  {
    id: "genz-store",
    num: "01",
    title: "GENZ STORE",
    subtitle: "Online store & checkout",
    client: "Retail & Apparel",
    role: "Full-stack development",
    year: "2025",
    accent: "var(--brand-primary)",
    image: genz1,
    images: [genz1, genz2, genz3],
    summary:
      "A fast, modern online store with instant cart updates, secure Stripe card checkout, and product filters that respond in milliseconds.",
    deepDive:
      "Built to make online shopping effortless on phones and desktops. Items jump into the cart immediately without page reloads, while payments and order confirmations process smoothly in the background.",
    highlights: ["Stripe checkout", "Instant cart updates", "Real-time product filtering"],
    metrics: [
      { value: "Stripe", label: "Card checkout & webhooks" },
      { value: "Instant", label: "Cart updates without reload" },
      { value: "Fast", label: "Product filter & search" },
    ],
    stack: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Tailwind CSS"],
    liveUrl: "https://genz-store-seven.vercel.app/",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: true,
  },
  {
    id: "udupi-vrindavan",
    num: "02",
    title: "UDUPI VRINDAVAN",
    subtitle: "Table reservation system",
    client: "Restaurant & Hospitality",
    role: "Full-stack development",
    year: "2026",
    accent: "var(--brand-primary-deep)",
    image: udupi1,
    images: [udupi1, udupi2, udupi3],
    summary:
      "A live table booking system with interactive floor maps, automated text message confirmations, and host table management.",
    deepDive:
      "Engineered to end double-bookings during busy dinner rushes. Guests pick their preferred table on a live map, and the system instantly reserves it across all devices with instant SMS alerts.",
    highlights: ["Live table map", "Instant SMS alerts", "Real-time table updates"],
    metrics: [
      { value: "Live map", label: "Interactive table selection" },
      { value: "Twilio", label: "Instant SMS confirmations" },
      { value: "Real-time", label: "Multi-device reservation sync" },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Twilio SMS", "WebSockets"],
    liveUrl: "https://udupivrindavan.com",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: true,
  },
  {
    id: "portfolio-experience",
    num: "03",
    title: "PORTFOLIO EXPERIENCE",
    subtitle: "Creative designer portfolio",
    client: "Personal Brand",
    role: "Frontend & interaction",
    year: "2026",
    accent: "var(--brand-primary)",
    image: portfolioImg,
    images: [portfolioImg],
    summary:
      "A hand-crafted creative portfolio combining smooth scroll storytelling, custom micro-interactions, and responsive typography.",
    deepDive:
      "Created to showcase real projects with personality. Built with hardware-accelerated animations that stay buttery smooth on mobile screens without lagging.",
    highlights: ["Custom GSAP motion", "Fluid responsive typography", "Accessible micro-interactions"],
    metrics: [
      { value: "GSAP 3", label: "Pinned scroll & velocity tilt" },
      { value: "Fluid", label: "Type & layout scaling" },
      { value: "60fps", label: "Hardware-accelerated motion" },
    ],
    stack: ["React", "GSAP 3", "Vite", "Tailwind CSS"],
    liveUrl: "#home",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: false,
  },
  {
    id: "task-orchestrator",
    num: "04",
    title: "TASK ORCHESTRATOR PRO",
    subtitle: "Task manager & board",
    client: "Productivity Tool",
    role: "Frontend engineering",
    year: "2026",
    accent: "var(--brand-primary-deep)",
    image: taskManagerImg,
    images: [taskManagerImg],
    summary:
      "A clean drag-and-drop workspace for organizing projects, setting priority tags, and keeping to-do lists organized.",
    deepDive:
      "Designed for teams who want simplicity without complex onboarding. Tasks can be dragged across stages seamlessly, and work saves automatically even when offline.",
    highlights: ["Drag-and-drop workspace", "Offline auto-save", "Priority tagging"],
    metrics: [
      { value: "Kanban", label: "Drag & drop stage workflow" },
      { value: "Storage", label: "Offline client-side auto-save" },
      { value: "Zero lag", label: "Instant UI state updates" },
    ],
    stack: ["React", "Web Storage", "Tailwind CSS"],
    liveUrl: "https://github.com/raazkumar24/last",
    githubUrl: "https://github.com/raazkumar24/last",
    // task-orchestrator (jab tak deploy na ho)
    embeddable: false,
  },
];
