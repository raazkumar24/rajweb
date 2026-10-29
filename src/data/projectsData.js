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
    subtitle: "High-Volume Fashion E-Commerce",
    client: "Retail & Apparel",
    role: "Full-Stack Engineer & Architect",
    year: "2025",
    category: "Full-Stack E-Commerce",
    accent: "#C81D1D",
    image: genz1,
    images: [genz1, genz2, genz3],
    summary:
      "A fast, modern online store with instant cart updates, secure Stripe card checkout, and product filters that respond in milliseconds.",
    deepDive:
      "Built to make online shopping effortless on phones and desktops. Items jump into the cart immediately without page reloads, while payments and order confirmations process smoothly in the background.",
    problem:
      "Fashion e-commerce platforms struggle with high cart abandonment due to sluggish checkout experiences and full page reloads on every filter click. The client needed a lightning-fast storefront capable of sub-100ms interactions.",
    solution:
      "Engineered an optimistic client-side architecture using React and Tailwind with decoupled backend microservices in Express. Integrated Stripe checkout with webhook idempotency, resulting in zero double-charging and near-instant checkout completion.",
    highlights: ["Stripe Webhooks & Checkout", "Zero-Latency Optimistic Cart", "Real-Time Multi-Attribute Filtering"],
    metrics: [
      { value: "0.2s", label: "Average filter response time" },
      { value: "100%", label: "Stripe webhook idempotency" },
      { value: "99.8%", label: "Checkout completion rate" },
      { value: "60fps", label: "Fluid product drawer motion" },
    ],
    colorPalette: [
      { name: "Obsidian Black", hex: "#0E0E10", role: "Primary Canvas" },
      { name: "Electric Crimson", hex: "#E11D48", role: "CTA & Accents" },
      { name: "Pure Titanium", hex: "#FAFAFA", role: "Typography" },
      { name: "Muted Zinc", hex: "#71717A", role: "Borders & Meta" },
      { name: "Stripe Emerald", hex: "#10B981", role: "Success States" },
    ],
    architecture: [
      { title: "Optimistic State Management", desc: "Local cart mutation with server sync queue prevents UI freezes during peak sales." },
      { title: "Asynchronous Webhooks", desc: "Decoupled Stripe webhook listener ensures order receipts are dispatched even if network drops." },
      { title: "Edge Caching & CDN", desc: "Product thumbnails and media cached on Cloudflare Edge with WebP compression." },
    ],
    deliverables: ["Responsive Web Storefront", "Stripe Checkout Integration", "Admin Inventory Dashboard", "Webhook Event Bus"],
    stack: ["React", "Node.js", "MongoDB", "Express", "Stripe API", "Tailwind CSS"],
    liveUrl: "https://genz-store-seven.vercel.app/",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: true,
  },
  {
    id: "udupi-vrindavan",
    num: "02",
    title: "UDUPI VRINDAVAN",
    subtitle: "Real-Time Table Reservation System",
    client: "Hospitality & Dining",
    role: "Full-Stack Developer",
    year: "2026",
    category: "Real-Time Reservation Platform",
    accent: "#EA580C",
    image: udupi1,
    images: [udupi1, udupi2, udupi3],
    summary:
      "A live table booking system with interactive floor maps, automated text message confirmations, and host table management.",
    deepDive:
      "Engineered to end double-bookings during busy dinner rushes. Guests pick their preferred table on a live map, and the system instantly reserves it across all devices with instant SMS alerts.",
    problem:
      "During Friday evening rushes, manual phone reservations and paper charts caused 20% table over-allocation, frustrated walk-ins, and an average customer waiting delay of 35 minutes.",
    solution:
      "Built a WebSocket-synchronized visual floor planner where diners pick exact tables in real time. Backed by MongoDB transactions to guarantee atomic reservations, plus Twilio SMS automated instant booking confirmations.",
    highlights: ["Interactive SVG Floor Plan", "Real-Time WebSocket Sync", "Automated Twilio SMS Dispatches"],
    metrics: [
      { value: "0", label: "Double-bookings recorded post-launch" },
      { value: "< 1s", label: "Multi-screen table sync delay" },
      { value: "98%", label: "SMS delivery success rate" },
      { value: "-45%", label: "Host stand front-desk congestion" },
    ],
    colorPalette: [
      { name: "Deep Charcoal", hex: "#18181B", role: "Primary Canvas" },
      { name: "Saffron Ochre", hex: "#EA580C", role: "Accent & Status" },
      { name: "Warm Ivory", hex: "#FDFBF7", role: "Card Surface" },
      { name: "Cardamom Gold", hex: "#D97706", role: "Table Active" },
      { name: "Forest Moss", hex: "#15803D", role: "Confirmed Status" },
    ],
    architecture: [
      { title: "WebSocket Event Loop", desc: "Bi-directional socket connections propagate floor status across all customer & host screens in <50ms." },
      { title: "Atomic Locking Transactions", desc: "MongoDB multi-document transactions ensure a table can never be claimed by two sessions concurrently." },
      { title: "Twilio Notification Queue", desc: "Queued SMS dispatcher with exponential backoff guarantees reservation codes are received instantly." },
    ],
    deliverables: ["Interactive Table Map", "Host Stand Management Console", "Automated SMS Alert System", "Customer Self-Booking Portal"],
    stack: ["React", "Node.js", "Express", "MongoDB", "Twilio SMS", "WebSockets"],
    liveUrl: "https://udupivrindavan.com",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: true,
  },
  {
    id: "ai-tutor-vision",
    num: "03",
    title: "AI TUTOR VISION",
    subtitle: "AI-Powered Computer Vision Learning Platform",
    client: "EdTech & Machine Learning",
    role: "Full-Stack & Computer Vision Engineer",
    year: "2026",
    category: "AI & Computer Vision",
    accent: "#C81D1D",
    image: portfolioImg,
    images: [portfolioImg],
    summary:
      "An intelligent interactive learning assistant with real-time pose tracking, dynamic feedback, and automated performance diagnostics.",
    deepDive:
      "Built with high-frequency WebAssembly-accelerated computer vision pipelines. Analyzes student interaction and delivers millisecond-level feedback loops.",
    problem:
      "Traditional remote learning lack real-time feedback and dynamic engagement, leading to steep drop-off rates and passive consumption.",
    solution:
      "Implemented a low-latency client-side inference pipeline with WebAssembly and WebGL, coupled with FastAPI microservices and responsive dashboards.",
    highlights: ["Real-time Computer Vision Inference", "Hardware-Accelerated WebGL Visuals", "Low-Latency WebSocket Streaming"],
    metrics: [
      { value: "30fps", label: "Real-time client inference rate" },
      { value: "< 40ms", label: "End-to-end feedback latency" },
      { value: "94%", label: "Student retention benchmark" },
      { value: "100%", label: "Browser WebAssembly compatibility" },
    ],
    colorPalette: [
      { name: "Obsidian Core", hex: "#0E1015", role: "Primary Canvas" },
      { name: "Crimson Voltage", hex: "#C81D1D", role: "Alerts & Highlights" },
      { name: "Cyan Neural", hex: "#06B6D4", role: "Vision Tracker" },
      { name: "Pure Titanium", hex: "#F8FAFC", role: "Typography" },
      { name: "Deep Slate", hex: "#334155", role: "Card Borders" },
    ],
    architecture: [
      { title: "Client Inference Pipeline", desc: "Runs quantized ONNX models in WebAssembly for zero-server-cost real-time tracking." },
      { title: "FastAPI Event Stream", desc: "Streaming SSE endpoints deliver contextual insights during learning sessions." },
      { title: "WebGL Shader Overlays", desc: "Low-overhead canvas rendering without dropping UI frames." },
    ],
    deliverables: ["Interactive Vision App", "Teacher Dashboard", "Real-time Telemetry Service", "Quantized Model Pipeline"],
    stack: ["React", "FastAPI", "Python", "OpenCV", "Tailwind CSS"],
    liveUrl: "https://github.com/raazkumar24/last",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: false,
  },
  {
    id: "gsap-portfolio",
    num: "04",
    title: "GSAP PORTFOLIO",
    subtitle: "High-Performance Creative Developer Portfolio",
    client: "Personal Brand / Raj Shekhar",
    role: "Creative Technologist & UI Engineer",
    year: "2026",
    category: "Interactive Brand Experience",
    accent: "#C81D1D",
    image: taskManagerImg,
    images: [taskManagerImg],
    summary:
      "A hand-crafted creative portfolio combining buttery GSAP timeline storytelling, custom micro-interactions, and responsive typography.",
    deepDive:
      "Created to showcase real projects with personality. Built with hardware-accelerated animations that stay buttery smooth on mobile screens without lagging.",
    problem:
      "Standard developer portfolios feel cookie-cutter and sterile, failing to reflect creative flair, architectural rigor, and modern brutalist design principles.",
    solution:
      "Developed a custom editorial layout with dual-theme toggling (Crimson 01 vs Concrete 02), seeded torn-paper canvas shaders, magnetic floating tech tags, and custom inertial cursor physics.",
    highlights: ["Seeded Torn-Paper Shader", "Dual Brutalist Theme System", "Lenis Smooth Scroll & Magnetic Inertia"],
    metrics: [
      { value: "60fps", label: "Hardware-accelerated animations" },
      { value: "98+", label: "Lighthouse performance score" },
      { value: "2", label: "Custom brutalist visual themes" },
      { value: "0ms", label: "Zero-CLS layout stability" },
    ],
    colorPalette: [
      { name: "Crimson Red", hex: "#C81D1D", role: "Brand Core & Lines" },
      { name: "Concrete Cream", hex: "#E4E2DD", role: "Light Canvas" },
      { name: "Void Charcoal", hex: "#141414", role: "Footer & Dark Mode" },
      { name: "Paper Ivory", hex: "#FAF8F5", role: "Body Background" },
      { name: "Exposed Wireframe", hex: "#FFFFFF", role: "Hollow Typography" },
    ],
    architecture: [
      { title: "Custom SVG Dilation Filters", desc: "Uses feMorphology to render crisp hollow wireframe typography without overlap glitches." },
      { title: "Seeded Mulberry32 PRNG", desc: "Generates deterministic torn paper jagged edges for pixel-perfect render consistency across refreshes." },
      { title: "Dynamic Geometry Routing", desc: "Measures timeline anchors dynamically with ResizeObserver to recalculate connecting dashed paths on the fly." },
    ],
    deliverables: ["Editorial Portfolio Site", "Custom Cursor Physics", "Interactive Toolkit Grid", "Brutalist Case Study Viewer"],
    stack: ["GSAP", "Three.js", "React", "Lenis", "Tailwind CSS"],
    liveUrl: "https://github.com/raazkumar24/last",
    githubUrl: "https://github.com/raazkumar24/last",
    embeddable: false,
  },
];
