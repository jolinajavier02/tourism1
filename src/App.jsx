import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, ChevronLeft, ChevronRight, MapPin, Star, Calendar, 
  Clock, Compass, Shield, Award, Users, Heart, ArrowRight, Plane, 
  Train, Hotel, Filter, Utensils, Sparkles, BookOpen, Coffee, Music, 
  Search, Globe, ChevronDown, Check, Info, ArrowUpRight, DollarSign
} from 'lucide-react';
import './App.css';

// Slide categories matching user requests
const slides = [
  {
    id: 'cover',
    category: 'Cover',
    location: 'Pratik Patil - Maharashtra India',
    title: 'VALLEY GREEN HILLS',
    subtitle: 'Malshej Ghat',
    description: 'Diwanpada is a scenic, offbeat village in the Malshej Ghat region of Maharashtra, India, famed for the majestic Kalu Waterfall. During the monsoon season, the landscape transforms into a vibrant paradise with lush, green valleys, rolling misty hills, cascading waterfalls, and dramatic, cloud-filled skies.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-scenic-view-of-a-mountain-river-and-forest-42220-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    link: '#/'
  },
  {
    id: 'destinations',
    category: 'Destinations',
    location: 'Rudra Gupta - Rishikesh India',
    title: 'ARIEL TOWN VIEW',
    subtitle: 'Sacred Himalayan Valleys',
    description: 'Rishikesh, nestled in the foothills of the grand Himalayas beside the Ganges River, is renowned globally as the capital of yoga and meditation. The town offers a stunning aerial panorama of forested hills, holy temples, and suspension bridges spanning the turquoise waters of the sacred river.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-beautiful-aerial-shot-of-a-green-mountain-41527-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    link: '#/destinations'
  },
  {
    id: 'tours',
    category: 'Tours',
    location: 'Daniel Joshua - Kovalam Beach India',
    title: 'SEASHORE GOLDEN HOUR',
    subtitle: 'Tropical Paradise Coastlines',
    description: 'Experience the magic of Kerala’s coastal serenity. Watch the sunset paint the sky in deep shades of gold, saffron, and purple over the warm Arabian Sea. Shimmering sands, swaying coconut palms, and gentle surf make Kovalam one of the most iconic seaside escapes in Southern India.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-beach-with-turquoise-water-43343-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1547983699-121697287625?auto=format&fit=crop&w=600&q=80',
    link: '#/tours'
  },
  {
    id: 'accommodation',
    category: 'Accommodation',
    location: 'Curated Luxury - Varanasi India',
    title: 'BOAT PARKED GANGA RIVER',
    subtitle: 'Sacred Waterside Heritage',
    description: 'Witness the spiritual heart of India along the ancient ghats of Varanasi. In the early morning mist, wooden boats rest quietly against the backdrop of historic palaces and temples, as the gentle currents of the sacred Ganges whisper stories of three thousand years of continuous heritage.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-and-palm-trees-31299-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1561361046-c22208a2df5f?auto=format&fit=crop&w=600&q=80',
    link: '#/booking'
  },
  {
    id: 'booking',
    category: 'Booking',
    location: 'Royal Escapes - Rajasthan India',
    title: 'PALACE ROYAL HERITAGE',
    subtitle: 'Splendors of Maharajas Land',
    description: 'Plan your ultimate journey into the land of regal luxury. Book exclusive packages at palace hotels, heritage properties, luxury eco-lodges, and desert camps. Experience personalized royal hospitality, curated culinary journeys, and guided private safaris.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-driving-in-the-mountains-under-a-clear-blue-sky-40019-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1598977123418-45f04b6140ba?auto=format&fit=crop&w=600&q=80',
    link: '#/booking'
  },
  {
    id: 'foods',
    category: 'Foods',
    location: 'Spices Trail - Old Delhi India',
    title: 'TRADITIONAL SPICY FEASTS',
    subtitle: 'Regional Gastronomic Map',
    description: 'Embark on a culinary odyssey through India’s rich gastronomic map. From the fiery, flavorful street food stalls of Old Delhi to aromatic slow-cooked biryanis and coastal seafood curries, Indian cuisine is an explosion of hand-ground spices, heritage recipes, and textures.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-pouring-tea-from-a-kettle-into-a-cup-43105-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80',
    link: '#/foods'
  },
  {
    id: 'tradition',
    category: 'Tradition',
    location: 'Cultural Beats - Kerala India',
    title: 'FESTIVALS & ROYAL RITUALS',
    subtitle: 'Vibrant Colors of Heritage',
    description: 'Immerse yourself in the soulful traditions of India. Experience the spectacular Kathakali dance, the thunderous beats of temple drums, the colorful expressions of Holi, and the spiritual radiance of Diwali. Explore a culture where ancient rituals thrive seamlessly in modern times.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-woman-dancing-in-traditional-dress-41617-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80',
    link: '#/tradition'
  }
];

  const districtList = [
    'Ahilyanagar',
    'Akola',
    'Amravati',
    'Beed',
    'Bhandara',
    'Buldhana',
    'Chandrapur',
    'Chh. Sambhaji Nagar',
    'Dharashiv',
    'Dhule',
    'Gadchiroli',
    'Gondia',
    'Hingoli',
    'Jalgaon',
    'Jalna',
    'Kolhapur',
    'Latur',
    'Madha',
    'Mumbai City',
    'Mumbai Suburban',
    'Nagpur',
    'Nanded',
    'Nandurbar',
    'Nashik',
    'Palghar',
    'Parbhani',
    'Pune',
    'Raigad',
    'Ratnagiri',
    'Sangli',
    'Satara',
    'Sindhudurg',
    'Solapur',
    'Thane',
    'Wardha',
    'Washim',
    'Yavatmal'
  ];
  { id: 1, title: 'Taj Mahal, Agra', state: 'Uttar Pradesh', region: 'North', category: 'Heritage', rating: 4.9, reviews: 45200, price: 45, img: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80', desc: 'The world\'s most famous monument of love, built in stunning white marble along the Yamuna River.' },
  { id: 2, title: 'Munnar Tea Hills', state: 'Kerala', region: 'South', category: 'Nature', rating: 4.8, reviews: 12400, price: 30, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', desc: 'Rolling tea gardens, pristine mist, and exotic flora nestled in the Western Ghats of Southern India.' },
  { id: 3, title: 'Hampi Ruins', state: 'Karnataka', region: 'South', category: 'Heritage', rating: 4.9, reviews: 9800, price: 35, img: 'https://images.unsplash.com/photo-1600100397608-f010e42ed182?auto=format&fit=crop&w=600&q=80', desc: 'An awe-inspiring open-air museum showcasing the grand ruins of the historic Vijayanagara Empire.' },
  { id: 4, title: 'Leh Ladakh Passes', state: 'Jammu & Kashmir', region: 'North', category: 'Adventure', rating: 4.9, reviews: 8500, price: 80, img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80', desc: 'Rugged mountains, deep blue high-altitude lakes, and some of the world\'s highest motorable passes.' },
  { id: 5, title: 'Jaisalmer Desert Dunes', state: 'Rajasthan', region: 'West', category: 'Adventure', rating: 4.7, reviews: 7100, price: 50, img: 'https://images.unsplash.com/photo-1598977123418-45f04b6140ba?auto=format&fit=crop&w=600&q=80', desc: 'Golden sandstone forts, desert safaris under starry skies, and rich Rajasthani traditional performances.' },
  { id: 6, title: 'Sundarbans Mangrove', state: 'West Bengal', region: 'East', category: 'Nature', rating: 4.6, reviews: 5400, price: 40, img: 'https://images.unsplash.com/photo-1561361046-c22208a2df5f?auto=format&fit=crop&w=600&q=80', desc: 'The largest mangrove forest in the world, home to the elusive Royal Bengal Tiger.' }
];

const mockTours = [
  {
    id: 1,
    title: 'Golden Triangle & Royal Rajasthan Tour',
    duration: '8 Days',
    price: '$799',
    rating: '4.9',
    category: 'Heritage & Culture',
    highlights: ['Agra Taj Mahal Sunrise Guided Tour', 'Jaipur Amer Fort Elephant Ride Experience', 'Delhi Chandni Chowk Food Crawl', 'Jodhpur Golden Palace Homestay'],
    img: 'https://images.unsplash.com/photo-1598977123418-45f04b6140ba?auto=format&fit=crop&w=600&q=80',
    date: 'Starting 12 June, 2026'
  },
  {
    id: 2,
    title: 'Kerala Backwaters & Tropical Coastline',
    duration: '6 Days',
    price: '$599',
    rating: '4.8',
    category: 'Nature & Wellness',
    highlights: ['Overnight Luxury Houseboat Cruise', 'Kathakali Traditional Dance Performance', 'Munnar Organic Tea Garden Walk', 'Kovalam Beach Yoga Session'],
    img: 'https://images.unsplash.com/photo-1547983699-121697287625?auto=format&fit=crop&w=600&q=80',
    date: 'Starting 20 June, 2026'
  },
  {
    id: 3,
    title: 'Himalayan Spiritual Yoga & Trekking Trail',
    duration: '10 Days',
    price: '$999',
    rating: '4.9',
    category: 'Adventure & Spirituality',
    highlights: ['Ganges Ganga Aarti Ceremony in Rishikesh', 'High Altitude Valley Trek in Dharamshala', 'Meditation Retreat with Masters', 'White Water River Rafting Class IV'],
    img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    date: 'Starting 05 July, 2026'
  }
];

const luxuryHotels = [
  { id: 1, name: 'Taj Lake Palace', type: 'Palace Hotel', location: 'Udaipur, Rajasthan', price: '₹55,000/N', img: 'https://images.unsplash.com/photo-1598977123418-45f04b6140ba?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Kumarakom Lake Resort', type: 'Luxury Resort', location: 'Kottayam, Kerala', price: '₹22,000/N', img: 'https://images.unsplash.com/photo-1547983699-121697287625?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Evolve Back Kabini', type: 'Eco Lodge', location: 'Kabini Forest, Karnataka', price: '₹34,000/N', img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80' }
];

const mockFoods = [
  { id: 1, name: 'Butter Chicken & Naan', region: 'North India', type: 'non-veg', spiciness: 'Medium', desc: 'A rich, creamy, tomato-based curry loaded with tandoor-roasted chicken, served with hot butter garlic naan.', img: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Traditional Ghee Dosa', region: 'South India', type: 'veg', spiciness: 'Mild', desc: 'A super-crisp, thin fermented crepe made of rice and lentils, served with fresh coconut chutney and piping hot sambar.', img: 'https://images.unsplash.com/photo-1600100397608-f010e42ed182?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Misal Pav & Farsan', region: 'West India', type: 'veg', spiciness: 'High', desc: 'A spicy curry made of sprouted moth beans, topped with crunchy savory farsan, onions, coriander, and soft pav buns.', img: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Shorba & Biryani Feast', region: 'East India', type: 'non-veg', spiciness: 'Medium', desc: 'Aromatic basmati rice cooked slowly with delicate herbs, spices, and marinated mutton, served with hot spiced gravy.', img: 'https://images.unsplash.com/photo-1561361046-c22208a2df5f?auto=format&fit=crop&w=600&q=80' }
];

const mockTraditions = [
  { id: 1, title: 'Diwali - The Festival of Lights', date: 'November', place: 'Nationwide', desc: 'India’s biggest and most stunning celebration, symbolizing the victory of light over darkness. The entire nation illuminates with millions of clay oil lamps (diyas), lanterns, and vibrant firework displays.' },
  { id: 2, title: 'Holi - The Festival of Colors', date: 'March', place: 'Mathura & Nationwide', desc: 'A chaotic, breathtaking festival celebrating spring, love, and colors. People smear organic colored powders on each other, dance to massive temple drum beats, and share traditional milk-based sweets.' },
  { id: 3, title: 'Kathakali Dance Drama', date: 'Year-Round', place: 'Kerala', desc: 'A spectacular, highly stylized classical dance drama known for its colorful makeup, elaborate costumes, and deep expressive hand gestures (mudras) describing ancient epics.' },
  { id: 4, title: 'Pushkar Camel Fair', date: 'November', place: 'Pushkar, Rajasthan', desc: 'One of the world\'s largest camel and livestock fairs, transforming a desert oasis into a vibrant carnival of folk dancers, musicians, camel races, and local bazaars.' }
];

function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');
  const [scrolled, setScrolled] = useState(false);
  
  // Hero Carousel State
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  
  // Custom Trip Planner State
  const [plannerBudget, setPlannerBudget] = useState('luxury');
  const [plannerDays, setPlannerDays] = useState(7);
  const [plannedItinerary, setPlannedItinerary] = useState(null);

  // Destinations page filter state
  const [destFilterRegion, setDestFilterRegion] = useState('All');
  const [destFilterCat, setDestFilterCat] = useState('All');

  // Booking page state
  const [bookingTab, setBookingTab] = useState('flight');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Subpages refs
  const topRef = useRef(null);

  // Sync route changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Monitor scrolling to style header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 8 Second Autoplay Interval with Ticker
  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setActiveSlide((slide) => (slide + 1) % slides.length);
            return 0;
          }
          return prev + 1.25; // 8000ms total / 100ms ticker = 80 steps -> 100 / 80 = 1.25% per step
        });
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeSlide]);

  // Restart progress when user changes slide manually
  const selectSlide = (index) => {
    setActiveSlide(index);
    setProgress(0);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  };

  // Get Next 4 slides for Right Carousel
  const getNextSlides = () => {
    const list = [];
    for (let i = 1; i <= 4; i++) {
      const idx = (activeSlide + i) % slides.length;
      list.push({ ...slides[idx], originalIndex: idx });
    }
    return list;
  };

  // Dynamic Trip Planner Function
  const calculatePlan = (e) => {
    e.preventDefault();
    let hotelChoice = luxuryHotels[2];
    let routeDesc = '';
    let cost = 0;

    if (plannerBudget === 'luxury') {
      hotelChoice = luxuryHotels[0];
      routeDesc = 'You will experience the ultimate royal luxury. Charter flights or private saloon trains to Udaipur & Jaipur, staying in legendary heritage palace hotels with private butler service and fine-dining gourmet trails.';
      cost = plannerDays * 65000;
    } else if (plannerBudget === 'premium') {
      hotelChoice = luxuryHotels[1];
      routeDesc = 'Indulge in wellness, beaches, and pristine backwaters. Stay in award-winning lakefront resorts, travel via premium Vande Bharat train executive classes, and enjoy guided organic spice trails.';
      cost = plannerDays * 25000;
    } else {
      hotelChoice = luxuryHotels[2];
      routeDesc = 'Connect with raw nature and local wildlife. Stay in sustainably managed premium eco-lodges near Kabini Reserve, travel with local premium cars, and embark on authentic wilderness safaris and heritage walks.';
      cost = plannerDays * 15000;
    }

    setPlannedItinerary({
      hotel: hotelChoice,
      route: routeDesc,
      totalCost: cost.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }),
      days: plannerDays
    });
  };

  // Booked trigger
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  // Destinations page data combines main destinations and Maharashtra districts
  const districtObjects = districtList.map((name, idx) => ({
    id: 100 + idx,
    title: `${name}, Maharashtra`,
    state: 'Maharashtra',
    region: 'West',
    category: 'District',
    rating: 5,
    reviews: 0,
    price: 0,
    img: `https://via.placeholder.com/600x400?text=${encodeURIComponent(name)}`,
    desc: `${name} district in Maharashtra.`
  }));
  const allDestinations = [...mockDestinations, ...districtObjects];

  // Filters for destinations
  const filteredDestinations = allDestinations.filter(d => {
    const matchesRegion = destFilterRegion === 'All' || d.region === destFilterRegion;
    const matchesCat = destFilterCat === 'All' || d.category === destFilterCat;
    return matchesRegion && matchesCat;
  });

  return (
    <div ref={topRef}>
      {/* Dynamic Navigation Bar */}
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <a href="#/" className="logo-container">
          <svg className="logo-icon" viewBox="0 0 50 50">
            <path d="M25 2C16.8 2 10.2 8.6 10.2 16.8c0 4.1 1.7 7.8 4.4 10.5L25 45l10.4-17.7c2.7-2.7 4.4-6.4 4.4-10.5C39.8 8.6 33.2 2 25 2zm0 22c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2S27.9 24 25 24z" />
            <circle cx="25" cy="18.8" r="4.5" fill="#FFFFFF" />
          </svg>
          <div className="logo-text">
            <span className="logo-main">Incredible India</span>
            <span className="logo-sub">Maharashtra Tourism</span>
          </div>
        </a>

        <ul className="nav-links">
          <li><a href="#/" className={`nav-link ${currentRoute === '#/' ? 'active' : ''}`}>Home</a></li>
          <li><a href="#/destinations" className={`nav-link ${currentRoute === '#/destinations' ? 'active' : ''}`}>Destinations</a></li>
          <li><a href="#/tours" className={`nav-link ${currentRoute === '#/tours' ? 'active' : ''}`}>Guided Tours</a></li>
          <li><a href="#/booking" className={`nav-link ${currentRoute === '#/booking' ? 'active' : ''}`}>Bookings</a></li>
          <li><a href="#/foods" className={`nav-link ${currentRoute === '#/foods' ? 'active' : ''}`}>Regional Foods</a></li>
          <li><a href="#/tradition" className={`nav-link ${currentRoute === '#/tradition' ? 'active' : ''}`}>Traditions</a></li>
        </ul>

        <div className="nav-actions">
          <button className="nav-action-btn" title="Search Site"><Search size={20} /></button>
          <button className="nav-action-btn" title="Change Language"><Globe size={20} /></button>
          <a href="#/booking" className="book-btn">Book My Trip</a>
        </div>
      </header>

      {/* RENDER PAGES BASED ON SPA ROUTE */}
      {currentRoute === '#/' && (
        <>
          {/* HERO SECTION CONTAINER */}
          <section className="hero-container">
            {/* Edge-to-edge Video loops with fade-in crossfade */}
            <div className="hero-video-wrapper">
              {slides.map((slide, idx) => (
                <video
                  key={slide.id}
                  src={slide.videoUrl}
                  className={`hero-video ${idx === activeSlide ? 'active' : ''}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ))}
            </div>

            <div className="hero-overlay" />

            {/* Slide Typography Left Content */}
            <div className="hero-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="hero-location-badge">{slides[activeSlide].location}</span>
                  <h1 className="hero-title">{slides[activeSlide].title}</h1>
                  <p className="hero-description">{slides[activeSlide].description}</p>
                  
                  <div className="hero-cta-wrapper">
                    <a href={slides[activeSlide].link} className="hero-explore-btn">
                      Explore Now
                      <div className="bookmark-icon">
                        <ChevronRight size={18} />
                      </div>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Next 4 Upcoming Slide Cards Carousel Right */}
            <div className="hero-carousel-panel">
              <span className="carousel-section-title">Upcoming Explorations</span>
              <div className="carousel-cards-container">
                {getNextSlides().map((card) => (
                  <div
                    key={card.id}
                    className="carousel-card"
                    onClick={() => selectSlide(card.originalIndex)}
                  >
                    <img src={card.thumbnail} alt={card.title} className="carousel-card-img" />
                    <div className="carousel-card-overlay">
                      <span className="carousel-card-location">{card.category}</span>
                      <h4 className="carousel-card-title">{card.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Panel Controls */}
            <div className="hero-bottom-controls">
              {/* Social Media Links left */}
              <div className="social-links">
                <a href="https://facebook.com" className="social-icon" target="_blank" rel="noreferrer"><Users size={16} /></a>
                <a href="https://twitter.com" className="social-icon" target="_blank" rel="noreferrer"><Compass size={16} /></a>
                <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer"><Heart size={16} /></a>
                <a href="https://youtube.com" className="social-icon" target="_blank" rel="noreferrer"><Music size={16} /></a>
              </div>

              {/* Prev/Play-Pause/Next buttons center */}
              <div className="playback-controls">
                <button className="control-btn" onClick={handlePrevSlide} title="Previous Slide">
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="control-btn play-pause" 
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} fill="#FFFFFF" />}
                </button>
                <button className="control-btn" onClick={handleNextSlide} title="Next Slide">
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress bar and Counter right */}
              <div className="progress-and-counter">
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="slide-counter">
                  0{activeSlide + 1}
                </span>
              </div>
            </div>
          </section>

          {/* BODY SECTION */}

          {/* 1. Experience Categories Grid */}
          <section className="section-wrapper">
            <span className="section-tag">Find Your Passion</span>
            <h2 className="section-title">Experience India By Theme</h2>
            <p className="section-subtitle">
              From snow-capped peaks in the north to deep tropical shores in the south, find itineraries customized to your desires.
            </p>

            <div className="experience-grid">
              <div className="experience-card" onClick={() => window.location.hash = '#/destinations'}>
                <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80" alt="Mountains" className="experience-card-img" />
                <div className="experience-card-overlay">
                  <div className="experience-icon"><Compass size={24} /></div>
                  <h3 className="experience-card-title">Mountains</h3>
                  <p className="experience-card-desc">Trek the misty valleys of Himachal and scale high altitude mountain passes.</p>
                  <span className="experience-card-count">12 Active Trails</span>
                </div>
              </div>

              <div className="experience-card" onClick={() => window.location.hash = '#/destinations'}>
                <img src="https://images.unsplash.com/photo-1547983699-121697287625?auto=format&fit=crop&w=600&q=80" alt="Beaches" className="experience-card-img" />
                <div className="experience-card-overlay">
                  <div className="experience-icon"><Globe size={24} /></div>
                  <h3 className="experience-card-title">Beaches</h3>
                  <p className="experience-card-desc">Swaying palms, golden sands, and majestic coastal water cruises in Kerala.</p>
                  <span className="experience-card-count">24 Coastal Stays</span>
                </div>
              </div>

              <div className="experience-card" onClick={() => window.location.hash = '#/destinations'}>
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Wildlife" className="experience-card-img" />
                <div className="experience-card-overlay">
                  <div className="experience-icon"><Award size={24} /></div>
                  <h3 className="experience-card-title">Wildlife</h3>
                  <p className="experience-card-desc">Spot Bengal tigers, Asiatic lions, and curations of exotic tropical bird species.</p>
                  <span className="experience-card-count">9 Safaris Open</span>
                </div>
              </div>

              <div className="experience-card" onClick={() => window.location.hash = '#/destinations'}>
                <img src="https://images.unsplash.com/photo-1600100397608-f010e42ed182?auto=format&fit=crop&w=600&q=80" alt="Heritage" className="experience-card-img" />
                <div className="experience-card-overlay">
                  <div className="experience-icon"><Sparkles size={24} /></div>
                  <h3 className="experience-card-title">Heritage</h3>
                  <p className="experience-card-desc">Marvel at ancient temples, palace architecture, and UNESCO sites dating back millennia.</p>
                  <span className="experience-card-count">36 Monument Walks</span>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Popular Destinations Showcase */}
          <section className="section-wrapper alternate">
            <span className="section-tag">Handpicked for You</span>
            <h2 className="section-title">Most Popular Destinations</h2>
            <p className="section-subtitle">
              Discover the locations that captures travelers’ hearts across the Indian subcontinent.
            </p>

            <div className="destinations-showcase">
              {mockDestinations.slice(0, 3).map((dest) => (
                <div key={dest.id} className="destination-card">
                  <div className="destination-card-img-wrapper">
                    <img src={dest.img} alt={dest.title} className="destination-card-img" />
                    <span className="destination-tag-badge">{dest.category}</span>
                    <div className="destination-rating-badge">
                      <Star size={12} fill="#FFFFFF" />
                      {dest.rating}
                    </div>
                  </div>
                  <div className="destination-card-content">
                    <div className="destination-card-location">
                      <MapPin size={14} className="location-icon" />
                      <span>{dest.state}, India</span>
                    </div>
                    <h3 className="destination-card-title">{dest.title}</h3>
                    <p className="experience-card-desc">{dest.desc}</p>
                    <div className="destination-card-footer">
                      <div className="destination-card-stats">
                        <span className="destination-stats-label">Travelers</span>
                        <span className="destination-stats-value">{dest.reviews.toLocaleString()}+</span>
                      </div>
                      <div className="destination-card-price">
                        <span className="destination-price-label">Avg. Cost</span>
                        <span className="destination-price-value">${dest.price}/day</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
              <a href="#/destinations" className="book-btn" style={{ padding: '0.8rem 2.2rem' }}>View All Destinations</a>
            </div>
          </section>

          {/* 3. Why Choose India Section with Stats & Overlapping Collage */}
          <section className="section-wrapper">
            <div className="why-choose-grid">
              <div className="why-choose-content">
                <span className="section-tag" style={{ textAlign: 'left' }}>The Land of Diversity</span>
                <h2 className="why-choose-heading">Why Choose India For Your Next Adventure?</h2>
                <p className="why-choose-desc">
                  India offers a unique sensory celebration unmatched by any other destination. From spiritual retreats in ancient Ganges ghats to absolute luxury in Maharaja palaces, organic street foods, and rich cultural traditions, your perspective of life will change forever.
                </p>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-number">5,000+</span>
                    <span className="stat-label">Years</span>
                    <span className="stat-desc">Of continuous living history & culture</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">28</span>
                    <span className="stat-label">States</span>
                    <span className="stat-desc">Each offering distinct language & cuisines</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-number">36</span>
                    <span className="stat-label">UNESCO</span>
                    <span className="stat-desc">World Heritage archaeological masterpieces</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Collage */}
              <div className="collage-container">
                <div className="collage-img collage-img-1">
                  <img src="https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=500&q=80" alt="Collage 1" />
                </div>
                <div className="collage-img collage-img-2">
                  <img src="https://images.unsplash.com/photo-1598977123418-45f04b6140ba?auto=format&fit=crop&w=500&q=80" alt="Collage 2" />
                </div>
                <div className="collage-img collage-img-3">
                  <img src="https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=500&q=80" alt="Collage 3" />
                </div>
                <div className="collage-accent-badge">
                  <span className="collage-accent-num">#1</span>
                  <span className="collage-accent-text">Travel Choice</span>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Upcoming Tours Section */}
          <section className="section-wrapper alternate">
            <span className="section-tag">All-Inclusive Journeys</span>
            <h2 className="section-title">Upcoming Guided Tours</h2>
            <p className="section-subtitle">
              Join curated luxury groups led by master local guides, historical experts, and premium safety hosts.
            </p>

            <div className="tours-grid">
              {mockTours.slice(0, 2).map((tour) => (
                <div key={tour.id} className="tour-card">
                  <div className="tour-img-wrapper">
                    <img src={tour.img} alt={tour.title} className="tour-img" />
                    <span className="tour-duration-badge">{tour.duration}</span>
                  </div>
                  <div className="tour-info">
                    <div>
                      <span className="tour-date">{tour.date}</span>
                      <h3 className="tour-title">{tour.title}</h3>
                      <ul className="tour-highlights">
                        {tour.highlights.map((h, i) => (
                          <li key={i} className="tour-highlight-item">
                            <Check size={14} className="saffron-check" style={{ color: 'var(--saffron)' }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="tour-footer">
                      <div className="tour-price">
                        <span className="tour-price-label">Price/Guest</span>
                        <span className="tour-price-value">{tour.price}</span>
                      </div>
                      <button className="tour-book-btn" onClick={() => window.location.hash = '#/booking'}>Book Slots</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. Call to Action Banner */}
          <section className="section-wrapper">
            <div className="cta-banner">
              <div className="cta-banner-content">
                <h2 className="cta-title">Start Planning Your Custom Journey</h2>
                <p className="cta-desc">
                  Subscribe to our premium catalog, or request customized itinerary guides from our travel planners. Let us curate your perfect vacation today.
                </p>
                <form className="cta-form" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing! Your travel guide is on the way.'); }}>
                  <input type="email" placeholder="Enter your email address" className="cta-input" required />
                  <button type="submit" className="cta-submit-btn">Request Catalog</button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}

      {/* DESTINATIONS CATEGORY PAGE */}
      {currentRoute === '#/destinations' && (
        <>
          <div className="page-header" style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,10,16,0.9) 0%, rgba(8,10,16,0.7) 100%), url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1920&q=80')" }}>
            <span className="page-subtitle">Curated Indian Wonders</span>
            <h1 className="page-title">Explore Indian Destinations</h1>
          </div>

          <div className="page-container">
            {/* Interactive Filters Bar */}
            <div className="filter-bar">
              <div className="filters-group">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                  <Filter size={16} style={{ marginRight: '0.4rem', color: 'var(--saffron)' }} /> Regions:
                </span>
                {['All', 'North', 'South', 'East', 'West'].map((region) => (
                  <button
                    key={region}
                    className={`filter-btn ${destFilterRegion === region ? 'active' : ''}`}
                    onClick={() => setDestFilterRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>

              <div className="filters-group">
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', marginRight: '1rem' }}>
                  <Compass size={16} style={{ marginRight: '0.4rem', color: 'var(--saffron)' }} /> Theme:
                </span>
                {['All', 'Heritage', 'Nature', 'Adventure'].map((cat) => (
                  <button
                    key={cat}
                    className={`filter-btn ${destFilterCat === cat ? 'active' : ''}`}
                    onClick={() => setDestFilterCat(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Destinations grid list */}
            {filteredDestinations.length > 0 ? (
              <div className="destinations-grid">
                {filteredDestinations.map((dest) => (
                  <div key={dest.id} className="destination-card">
                    <div className="destination-card-img-wrapper">
                      <img src={dest.img} alt={dest.title} className="destination-card-img" />
                      <span className="destination-tag-badge">{dest.category}</span>
                      <div className="destination-rating-badge">
                        <Star size={12} fill="#FFFFFF" />
                        {dest.rating}
                      </div>
                    </div>
                    <div className="destination-card-content">
                      <div className="destination-card-location">
                        <MapPin size={14} className="location-icon" />
                        <span>{dest.state}, India</span>
                      </div>
                      <h3 className="destination-card-title">{dest.title}</h3>
                      <p className="experience-card-desc" style={{ marginBottom: '1.2rem' }}>{dest.desc}</p>
                      
                      <div className="destination-card-footer">
                        <div className="destination-card-stats">
                          <span className="destination-stats-label">Audience Reviews</span>
                          <span className="destination-stats-value">{dest.reviews.toLocaleString()}+</span>
                        </div>
                        <div className="destination-card-price">
                          <span className="destination-price-label">Avg. Cost</span>
                          <span className="destination-price-value">${dest.price}/day</span>
                        </div>
                      </div>
                      
                      <button 
                        className="book-btn" 
                        onClick={() => window.location.hash = '#/booking'}
                        style={{ width: '100%', marginTop: '1.2rem', textAlign: 'center' }}
                      >
                        Plan Travel to {dest.title.split(',')[0]}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '5rem 0' }}>
                <Info size={40} style={{ color: 'var(--saffron)', marginBottom: '1rem' }} />
                <h3>No Destinations Match Selected Filters</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Try changing your region or theme criteria.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* TOURS CATEGORY PAGE */}
      {currentRoute === '#/tours' && (
        <>
          <div className="page-header" style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,10,16,0.9) 0%, rgba(8,10,16,0.7) 100%), url('https://images.unsplash.com/photo-1547983699-121697287625?auto=format&fit=crop&w=1920&q=80')" }}>
            <span className="page-subtitle">Fully Accompanied Tours</span>
            <h1 className="page-title">Curated Indian Tour Packages</h1>
          </div>

          <div className="page-container">
            <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              {mockTours.map((tour, index) => (
                <div key={tour.id} className="tour-card" style={{ display: 'flex', flexDirection: 'row', minHeight: '380px' }}>
                  <div className="tour-img-wrapper" style={{ width: '45%' }}>
                    <img src={tour.img} alt={tour.title} className="tour-img" style={{ height: '100%' }} />
                    <span className="tour-duration-badge" style={{ fontSize: '0.9rem', padding: '0.4rem 1.2rem' }}>{tour.duration}</span>
                  </div>
                  <div className="tour-info" style={{ width: '55%', padding: '2.5rem' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                        <span className="tour-date">{tour.date}</span>
                        <span className="destination-rating-badge" style={{ position: 'static' }}>
                          <Star size={12} fill="#FFFFFF" /> {tour.rating}
                        </span>
                      </div>
                      
                      <h3 className="tour-title" style={{ fontSize: '1.7rem', marginBottom: '1.2rem' }}>{tour.title}</h3>
                      <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--saffron)', fontWeight: '700', display: 'block', marginBottom: '1rem', letterSpacing: '1px' }}>
                        Core Tour Inclusions
                      </span>
                      
                      <ul className="tour-highlights" style={{ marginBottom: '2rem' }}>
                        {tour.highlights.map((h, i) => (
                          <li key={i} className="tour-highlight-item" style={{ fontSize: '0.95rem', marginBottom: '0.6rem' }}>
                            <Check size={16} className="saffron-check" style={{ color: 'var(--saffron)' }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="tour-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
                      <div className="tour-price">
                        <span className="tour-price-label">All-Inclusive Per Guest</span>
                        <span className="tour-price-value" style={{ fontSize: '1.7rem', color: 'var(--saffron)' }}>{tour.price}</span>
                      </div>
                      
                      <button 
                        className="book-btn" 
                        onClick={() => window.location.hash = '#/booking'}
                        style={{ padding: '0.8rem 2.2rem' }}
                      >
                        Enquire slots
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* BOOKING CATEGORY PAGE WITH CUSTOM TRIP PLANNER */}
      {currentRoute === '#/booking' && (
        <>
          <div className="page-header" style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,10,16,0.9) 0%, rgba(8,10,16,0.7) 100%), url('https://images.unsplash.com/photo-1598977123418-45f04b6140ba?auto=format&fit=crop&w=1920&q=80')" }}>
            <span className="page-subtitle">Hassle-Free Reservations</span>
            <h1 className="page-title">Book Flight, Train & Palace Stays</h1>
          </div>

          <div className="page-container">
            <div className="booking-panel">
              {/* Form card left */}
              <div className="booking-card-main">
                {/* Tab selector */}
                <div className="booking-tabs">
                  <button className={`booking-tab ${bookingTab === 'flight' ? 'active' : ''}`} onClick={() => setBookingTab('flight')}>
                    <Plane size={18} />
                    <span>Flights</span>
                  </button>
                  <button className={`booking-tab ${bookingTab === 'train' ? 'active' : ''}`} onClick={() => setBookingTab('train')}>
                    <Train size={18} />
                    <span>Trains</span>
                  </button>
                  <button className={`booking-tab ${bookingTab === 'hotel' ? 'active' : ''}`} onClick={() => setBookingTab('hotel')}>
                    <Hotel size={18} />
                    <span>Palace Hotels & Resorts</span>
                  </button>
                </div>

                {bookingSuccess ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0', animation: 'scaleUp 0.5s ease' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto' }}>
                      <Check size={40} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--serif)', color: '#FFFFFF', marginBottom: '0.8rem' }}>Reservation Request Received!</h2>
                    <p style={{ color: 'var(--text-muted)', maxWidth: '450px', margin: '0 auto' }}>
                      Our luxury concierge team is verifying seat and suite availability. A customized voucher has been sent to your registered email address.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit}>
                    <div className="booking-form-grid">
                      <div className="booking-input-group">
                        <label className="booking-label">From (Departure City)</label>
                        <div className="booking-input-wrapper">
                          <Plane size={16} className="booking-input-icon" />
                          <input type="text" placeholder="e.g. Mumbai (BOM)" className="booking-input" required />
                        </div>
                      </div>

                      <div className="booking-input-group">
                        <label className="booking-label">To (Destination)</label>
                        <div className="booking-input-wrapper">
                          <MapPin size={16} className="booking-input-icon" />
                          <input type="text" placeholder="e.g. Udaipur (UDR)" className="booking-input" required />
                        </div>
                      </div>

                      <div className="booking-input-group">
                        <label className="booking-label">Departure Date</label>
                        <div className="booking-input-wrapper">
                          <Calendar size={16} className="booking-input-icon" />
                          <input type="date" className="booking-input" defaultValue="2026-06-15" required />
                        </div>
                      </div>

                      <div className="booking-input-group">
                        <label className="booking-label">Class Category</label>
                        <div className="booking-input-wrapper">
                          <Award size={16} className="booking-input-icon" />
                          <select className="booking-select">
                            {bookingTab === 'flight' && (
                              <>
                                <option>First Class Suite</option>
                                <option>Club Business Class</option>
                                <option>Premium Economy</option>
                              </>
                            )}
                            {bookingTab === 'train' && (
                              <>
                                <option>AC Executive Chair Car (EC)</option>
                                <option>AC First Class Coupe (1A)</option>
                                <option>AC 2 Tier Sleeper (2A)</option>
                              </>
                            )}
                            {bookingTab === 'hotel' && (
                              <>
                                <option>Grand Maharaja Heritage Suite</option>
                                <option>Lake View Luxury Room</option>
                                <option>Forest Luxury Canopy Lodge</option>
                              </>
                            )}
                          </select>
                        </div>
                      </div>

                      <div className="booking-input-group full-width">
                        <label className="booking-label">Contact Details</label>
                        <div className="booking-input-wrapper">
                          <Users size={16} className="booking-input-icon" />
                          <input type="email" placeholder="Enter your email for ticket & luxury voucher delivery" className="booking-input" required />
                        </div>
                      </div>
                    </div>

                    <button type="submit" className="booking-submit-btn">
                      Request Suite & Seat Reservation
                      <ArrowRight size={18} />
                    </button>
                  </form>
                )}
              </div>

              {/* Luxury accommodation catalog & interactive trip planner right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                <div>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Sparkles size={20} style={{ color: 'var(--saffron)' }} />
                    Heritage Palace Showcase
                  </h3>
                  
                  <div className="luxury-hotels-panel">
                    {luxuryHotels.map((hotel) => (
                      <div key={hotel.id} className="luxury-hotel-card">
                        <img src={hotel.img} alt={hotel.name} className="luxury-hotel-img" />
                        <div className="luxury-hotel-info">
                          <span className="luxury-hotel-tag">{hotel.type}</span>
                          <h4 className="luxury-hotel-name">{hotel.name}</h4>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                            <MapPin size={12} style={{ color: 'var(--saffron)' }} />
                            <span>{hotel.location}</span>
                          </div>
                        </div>
                        <span className="luxury-hotel-price">{hotel.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TRIP PLANNER WIDGET */}
                <div style={{ backgroundColor: 'var(--obsidian-card)', border: '1px dashed var(--saffron)', borderRadius: '20px', padding: '1.8rem' }}>
                  <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Compass size={18} style={{ color: 'var(--saffron)' }} />
                    AI-Driven Trip Planner
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                    Simulate your luxury budget and days to receive recommendations instantly.
                  </p>

                  <form onSubmit={calculatePlan}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.2rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                        <button 
                          type="button" 
                          className={`filter-btn ${plannerBudget === 'luxury' ? 'active' : ''}`}
                          onClick={() => setPlannerBudget('luxury')}
                          style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}
                        >
                          Palace Luxury
                        </button>
                        <button 
                          type="button" 
                          className={`filter-btn ${plannerBudget === 'premium' ? 'active' : ''}`}
                          onClick={() => setPlannerBudget('premium')}
                          style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}
                        >
                          Coastal Wellness
                        </button>
                        <button 
                          type="button" 
                          className={`filter-btn ${plannerBudget === 'eco' ? 'active' : ''}`}
                          onClick={() => setPlannerBudget('eco')}
                          style={{ flex: 1, fontSize: '0.75rem', padding: '0.4rem' }}
                        >
                          Eco Safari
                        </button>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                          <span style={{ fontWeight: '600' }}>Journey Duration</span>
                          <span style={{ color: 'var(--saffron)', fontWeight: '700' }}>{plannerDays} Days</span>
                        </div>
                        <input 
                          type="range" 
                          min="3" 
                          max="15" 
                          value={plannerDays} 
                          onChange={(e) => setPlannerDays(parseInt(e.target.value))}
                          style={{ accentColor: 'var(--saffron)', cursor: 'pointer' }}
                        />
                      </div>
                    </div>

                    <button type="submit" className="book-btn" style={{ width: '100%', fontSize: '0.8rem', padding: '0.6rem' }}>
                      Generate Itinerary Recommendations
                    </button>
                  </form>

                  {plannedItinerary && (
                    <div style={{ marginTop: '1.5rem', backgroundColor: 'var(--obsidian)', borderRadius: '12px', padding: '1rem', border: '1px solid rgba(255,255,255,0.05)', animation: 'fadeIn 0.5s ease' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'var(--saffron)', fontWeight: '700', letterSpacing: '1px' }}>
                          Recommended Stay
                        </span>
                        <span style={{ fontSize: '0.9rem', color: 'var(--gold)', fontWeight: '700' }}>
                          {plannedItinerary.totalCost} Est.
                        </span>
                      </div>
                      <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontFamily: 'var(--serif)', marginBottom: '0.4rem' }}>
                        {plannedItinerary.hotel.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {plannedItinerary.route}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* FOODS CATEGORY PAGE */}
      {currentRoute === '#/foods' && (
        <>
          <div className="page-header" style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,10,16,0.9) 0%, rgba(8,10,16,0.7) 100%), url('https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1920&q=80')" }}>
            <span className="page-subtitle">A Sensory Spice Celebration</span>
            <h1 className="page-title">Regional Indian Cuisines</h1>
          </div>

          <div className="page-container">
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Indian Culinary Treasures</h2>
            <p className="section-subtitle" style={{ marginBottom: '3.5rem' }}>
              Delve into heritage recipes passed down through generations, combining therapeutic ayurvedic spices with exquisite flavors.
            </p>

            <div className="foods-explorer">
              {mockFoods.map((food) => (
                <div key={food.id} className="food-card">
                  <div className="food-card-img-wrapper">
                    <img src={food.img} alt={food.name} className="food-card-img" />
                  </div>
                  <div className="food-card-content">
                    <span className="food-card-region">{food.region}</span>
                    <h3 className="food-card-name">{food.name}</h3>
                    <p className="food-card-desc">{food.desc}</p>
                    
                    <div className="food-card-footer">
                      <span className={`food-card-badge ${food.type}`}>
                        {food.type === 'veg' ? 'PURE VEG' : 'NON-VEG'}
                      </span>
                      <span className="food-card-spiciness">
                        Spice: <strong style={{ color: 'var(--saffron)' }}>{food.spiciness}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '5rem', backgroundColor: 'var(--obsidian-card)', borderRadius: '24px', padding: '3rem', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
              <Utensils size={36} style={{ color: 'var(--saffron)', marginBottom: '1.2rem' }} />
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '1.8rem', color: '#FFFFFF', marginBottom: '0.8rem' }}>Curated Regional Food Trails</h3>
              <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                Join local celebrity chefs on multi-day journeys, wandering into traditional spice gardens, private royal chef kitchens, and high-energy street food walks in old heritage lanes.
              </p>
              <button className="book-btn" onClick={() => window.location.hash = '#/booking'}>
                Enquire Food Trails
              </button>
            </div>
          </div>
        </>
      )}

      {/* TRADITION CATEGORY PAGE */}
      {currentRoute === '#/tradition' && (
        <>
          <div className="page-header" style={{ backgroundImage: "linear-gradient(to bottom, rgba(8,10,16,0.9) 0%, rgba(8,10,16,0.7) 100%), url('https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1920&q=80')" }}>
            <span className="page-subtitle">Centuries of living soul</span>
            <h1 className="page-title">Festivals, Culture & Performing Arts</h1>
          </div>

          <div className="page-container">
            <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>Cultural Events Timeline</h2>
            <p className="section-subtitle" style={{ marginBottom: '5rem' }}>
              Time your journey to experience the explosion of color, devotion, dance, and music in their authentic regional hubs.
            </p>

            <div className="festivals-timeline">
              {mockTraditions.map((t, idx) => (
                <div key={t.id} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="timeline-date">{t.date} | Held in {t.place}</span>
                    <h3 className="timeline-title">{t.title}</h3>
                    <p className="timeline-desc">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Cultural showcase video callout */}
            <div style={{ marginTop: '6rem', background: 'linear-gradient(135deg, #1A120B 0%, var(--obsidian-card) 100%)', borderRadius: '24px', padding: '3.5rem 4%', border: '1px solid rgba(255, 111, 0, 0.15)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <span className="section-tag" style={{ textAlign: 'left' }}>Royal Heritage Walks</span>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '2rem', color: '#FFFFFF', marginBottom: '1.2rem', lineHeight: '1.2' }}>
                  Uncover Ancient Monolithic Temple Sculptures
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.8rem' }}>
                  Wander through the breathtaking stone caverns of Ajanta & Ellora in Maharashtra, carved directly into rocky basalt cliffs starting in the 2nd century BCE, exhibiting spectacular Buddhist, Hindu, and Jain mural paintings and monolithic architecture.
                </p>
                <button className="book-btn" onClick={() => window.location.hash = '#/booking'}>
                  Book Heritage Walks
                </button>
              </div>

              <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '300px', boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}>
                <img src="https://images.unsplash.com/photo-1600100397608-f010e42ed182?auto=format&fit=crop&w=600&q=80" alt="Tradition Walk" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(8,10,16,0.6) 0%, transparent 100%)' }} />
              </div>
            </div>
          </div>
        </>
      )}

      {/* GLOBAL FOOTER */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="#/" className="logo-container" style={{ alignSelf: 'flex-start' }}>
              <svg className="logo-icon" viewBox="0 0 50 50">
                <path d="M25 2C16.8 2 10.2 8.6 10.2 16.8c0 4.1 1.7 7.8 4.4 10.5L25 45l10.4-17.7c2.7-2.7 4.4-6.4 4.4-10.5C39.8 8.6 33.2 2 25 2zm0 22c-2.9 0-5.2-2.3-5.2-5.2s2.3-5.2 5.2-5.2 5.2 2.3 5.2 5.2S27.9 24 25 24z" />
                <circle cx="25" cy="18.8" r="4.5" fill="#FFFFFF" />
              </svg>
              <div className="logo-text">
                <span className="logo-main" style={{ fontSize: '1.25rem' }}>Incredible India</span>
                <span className="logo-sub" style={{ fontSize: '0.7rem' }}>Maharashtra Tourism</span>
              </div>
            </a>
            <p className="footer-desc">
              Promoting responsible, luxury, and sustainable tourism across the rich states of India. Discover heritage sites, palaces, cuisines, and beaches in high-fidelity comfort.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com" className="social-icon" target="_blank" rel="noreferrer"><Users size={16} /></a>
              <a href="https://twitter.com" className="social-icon" target="_blank" rel="noreferrer"><Compass size={16} /></a>
              <a href="https://instagram.com" className="social-icon" target="_blank" rel="noreferrer"><Heart size={16} /></a>
              <a href="https://youtube.com" className="social-icon" target="_blank" rel="noreferrer"><Music size={16} /></a>
            </div>
          </div>

          <div>
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-links">
              <li className="footer-link"><a href="#/">Home Page</a></li>
              <li className="footer-link"><a href="#/destinations">Destinations Map</a></li>
              <li className="footer-link"><a href="#/tours">Guided Packages</a></li>
              <li className="footer-link"><a href="#/booking">Concierge Booking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Core Experiences</h4>
            <ul className="footer-links">
              <li className="footer-link"><a href="#/foods">Regional Foods</a></li>
              <li className="footer-link"><a href="#/tradition">Vibrant Traditions</a></li>
              <li className="footer-link"><a href="#/booking">Palace Suite Stays</a></li>
              <li className="footer-link"><a href="#/destinations">Adventure Safaris</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-col-title">Concierge Contacts</h4>
            <ul className="footer-links">
              <li className="footer-link" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Toll Free: 1800-425-4747
              </li>
              <li className="footer-link" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Email: concierge@maharashtratourism.gov.in
              </li>
              <li className="footer-link" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Headquarters: Nariman Point, Mumbai, MH, India
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="copyright">
            &copy; 2026 Maharashtra Tourism Corporation. Powered by Google Gemini Advanced Agentic Coding. All Rights Reserved.
          </span>
          <ul className="legal-links">
            <li className="legal-link"><a href="#/">Privacy Policy</a></li>
            <li className="legal-link"><a href="#/">Terms of Service</a></li>
            <li className="legal-link"><a href="#/">Sitemap</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
