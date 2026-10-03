export const siteConfig = {
  name: "NEROSPACE DESIGNS",
  description: "Interior architecture, spatial planning and bespoke design for considered living.",
  url: "https://nerospace.designs",
  email: "nerospacedesigns@gmail.com",
  phone: "+234 704 823 6782",
  location: "The Carpenter, 6th Ave, Gwarinpa, Abuja, Federal Capital Territory",
  social: {
    instagram: "https://instagram.com/nerospacedesigns",
    pinterest: "https://pinterest.com/nerospacedesigns",
    whatsapp: "https://wa.me/2347048236782",
  },
  ogImage: "/og-image.jpg",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/process", label: "Process" },
  { href: "/contact", label: "Contact" },
];

export const services = [
  {
    id: "01",
    title: "CONSULTATION & SITE ASSESSMENT",
    description:
      "We begin with a thorough understanding of your space, lifestyle, and aspirations. Our initial consultation establishes the foundation for a design that is both functional and deeply personal.",
    image: "/images/services/consultation.jpg",
  },
  {
    id: "02",
    title: "INTERIOR DESIGN & SPACE PLANNING",
    description:
      "Through spatial analysis and thoughtful layouts, we craft environments that flow naturally. Every room is considered as part of a cohesive whole, balancing aesthetics with everyday usability.",
    image: "/images/services/space-planning.jpg",
  },
  {
    id: "03",
    title: "3D DESIGN & VISUALIZATION",
    description:
      "Before a single wall is moved, you will see your space come to life. Our photorealistic visualizations ensure complete clarity and confidence in the design direction.",
    image: "/images/services/3d-visualization.jpg",
  },
  {
    id: "04",
    title: "TECHNICAL DRAWINGS",
    description:
      "Precision in execution is non-negotiable. We produce detailed technical documentation that guides contractors and craftspeople to realize the design exactly as intended.",
    image: "/images/services/technical-drawings.jpg",
  },
  {
    id: "05",
    title: "FURNITURE & CUSTOM DESIGN",
    description:
      "From curated pieces to fully bespoke furniture, we source and design elements that are unique to your space. Each item is selected or created to enhance the overall narrative of the home.",
    image: "/images/services/furniture.jpg",
  },
];

export const projects = [
  {
    slug: "residence-ikoyi",
    title: "IKOYI RESIDENCE",
    location: "Lagos",
    category: "Residential",
    year: "2026",
    description:
      "A refined family home in Ikoyi featuring warm oak joinery, soft linen upholstery, and a curated art collection. Every material was selected for its tactile quality and ability to age gracefully.",
    images: [
      "/images/projects/ikoyi-1.jpg",
      "/images/projects/ikoyi-2.jpg",
      "/images/projects/ikoyi-3.jpg",
    ],
    aspectRatio: "aspect-[4/5]",
    secondaryImage: "/images/projects/ikoyi-2.jpg",
    details: {
      client: "Private Client",
      scope: "Full interior design, custom joinery, furniture procurement",
      duration: "8 months",
      materials: ["Oak", "Linen", "Brass", "Marble"],
    },
  },
  {
    slug: "apartment-victoria-island",
    title: "VICTORIA ISLAND APARTMENT",
    location: "Lagos",
    category: "Residential",
    year: "2025",
    description:
      "A modern apartment redesign that maximized natural light and created a serene retreat from city life. Neutral tones, clean lines, and carefully chosen textures define this space.",
    images: [
      "/images/projects/vi-1.jpg",
      "/images/projects/vi-2.jpg",
      "/images/projects/vi-3.jpg",
    ],
    aspectRatio: "aspect-[16/9]",
    secondaryImage: "/images/projects/vi-2.jpg",
    details: {
      client: "Private Client",
      scope: "Space planning, interior design, styling",
      duration: "5 months",
      materials: ["Pine", "Cotton", "Concrete", "Glass"],
    },
  },
  {
    slug: "office-marina",
    title: "MARINA OFFICE SUITE",
    location: "Lagos",
    category: "Commercial",
    year: "2025",
    description:
      "A creative workspace designed to inspire focus and collaboration. Warm timber meets industrial concrete, with flexible layouts that adapt to modern work styles.",
    images: [
      "/images/projects/marina-1.jpg",
      "/images/projects/marina-2.jpg",
      "/images/projects/marina-3.jpg",
    ],
    aspectRatio: "aspect-[3/4]",
    secondaryImage: "/images/projects/marina-2.jpg",
    details: {
      client: "Tech Startup",
      scope: "Office design, custom furniture, lighting design",
      duration: "6 months",
      materials: ["Walnut", "Steel", "Terrazzo", "Felt"],
    },
  },
  {
    slug: "penthouse-lekki",
    title: "LEKKI PENTHOUSE",
    location: "Lagos",
    category: "Residential",
    year: "2024",
    description:
      "A luxurious penthouse with panoramic views, featuring a muted material palette, custom kitchen cabinetry, and a spa-inspired master bathroom with natural stone finishes.",
    images: [
      "/images/projects/lekki-1.jpg",
      "/images/projects/lekki-2.jpg",
      "/images/projects/lekki-3.jpg",
    ],
    aspectRatio: "aspect-square",
    secondaryImage: "/images/projects/lekki-2.jpg",
    details: {
      client: "Private Client",
      scope: "Full interior architecture, bespoke joinery, smart home integration",
      duration: "10 months",
      materials: ["Travertine", "Oak", "Brass", "Wool"],
    },
  },
];

export const processSteps = [
  {
    id: "01",
    title: "DISCOVER",
    description:
      "We listen, observe, and ask the right questions. This phase is about understanding your needs, your lifestyle, and the unique character of your space.",
  },
  {
    id: "02",
    title: "DEFINE",
    description:
      "Ideas take shape. We establish the design direction, material palette, and spatial strategy that will guide the project forward.",
  },
  {
    id: "03",
    title: "DESIGN",
    description:
      "Concepts become detailed plans. From floor layouts to furniture specifications, every element is carefully considered and documented.",
  },
  {
    id: "04",
    title: "DELIVER",
    description:
      "The vision becomes reality. We oversee the execution, ensuring every detail is implemented to the highest standard.",
  },
];

export const testimonials = [
  {
    quote:
      "NEROSPACE UNDERSTOOD HOW WE WANTED THE SPACE TO FEEL BEFORE WE EVEN KNEW HOW TO DESCRIBE IT.",
    author: "CLIENT NAME",
    role: "Private Residence, Lagos",
  },
];

export const galleryImages = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
];
