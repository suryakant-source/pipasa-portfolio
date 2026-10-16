export interface NavLink {
  label: string;
  href: string;
}

export interface FactItem {
  label: string;
  value: string;
  icon: "user" | "film" | "map-pin" | "clock" | "sparkles" | "radio";
}

export interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  etchedWord: string;
  tint: "warm-beige" | "sage" | "cobalt" | "peach";
  bgColor: string;
  accentColor: string;
  platform: string;
  metric: string;
  secondaryMetric: string;
  quoteItalic: string;
  description: string;
  tags: string[];
  coverImage: string;
  linkUrl: string;
}

export interface ProcessStep {
  tab: "First" | "Then" | "Next" | "Finally";
  verb: string;
  italicPhrase: string;
  description: string;
  tags: string[];
  bgColor: string;
  tabAlign: "left" | "left-center" | "right-center" | "right";
}

export interface SocialLink {
  label: string;
  value: string;
  href: string;
  icon: "instagram" | "message-circle" | "download" | "mail";
}

export interface ContentData {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
    author: string;
  };
  navigation: {
    logoText: string;
    logoMark: string;
    links: NavLink[];
  };
  loader: {
    scriptName: string;
    role: string;
    footerNote: string;
  };
  hero: {
    eyebrow: string;
    greeting: string;
    nameLead: string;
    name: string;
    rolePrefix: string;
    role: string;
    bio: string;
    primaryCta: {
      label: string;
      href: string;
    };
    secondaryCta: {
      label: string;
      href: string;
    };
    badge: {
      serial: string;
      passType: string;
      status: string;
      name: string;
      role: string;
      photo: string;
      nfcLabel: string;
      brandMark: string;
    };
    scrollCue: string;
  };
  about: {
    sectionNumber: string;
    label: string;
    titleFirstWord: string;
    titleAccentWord: string;
    scannerBadge: {
      cornerTopLeft: string;
      cornerTopRight: string;
      cornerBottomLeft: string;
      cornerBottomRight: string;
      verifiedText: string;
    };
    headingFirstPart: string;
    headingAccentWord: string;
    paragraph: string;
    stampText: string;
    cta: {
      label: string;
      href: string;
    };
    facts: FactItem[];
  };
  work: {
    sectionNumber: string;
    label: string;
    titleFirstWord: string;
    titleAccentWord: string;
    hint: string;
    items: WorkItem[];
  };
  process: {
    sectionNumber: string;
    label: string;
    titleFirstWord: string;
    titleAccentWord: string;
    steps: ProcessStep[];
  };
  contact: {
    badgeTitle: string;
    name: string;
    role: string;
    headline: string;
    highlight: string;
    subtext: string;
    email: string;
    copiedNotice: string;
    qrPrompt: string;
    socials: SocialLink[];
    closingSignoff: string;
    copyright: string;
  };
}

export const content: ContentData = {
  meta: {
    title: "Pipasa [placeholder] — Content Creator & Creative Strategist",
    description:
      "Official portfolio of Pipasa [placeholder]. High-retention short-form video storytelling, brand campaigns, and creative strategy for modern brands.",
    siteUrl: "https://pipasa.portfolio.website [placeholder]",
    author: "Pipasa [placeholder]",
  },

  navigation: {
    logoText: "PIPASA",
    logoMark: "P.",
    links: [
      { label: "ABOUT", href: "#about" },
      { label: "CONTACT", href: "#contact" },
    ],
  },

  loader: {
    scriptName: "Pipasa",
    role: "content creator & strategist [placeholder]",
    footerNote: "Portfolio, 2026",
  },

  hero: {
    eyebrow: "-- PORTFOLIO / 2026",
    greeting: "Hello,",
    nameLead: "I'm ",
    name: "Pipasa,",
    rolePrefix: "a ",
    role: "content creator & strategist.",
    bio: "Crafting editorial short-form reels, cultural narratives, and viral visual stories that turn casual scrollers into loyal brand communities [placeholder].",
    primaryCta: {
      label: "START A PROJECT",
      href: "#contact",
    },
    secondaryCta: {
      label: "ABOUT PIPASA",
      href: "#about",
    },
    badge: {
      serial: "No 0001",
      passType: "Studio pass - 2026",
      status: "Available for work",
      name: "Pipasa [placeholder]",
      role: "CREATOR & STRATEGIST",
      photo: "/placeholder-portrait.jpg",
      nfcLabel: "NFC 2.4GHz",
      brandMark: "PIPASA STUDIO",
    },
    scrollCue: "SCROLL TO DISCOVER",
  },

  about: {
    sectionNumber: "01",
    label: "Identity check",
    titleFirstWord: "Identity",
    titleAccentWord: "check",
    scannerBadge: {
      cornerTopLeft: "IDENTITY CHECK",
      cornerTopRight: "No 0001",
      cornerBottomLeft: "ALIGNING",
      cornerBottomRight: "100%",
      verifiedText: "VERIFIED",
    },
    headingFirstPart: "Identity",
    headingAccentWord: "Verified.",
    paragraph:
      "Operating at the intersection of cultural taste and platform dynamics. Every piece is engineered with rhythmic pacing, organic product integration, and genuine visual charm [placeholder].",
    stampText: "VERIFIED CREATOR • 2026 • OFFICIAL STUDIO PASS • ",
    cta: {
      label: "EXPLORE SELECTED WORK",
      href: "#work",
    },
    facts: [
      { label: "NAME", value: "Pipasa [placeholder]", icon: "user" },
      { label: "ROLE", value: "Visual Creator & Strategist [placeholder]", icon: "film" },
      { label: "LOCATION", value: "Mumbai, India [placeholder]", icon: "map-pin" },
      { label: "EXPERIENCE", value: "4+ Years [placeholder]", icon: "clock" },
      { label: "SPECIALITY", value: "Reels & Aesthetic Storytelling [placeholder]", icon: "sparkles" },
      { label: "CURRENTLY", value: "Open for Q2/Q3 Brand Collaborations [placeholder]", icon: "radio" },
    ],
  },

  work: {
    sectionNumber: "02",
    label: "Case studies",
    titleFirstWord: "Selected",
    titleAccentWord: "work",
    hint: "Scroll or swipe to orbit through reels",
    items: [
      {
        id: "reel-01",
        title: "Midnight Solitude",
        subtitle: "Visual Poetry & Cinematic B-Roll",
        etchedWord: "SOLITUDE",
        tint: "warm-beige",
        bgColor: "#f7f1e8",
        accentColor: "#b87d4b",
        platform: "Instagram Reel",
        metric: "1.4M views [placeholder]",
        secondaryMetric: "142K saves [placeholder]",
        quoteItalic: "cinematic framing meets quiet contemplation",
        description:
          "An intimate after-dark narrative exploring urban solitude with anamorphic lens textures and organic soundscapes [placeholder].",
        tags: ["Cinematic", "4K Video", "Sound Design", "Lifestyle"],
        coverImage: "/work-1.jpg",
        linkUrl: "https://instagram.com/reel/[placeholder-1]",
      },
      {
        id: "reel-02",
        title: "Botanical Morning",
        subtitle: "Sustainable Living Brand Series",
        etchedWord: "BOTANICA",
        tint: "sage",
        bgColor: "#e3eae3",
        accentColor: "#416c4f",
        platform: "Brand Campaign",
        metric: "890K views [placeholder]",
        secondaryMetric: "19.2% share rate [placeholder]",
        quoteItalic: "seamless daily ritual integration",
        description:
          "Four-part organic living series spotlighting clean herbal formulations, driving a 3.8x surge in brand profile visits [placeholder].",
        tags: ["Product Storytelling", "Color Grading", "Aesthetic"],
        coverImage: "/work-2.jpg",
        linkUrl: "https://instagram.com/reel/[placeholder-2]",
      },
      {
        id: "reel-03",
        title: "Monochrome Rhythm",
        subtitle: "Editorial Streetwear Direction",
        etchedWord: "RHYTHM",
        tint: "cobalt",
        bgColor: "#e1e7f5",
        accentColor: "#1c3a94",
        platform: "Fashion Editorial",
        metric: "2.1M views [placeholder]",
        secondaryMetric: "320K likes [placeholder]",
        quoteItalic: "kinetic cuts synced to tempo",
        description:
          "High-cadence transition reel crafted for contemporary Indian streetwear, balancing raw street energy with editorial precision [placeholder].",
        tags: ["Fashion Film", "Beat Matching", "Audio Architecture"],
        coverImage: "/work-3.jpg",
        linkUrl: "https://instagram.com/reel/[placeholder-3]",
      },
      {
        id: "reel-04",
        title: "Golden Hour Glow",
        subtitle: "Luxury Skincare Demo & Review",
        etchedWord: "AURORA",
        tint: "peach",
        bgColor: "#fceee5",
        accentColor: "#bc5a32",
        platform: "Beauty Partnership",
        metric: "1.7M views [placeholder]",
        secondaryMetric: "94K saves [placeholder]",
        quoteItalic: "unfiltered macro textures in natural light",
        description:
          "Zero-filter direct sun demonstration highlighting radiant finish, generating the brand's top-converting seasonal asset [placeholder].",
        tags: ["Beauty", "Natural Lighting", "UGC Conversion"],
        coverImage: "/work-4.jpg",
        linkUrl: "https://instagram.com/reel/[placeholder-4]",
      },
    ],
  },

  process: {
    sectionNumber: "03",
    label: "Process",
    titleFirstWord: "How I",
    titleAccentWord: "work",
    steps: [
      {
        tab: "First",
        verb: "DISCOVER",
        italicPhrase: "unearthing the core tension",
        description:
          "Deconstructing audience psyche, trending cultural motifs, and sonic timing before filming a single frame [placeholder].",
        tags: ["Trend Research", "Creative Angle", "Hook Strategy"],
        bgColor: "#f8f5ee",
        tabAlign: "left",
      },
      {
        tab: "Then",
        verb: "SCRIPT",
        italicPhrase: "metered beats & visual pacing",
        description:
          "Engineering the critical 2-second hook and designing visual loops that naturally trigger repeat watches [placeholder].",
        tags: ["Micro-Copy", "Pacing Rhythm", "Retention Plan"],
        bgColor: "#e1e9e2",
        tabAlign: "left-center",
      },
      {
        tab: "Next",
        verb: "PRODUCE",
        italicPhrase: "deliberate tactile aesthetics",
        description:
          "Capturing cinematic natural light, rich Foley sound stems, and genuine human presence that cuts through algorithmic noise [placeholder].",
        tags: ["Direction", "Lighting Design", "Audio Capture"],
        bgColor: "#e1e7f2",
        tabAlign: "right-center",
      },
      {
        tab: "Finally",
        verb: "AMPLIFY",
        italicPhrase: "community resonance & conversion",
        description:
          "Deploying calibrated cover art, contextual copy, and active comment leadership to maximize initial reach velocity [placeholder].",
        tags: ["Distribution", "Comment Loops", "Analytics"],
        bgColor: "#f2e4da",
        tabAlign: "right",
      },
    ],
  },

  contact: {
    badgeTitle: "CONTACT No 0001",
    name: "PIPASA",
    role: "CREATOR • STRATEGIST • COLLABORATOR",
    headline: "Let's Build Something",
    highlight: "Beautiful.",
    subtext:
      "Available for selected brand campaigns, visual directing, and creative retainers for 2026. Reach out directly below [placeholder].",
    email: "hello.pipasa@studio.in [placeholder]",
    copiedNotice: "Email copied to clipboard!",
    qrPrompt: "Scan to connect instantly",
    socials: [
      {
        label: "INSTAGRAM",
        value: "@pipasa [placeholder]",
        href: "https://instagram.com/[placeholder]",
        icon: "instagram",
      },
      {
        label: "WHATSAPP",
        value: "+91 98765 43210 [placeholder]",
        href: "https://wa.me/919876543210?text=Hi%20Pipasa [placeholder]",
        icon: "message-circle",
      },
      {
        label: "MEDIA KIT",
        value: "Download 2026 Kit (PDF) [placeholder]",
        href: "#download-kit [placeholder]",
        icon: "download",
      },
    ],
    closingSignoff: "DESIGNED & ENGINEERED FOR DAYLIGHT • 2026",
    copyright: "© 2026 PIPASA. ALL RIGHTS RESERVED.",
  },
};
