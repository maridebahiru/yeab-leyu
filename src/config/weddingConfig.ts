/**
 * WEDDING INVITATION CONFIGURATION
 * --------------------------------------------------------------------------
 * Edit this central file to customize all details, text, media, and venues.
 * Media files should be placed in the /public/assets/ folder.
 */

export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  icon: 'church' | 'camera' | 'cocktail' | 'dinner' | 'cake' | 'dance' | 'sparkler';
}

export interface GalleryMediaItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  caption: string;
}

export interface WeddingConfig {
  couple: {
    brideName: string;
    groomName: string;
    hashtag: string;
    monogram: string;
  };
  event: {
    date: string; // ISO format: YYYY-MM-DDTHH:mm:ss
    displayDate: string;
    displayTime: string;
    venueName: string;
    venueAddress: string;
    venueCity: string;
    googleMapsUrl: string;
    receptionTime: string;
  };
  story: {
    title: string;
    subtitle: string;
    paragraphs: string[];
    photo: string;
  };
  media: {
    heroVideo: string;
    heroImageFallback: string;
    storyPhoto: string;
    backgroundMusic: string;
  };
  schedule: ScheduleItem[];
  gallery: GalleryMediaItem[];
}

export const weddingConfig: WeddingConfig = {
  // =========================================================================
  // 1. COUPLE DETAILS
  // =========================================================================
  couple: {
    brideName: "Leyu",
    groomName: "Yeabsera",
    hashtag: "#YeabseraAndLeyu2026",
    monogram: "Y & L",
  },

  // =========================================================================
  // 2. EVENT DETAILS
  // =========================================================================
  event: {
    date: "2026-09-06T17:00:00+03:00", // September 6, 2026 at 5:00 PM
    displayDate: "Sunday, September 6, 2026",
    displayTime: "05:00 PM",
    receptionTime: "07:30 PM",
    venueName: "Hyatt Regency Addis Ababa",
    venueAddress: "Meskel Square, Addis Ababa, Ethiopia",
    venueCity: "Addis Ababa, Ethiopia",
    googleMapsUrl: "https://maps.google.com/?q=Hyatt+Regency+Addis+Ababa+Meskel+Square",
  },

  // =========================================================================
  // 3. OUR STORY SECTION
  // =========================================================================
  story: {
    title: "Our Love Story",
    subtitle: "Two Hearts, One Journey",
    paragraphs: [
      "In 2024, two separate paths crossed and something beautiful quietly began. What started as simple conversations turned into hours of shared laughter, understanding, and moments that neither of us wanted to end.",
      "Through adventures, quiet evenings, and supporting each other through every chapter, we found in one another a best friend, a partner, and a love we couldn't imagine living without.",
      "Now, surrounded by the love and blessings of our families and closest friends, we are thrilled to begin our greatest chapter yet: a lifetime together as one."
    ],
    photo: "/assets/photos/snaptik-app-7676491868703624455-slide-3.jpg",
  },

  // =========================================================================
  // 4. PRIMARY HERO & AUDIO MEDIA (Replace paths with your own files)
  // =========================================================================
  media: {
    heroVideo: "/assets/videos/snaptik_7676543468948294930_v3.mp4",
    heroImageFallback: "/assets/photos/snaptik-app-7676491868703624455-slide-1.jpg",
    storyPhoto: "/assets/photos/snaptik-app-7676491868703624455-slide-2.jpg",
    backgroundMusic: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=wedding-piano-romantic-112702.mp3",
  },

  // =========================================================================
  // 5. WEDDING DAY SCHEDULE / TIMELINE
  // =========================================================================
  schedule: [
    {
      time: "04:00 PM",
      title: "Guest Arrival",
      description: "Welcome refreshments & acoustic strings in the garden courtyard",
      icon: "cocktail"
    },
    {
      time: "05:00 PM",
      title: "Wedding Ceremony",
      description: "Exchange of sacred vows and matrimonial blessings",
      icon: "church"
    },
    {
      time: "06:30 PM",
      title: "Photography & Sunset Cocktails",
      description: "Golden hour portraits, signature drinks, and hors d'oeuvres",
      icon: "camera"
    },
    {
      time: "07:30 PM",
      title: "Grand Reception Entrance",
      description: "Welcoming the newlyweds to the Hyatt Regency Ballroom",
      icon: "sparkler"
    },
    {
      time: "08:00 PM",
      title: "Dinner & Toasts",
      description: "Curated dinner banquet and heartfelt speeches",
      icon: "dinner"
    },
    {
      time: "09:30 PM",
      title: "Cake Cutting & First Dance",
      description: "Sweet traditions followed by the romantic first dance",
      icon: "dance"
    },
    {
      time: "10:30 PM",
      title: "Celebration & Dancing",
      description: "Live music, DJ set, and an unforgettable night of celebration",
      icon: "sparkler"
    }
  ],

  // =========================================================================
  // 6. PHOTO & VIDEO GALLERY
  // =========================================================================
  gallery: [
    {
      id: "gal-1",
      title: "The Wedding Gown",
      type: "video",
      src: "/assets/videos/snaptik_7677249982218407186_v3.mp4",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-1.jpg",
      caption: "Bridal moment in custom Afom Design gown"
    },
    {
      id: "gal-2",
      title: "Cinematic Wedding Film",
      type: "video",
      src: "/assets/videos/snaptik_7676543468948294930_v3.mp4",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-2.jpg",
      caption: "Captured by Crown Wedding Films — Yeabsera & Leyu"
    },
    {
      id: "gal-3",
      title: "A Sweet Romantic Moment",
      type: "video",
      src: "/assets/videos/snaptik_7676497685595278610_v3.mp4",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-3.jpg",
      caption: "Intimate stolen glance and laughter"
    },
    {
      id: "gal-4",
      title: "Welcome to Wedding Season",
      type: "video",
      src: "/assets/videos/snaptik_7676154696888896775_v3.mp4",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-4.jpg",
      caption: "Bridal excitement and celebrations"
    },
    {
      id: "gal-5",
      title: "Timeless Portrait",
      type: "image",
      src: "/assets/photos/snaptik-app-7676491868703624455-slide-1.jpg",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-1.jpg",
      caption: "Pure elegance and beauty"
    },
    {
      id: "gal-6",
      title: "Standing Together",
      type: "image",
      src: "/assets/photos/snaptik-app-7676491868703624455-slide-2.jpg",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-2.jpg",
      caption: "At the threshold of our next chapter"
    },
    {
      id: "gal-7",
      title: "Golden Hour Glow",
      type: "image",
      src: "/assets/photos/snaptik-app-7676491868703624455-slide-5.jpg",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-5.jpg",
      caption: "Sunlit smiles and romantic bliss"
    },
    {
      id: "gal-8",
      title: "Blessed by Family",
      type: "image",
      src: "/assets/photos/snaptik-app-7676491868703624455-slide-6.jpg",
      thumbnail: "/assets/photos/snaptik-app-7676491868703624455-slide-6.jpg",
      caption: "Surrounded by love and celebration"
    }
  ]
};
