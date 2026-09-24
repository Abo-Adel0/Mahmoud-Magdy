import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

const WHATSAPP = "201280522844";
const INSTAGRAM = "https://www.instagram.com/mahmoud__magdy_111/";
const FALCONS = "https://falcons-organization.com/";

const sections = [
  ["Home", "home"], ["About", "about"], ["Journey", "journey"],
  ["Falcons", "falcons"], ["Different", "different"], ["Events", "events"],
  ["Impact", "impact"], ["Contact", "contact"],
];

const navSections = [
  ["Home", "home"], ["About", "about"], ["Journey", "journey"], ["Falcons", "falcons"],
  ["Values", "values"], ["Different", "different"], ["Events", "events"], ["Impact", "impact"],
  ["Media", "media"], ["Contact", "contact"],
];

const journey = [
  ["01", "The Beginning", "beginning", "The first steps were built around curiosity, learning, discipline and a clear ambition to understand the markets."],
  ["02", "Trading Journey", "trading", "Experience grew through study, practice and learning how to approach the market with structure and patience."],
  ["03", "Education & Mentorship", "education", "Knowledge became a mission: explain, simplify and help other learners build stronger foundations."],
  ["04", "Falcons Organization", "falcons", "A personal vision grew into a wider platform focused on education, community and leadership."],
  ["05", "Building a Community", "community", "More than traders — a community connected by learning, ambition, responsibility and continuous growth."],
];

const values = [
  ["01", "Education", "Knowledge first. Practical learning built around understanding, not shortcuts."],
  ["02", "Discipline", "A structured mindset, consistency and patience are part of the process."],
  ["03", "Risk Management", "Respect the risk before thinking about the reward."],
  ["04", "Leadership", "Build people, confidence and a stronger community around shared goals."],
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
    <div className={`site ${light ? "light-theme" : ""}`}>
      <MouseEffects />

      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <button className="brand" onClick={() => go("home")} aria-label="Go home">
          <span className="brand-mark">M</span>
          <span><b>MAHMOUD</b><em>MAGDY</em></span>
        </button>

        <nav className={`nav-links ${menu ? "open" : ""}`}>
          {navSections.map(([label, id]) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => go(id)}>{label}</button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className={`theme-toggle ${light ? "is-light" : "is-dark"}`} onClick={() => setLight(v => !v)} aria-label={light ? "Switch to dark theme" : "Switch to light theme"}>
            <span className="theme-icon sun">☀</span><i></i><span className="theme-icon moon">☾</span>
          </button>
          <button className="gold-btn small" onClick={() => go("contact")}>Contact</button>
        </div>
        <button className="hamburger" onClick={() => setMenu(v => !v)} aria-label="Menu"><span/><span/><span/></button>
      </header>

      <aside className="side-dots" aria-label="Section navigation">
        {[
          ["Home","home"], ["About","about"], ["Journey","journey"], ["Falcons","falcons"],
          ["Values","values"], ["Different","different"], ["Events","events"], ["Impact","impact"],
          ["Media","media"], ["Contact","contact"]
        ].map(([label, id], i) => (
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
            <p className="eyebrow">COACH • FOUNDER • MENTOR</p>
            <h1>MAHMOUD<br/><span>MAGDY</span></h1>
            <p className="role">Founder & CEO of Falcons Organization</p>
            <p className="tagline">Building Traders.<br/><strong>Building Leaders.</strong></p>
            <div className="hero-buttons">
              <button className="gold-btn" onClick={() => go("journey")}>Discover My Journey <b>→</b></button>
              <button className="outline-btn" onClick={() => go("falcons")}>Live Demo — Falcons ↗</button>
            </div>
          </div>

          <div className="hero-person">
            <div className="person-halo" />
            <img src="/images/hero.png" alt="Mahmoud Magdy" />
            <div className="signature"><span>Mahmoud</span> Magdy</div>
          </div>
          <div className="hero-bottom">SCROLL TO EXPLORE <span>↓</span></div>
        </section>

        <section id="about" className="section about reveal-section">
          <div className="about-image reveal"><img src="/images/training.jpg" alt="Mahmoud Magdy training session"/><span className="image-label">THE EARLY JOURNEY</span></div>
          <div className="about-copy reveal"><p className="eyebrow">ABOUT MAHMOUD MAGDY</p><h2>THE MAN BEHIND<br/><span>THE VISION</span></h2><p>Mahmoud Magdy is a trader, trainer and entrepreneur whose journey is centered around learning, experience and building people.</p><p>From the early stages of his journey to the creation of Falcons Organization, the focus has remained on education, discipline, practical development and community.</p><button className="text-btn" onClick={() => go("journey")}>Explore the story <span>→</span></button></div>
          <aside className="quote reveal"><div className="quote-mark">“</div><p>Success is not just about the result. It is about the person you become along the way.</p><small>— MAHMOUD MAGDY</small><div className="roles"><span>◈ Trader</span><span>◆ Trainer</span><span>◇ Mentor</span><span>✦ Leader</span></div></aside>
        </section>

        <section id="journey" className="section journey reveal-section">
          <div className="section-head reveal"><div><p className="eyebrow">THE JOURNEY</p><h2>A PATH BUILT ON<br/><span>LEARNING & EXPERIENCE</span></h2></div><p className="section-intro">A story that continues to grow — from learning the markets to building a community around education and purpose.</p></div>
          <div className="timeline">{journey.map(([n,title,icon,text]) => <article className="journey-card reveal" key={n}><div className="journey-num">{n}</div><div className="journey-icon"><JourneyIcon type={icon}/></div><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="falcons" className="falcons section reveal-section">
          <div className="falcons-bg" />
          <div className="falcons-copy reveal"><p className="eyebrow">THE FOUNDER OF FALCONS</p><h2>FROM A VISION<br/><span>TO FALCONS</span></h2><p>Falcons Organization is the platform founded by Mahmoud Magdy, bringing education, community and development together under one identity.</p><a className="gold-btn" href={FALCONS} target="_blank" rel="noreferrer">Visit Falcons ↗</a></div>
          <a className="browser-card reveal" href={FALCONS} target="_blank" rel="noreferrer" aria-label="Open Falcons live demo">
            <div className="browser-top"><i/><i/><i/><span>falcons-organization.com</span><b>LIVE</b></div>
            <div className="browser-screen"><img src="/images/falcons-preview.png" alt="Falcons Organization website preview"/><div className="live-overlay"><span>● LIVE DEMO</span><strong>Open Falcons Website ↗</strong></div></div>
          </a>
        </section>

        <section id="values" className="section values reveal-section">
          <div className="section-head compact reveal"><div><p className="eyebrow">WHAT MAHMOUD STANDS FOR</p><h2>MORE THAN<br/><span>TRADING</span></h2></div></div>
          <div className="values-grid">{values.map(([n,title,text]) => <article className="value-card reveal" key={n}><span>{n}</span><i>✦</i><h3>{title}</h3><p>{text}</p></article>)}</div>
        </section>

        <section id="different" className="section different reveal-section">
          <div className="different-copy reveal">
            <p className="eyebrow">MAHMOUD MAGDY — ALWAYS DIFFERENT</p>
            <h2>TECHNOLOGY<br/><span>BEHIND THE VISION</span></h2>
            <p>Mahmoud Magdy combines trading knowledge with technology, building custom bots, AI-powered tools and internal workflows for Falcons Organization.</p>
            <p>These tools are designed to streamline market analysis, organize trading workflows and make the day-to-day process more efficient for the Falcons community — with technology supporting the trader, not replacing discipline and risk management.</p>
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
          <div className="section-head reveal"><div><p className="eyebrow">EVENTS & MOMENTS</p><h2>REAL PEOPLE.<br/><span>REAL IMPACT.</span></h2></div><p className="section-intro">Moments from training sessions, events and the community behind the journey.</p></div>
          <div className="gallery"><figure className="gallery-main reveal"><img src="/images/event-1.jpg" alt="Mahmoud Magdy at an event"/><figcaption>Live Events</figcaption></figure><figure className="gallery-card reveal"><img src="/images/training.jpg" alt="Training session"/><figcaption>Training Sessions</figcaption></figure><figure className="gallery-card reveal"><img src="/images/event-2.jpg" alt="Community event"/><figcaption>Community Moments</figcaption></figure></div>
        </section>

        <section id="impact" className="impact section reveal-section">
          <div className="section-head compact reveal"><div><p className="eyebrow">OUR IMPACT</p><h2>NUMBERS TELL<br/><span>THE STORY</span></h2></div><p className="section-intro">Temporary launch figures — replace them with verified numbers when ready.</p></div>
          <div className="stats"><div className="reveal"><Counter end={2000}/><span>Students</span></div><div className="reveal"><Counter end={1000}/><span>Events & Sessions</span></div><div className="reveal"><Counter end={800}/><span>Community Members</span></div><div className="reveal"><Counter end={15} suffix="+"/><span>Countries</span></div></div>
        </section>

        <section id="media" className="section media reveal-section">
          <div className="section-head reveal"><div><p className="eyebrow">MEDIA & PRESENCE</p><h2>BEHIND THE<br/><span>SCENES</span></h2></div><p className="section-intro">A visual look at events, training and the people behind the Falcons journey.</p></div>
          <div className="media-showcase">
            <figure className="media-feature reveal"><img src="/images/event-1.jpg" alt="Mahmoud Magdy at a live event"/><figcaption><small>01</small><strong>Live Presence</strong></figcaption></figure>
            <figure className="media-feature reveal"><img src="/images/training.jpg" alt="Mahmoud Magdy training"/><figcaption><small>02</small><strong>Education</strong></figcaption></figure>
            <figure className="media-feature reveal"><img src="/images/event-2.jpg" alt="Falcons community event"/><figcaption><small>03</small><strong>Community</strong></figcaption></figure>
          </div>
        </section>

        <section id="contact" className="cta reveal-section"><img src="/images/event-1.jpg" alt=""/><div className="cta-overlay"/><div className="cta-content reveal"><p className="eyebrow">CONNECT WITH MAHMOUD</p><h2>THE JOURNEY<br/><span>DOESN'T END HERE.</span></h2><p>Follow Mahmoud Magdy and discover the vision behind Falcons.</p><div className="hero-buttons"><a className="gold-btn" href={INSTAGRAM} target="_blank" rel="noreferrer">Follow on Instagram ↗</a><a className="outline-btn" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer">Contact on WhatsApp</a></div><div className="contact-socials"><a href={INSTAGRAM} target="_blank" rel="noreferrer"><b>◎</b><span>Instagram</span></a><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><b>◔</b><span>WhatsApp</span></a><a href={FALCONS} target="_blank" rel="noreferrer"><b>𓅃</b><span>Falcons Organization</span></a></div></div></section>
      </main>

      <footer>
        <div className="footer-main"><div className="footer-brand"><span className="brand-mark">M</span><div><b>MAHMOUD MAGDY</b><small>Founder & CEO · Falcons Organization</small></div></div><p>A personal profile built around trading, education, leadership and the journey behind Falcons.</p></div>
        <div className="footer-links">{sections.slice(0,7).map(([label,id]) => <button key={id} onClick={() => go(id)}>{label}</button>)}</div>
        <div className="footer-contact"><a href={FALCONS} target="_blank" rel="noreferrer">Falcons Organization ↗</a></div>
        <div className="copyright"><span>© 2026 Mahmoud Magdy. All Rights Reserved.</span><span>Developed by <a className="developer-link" href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer"><b>Eng. Youssef Adel</b></a></span></div>
      </footer>
    </div>
  );
}

export default App;
