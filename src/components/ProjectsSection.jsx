import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    num: "01",
    category: "Жилищно строителство",
    title: "Хотел с резиденция,\nфитнес и басейн",
    location: "ул. Ангел Каралийчев 10, Витоша",
    year: "2019",
    area: "3 200+ м²",
    description:
      "Хотел с резиденция, фитнес център и басейн в подножието на Витоша. Проектът съчетава луксозно жилищно пространство с хотелски услуги.",
    specs: [
      { label: "ЗП", value: "970 м²" },
      { label: "РЗП", value: "3 200+ м²" },
      { label: "Етажи", value: "6" },
    ],
    placeholderColor: "#d4c9b4",
    placeholderLabel: "Хотел Витоша",
    image: null,
  },
  {
    id: 2,
    num: "02",
    category: "Търговски обект",
    title: "Търговски и офис\nцентър",
    location: "София, България",
    year: "2016",
    area: "2 800 м²",
    description:
      "Многофункционален комплекс с търговски площи на ниско ниво и офис пространства на горните етажи.",
    specs: [
      { label: "РЗП", value: "2 800 м²" },
      { label: "Търговия", value: "1 200 м²" },
      { label: "Офиси", value: "1 600 м²" },
    ],
    placeholderColor: "#c8bfa8",
    placeholderLabel: "Офис център",
    image: null,
  },
  {
    id: 3,
    num: "03",
    category: "Жилищно строителство",
    title: "Жилищна сграда\nс подземен гараж",
    location: "Лозенец, София",
    year: "2014",
    area: "4 100 м²",
    description:
      "Луксозна жилищна сграда с апартаменти, подземен гараж и озеленени общи пространства.",
    specs: [
      { label: "РЗП", value: "4 100 м²" },
      { label: "Апартаменти", value: "28" },
      { label: "Гаражи", value: "34" },
    ],
    placeholderColor: "#bfb49c",
    placeholderLabel: "Жил. сграда",
    image: null,
  },
  {
    id: 4,
    num: "04",
    category: "Ваканционен имот",
    title: "Ваканционен\nкомплекс",
    location: "Банско, България",
    year: "2012",
    area: "1 800 м²",
    description:
      "Ваканционен комплекс с апартаменти в полите на Пирин. Природосъобразна архитектура с традиционни форми.",
    specs: [
      { label: "РЗП", value: "1 800 м²" },
      { label: "Апартаменти", value: "16" },
      { label: "Год. строеж", value: "2012" },
    ],
    placeholderColor: "#b4aa92",
    placeholderLabel: "Банско",
    image: null,
  },
  {
    id: 5,
    num: "05",
    category: "Реновация",
    title: "Реновация на\nисторическа сграда",
    location: "Стария град, София",
    year: "2010",
    area: "950 м²",
    description:
      "Цялостна реновация и промяна на предназначението на историческа сграда от началото на XX век.",
    specs: [
      { label: "РЗП", value: "950 м²" },
      { label: "Год. строеж", value: "1920" },
      { label: "Реновация", value: "2010" },
    ],
    placeholderColor: "#a89f88",
    placeholderLabel: "Реновация",
    image: null,
  },
  {
    id: 6,
    num: "06",
    category: "Промишлено строителство",
    title: "Логистичен\nцентър",
    location: "Бизнес парк София",
    year: "2008",
    area: "8 500 м²",
    description:
      "Съвременен логистичен и дистрибуционен център с офис блок, складови помещения и товарни рампи.",
    specs: [
      { label: "РЗП", value: "8 500 м²" },
      { label: "Склад", value: "7 200 м²" },
      { label: "Офиси", value: "1 300 м²" },
    ],
    placeholderColor: "#9c9480",
    placeholderLabel: "Логистика",
    image: null,
  },
  {
    id: 7,
    num: "07",
    category: "Хотелиерство",
    title: "Бутиков хотел\nв планината",
    location: "Боровец, България",
    year: "2005",
    area: "2 200 м²",
    description:
      "Бутиков планински хотел с ресторант, СПА и конферентна зала, вдъхновен от традиционните планински форми.",
    specs: [
      { label: "РЗП", value: "2 200 м²" },
      { label: "Стаи", value: "42" },
      { label: "СПА", value: "400 м²" },
    ],
    placeholderColor: "#918878",
    placeholderLabel: "Боровец",
    image: null,
  },
];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState(1);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const timeoutRef = useRef(null);
  const isMobile = useIsMobile();

  const goTo = (index) => {
    if (animating || index === active) return;
    setDirection(index > active ? 1 : -1);
    setAnimating(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setDisplayedIndex(index);
      setActive(index);
      setAnimating(false);
    }, 380);
  };

  const prev = () => goTo(active > 0 ? active - 1 : PROJECTS.length - 1);
  const next = () => goTo(active < PROJECTS.length - 1 ? active + 1 : 0);

  // Touch/swipe support
  const touchStartX = useRef(null);
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const project = PROJECTS[displayedIndex];

  return (
    <section
      id="projects"
      style={{
        background: "#f8f5ef",
        borderTop: "1px solid #e0d8cc",
        padding: isMobile ? "4rem 0" : "7rem 0",
        overflow: "hidden",
      }}
    >
      <style>{`
        .proj-num-btn {
          background: none; border: none;
          font-family: 'Helvetica Neue', Arial, sans-serif;
          font-size: 0.62rem; letter-spacing: 0.15em;
          cursor: pointer; padding: 0.5rem 0;
          transition: color 0.3s; display: block; width: 100%; text-align: center;
        }
        .proj-num-btn.active { color: #b8963e; }
        .proj-num-btn:not(.active) { color: #c8c0b4; }
        .proj-num-btn:not(.active):hover { color: #8a8278; }
        .proj-nav-arrow {
          background: none; border: 1px solid #e0d8cc;
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #8a8278; font-size: 1.1rem;
          transition: border-color 0.3s, color 0.3s; flex-shrink: 0;
        }
        .proj-nav-arrow:hover { border-color: #b8963e; color: #b8963e; }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .img-enter-fwd  { animation: slideInRight 0.38s ease forwards; }
        .img-enter-back { animation: slideInLeft  0.38s ease forwards; }
        .text-enter     { animation: fadeSlideUp  0.45s ease 0.05s both; }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "0 1.25rem" : "0 4rem" }}>

        {/* ── HEADER ── */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", marginBottom: isMobile ? "2rem" : "4rem",
          gap: "1rem",
        }}>
          <div>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.62rem",
              letterSpacing: "0.3em", color: "#b8963e",
              textTransform: "uppercase", marginBottom: "0.5rem",
            }}>
              Портфолио
            </p>
            <h2 style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: isMobile ? "1.6rem" : "clamp(1.8rem,3vw,2.8rem)",
              fontWeight: 400, color: "#1a1814",
            }}>
              Завършени проекти
            </h2>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="proj-nav-arrow" onClick={prev}>←</button>
            <button className="proj-nav-arrow" onClick={next}>→</button>
          </div>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        {isMobile ? (
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* Image — full width on mobile, top */}
            <div
              key={`img-mob-${displayedIndex}`}
              className={direction > 0 ? "img-enter-fwd" : "img-enter-back"}
              style={{
                width: "100%",
                aspectRatio: "3/2",
                background: project.image
                  ? `url(${project.image}) center/cover`
                  : project.placeholderColor,
                position: "relative",
                overflow: "hidden",
                marginBottom: "1.5rem",
              }}
            >
              {!project.image && (
                <>
                  <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <span style={{
                      fontFamily: "'Times New Roman', serif",
                      fontSize: "2.5rem",
                      color: "rgba(255,255,255,0.22)",
                      letterSpacing: "0.05em",
                      userSelect: "none",
                    }}>
                      {project.placeholderLabel}
                    </span>
                  </div>
                  <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }} />
                </>
              )}
              {/* Year tag */}
              <div style={{
                position: "absolute", top: "1rem", right: "1rem",
                background: "rgba(248,245,239,0.92)",
                padding: "0.3rem 0.7rem",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.6rem", letterSpacing: "0.2em", color: "#b8963e",
              }}>
                {project.year}
              </div>
              {/* Bottom gradient */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(transparent, rgba(26,24,20,0.45))",
                padding: "2rem 1rem 0.75rem",
              }}>
                <p style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "1rem", color: "rgba(255,255,255,0.9)",
                }}>
                  {project.area}
                </p>
              </div>
            </div>

            {/* Text — below image on mobile */}
            <div
              key={`text-mob-${displayedIndex}`}
              className="text-enter"
            >
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.6rem",
                letterSpacing: "0.28em", color: "#b8963e",
                textTransform: "uppercase", marginBottom: "0.75rem",
              }}>
                {project.num} — {project.category}
              </p>
              <h3 style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "1.5rem", fontWeight: 400, color: "#1a1814",
                lineHeight: 1.2, whiteSpace: "pre-line", marginBottom: "0.6rem",
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.68rem",
                letterSpacing: "0.1em", color: "#b8963e", marginBottom: "1.25rem",
              }}>
                {project.location} · {project.year}
              </p>
              <div style={{ width: "30px", height: "1px", background: "#b8963e", marginBottom: "1rem" }} />
              <p style={{
                fontFamily: "'Times New Roman', serif", fontSize: "0.92rem",
                color: "#8a8278", lineHeight: 1.8, marginBottom: "1.5rem",
              }}>
                {project.description}
              </p>

              {/* Specs — horizontal on mobile */}
              <div style={{
                display: "flex", borderTop: "1px solid #e0d8cc",
                marginBottom: "1.5rem", overflowX: "auto",
              }}>
                {project.specs.map((s, i) => (
                  <div key={s.label} style={{
                    padding: "1rem 1.25rem",
                    borderRight: i < project.specs.length - 1 ? "1px solid #e0d8cc" : "none",
                    flexShrink: 0,
                  }}>
                    <div style={{
                      fontFamily: "'Times New Roman', serif",
                      fontSize: "1.1rem", color: "#b8963e", lineHeight: 1,
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontSize: "0.56rem", letterSpacing: "0.12em",
                      color: "#b0a898", textTransform: "uppercase", marginTop: "0.3rem",
                    }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", marginBottom: "0.5rem" }}>
                {PROJECTS.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{
                    width: i === active ? "22px" : "5px",
                    height: "2px",
                    background: i === active ? "#b8963e" : "#d4c9b4",
                    border: "none", cursor: "pointer",
                    transition: "width 0.4s, background 0.3s", padding: 0,
                  }} />
                ))}
              </div>
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.15em",
                color: "#c8c0b4", textTransform: "uppercase", marginTop: "0.5rem",
              }}>
                Плъзнете за следващ проект
              </p>
            </div>
          </div>

        ) : (
          /* ── DESKTOP LAYOUT ── */
          <div style={{
            display: "grid",
            gridTemplateColumns: "48px 1fr 1fr",
            gap: "0 3rem",
            alignItems: "start",
          }}>
            {/* Number rail */}
            <div style={{
              display: "flex", flexDirection: "column", gap: "0.2rem",
              paddingTop: "0.5rem", borderLeft: "1px solid #e0d8cc",
            }}>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.id}
                  className={`proj-num-btn${active === i ? " active" : ""}`}
                  onClick={() => goTo(i)}
                >
                  {p.num}
                  {active === i && (
                    <span style={{
                      display: "block", width: "2px", height: "18px",
                      background: "#b8963e", margin: "0.3rem auto",
                    }} />
                  )}
                </button>
              ))}
            </div>

            {/* Text panel */}
            <div
              key={`text-${displayedIndex}`}
              className="text-enter"
              style={{ paddingTop: "0.5rem" }}
            >
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.62rem",
                letterSpacing: "0.3em", color: "#b8963e",
                textTransform: "uppercase", marginBottom: "1.25rem",
              }}>
                {project.num} — {project.category}
              </p>
              <h3 style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "clamp(1.6rem,2.5vw,2.4rem)",
                fontWeight: 400, color: "#1a1814",
                lineHeight: 1.2, whiteSpace: "pre-line", marginBottom: "0.75rem",
              }}>
                {project.title}
              </h3>
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif", fontSize: "0.7rem",
                letterSpacing: "0.12em", color: "#b8963e", marginBottom: "2rem",
              }}>
                {project.location} · {project.year}
              </p>
              <div style={{ width: "36px", height: "1px", background: "#b8963e", marginBottom: "1.5rem" }} />
              <p style={{
                fontFamily: "'Times New Roman', serif", fontSize: "0.95rem",
                color: "#8a8278", lineHeight: 1.85,
                marginBottom: "2.5rem", maxWidth: "400px",
              }}>
                {project.description}
              </p>

              {/* Specs */}
              <div style={{
                display: "flex", borderTop: "1px solid #e0d8cc", marginBottom: "2.5rem",
              }}>
                {project.specs.map((s, i) => (
                  <div key={s.label} style={{
                    padding: "1.25rem 1.5rem",
                    borderRight: i < project.specs.length - 1 ? "1px solid #e0d8cc" : "none",
                    minWidth: "90px",
                  }}>
                    <div style={{
                      fontFamily: "'Times New Roman', serif",
                      fontSize: "1.25rem", color: "#b8963e", lineHeight: 1,
                    }}>
                      {s.value}
                    </div>
                    <div style={{
                      fontFamily: "'Helvetica Neue', sans-serif",
                      fontSize: "0.58rem", letterSpacing: "0.15em",
                      color: "#b0a898", textTransform: "uppercase", marginTop: "0.4rem",
                    }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress dots */}
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                {PROJECTS.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{
                    width: i === active ? "24px" : "6px",
                    height: "2px",
                    background: i === active ? "#b8963e" : "#d4c9b4",
                    border: "none", cursor: "pointer",
                    transition: "width 0.4s, background 0.3s", padding: 0,
                  }} />
                ))}
              </div>
            </div>

            {/* Image panel */}
            <div style={{ position: "relative" }}>
              <div
                key={`img-${displayedIndex}`}
                className={direction > 0 ? "img-enter-fwd" : "img-enter-back"}
                style={{
                  aspectRatio: "4/5",
                  background: project.image
                    ? `url(${project.image}) center/cover`
                    : project.placeholderColor,
                  position: "relative", overflow: "hidden",
                }}
              >
                {!project.image && (
                  <>
                    <div style={{
                      position: "absolute", inset: 0,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{
                        fontFamily: "'Times New Roman', serif",
                        fontSize: "clamp(2.5rem,6vw,5rem)",
                        color: "rgba(255,255,255,0.22)",
                        letterSpacing: "0.05em", userSelect: "none",
                      }}>
                        {project.placeholderLabel}
                      </span>
                    </div>
                    <div style={{
                      position: "absolute", inset: 0,
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }} />
                  </>
                )}
                <div style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  background: "rgba(248,245,239,0.92)",
                  padding: "0.4rem 0.85rem",
                  fontFamily: "'Helvetica Neue', sans-serif",
                  fontSize: "0.62rem", letterSpacing: "0.2em", color: "#b8963e",
                }}>
                  {project.year}
                </div>
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  background: "linear-gradient(transparent, rgba(26,24,20,0.5))",
                  padding: "3rem 1.5rem 1.5rem",
                }}>
                  <p style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: "1.1rem", color: "rgba(255,255,255,0.9)",
                  }}>
                    {project.area}
                  </p>
                </div>
              </div>
              {/* Decorative offset border */}
              <div style={{
                position: "absolute",
                bottom: "-12px", right: "-12px",
                width: "60%", height: "40%",
                border: "1px solid #d4c9b4",
                zIndex: -1, pointerEvents: "none",
              }} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}