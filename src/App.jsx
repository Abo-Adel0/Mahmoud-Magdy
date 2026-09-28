import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP = "201065609174";
const DEV_WHATSAPP = "201280522844";
const INSTAGRAM = "https://www.instagram.com/mahmoud__magdy_111/";
const FALCONS = "https://falcons-organization.com/";

const sections = [
  ["Home", "home"], ["About", "about"], ["Journey", "journey"],
  ["Falcons", "falcons"], ["Different", "different"], ["Events", "events"],
  ["Impact", "impact"], ["Contact", "contact"],
];

const NAV = {
  en: [
    ["Home", "home"], ["About", "about"], ["Journey", "journey"], ["Falcons", "falcons"],
    ["Values", "values"], ["Different", "different"], ["Events", "events"], ["Impact", "impact"],
    ["Media", "media"], ["Contact", "contact"],
  ],
  ar: [
    ["الرئيسية", "home"], ["عن محمود", "about"], ["الرحلة", "journey"], ["فالكونز", "falcons"],
    ["المبادئ", "values"], ["التقنية", "different"], ["الفعاليات", "events"], ["الأثر", "impact"],
    ["الصور", "media"], ["تواصل", "contact"],
  ],
};

const COPY = {
  en: {
    eyebrow: "MAHMOUD MAGDY",
    role: "A journey built over 5+ years of learning, experience and real work.",
    heroTag: <>Learn the market.<br/><strong>Build your mindset. Keep growing.</strong></>,
    discover: "Discover My Journey",
    live: "Live Demo — Falcons ↗",
    scroll: "SCROLL TO EXPLORE",
    aboutEyebrow: "ABOUT MAHMOUD MAGDY",
    aboutTitle: <>A JOURNEY BUILT<br/><span>STEP BY STEP</span></>,
    aboutP1: "More than five years ago, Mahmoud Magdy started his journey in the markets with the same questions every beginner has: how does the market really move, how do you deal with pressure, and how do you turn information into a clear decision?",
    aboutP2: "With time, learning turned into experience, and experience turned into something bigger than a personal journey. Mahmoud began sharing what he had learned, helping traders understand the market with more clarity, patience and discipline. That is the idea behind Falcons — a place where learning does not stop at a lesson, but continues through practice, discussion and people learning from one another.",
    quote: "I don't see trading as a shortcut to a result. I see it as a long journey where every stage teaches you something new. My goal is to share what I learned, keep learning with the people around me, and build an environment where progress is something we work on every day.",
    quoteName: "— MAHMOUD MAGDY",
    journeyEyebrow: "THE JOURNEY",
    journeyTitle: <>MORE THAN<br/><span>FIVE YEARS OF LEARNING</span></>,
    journeyIntro: "Five years can sound like a number. For Mahmoud, it is a collection of lessons, difficult moments, decisions, and experiences that shaped the way he thinks and works today.",
    falconsEyebrow: "THE FALCONS JOURNEY",
    falconsTitle: <>FROM ONE JOURNEY<br/><span>TO A COMMUNITY</span></>,
    falconsText: "Falcons grew from a personal passion for learning into a wider community. The idea is simple: give people a place to learn, ask questions, practice what they understand and keep moving forward without pretending there is a shortcut.",
    visit: "Visit Falcons ↗",
    open: "Open Falcons Website ↗",
    valuesEyebrow: "WHAT MATTERS TO MAHMOUD",
    valuesTitle: <>THE THINGS THAT<br/><span>MAKE THE DIFFERENCE</span></>,
    differentEyebrow: "TECHNOLOGY & IDEAS",
    differentTitle: <>WHEN EXPERIENCE<br/><span>MEETS TECHNOLOGY</span></>,
    differentP1: "For Mahmoud, technology is not there just to look impressive. It is useful when it saves time, organizes information and makes a complicated process easier to understand.",
    differentP2: "That is why he works on custom bots, AI-based tools and internal systems for the Falcons ecosystem — tools designed to support the work behind the scenes while keeping the important decisions human, thoughtful and responsible.",
    eventsEyebrow: "EVENTS & MOMENTS",
    eventsTitle: <>THE PEOPLE<br/><span>BEHIND THE STORY</span></>,
    eventsIntro: "From packed halls to outdoor activities, these are some of the moments that show the people, energy and community behind the Falcons journey.",
    mediaEyebrow: "BEHIND THE SCENES",
    mediaTitle: <>THE MOMENTS<br/><span>YOU DON'T ALWAYS SEE</span></>,
    mediaIntro: "Training days, events, trips and the small moments in between — a moving look at the people and experiences behind the brand.",
    contactTitle: <>THE JOURNEY<br/><span>KEEPS GOING.</span></>,
    contactText: "Follow Mahmoud Magdy, explore his journey and take a closer look at the work and community behind Falcons.",
    instagram: "Follow on Instagram ↗",
    whatsapp: "Contact on WhatsApp",
    footerRole: "Mahmoud Magdy · Falcons Organization",
    developed: "Developed by",
  },
  ar: {
    eyebrow: "محمود مجدي",
    role: "رحلة بدأت من أكتر من 5 سنين، واتشكلت بالعلم والتجربة والشغل الحقيقي.",
    heroTag: <>افهم السوق.<br/><strong>ابني عقليتك.. وخليك دايمًا بتتطور.</strong></>,
    discover: "اكتشف رحلتي",
    live: "موقع Falcons ↗",
    scroll: "اكتشف المزيد",
    aboutEyebrow: "عن محمود مجدي",
    aboutTitle: <>رحلة اتبنت<br/><span>خطوة بخطوة</span></>,
    aboutP1: "من أكتر من خمس سنين، بدأ محمود مجدي رحلته في عالم الأسواق بنفس الأسئلة اللي بتيجي لأي حد بيبدأ: السوق بيتحرك ليه؟ إزاي أتعامل مع الضغط؟ وإزاي أحوّل كل اللي بتعلمه لقرار واضح ومدروس؟",
    aboutP2: "مع الوقت، التعلم اتحول لخبرة، والخبرة اتحولت لحاجة أكبر من مجرد رحلة شخصية. محمود بدأ يشارك اللي اتعلمه مع غيره، ويساعد متداولين يفهموا السوق بشكل أوضح، ويتعاملوا معاه بصبر وانضباط. ومن هنا بدأت فكرة Falcons: مكان التعلم فيه مش بيقف عند درس أو معلومة، لكن بيكمل بالتجربة، والنقاش، والناس اللي بتتعلم من بعض.",
    quote: "أنا مش شايف التداول طريق مختصر لنتيجة سريعة. أنا شايفه رحلة طويلة، وكل مرحلة فيها بتعلمك حاجة جديدة. هدفي إني أشارك اللي اتعلمته، وأفضل أتعلم مع الناس اللي حواليا، ونبني مع بعض بيئة يكون التطور فيها شغل يومي مش مجرد كلام.",
    quoteName: "— محمود مجدي",
    journeyEyebrow: "الرحلة",
    journeyTitle: <>أكتر من<br/><span>5 سنين من التعلم</span></>,
    journeyIntro: "خمس سنين ممكن تبان مجرد رقم، لكن بالنسبة لمحمود هي سنين من الدروس، والتجارب، والقرارات، والمواقف اللي شكلت طريقته في التفكير والشغل لحد النهارده.",
    falconsEyebrow: "رحلتي مع Falcons",
    falconsTitle: <>من رحلة شخصية<br/><span>إلى مجتمع كامل</span></>,
    falconsText: "Falcons بدأت من شغف شخصي بالتعلم، ومع الوقت كبرت وبقت مجتمع أوسع. الفكرة ببساطة إن يكون فيه مكان تتعلم فيه، تسأل، تطبق اللي فهمته، وتكمل طريقك من غير ما حد يوهمك إن فيه طريق مختصر.",
    visit: "زيارة Falcons ↗",
    open: "فتح موقع Falcons ↗",
    valuesEyebrow: "الحاجات اللي بتفرق مع محمود",
    valuesTitle: <>مش بس تداول...<br/><span>دي طريقة تفكير</span></>,
    differentEyebrow: "التقنية والأفكار",
    differentTitle: <>لما الخبرة<br/><span>تقابل التكنولوجيا</span></>,
    differentP1: "بالنسبة لمحمود، التكنولوجيا مش مجرد شكل حلو أو حاجة نضيفها للموقع وخلاص. قيمتها الحقيقية لما توفر وقت، ترتب المعلومات، وتسهّل حاجة كانت معقدة.",
    differentP2: "وعشان كده بيشتغل على Bots وأدوات مبنية على الذكاء الاصطناعي وأنظمة داخلية تساعد شغل Falcons من ورا الكواليس؛ أدوات هدفها تخلي الشغل أرتب وأسرع، مع بقاء القرارات المهمة محتاجة تفكير ومسؤولية من الإنسان نفسه.",
    eventsEyebrow: "الفعاليات واللحظات",
    eventsTitle: <>الناس اللي<br/><span>ورا الحكاية</span></>,
    eventsIntro: "من القاعات المليانة بالناس لحد الأنشطة والرحلات، دي مجموعة من اللحظات اللي بتوضح الطاقة والناس والمجتمع اللي اتبنى حوالين Falcons.",
    mediaEyebrow: "خلف الكواليس",
    mediaTitle: <>لحظات<br/><span>مش دايمًا بتشوفها</span></>,
    contactTitle: <>الرحلة<br/><span>لسه مكملة.</span></>,
    contactText: "تابع محمود مجدي، شوف تفاصيل رحلته، واقرب أكتر من الشغل والمجتمع اللي اتبنى حوالين Falcons.",
    instagram: "تابع على Instagram ↗",
    whatsapp: "تواصل عبر WhatsApp",
    footerRole: "محمود مجدي · Falcons Organization",
    developed: "تطوير",
  },
};

const JOURNEY = {
  en: [
    ["01", "The Beginning", "beginning", "It started with curiosity: learning how markets move, asking better questions and realizing that understanding takes time."],
    ["02", "Five Years of Experience", "trading", "Five years of learning and practice shaped a calmer, more thoughtful way of looking at the market and its challenges."],
    ["03", "Sharing What I Learned", "education", "What began as personal learning gradually became something to share — breaking down difficult ideas and helping others build their own foundation."],
    ["04", "The Falcons Chapter", "falcons", "The personal journey grew into Falcons, where education, community and real experiences could live in the same place."],
    ["05", "A Journey That Keeps Moving", "community", "There is no final page. The next part is built through people, new experiences, better questions and the willingness to keep learning."],
  ],
  ar: [
    ["01", "البداية", "beginning", "البداية كانت فضول ورغبة في الفهم: السوق بيتحرك إزاي؟ وإيه اللي بيخلي القرار صح أو غلط؟ ومع الوقت بدأ الفهم ياخد مكان التوقعات السريعة."],
    ["02", "أكتر من 5 سنين", "trading", "خمس سنين من التعلم والتجربة خلّوا النظرة للسوق أهدى وأعمق، وخلّوا كل تجربة درس يستاهل يتراجع ويتفهم."],
    ["03", "مشاركة اللي اتعلمته", "education", "اللي بدأ كتعلّم شخصي اتحول مع الوقت لحاجة تستاهل تتشارك؛ تبسيط الأفكار، ومساعدة غيري يبنوا أساسهم بنفسهم."],
    ["04", "فصل Falcons", "falcons", "الرحلة الشخصية كبرت وبقت Falcons، مكان يجمع التعليم والتجربة والناس اللي عندها نفس الرغبة في التطور."],
    ["05", "والرحلة لسه مكملة", "community", "مفيش صفحة أخيرة للحكاية؛ كل مرحلة جديدة بتتبني من ناس جديدة، وتجارب جديدة، وأسئلة أحسن، ورغبة مستمرة في التعلم."],
  ],
};

const VALUES = {
  en: [
    ["01", "Keep Learning", "Markets change, people change, and experience keeps teaching. Staying curious matters more than pretending you know everything."],
    ["02", "Stay Disciplined", "A good idea means little without the discipline to follow a clear process when pressure starts to rise."],
    ["03", "Understand the Risk", "Before looking at what can be gained, understand what can go wrong. Clear thinking starts there."],
    ["04", "Grow Together", "The right environment makes learning easier. Questions, conversations and shared experience can move a person forward."],
  ],
  ar: [
    ["01", "التعلم المستمر", "السوق بيتغير، والناس بتتغير، والخبرة نفسها بتفضل تعلمنا. المهم تفضل عندك رغبة تفهم أكتر، مش إنك تتعامل كإنك عارف كل حاجة."],
    ["02", "الانضباط", "الفكرة الحلوة لوحدها مش كفاية. الفرق الحقيقي بيظهر لما تقدر تلتزم بطريقتك حتى وقت الضغط والحماس والتوتر."],
    ["03", "فهم المخاطر", "قبل ما تفكر في المكسب، لازم تكون فاهم إيه اللي ممكن يحصل لو الأمور مشت عكس توقعك. الوضوح بيبدأ من هنا."],
    ["04", "نتطور مع بعض", "البيئة الصح بتفرق. سؤال، نقاش، أو تجربة شخص تاني ممكن يختصر عليك وقت كبير، وده جزء مهم من أي رحلة تعلم."],
  ],
};

const NEW_GALLERY = Array.from({ length: 18 }, (_, i) => {
  const n = i + 6;
  return { src: `/images/gallery/${String(i + 1).padStart(2, "0")}.webp`, n: String(n).padStart(2, "0") };
});

const FEATURE_GALLERY = [
  { src: "/images/gallery/01.webp", n: "06" },
  { src: "/images/gallery/04.webp", n: "09" },
  { src: "/images/gallery/07.webp", n: "12" },
  { src: "/images/gallery/08.webp", n: "13" },
  { src: "/images/gallery/12.webp", n: "17" },
  { src: "/images/gallery/18.webp", n: "23" },
];

function Counter({ end, suffix = "+" }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const duration = 1500;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.floor(end * eased));
        if (p < 1) requestAnimationFrame(tick);
        else setValue(end);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [end]);
  return <strong ref={ref}>{value.toLocaleString()}{suffix}</strong>;
}

function MarketBackground() {
  const candles = useMemo(() => Array.from({ length: 46 }, (_, i) => ({
    i,
    base: 30 + ((i * 17) % 90),
    up: i % 3 !== 0,
  })), []);
  return (
    <div className="market-bg" aria-hidden="true">
      <div className="market-grid" />
      <div className="market-glow" />
      <div className="market-candles">
        {candles.map((c) => (
          <span className={`market-candle ${c.up ? "up" : "down"}`} key={c.i} style={{ height: `${c.base}px`, animationDelay: `${(c.i % 8) * -0.18}s` }}>
            <i />
          </span>
        ))}
      </div>
    </div>
  );
}

function TradingRobot({ profit, eventId, happy }) {
  return (
    <div className={`trading-robot ${happy ? "robot-happy" : ""}`} aria-hidden="true">
      <div className="robot-head">
        <span className="robot-eye left"></span>
        <span className="robot-eye right"></span>
        <span className="robot-smile">⌣</span>
      </div>
      <div className="robot-neck"></div>
      <div className="robot-body">
        <div className="robot-panel"><i></i><i></i><i></i></div>
        <div className="robot-arm arm-left"><span></span></div>
        <div className="robot-arm arm-lean"><span></span></div>
      </div>
      <div className="robot-shoulder-light"></div>
      <div key={`robot-profit-${eventId}`} className="profit-bubble">+${profit}</div>
      <div className="robot-glow"></div>
    </div>
  );
}

function JourneyIcon({ type }) {
  const common = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "beginning") return <svg {...common}><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 2"/><path d="M5 5l2 1"/></svg>;
  if (type === "trading") return <svg {...common}><path d="M4 17V9M10 17V5M16 17v-7M22 17V3"/><path d="M3 19h20"/><path d="m5 8 5-2 6 4 6-5"/></svg>;
  if (type === "education") return <svg {...common}><path d="m3 8 9-4 9 4-9 4-9-4Z"/><path d="M7 10v5c2.7 2 7.3 2 10 0v-5"/><path d="M21 9v6"/></svg>;
  if (type === "falcons") return <svg {...common}><path d="M4 14c4-1 6-5 8-10 1 4 4 7 8 8-3 1-5 3-7 7-2-2-4-4-9-5Z"/><path d="M14 8c-1 1-2 2-3 3"/></svg>;
  return <svg {...common}><circle cx="9" cy="9" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3 2.5-5 6-5s6 2 6 5"/><path d="M14 16c3 .1 5 1.5 5 4"/></svg>;
}

function MouseEffects({ onMove }) {
  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      onMove?.(e);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [onMove]);
  return <div className="mouse-glow" aria-hidden="true" />;
}

function App() {
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState(() => localStorage.getItem("mahmoud-lang") || "ar");
  const copy = COPY[lang];
  const journeyItems = JOURNEY[lang];
  const valueItems = VALUES[lang];
  const navItems = NAV[lang];
  const [light, setLight] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  // One source of truth for the terminal + robot profit animation.
  const profits = [97, 189, 74, 241, 126, 312, 158];
  const [profitIndex, setProfitIndex] = useState(0);
  const [profitEvent, setProfitEvent] = useState(0);
  const [profitHappy, setProfitHappy] = useState(false);
  const currentProfit = profits[profitIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProfitIndex(i => (i + 1) % profits.length);
      setProfitEvent(i => i + 1);
      setProfitHappy(true);
      window.setTimeout(() => setProfitHappy(false), 950);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("mahmoud-lang", lang);
  }, [lang]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = [...document.querySelectorAll("section[id]")];
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("in-view");
      });
    }, { threshold: 0.12 });
    nodes.forEach(n => revealObserver.observe(n));

    const updateActive = () => {
      const marker = window.scrollY + window.innerHeight * 0.38;
      let current = nodes[0]?.id || "home";
      nodes.forEach((node) => {
        if (node.offsetTop <= marker) current = node.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    updateActive();
    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
    setMenu(false);
  };


  return (
    <div className={`site ${light ? "light-theme" : ""} ${lang === "ar" ? "rtl" : "ltr"}`} dir={lang === "ar" ? "rtl" : "ltr"}>
      <MouseEffects />

      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <button className="brand" onClick={() => go("home")} aria-label="Go home">
          <span className="brand-mark">M</span>
          <span><b>MAHMOUD</b><em>MAGDY</em></span>
        </button>

        <nav className={`nav-links ${menu ? "open" : ""}`}>
          {navItems.map(([label, id]) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="language-toggle" onClick={() => setLang(v => v === "ar" ? "en" : "ar")} aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}>
            <span>EN</span><i></i><b>ع</b>
          </button>
          <button className={`theme-toggle ${light ? "is-light" : "is-dark"}`} onClick={() => setLight(v => !v)} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
            <span className="theme-icon sun">☀</span><i></i><span className="theme-icon moon">☾</span>
          </button>
          <button className="gold-btn small" onClick={() => go("contact")}>{lang === "ar" ? "تواصل" : "Contact"}</button>
        </div>
        <button className="hamburger" onClick={() => setMenu(v => !v)} aria-label="Menu"><span/><span/><span/></button>
      </header>

      <aside className="side-dots" aria-label="Section navigation">
        {navItems.map(([label, id], i) => (
          <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)} aria-label={label}>
            <small>{String(i + 1).padStart(2, "0")}</small><span /><b>{label}</b>
          </button>
        ))}
      </aside>

      <main>
        <section id="home" className="hero reveal-section">
          <div className="hero-static-bg" aria-hidden="true"><img src="/images/hero-market-bg.png" alt="" /></div>
          <div className="hero-vignette" />
          <div className="hero-copy reveal">
            <p className="eyebrow">{copy.eyebrow}</p>
            <h1>MAHMOUD<br/><span>MAGDY</span></h1>
            <p className="role">{copy.role}</p>
            <p className="tagline">{copy.heroTag}</p>
            <div className="hero-buttons">
              <button className="gold-btn" onClick={() => go("journey")}>{copy.discover} <b>→</b></button>
              <button className="outline-btn" onClick={() => go("falcons")}>{copy.live}</button>
            </div>
          </div>

          <div className="hero-person">
            <div className="person-halo" />
            <img src="/images/hero.png" alt="Mahmoud Magdy" />
            <div className="signature"><span>Mahmoud</span> Magdy</div>
          </div>
          <div className="hero-bottom">{copy.scroll} <span>↓</span></div>
        </section>

        <section id="about" className="section about reveal-section">
          <div className="about-image reveal"><img src="/images/training.jpg" alt="Mahmoud Magdy training session"/><span className="image-label">{lang === "ar" ? "بداية الرحلة" : "THE EARLY JOURNEY"}</span></div>
          <div className="about-copy reveal"><p className="eyebrow">{copy.aboutEyebrow}</p><h2>{copy.aboutTitle}</h2><p>{copy.aboutP1}</p><p>{copy.aboutP2}</p><button className="text-btn" onClick={() => go("journey")}>{lang === "ar" ? "اكتشف القصة" : "Explore the story"} <span>→</span></button></div>
          <aside className="quote reveal"><div className="quote-mark">“</div><p>{copy.quote}</p><small>{copy.quoteName}</small></aside>
        </section>

        <section id="journey" className="section journey reveal-section">
          <div className="section-head reveal"><div><p className="eyebrow">{copy.journeyEyebrow}</p><h2>{copy.journeyTitle}</h2></div><p className="section-intro">{copy.journeyIntro}</p></div>
          <div className="timeline">{journeyItems.map(([n,title,icon,text]) => <article className="journey-card reveal" key={n}><div className="journey-num">{n}</div><div className="journey-icon"><JourneyIcon type={icon}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="falcons" className="falcons section reveal-section">
          <div className="falcons-bg" />
          <div className="falcons-copy reveal"><p className="eyebrow">{copy.falconsEyebrow}</p><h2>{copy.falconsTitle}</h2><p>{copy.falconsText}</p><a className="gold-btn" href={FALCONS} target="_blank" rel="noreferrer">{copy.visit}</a></div>
          <a className="browser-card reveal" href={FALCONS} target="_blank" rel="noreferrer" aria-label="Open Falcons live demo">
            <div className="browser-top"><i/><i/><i/><span>falcons-organization.com</span><b>LIVE</b></div>
            <div className="browser-screen"><img src="/images/falcons-preview.png" alt="Falcons Organization website preview"/><div className="live-overlay"><span>● LIVE DEMO</span><strong>{copy.open}</strong></div></div>
          </a>
        </section>

        <section id="values" className="section values reveal-section">
          <div className="section-head compact reveal"><div><p className="eyebrow">{copy.valuesEyebrow}</p><h2>{copy.valuesTitle}</h2></div></div>
          <div className="values-grid">{valueItems.map(([n,title,text]) => <article className="value-card reveal" key={n}><span>{n}</span><i>✦</i><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="different" className="section different reveal-section">
          <div className="different-copy reveal">
            <p className="eyebrow">{copy.differentEyebrow}</p>
            <h2>{copy.differentTitle}</h2>
            <p>{copy.differentP1}</p>
            <p>{copy.differentP2}</p>
            <div className="tech-pills"><span>AI TOOLS</span><span>TRADING BOTS</span><span>SMART WORKFLOWS</span></div>
          </div>
          <div className="robot-stage reveal">
            <div className="robot-terminal">
              <div className="screen-top"><span>FALCONS AI TERMINAL</span><b>● CONNECTED</b></div>
              <div className="terminal-toolbar"><span>EUR/USD</span><span>1.0842</span><span className="green-dot">●</span></div>
              <div className="screen-chart">
                <i className="chart-line"></i>
                <span className="screen-price">EUR/USD&nbsp;&nbsp; 1.0842</span>
                <div className="chart-crosshair"></div>
                <div className="screen-candles"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div>
                <div className="profit-popups" aria-live="polite">
                  <span key={`screen-profit-${profitEvent}`} className="profit-live">+${currentProfit}</span>
                </div>
              </div>
              <div className="screen-bottom"><span>AI SCANNER</span><span>BOT STATUS: ACTIVE</span><span>RISK CONTROL: ON</span></div>
            </div>
            <TradingRobot profit={currentProfit} eventId={profitEvent} happy={profitHappy} />
          </div>
        </section>

        <section id="events" className="section events reveal-section">
          <div className="section-head reveal"><div><p className="eyebrow">{copy.eventsEyebrow}</p><h2>{copy.eventsTitle}</h2></div><p className="section-intro">{copy.eventsIntro}</p></div>
          <div className="gallery gallery-new">{FEATURE_GALLERY.map((item, i) => <figure className={`gallery-card gallery-card-${i + 1} reveal`} key={item.src}><img src={item.src} alt={lang === "ar" ? "لحظة من رحلة Falcons" : "Falcons journey moment"} loading={i > 1 ? "lazy" : "eager"}/></figure>)}</div>
        </section>

        <section id="impact" className="impact section reveal-section">
          <div className="section-head compact reveal"><div><p className="eyebrow">{copy.impactEyebrow}</p><h2>{copy.impactTitle}</h2></div><p className="section-intro">{copy.impactIntro}</p></div>
          <div className="stats">
            <div className="reveal"><Counter end={5} suffix="+"/><span>{lang === "ar" ? "سنوات من الخبرة" : "Years of Experience"}</span></div>
            <div className="reveal"><Counter end={12000} suffix="+"/><span>{lang === "ar" ? "عضو نشط" : "Active Members"}</span></div>
            <div className="reveal"><Counter end={12000} suffix="+"/><span>{lang === "ar" ? "طالب تم تدريبه" : "Students Trained"}</span></div>
            <div className="reveal"><Counter end={18} suffix=""/><span>{lang === "ar" ? "دولة" : "Countries"}</span></div>
            <div className="reveal"><Counter end={95} suffix="%"/><span>{lang === "ar" ? "معدل الرضا" : "Satisfaction Rate"}</span></div>
          </div>
        </section>

        <section id="media" className="section media reveal-section">
          <div className="section-head reveal"><div><p className="eyebrow">{copy.mediaEyebrow}</p><h2>{copy.mediaTitle}</h2></div><p className="section-intro">{copy.mediaIntro}</p></div>
          <div className="media-marquee" aria-label={lang === "ar" ? "صور من خلف الكواليس" : "Behind the scenes gallery"}>
            <div className="media-row media-row-right">
              <div className="media-track">
                {[...NEW_GALLERY, ...NEW_GALLERY].map((item, i) => <figure className="media-tile" key={`top-${item.src}-${i}`}><img src={item.src} alt={lang === "ar" ? "صورة من رحلة Falcons" : "Falcons journey"} loading={i < 6 ? "eager" : "lazy"}/></figure>)}
              </div>
            </div>
            <div className="media-row media-row-left">
              <div className="media-track">
                {[...NEW_GALLERY.slice().reverse(), ...NEW_GALLERY.slice().reverse()].map((item, i) => <figure className="media-tile" key={`bottom-${item.src}-${i}`}><img src={item.src} alt={lang === "ar" ? "صورة من رحلة Falcons" : "Falcons journey"} loading={i < 6 ? "eager" : "lazy"}/></figure>)}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="cta reveal-section"><img src="/images/event-1.jpg" alt=""/><div className="cta-overlay"/><div className="cta-content reveal"><p className="eyebrow">{copy.contactEyebrow}</p><h2>{copy.contactTitle}</h2><p>{copy.contactText}</p><div className="hero-buttons"><a className="gold-btn" href={INSTAGRAM} target="_blank" rel="noreferrer">{copy.instagram}</a><a className="outline-btn" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">{copy.whatsapp}</a></div><div className="contact-socials"><a href={INSTAGRAM} target="_blank" rel="noreferrer"><b>◎</b><span>Instagram</span></a><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><b>◔</b><span>WhatsApp</span></a><a href={FALCONS} target="_blank" rel="noreferrer"><b>𓅃</b><span>Falcons Organization</span></a></div></div></section>
      </main>

      <footer>
        <div className="footer-main"><div className="footer-brand"><span className="brand-mark">M</span><div><b>MAHMOUD MAGDY</b><small>{copy.footerRole}</small></div></div><p>{copy.footerText}</p></div>
        <div className="footer-links">{navItems.slice(0,7).map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div>
        <div className="footer-contact"><a href={FALCONS} target="_blank" rel="noreferrer">Falcons Organization ↗</a></div>
        <div className="copyright"><span>© 2026 Mahmoud Magdy. All Rights Reserved.</span><span>{copy.developed} <a className="developer-link" href={`https://wa.me/${DEV_WHATSAPP}`} target="_blank" rel="noreferrer"><b>Eng. Youssef Adel</b></a></span></div>
      </footer>
    </div>
  );
}

export default App;
