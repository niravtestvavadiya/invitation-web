// weddingData.ts — All wedding invitation content and types

export interface ScheduleItem {
  time: string;
  title: string;
  icon: string;
  desc: string;
}

export interface GalleryItem {
  src: string;
  alt: string;
}

export interface FamilySide {
  parents: string;
  side: string;
}

export interface Theme {
  name: string;
  bg: string;
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  muted: string;
  card: string;
  border: string;
  petalColors: string[];
}

export interface WeddingData {
  couple: {
    bride: string;
    groom: string;
    brideFullName: string;
    groomFullName: string;
    tagline: string;
    hashtag: string;
  };
  event: {
    date: string;
    time: string;
    venue: string;
    address: string;
    mapLink: string;
  };
  schedule: ScheduleItem[];
  gallery: GalleryItem[];
  rsvp: {
    email: string;
    phone: string;
    deadline: string;
  };
  message: string;
  families: {
    bride: FamilySide;
    groom: FamilySide;
  };
  themes: Record<string, Theme>;
}

const weddingData: WeddingData = {
  couple: {
    bride: "Priya",
    groom: "Arjun",
    brideFullName: "Priya Sharma",
    groomFullName: "Arjun Mehta",
    tagline: "Two souls, one eternal journey",
    hashtag: "#PriyaWedArjun2025",
  },
  event: {
    date: "Saturday, 14th February 2026",
    time: "6:30 PM onwards",
    venue: "The Grand Palace Banquet",
    address: "456 Marine Drive, Mumbai, Maharashtra 400001",
    mapLink: "https://maps.google.com",
  },
  schedule: [
    {
      time: "6:30 PM",
      title: "Guest Arrival & Welcome Drinks",
      icon: "🥂",
      desc: "Champagne reception at the garden terrace",
    },
    {
      time: "7:15 PM",
      title: "Baraat Procession",
      icon: "🎺",
      desc: "A grand welcome for the groom with music & dance",
    },
    {
      time: "7:45 PM",
      title: "Sacred Wedding Ceremony",
      icon: "🔥",
      desc: "The seven vows under the sacred mandap",
    },
    {
      time: "9:00 PM",
      title: "Couple's First Dance",
      icon: "💃",
      desc: "A magical moment to cherish forever",
    },
    {
      time: "9:30 PM",
      title: "Gala Dinner & Celebrations",
      icon: "🍽️",
      desc: "Fine dining with live music and performances",
    },
    {
      time: "11:30 PM",
      title: "Farewell & Grand Send-off",
      icon: "✨",
      desc: "End the night with sparklers and blessings",
    },
  ],
  gallery: [
    {
      src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
      alt: "Wedding couple",
    },
    {
      src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80",
      alt: "Floral decoration",
    },
    {
      src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
      alt: "Wedding rings",
    },
    {
      src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80",
      alt: "Wedding flowers",
    },
    {
      src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80",
      alt: "Bride portrait",
    },
    {
      src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80",
      alt: "Wedding celebration",
    },
  ],
  rsvp: {
    email: "rsvp@priyaarjunwedding.com",
    phone: "+91 98765 43210",
    deadline: "31st January 2026",
  },
  message:
    "With hearts full of joy and blessings from our families, we joyfully invite you to be a part of our most cherished celebration. Your presence will make our special day truly complete.",
  families: {
    bride: {
      parents: "Mr. Ramesh Sharma & Mrs. Sunita Sharma",
      side: "Bride's Family",
    },
    groom: {
      parents: "Mr. Vijay Mehta & Mrs. Kavita Mehta",
      side: "Groom's Family",
    },
  },
  themes: {
    blossom: {
      name: "Cherry Blossom",
      bg: "#fff6f8",
      primary: "#c2637a",
      secondary: "#e8a0b0",
      accent: "#f7dce3",
      text: "#3a1a22",
      muted: "#8a4d5c",
      card: "rgba(194,99,122,0.06)",
      border: "rgba(194,99,122,0.18)",
      petalColors: ["#f9c8d5", "#f5a8be", "#ee8faa", "#fddce6", "#e87ba0"],
    },
    rose: {
      name: "Rose Garden",
      bg: "#fef8f0",
      primary: "#b5621a",
      secondary: "#d4924a",
      accent: "#fbe8d0",
      text: "#2d1a08",
      muted: "#7a4a20",
      card: "rgba(181,98,26,0.06)",
      border: "rgba(181,98,26,0.18)",
      petalColors: ["#f9c89a", "#f0a060", "#e8855a", "#fde0c0", "#d97040"],
    },
    lavender: {
      name: "Lavender Fields",
      bg: "#f7f5ff",
      primary: "#6b52b8",
      secondary: "#9880d8",
      accent: "#e8e2fa",
      text: "#1e1540",
      muted: "#5040a0",
      card: "rgba(107,82,184,0.06)",
      border: "rgba(107,82,184,0.18)",
      petalColors: ["#c8b8f8", "#b0a0f0", "#a090e8", "#dcd4fc", "#9880e0"],
    },
    jasmine: {
      name: "Jasmine White",
      bg: "#fafaf5",
      primary: "#6a7c3a",
      secondary: "#8fa060",
      accent: "#eef0e0",
      text: "#1e2410",
      muted: "#4a5828",
      card: "rgba(106,124,58,0.06)",
      border: "rgba(106,124,58,0.18)",
      petalColors: ["#f2f2d8", "#e8e8b0", "#d4d880", "#f8f8e0", "#c8cc60"],
    },
    marigold: {
      name: "Marigold Festival",
      bg: "#fffbf0",
      primary: "#c08010",
      secondary: "#dca030",
      accent: "#fef3c8",
      text: "#2c1e00",
      muted: "#905e0a",
      card: "rgba(192,128,16,0.06)",
      border: "rgba(192,128,16,0.18)",
      petalColors: ["#fde068", "#f8c030", "#f0a020", "#fef0a0", "#e89010"],
    },
  },
};

export default weddingData;
