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
    tagline: string;
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
    title: "Pipasa — Social Media Manager & Content Creator",
    description:
      "I plan, shoot and edit content that makes brands easy to remember and easy to say yes to. Reels, stories, captions, and the community behind them.",
    siteUrl: "https://pipasa.portfolio.website [placeholder]",
    author: "Pipasa",
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
    role: "social media manager & content creator",
    footerNote: "Portfolio, 2026",
  },

  hero: {
    eyebrow: "-- PORTFOLIO / 2026",
    greeting: "Hello,",
    nameLead: "I'm ",
    name: "Pipasa,",
    rolePrefix: "a ",
    role: "social media manager & content creator.",
    tagline: "I turn scrolls into customers.",
    bio: "I plan, shoot and edit content that makes brands easy to remember and easy to say yes to. Reels, stories, captions, and the community behind them.",
    primaryCta: {
      label: "MESSAGE ON WHATSAPP",
      href: "https://wa.me/916371151811",
    },
    secondaryCta: {
      label: "ABOUT PIPASA",
      href: "#about",
    },
    badge: {
      serial: "No 0001",
      passType: "Studio pass - 2026",
      status: "Available for work",
      name: "Pipasa",
      role: "SOCIAL MEDIA MANAGER & CREATOR",
      photo: "/pipasa.png",
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
      "I turn scrolls into customers. Operating at the intersection of cultural taste and platform dynamics. Every piece is engineered with rhythmic pacing, organic product integration, and genuine visual charm [placeholder].",
    stampText: "VERIFIED CREATOR • 2026 • OFFICIAL STUDIO PASS • ",
    cta: {
      label: "EXPLORE SELECTED WORK",
      href: "#work",
    },
    facts: [
      { label: "NAME", value: "Pipasa", icon: "user" },
      { label: "ROLE", value: "Social Media Manager & Content Creator", icon: "film" },
      { label: "LOCATION", value: "India [placeholder]", icon: "map-pin" },
      { label: "EXPERIENCE", value: "[placeholder]", icon: "clock" },
      { label: "SPECIALITY", value: "Reels, Stories, Captions & Community", icon: "sparkles" },
      { label: "CURRENTLY", value: "Available for Projects & Retainers", icon: "radio" },
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
        metric: "[placeholder]",
        secondaryMetric: "[placeholder]",
        quoteItalic: "cinematic framing meets quiet contemplation",
        description:
          "An intimate after-dark narrative exploring urban solitude with anamorphic lens textures and organic soundscapes [placeholder].",
        tags: ["Reels", "Visual Poetry", "Captions", "Audio Design"],
        coverImage: "/work-1.jpg",
        linkUrl: "https://www.instagram.com/pipashha/",
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
        metric: "[placeholder]",
        secondaryMetric: "[placeholder]",
        quoteItalic: "seamless daily ritual integration",
        description:
          "Four-part organic living series spotlighting clean herbal formulations, driving repeat engagement across stories and reels [placeholder].",
        tags: ["Product Storytelling", "Brand Aesthetic", "Retention"],
        coverImage: "/work-2.jpg",
        linkUrl: "https://www.instagram.com/pipashha/",
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
        metric: "[placeholder]",
        secondaryMetric: "[placeholder]",
        quoteItalic: "kinetic cuts synced to tempo",
        description:
          "High-cadence transition reel crafted for contemporary streetwear, balancing raw street energy with editorial precision [placeholder].",
        tags: ["Pacing", "Beat Matching", "Community Growth"],
        coverImage: "/work-3.jpg",
        linkUrl: "https://www.instagram.com/pipashha/",
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
        metric: "[placeholder]",
        secondaryMetric: "[placeholder]",
        quoteItalic: "unfiltered macro textures in natural light",
        description:
          "Zero-filter direct sun demonstration highlighting radiant finish, creating high-intent conversations in the comment section [placeholder].",
        tags: ["UGC Direct", "Conversion", "Authenticity"],
        coverImage: "/work-4.jpg",
        linkUrl: "https://www.instagram.com/pipashha/",
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
        italicPhrase: "unearthing the core brand tension",
        description:
          "Deconstructing audience psyche, trending cultural motifs, and sonic timing before filming a single frame [placeholder].",
        tags: ["Strategy", "Hooks", "Audience Psyche"],
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
        tags: ["Shooting", "Editing", "Color & Audio"],
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
    role: "SOCIAL MEDIA MANAGER • CREATOR",
    headline: "Have a brand that needs to be seen?",
    highlight: "Let's talk.",
    subtext:
      "I plan, shoot and edit content that makes brands easy to remember and easy to say yes to. Reach out directly below.",
    email: "hello.pipasa@studio.in [placeholder]",
    copiedNotice: "Email copied to clipboard!",
    qrPrompt: "Scan to connect on WhatsApp",
    socials: [
      {
        label: "WHATSAPP",
        value: "+91 63711 51811",
        href: "https://wa.me/916371151811",
        icon: "message-circle",
      },
      {
        label: "INSTAGRAM",
        value: "@pipashha",
        href: "https://www.instagram.com/pipashha/",
        icon: "instagram",
      },
      {
        label: "MEDIA KIT",
        value: "Download Media Kit (PDF) [placeholder]",
        href: "#download-kit",
        icon: "download",
      },
    ],
    closingSignoff: "DESIGNED & ENGINEERED FOR DAYLIGHT • 2026",
    copyright: "© 2026 PIPASA. ALL RIGHTS RESERVED.",
  },
};
