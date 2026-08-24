import { EnvelopeIntro } from './components/EnvelopeIntro';
import { Hero } from './components/Hero';
import { Countdown } from './components/Countdown';
import { OurStory } from './components/OurStory';
import { EventDetails } from './components/EventDetails';
import { Timeline } from './components/Timeline';
import { Gallery } from './components/Gallery';
import { Rsvp } from './components/Rsvp';
import { Footer } from './components/Footer';
import { AudioControl } from './components/AudioControl';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#2B2421] font-sans selection:bg-[#C86D51] selection:text-[#FAF7F2]">
      {/* 0. Sealed Envelope Opening Intro Animation */}
      <EnvelopeIntro />

      {/* Background Floating Audio Button */}
      <AudioControl />


      <main className="relative w-full overflow-hidden">
        {/* 1. Hero Section — Full-screen looping video/photo, names, date, scroll indicator */}
        <Hero />

        {/* 2. Countdown Timer — Live countdown to the wedding */}
        <Countdown />

        {/* 3. Our Story — Short text block + couple portrait in warm earthy palette */}
        <OurStory />

        {/* 4. Event Details — Date, time, venue, Add to Calendar & Get Directions */}
        <EventDetails />

        {/* 5. Schedule / Timeline — Program itinerary with icons */}
        <Timeline />

        {/* 6. Photo Gallery — Grid layout with fullscreen Lightbox */}
        <Gallery />

        {/* 7. RSVP — Name, guests, attending, message with submission & storage */}
        <Rsvp />

        {/* 8. Footer — Thank you, couple names, and decorative illustration */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
