import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    id: "construction",
    num: "01",
    category: "Инвестиции",
    title: "Завършени обекти",
    subtitle: "Собствена инвестиция",
    stat: { value: "100+", label: "обекта" },
    image: null,
    placeholder: "#c4b99a",
    description:
      "През последните 30 години сме изградили множество сгради с най-разнообразно предназначение и сложност. Създали сме успешни партньорства и сме развивали дейността си в България и чужбина.",
    items: [
      "Хотели и резиденции",
      "Жилищни сгради и комплекси",
      "Търговски и офис центрове",
      "Ваканционни комплекси",
      "Промишлени сгради",
    ],
    detail: `Обект: „Хотел с резиденция, фитнес център и басейн"
УПИ IV-872, 1388a, кв.58, м. Витоша „ВЕЦ Симеоново"
ул. Ангел Каралийчев 10

➤ ЗП 970 кв.м.
➤ РЗП над 3200 кв.м.`,
  },
  {
    id: "management",
    num: "02",
    category: "Консултации",
    title: "Управление на проекти",
    subtitle: "Инвеститорски контрол",
    stat: { value: "360°", label: "управление" },
    image: null,
    placeholder: "#b8a98a",
    description:
      "В следствие на дългогодишния ни опит предлагаме цялостно управление на инвестиции, посредничество и инвеститорски контрол — комплексна услуга адаптирана към нуждите на всеки клиент.",
    items: [
      "Дефиниране, планиране и иницииране",
      "Времева рамка и графици",
      "Финансов план и бюджет",
      "Административни услуги",
      "Мониторинг и контрол",
      "Инвеститорски контрол на СМР",
    ],
    detail: `Услугите включват частично или пълно изпълнение съобразено с нуждите на клиента — от малък частен ремонт до голям инвестиционен проект.

Целта е спестяване на време, усилия и средства, които са най-ценни за всеки инвеститор.`,
  },
  {
    id: "renovation",
    num: "03",
    category: "Строителство",
    title: "Довършителни дейности",
    subtitle: "Ремонтни работи",
    stat: { value: "ВиК→", label: "до финиш" },
    image: null,
    placeholder: "#a89878",
    description:
      "Екипът ни е изграден от специалисти и майстори в различни области. Предлагаме пълен затворен кръг от услуги за интериор и екстериор.",
    items: [
      "ВиК, ОВК и електроинсталации",
      "Сухо строителство и бояджийски работи",
      "Топло и хидроизолационни системи",
      "Настилки и облицовки — фаянс, паркет, ПВЦ",
      "Транспорт и доставка на материали",
    ],
    detail: `Предимството на добре познаван и сработен екип дава възможност за по-добра организация и спестяване на средства — независимо дали е ремонт на жилище, офис или довършителни работи на нов обект.`,
  },
  {
    id: "custom",
    num: "04",
    category: "Персонализирано",
    title: "Индивидуални решения",
    subtitle: "По Ваша мярка",
    stat: { value: "1:1", label: "подход" },
    image: null,
    placeholder: "#988870",
    description:
      "Разработваме индивидуални решения изцяло съобразени с нуждите, визията и бюджета на клиента. Гъвкавостта и персоналният подход са в основата на нашата работа.",
    items: [
      "Консултации и предпроектно проучване",
      "Персонализирани технически решения",
      "Съдействие при избор на изпълнители",
      "Комбинирани пакети услуги",
    ],
    detail: `Всеки проект е уникален. Свържете се с нас за безплатна първоначална консултация и индивидуална оферта съобразена с вашия проект.`,
  },
];

// ── MODAL ─────────────────────────────────────────────────────────────────────
function ServiceModal({ service, onClose, isMobile }) {
  const overlayRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 320);
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => e.target === overlayRef.current && handleClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 2000,
        display: "flex",
        alignItems: isMobile ? "flex-end" : "center",
        justifyContent: "center",
        padding: isMobile ? "0" : "1.5rem",
        background: `rgba(10,9,8,${visible ? 0.7 : 0})`,
        backdropFilter: visible ? "blur(5px)" : "blur(0px)",
        transition: "background 0.32s ease, backdrop-filter 0.32s ease",
      }}
    >
      <div style={{
        background: "#fff",
        width: "100%",
        maxWidth: isMobile ? "100%" : "680px",
        // Mobile: slide up from bottom; desktop: fade+scale in
        maxHeight: isMobile ? "88vh" : "88vh",
        overflowY: "auto",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: isMobile
          ? `translateY(${visible ? "0" : "60px"})`
          : `translateY(${visible ? "0" : "20px"}) scale(${visible ? 1 : 0.97})`,
        transition: "opacity 0.32s ease, transform 0.36s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.14)",
        // Rounded top corners on mobile (bottom sheet style)
        borderRadius: isMobile ? "16px 16px 0 0" : "0",
      }}>

        {/* Mobile drag handle */}
        {isMobile && (
          <div style={{
            display: "flex", justifyContent: "center",
            paddingTop: "0.85rem", paddingBottom: "0.25rem",
          }}>
            <div style={{
              width: "36px", height: "4px",
              background: "#e0d8cc", borderRadius: "2px",
            }} />
          </div>
        )}

        {/* ── STICKY HEADER ── */}
        <div style={{
          padding: isMobile ? "1rem 1.25rem 1rem" : "2rem 2.5rem 1.5rem",
          position: "sticky", top: 0,
          background: "#fff", zIndex: 1,
          borderBottom: "1px solid #f0ebe3",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          gap: "1rem",
        }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.58rem", letterSpacing: "0.28em",
              color: "#b8963e", textTransform: "uppercase",
              marginBottom: "0.35rem",
            }}>
              {service.num} · {service.category}
            </p>
            <h2 style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: isMobile ? "1.35rem" : "clamp(1.4rem, 3vw, 1.9rem)",
              fontWeight: 400, color: "#1a1814",
              lineHeight: 1.2,
              whiteSpace: "normal", wordBreak: "break-word",
            }}>
              {service.title}
            </h2>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.7rem", color: "#b8963e",
              marginTop: "0.25rem", letterSpacing: "0.06em",
            }}>
              {service.subtitle}
            </p>
          </div>

          <button
            onClick={handleClose}
            style={{
              background: "none", border: "1px solid #e0d8cc",
              width: "36px", height: "36px", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#8a8278", fontSize: "0.9rem",
              transition: "border-color 0.2s, color 0.2s",
              borderRadius: "0",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#b8963e";
              e.currentTarget.style.color = "#b8963e";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "#e0d8cc";
              e.currentTarget.style.color = "#8a8278";
            }}
          >
            ✕
          </button>
        </div>

        {/* ── BODY ── */}
        <div style={{ padding: isMobile ? "1.25rem" : "2rem 2.5rem 2.5rem" }}>

          {/* Stat */}
          <div style={{
            display: "inline-flex", alignItems: "baseline", gap: "0.75rem",
            borderLeft: "3px solid #b8963e",
            paddingLeft: "1rem",
            marginBottom: "1.5rem",
          }}>
            <span style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: isMobile ? "1.8rem" : "2.2rem",
              color: "#b8963e", lineHeight: 1,
            }}>
              {service.stat.value}
            </span>
            <span style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.18em",
              color: "#8a8278", textTransform: "uppercase",
            }}>
              {service.stat.label}
            </span>
          </div>

          {/* Description */}
          <p style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: isMobile ? "0.95rem" : "1rem",
            color: "#5a5248", lineHeight: 1.85,
            marginBottom: "1.5rem",
          }}>
            {service.description}
          </p>

          <div style={{
            width: "36px", height: "1px",
            background: "#b8963e", marginBottom: "1.5rem",
          }} />

          {/* Items + detail — стак на мобилен, грид на десктоп */}
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: isMobile ? "1.5rem" : "2rem",
            marginBottom: "1.75rem",
          }}>
            {/* Items list */}
            <div>
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.25em",
                color: "#b8963e", textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}>
                Включва
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {service.items.map((item) => (
                  <li key={item} style={{
                    display: "flex", alignItems: "flex-start", gap: "0.7rem",
                    fontFamily: "'Helvetica Neue', sans-serif",
                    fontSize: "0.82rem", color: "#5a5248", lineHeight: 1.5,
                  }}>
                    <span style={{
                      width: "5px", height: "5px", background: "#b8963e",
                      borderRadius: "50%", flexShrink: 0, marginTop: "0.42rem",
                    }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Detail */}
            <div style={{
              borderLeft: isMobile ? "none" : "1px solid #e0d8cc",
              borderTop: isMobile ? "1px solid #e0d8cc" : "none",
              paddingLeft: isMobile ? 0 : "2rem",
              paddingTop: isMobile ? "1.5rem" : 0,
            }}>
              <p style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.58rem", letterSpacing: "0.25em",
                color: "#b8963e", textTransform: "uppercase",
                marginBottom: "0.85rem",
              }}>
                Детайли
              </p>
              <p style={{
                fontFamily: "'Times New Roman', serif",
                fontSize: "0.9rem", color: "#8a8278",
                lineHeight: 1.85, fontStyle: "italic",
                whiteSpace: "pre-line",
              }}>
                {service.detail}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{
            borderTop: "1px solid #e0d8cc",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: isMobile ? "stretch" : "flex-end",
          }}>
            <button
              onClick={() => {
                handleClose();
                setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 380);
              }}
              style={{
                background: "#b8963e", border: "none", color: "#fff",
                padding: "0.9rem 2rem",
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "0.65rem", letterSpacing: "0.2em",
                textTransform: "uppercase", cursor: "pointer",
                transition: "background 0.25s",
                width: isMobile ? "100%" : "auto",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#9a7b30"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#b8963e"}
            >
              Запитване →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CARD ─────────────────────────────────────────────────────────────────────
function ServiceCard({ service, index, onClick, isMobile }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        // На мобилен: широка хоризонтална карта; на десктоп: вертикална 3/4
        aspectRatio: isMobile ? "4/3" : "3/4",
        // Фиксирана ширина на мобилен за horizontal scroll
        width: isMobile ? "72vw" : "auto",
        flexShrink: isMobile ? 0 : undefined,
        background: service.image
          ? `url(${service.image}) center/cover`
          : service.placeholder,
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s ease",
        boxShadow: hovered ? "0 20px 48px rgba(0,0,0,0.16)" : "0 2px 8px rgba(0,0,0,0.06)",
        animation: `cardEntrance 0.6s ease ${index * 0.1}s both`,
      }}
    >
      {/* Placeholder texture */}
      {!service.image && (
        <>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }} />
          <div style={{
            position: "absolute", bottom: "-1rem", right: "0.5rem",
            fontFamily: "'Times New Roman', serif",
            fontSize: isMobile ? "6rem" : "9rem",
            lineHeight: 1,
            color: "rgba(255,255,255,0.07)",
            userSelect: "none", pointerEvents: "none",
          }}>
            {service.num}
          </div>
        </>
      )}

      {/* Dark gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(20,18,14,0.85) 0%, rgba(20,18,14,0.28) 50%, transparent 80%)",
        opacity: hovered ? 1 : 0.7,
        transition: "opacity 0.4s ease",
      }} />

      {/* Gold top line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, #b8963e, #e8d5a3, #b8963e)",
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* Top row */}
      <div style={{
        position: "absolute", top: "1.25rem",
        left: "1.25rem", right: "1.25rem",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: "0.58rem", letterSpacing: "0.22em",
          color: "rgba(255,255,255,0.55)",
          background: "rgba(0,0,0,0.15)",
          padding: "0.22rem 0.55rem",
          backdropFilter: "blur(4px)",
        }}>
          {service.num}
        </span>

        {/* ↗ hint circle */}
        <div style={{
          width: "32px", height: "32px",
          border: `1px solid rgba(184,150,62,${hovered ? 0.9 : 0.4})`,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "border-color 0.3s, transform 0.35s",
          transform: hovered ? "scale(1)" : "scale(0.75)",
        }}>
          <span style={{
            fontSize: "0.68rem",
            color: `rgba(184,150,62,${hovered ? 1 : 0.5})`,
            transition: "color 0.3s",
          }}>
            ↗
          </span>
        </div>
      </div>

      {/* Bottom content */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: isMobile ? "1.25rem" : "1.75rem 1.5rem",
        zIndex: 2,
      }}>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: "0.56rem", letterSpacing: "0.26em",
          color: "#b8963e", textTransform: "uppercase",
          marginBottom: "0.35rem",
          transform: hovered ? "translateY(0)" : "translateY(3px)",
          transition: "transform 0.4s ease",
        }}>
          {service.category}
        </p>
        <h3 style={{
          fontFamily: "'Times New Roman', serif",
          fontSize: isMobile ? "1.05rem" : "clamp(1rem, 2vw, 1.3rem)",
          fontWeight: 400, color: "#fff",
          lineHeight: 1.2, marginBottom: "0.25rem",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.4s ease 0.04s",
        }}>
          {service.title}
        </h3>
        <p style={{
          fontFamily: "'Helvetica Neue', sans-serif",
          fontSize: "0.65rem",
          color: "rgba(255,255,255,0.48)",
          transform: hovered ? "translateY(0)" : "translateY(4px)",
          transition: "transform 0.4s ease 0.08s",
        }}>
          {service.subtitle}
        </p>

        {/* Stat — on hover desktop / always on mobile */}
        <div style={{
          overflow: "hidden",
          maxHeight: (hovered || isMobile) ? "60px" : "0",
          opacity: (hovered || isMobile) ? 1 : 0,
          transition: "max-height 0.4s ease 0.1s, opacity 0.35s ease 0.1s",
        }}>
          <div style={{
            width: "100%", height: "1px",
            background: "rgba(184,150,62,0.35)",
            margin: "0.75rem 0",
          }} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: isMobile ? "1.3rem" : "1.5rem",
              color: "#b8963e",
            }}>
              {service.stat.value}
            </span>
            <span style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.56rem", letterSpacing: "0.15em",
              color: "rgba(255,255,255,0.4)", textTransform: "uppercase",
            }}>
              {service.stat.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SECTION ───────────────────────────────────────────────────────────────────
export default function ServicesSection() {
  const [openService, setOpenService] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="services" style={{
      background: "#f8f5ef",
      borderTop: "1px solid #e0d8cc",
      padding: isMobile ? "3.5rem 0" : "7rem 0",
    }}>
      <style>{`
        @keyframes cardEntrance {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* Hide scrollbar on mobile strip */
        .services-mobile-strip {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .services-mobile-strip::-webkit-scrollbar { display: none; }
      `}</style>

      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: isMobile ? "0 1.25rem" : "0 4rem",
      }}>
        {/* Header */}
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: isMobile ? "1.75rem" : "3rem",
          flexWrap: "wrap", gap: "0.75rem",
        }}>
          <div>
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.3em",
              color: "#b8963e", textTransform: "uppercase", marginBottom: "0.4rem",
            }}>
              Нашите дейности
            </p>
            <h2 style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: isMobile ? "1.7rem" : "clamp(1.8rem,3vw,2.8rem)",
              fontWeight: 400, color: "#1a1814",
            }}>
              Услуги
            </h2>
          </div>
          {isMobile ? (
            <p style={{
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.12em",
              color: "#b0a898", fontStyle: "italic",
            }}>
              Плъзнете · Кликнете за детайли
            </p>
          ) : (
            <p style={{
              fontFamily: "'Times New Roman', serif",
              fontSize: "0.9rem", color: "#8a8278", fontStyle: "italic",
            }}>
              Кликнете върху услуга за повече информация
            </p>
          )}
        </div>
      </div>

      {/* ── MOBILE: horizontal scroll strip ── */}
      {isMobile ? (
        <div
          ref={scrollRef}
          className="services-mobile-strip"
          style={{
            display: "flex",
            gap: "1px",
            overflowX: "auto",
            paddingLeft: "1.25rem",
            paddingRight: "1.25rem",
            // Snap to each card
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {SERVICES.map((s, i) => (
            <div
              key={s.id}
              style={{ scrollSnapAlign: "start", flexShrink: 0 }}
            >
              <ServiceCard
                service={s}
                index={i}
                onClick={() => setOpenService(s)}
                isMobile={true}
              />
            </div>
          ))}
          {/* trailing space */}
          <div style={{ width: "1rem", flexShrink: 0 }} />
        </div>
      ) : (
        /* ── DESKTOP: 4-column grid ── */
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          padding: "0 4rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5px",
          background: "#e0d8cc",
        }}>
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.id}
              service={s}
              index={i}
              onClick={() => setOpenService(s)}
              isMobile={false}
            />
          ))}
        </div>
      )}

      {/* Bottom row */}
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
        padding: isMobile ? "0 1.25rem" : "0 4rem",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "center", flexWrap: "wrap", gap: "1rem",
          marginTop: "2rem",
          paddingTop: "1.75rem",
          borderTop: "1px solid #e0d8cc",
        }}>
          <p style={{
            fontFamily: "'Times New Roman', serif",
            fontSize: "0.88rem", color: "#8a8278", fontStyle: "italic",
          }}>
            Стойността на услугите се определя спрямо сложността и обема на проекта.
          </p>
          <button
            style={{
              background: "#b8963e", border: "none", color: "#fff",
              padding: "0.85rem 2rem",
              fontFamily: "'Helvetica Neue', sans-serif",
              fontSize: "0.65rem", letterSpacing: "0.2em",
              textTransform: "uppercase", cursor: "pointer",
              transition: "background 0.3s", flexShrink: 0,
              width: isMobile ? "100%" : "auto",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#9a7b30"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#b8963e"}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            Свържете се с нас
          </button>
        </div>
      </div>

      {/* Modal */}
      {openService && (
        <ServiceModal
          service={openService}
          onClose={() => setOpenService(null)}
          isMobile={isMobile}
        />
      )}
    </section>
  );
}