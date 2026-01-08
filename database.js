// Local Database - Will be replaced with PocketBase later
export const db = {
  // Site Settings
  settings: {
    brandName: "VAACA",
    brandSlogan: "Industrial Alliance",
    brandIcon: "/logo.svg",
    hotlineDisplay: "039.515.4927",
    hotlineUrl: "tel:0395154927",
    headerCtaText: "NHẬN BÁO GIÁ",
    headerCtaLink: "#contact",
    socialLinks: {
      linkedin: "#",
      facebook: "#",
      youtube: "#",
    }
  },

  // Hero Section
  hero: {
    badge: "Vietnam Advanced Aerospace & Components Alliance",
    titleLine1: "Precision Manufacturing &",
    titleHighlight: "Advanced Supply Chain",
    titleLine3: "Partner from Vietnam.",
    description: "VAACA is a pioneering Vietnamese company specializing in high-precision manufacturing, advanced machining, and integrated supply chain solutions for global OEMs.",
    btnPrimaryText: "EXPLORE CAPABILITIES",
    btnPrimaryLink: "#capabilities",
    btnSecondaryText: "SUPPLY CHAIN",
    btnSecondaryLink: "#supply-chain",
    backgroundImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop",
  },

  // Trust Indicators (Client Logos)
  clients: [
    { name: "BOEING", logo: "/clients/boeing.svg" },
    { name: "SAFRAN", logo: "/clients/safran.svg" },
    { name: "AIRBUS", logo: "/clients/airbus.svg" },
    { name: "COLLINS", logo: "/clients/collins.svg" },
    { name: "BRP", logo: "/clients/brp.svg" },
    { name: "HONDA", logo: "/clients/honda.svg" },
    { name: "VINFAST", logo: "/clients/vinfast.svg" },
    { name: "SUZUKI", logo: "/clients/suzuki.svg" },
  ],

  // Capabilities Section
  capabilities: {
    subtitle: "Core Competencies",
    title: "Manufacturing Capabilities",
    description: "We combine state-of-the-art technology with skilled craftsmanship to deliver critical components.",
    items: [
      {
        id: 1,
        icon: "precision",
        title: "Precision Manufacturing",
        description: "High-precision CNC machining for complex aerospace and automotive components.",
        features: [
          "5-Axis CNC Machining",
          "Metal & Composite Materials",
          "Micron-level Tolerance"
        ],
        spec: "TOL: +/- 0.002mm"
      },
      {
        id: 2,
        icon: "assembly",
        title: "Advanced Assembly",
        description: "Full-spectrum assembly services from sub-modules to complete mechanical units.",
        features: [
          "Module Integration",
          "Box-build Assembly",
          "Digital Traceability"
        ],
        spec: "AS9100 REV D"
      },
      {
        id: 3,
        icon: "engineering",
        title: "Engineering & DFM",
        description: "Engineering support to optimize manufacturing processes and reduce costs.",
        features: [
          "DFM / DFA Consulting",
          "Process Optimization",
          "Rapid Prototyping"
        ],
        spec: "CATIA / NX"
      }
    ]
  },

  // Industries Section
  industries: {
    subtitle: "Sectors We Serve",
    title: "Industry Applications",
    items: [
      {
        id: 1,
        icon: "aerospace",
        title: "Aerospace & Defense",
        subtitle: "AS9100 Certified",
        description: "We supply critical components for commercial aircraft engines, landing gear systems, and interior structural parts.",
        applications: [
          "Turbine Blades",
          "Landing Gear Parts",
          "Structural Brackets"
        ],
        image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2670&auto=format&fit=crop"
      },
      {
        id: 2,
        icon: "automotive",
        title: "Automotive & EV",
        subtitle: "IATF 16949 Standards",
        description: "Supporting the transition to Electric Vehicles with lightweight aluminum components and high-precision motor housings.",
        applications: [
          "EV Motor Housings",
          "Transmission Shafts",
          "Battery Enclosures"
        ],
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2670&auto=format&fit=crop"
      },
      {
        id: 3,
        icon: "medical",
        title: "Medical Devices",
        subtitle: "ISO 13485 Compliance",
        description: "Manufacturing surgical instruments and orthopedic implants using medical-grade Titanium and Stainless Steel.",
        applications: [
          "Surgical Instruments",
          "Orthopedic Implants",
          "Diagnostic Equipment"
        ],
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2680&auto=format&fit=crop"
      }
    ]
  },

  // Supply Chain Section
  supplyChain: {
    subtitle: "Beyond Manufacturing",
    titleLine1: "We Orchestrate the",
    titleLine2: "Global Supply Chain",
    description: "VAACA provides not just parts, but a complete ecosystem. We manage the complexity of sourcing, auditing, and logistics so you don't have to.",
    steps: [
      {
        id: 1,
        icon: "search",
        title: "Supplier Assessment",
        description: "Rigorous evaluation of sub-tier suppliers."
      },
      {
        id: 2,
        icon: "audit",
        title: "Process Audits",
        description: "On-site verification of manufacturing protocols."
      },
      {
        id: 3,
        icon: "risk",
        title: "Risk Management",
        description: "Proactive identification of supply bottlenecks."
      },
      {
        id: 4,
        icon: "trace",
        title: "Digital Traceability",
        description: "Full lifecycle tracking from raw material to finish."
      }
    ],
    stats: [
      { value: "99.8", unit: "%", label: "On-Time Delivery" },
      { value: "50", unit: "PPM", prefix: "< ", label: "Defect Rate" },
      { value: "24", unit: "/7", label: "Production Cycle" },
      { value: "Tier-1", unit: "", label: "Supplier Status" }
    ]
  },

  // Footer
  footer: {
    description: "Precision Manufacturing & Advanced Supply Chain Partner from Vietnam.",
    address: "Lot C4, High-Tech Park,\nHo Chi Minh City, Vietnam.",
    email: "info@vaaca.com",
    phone: "+84 39 515 4927",
    copyright: "© 2024 VAACA. All rights reserved.",
    links: {
      explore: [
        { label: "Home", href: "#hero" },
        { label: "Capabilities", href: "#capabilities" },
        { label: "Industries", href: "#industries" },
        { label: "Supply Chain", href: "#supply-chain" },
      ],
      capabilities: [
        { label: "CNC Precision", href: "#" },
        { label: "Advanced Assembly", href: "#" },
        { label: "Quality Assurance", href: "#" },
      ]
    }
  }
};

export default db;
