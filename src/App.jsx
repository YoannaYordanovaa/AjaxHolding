import { useState, useEffect, useRef, useCallback } from "react";
import logoSrc from "/src/assets/logo.png";

// ─── IMAGES — замени с реални пътища ──────────────────────────────────────────
const HERO_BG = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85";

const SVC_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
];

const PROJ_IMAGES = [
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
  "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
];

// ─── DATA ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    id:"objects", num:"01",
    title:"Завършени обекти",
    subtitle:"Собствена инвестиция",
    short:"Хотели, резиденции и търговски сгради",
    stat:"100+", statLabel:"обекта",
    description:"През последните 30 години сме изградили множество сгради с най-разнообразно предназначение и сложност. Развивали сме дейността си в България и чужбина.",
    items:["Хотели и резиденции","Жилищни сгради","Търговски центрове","Ваканционни комплекси"],
    detail:`Обект: „Хотел с резиденция, фитнес и басейн"\nул. Ангел Каралийчев 10, Витоша\n➤ ЗП 970 м²  ➤ РЗП над 3200 м²`,
  },
  {
    id:"management", num:"02",
    title:"Управление на проекти",
    subtitle:"Инвеститорски контрол",
    short:"От идея до въвеждане в експлоатация",
    stat:"360°", statLabel:"управление",
    description:"Предлагаме цялостно управление на инвестиции, посредничество и инвеститорски контрол. Комплексна услуга адаптирана към нуждите на всеки клиент.",
    items:["Планиране и бюджет","Времева рамка","Административни услуги","Мониторинг на СМР"],
    detail:`Услугите включват частично или пълно изпълнение — от малък ремонт до голям инвестиционен проект.`,
  },
  {
    id:"renovation", num:"03",
    title:"Довършителни дейности",
    subtitle:"Ремонтни работи",
    short:"Пълен кръг — ВиК, електро, настилки",
    stat:"ВиК→", statLabel:"до финиш",
    description:"Екипът ни е изграден от специалисти в различни области. Предлагаме пълен затворен кръг от услуги за интериор и екстериор.",
    items:["ВиК, ОВК и електро","Сухо строителство","Настилки и облицовки","Хидроизолации"],
    detail:`Предимството на добре сработен екип дава по-добра организация и спестяване на средства.`,
  },
  {
    id:"custom", num:"04",
    title:"Индивидуални решения",
    subtitle:"По Ваша мярка",
    short:"Персонален подход за всеки проект",
    stat:"1:1", statLabel:"подход",
    description:"Разработваме индивидуални решения изцяло съобразени с нуждите, визията и бюджета на клиента.",
    items:["Консултации","Персонални решения","Избор на изпълнители","Комбинирани пакети"],
    detail:`Свържете се с нас за безплатна консултация и индивидуална оферта.`,
  },
];

const PROJECTS = [
  {id:1,num:"01",year:"2019",title:"Хотел с резиденция",sub:"Витоша · Симеоново",cat:"Жилищно строителство",area:"3 200+ м²",
   desc:"Хотел с резиденция, фитнес и басейн в подножието на Витоша.",specs:[{l:"ЗП",v:"970 м²"},{l:"РЗП",v:"3 200+ м²"},{l:"Етажи",v:"6"}]},
  {id:2,num:"02",year:"2016",title:"Търговски и офис център",sub:"София · България",cat:"Търговски обект",area:"2 800 м²",
   desc:"Многофункционален комплекс с търговски площи и офис пространства.",specs:[{l:"РЗП",v:"2 800 м²"},{l:"Търговия",v:"1 200 м²"},{l:"Офиси",v:"1 600 м²"}]},
  {id:3,num:"03",year:"2014",title:"Жилищна сграда",sub:"Лозенец · София",cat:"Жилищно строителство",area:"4 100 м²",
   desc:"Луксозна жилищна сграда с апартаменти, подземен гараж и озеленени пространства.",specs:[{l:"РЗП",v:"4 100 м²"},{l:"Апартаменти",v:"28"},{l:"Гаражи",v:"34"}]},
  {id:4,num:"04",year:"2012",title:"Ваканционен комплекс",sub:"Банско · Пирин",cat:"Ваканционен имот",area:"1 800 м²",
   desc:"Ваканционен комплекс в полите на Пирин с природосъобразна архитектура.",specs:[{l:"РЗП",v:"1 800 м²"},{l:"Апартаменти",v:"16"},{l:"Год.",v:"2012"}]},
  {id:5,num:"05",year:"2010",title:"Историческа реновация",sub:"Стар град · София",cat:"Реновация",area:"950 м²",
   desc:"Цялостна реновация на историческа сграда от XX век.",specs:[{l:"РЗП",v:"950 м²"},{l:"Строена",v:"1920"},{l:"Реновация",v:"2010"}]},
  {id:6,num:"06",year:"2008",title:"Логистичен център",sub:"Бизнес парк · София",cat:"Промишлено",area:"8 500 м²",
   desc:"Съвременен логистичен и дистрибуционен център с офис блок.",specs:[{l:"РЗП",v:"8 500 м²"},{l:"Склад",v:"7 200 м²"},{l:"Офиси",v:"1 300 м²"}]},
  {id:7,num:"07",year:"2005",title:"Бутиков хотел",sub:"Боровец · Рила",cat:"Хотелиерство",area:"2 200 м²",
   desc:"Планински хотел с ресторант, СПА и конферентна зала.",specs:[{l:"РЗП",v:"2 200 м²"},{l:"Стаи",v:"42"},{l:"СПА",v:"400 м²"}]},
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const fn = () => setM(window.innerWidth < 768);
    fn(); window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return m;
}

// ─── SERVICE MODAL ────────────────────────────────────────────────────────────

function ServiceModal({ svc, img, onClose, isMobile }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVis(true));
    const fn = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", fn); document.body.style.overflow = ""; };
  }, []);

  const close = () => { setVis(false); setTimeout(onClose, 320); };

  return (
    <div ref={ref} onClick={(e) => e.target === ref.current && close()}
      style={{ position:"fixed", inset:0, zIndex:3000,
        display:"flex", alignItems: isMobile ? "flex-end" : "center", justifyContent:"center",
        padding: isMobile ? 0 : "2rem",
        background: `rgba(20,18,14,${vis ? 0.6 : 0})`,
        backdropFilter: vis ? "blur(10px)" : "blur(0)",
        transition: "background 0.32s, backdrop-filter 0.32s",
      }}>
      <div style={{
        background:"#faf7f2", width:"100%", maxWidth: isMobile ? "100%" : "760px",
        maxHeight: isMobile ? "90vh" : "88vh", overflowY:"auto",
        borderRadius: isMobile ? "20px 20px 0 0" : 0,
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : isMobile ? "translateY(40px)" : "translateY(16px) scale(0.98)",
        transition: "opacity 0.32s, transform 0.38s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
      }}>
        {isMobile && (
          <div style={{ display:"flex", justifyContent:"center", padding:"0.8rem 0 0.2rem" }}>
            <div style={{ width:36, height:4, background:"#ddd6c8", borderRadius:2 }} />
          </div>
        )}

        {/* Image */}
        <div style={{ height: isMobile ? 200 : 260, background:`url(${img}) center/cover`, position:"relative" }}>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, #faf7f2 0%, transparent 55%)" }} />
          <button onClick={close}
            style={{ position:"absolute", top:"1.25rem", right:"1.25rem", background:"rgba(250,247,242,0.9)", border:"none", width:36, height:36, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#5a5248", fontSize:"0.85rem" }}
            onMouseEnter={e => e.currentTarget.style.background="#faf7f2"}
            onMouseLeave={e => e.currentTarget.style.background="rgba(250,247,242,0.9)"}>✕</button>
        </div>

        <div style={{ padding: isMobile ? "1.25rem 1.5rem 2rem" : "2rem 2.5rem 2.5rem" }}>
          <p style={{ fontFamily:"var(--sans)", fontSize:"0.58rem", letterSpacing:"0.3em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.4rem" }}>
            {svc.num} · {svc.subtitle}
          </p>
          <h2 style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "1.5rem" : "2rem", fontWeight:400, color:"var(--ink)", lineHeight:1.2, marginBottom:"1.5rem" }}>
            {svc.title}
          </h2>
          <div style={{ display:"inline-flex", alignItems:"baseline", gap:"0.6rem", borderLeft:"3px solid var(--gold)", paddingLeft:"1rem", marginBottom:"1.5rem" }}>
            <span style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "2rem" : "2.4rem", color:"var(--gold)", lineHeight:1 }}>{svc.stat}</span>
            <span style={{ fontFamily:"var(--sans)", fontSize:"0.58rem", letterSpacing:"0.18em", color:"var(--muted)", textTransform:"uppercase" }}>{svc.statLabel}</span>
          </div>
          <p style={{ fontFamily:"var(--serif)", fontSize:"0.98rem", color:"var(--muted)", lineHeight:1.9, marginBottom:"1.75rem" }}>{svc.description}</p>
          <div style={{ width:36, height:1, background:"var(--gold)", marginBottom:"1.75rem" }} />
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "1.5rem" : "2rem", marginBottom:"2rem" }}>
            <div>
              <p style={{ fontFamily:"var(--sans)", fontSize:"0.58rem", letterSpacing:"0.25em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.85rem" }}>Включва</p>
              <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:"0.55rem" }}>
                {svc.items.map(it => (
                  <li key={it} style={{ display:"flex", gap:"0.7rem", fontFamily:"var(--sans)", fontSize:"0.82rem", color:"var(--muted)", lineHeight:1.5 }}>
                    <span style={{ width:5, height:5, background:"var(--gold)", borderRadius:"50%", flexShrink:0, marginTop:"0.44rem" }} />{it}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ borderLeft: isMobile ? "none" : "1px solid var(--border)", borderTop: isMobile ? "1px solid var(--border)" : "none", paddingLeft: isMobile ? 0 : "2rem", paddingTop: isMobile ? "1.5rem" : 0 }}>
              <p style={{ fontFamily:"var(--sans)", fontSize:"0.58rem", letterSpacing:"0.25em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.85rem" }}>Детайли</p>
              <p style={{ fontFamily:"var(--serif)", fontSize:"0.9rem", color:"var(--muted)", lineHeight:1.9, fontStyle:"italic", whiteSpace:"pre-line" }}>{svc.detail}</p>
            </div>
          </div>
          <div style={{ borderTop:"1px solid var(--border)", paddingTop:"1.5rem", display:"flex", justifyContent: isMobile ? "stretch" : "flex-end" }}>
            <button onClick={() => { close(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }), 380); }}
              style={{ background:"var(--gold)", border:"none", color:"#fff", padding:"0.9rem 2.5rem", fontFamily:"var(--sans)", fontSize:"0.65rem", letterSpacing:"0.22em", textTransform:"uppercase", cursor:"pointer", transition:"background 0.25s", width: isMobile ? "100%" : "auto" }}
              onMouseEnter={e => e.currentTarget.style.background="#c8a84e"}
              onMouseLeave={e => e.currentTarget.style.background="var(--gold)"}>
              Свържете се →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HERO + SERVICES (точно 100vh заедно) ─────────────────────────────────────

function HeroAndServices({ isMobile, onSvcClick }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 60); }, []);

  const fade = (delay = 0) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "none" : "translateY(14px)",
    transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
  });

  return (
    // Целият блок = точно 100vh
    <section style={{ height:"100vh", minHeight:"560px", display:"flex", flexDirection:"column", position:"relative", overflow:"hidden" }}>

      {/* ── ФОНОВО ИЗОБРАЖЕНИЕ ── */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url('${HERO_BG}')`,
        backgroundSize:"cover", backgroundPosition:"center 30%",
        transform: loaded ? "scale(1)" : "scale(1.04)",
        transition:"transform 1.8s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* Overlay: горе светло → долу тъмно за контраст на текст и услуги */}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(10,8,5,0.90) 0%, rgba(10,8,5,0.5) 50%, rgba(10,8,5,0.90) 100%)" }} />

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"relative", zIndex:10, flexShrink:0,
        padding: isMobile ? "1rem 1.25rem" : "1.25rem 3.5rem",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        ...fade(0.05),
      }}>
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <img src={logoSrc} alt="Аякс Холдинг"
            style={{ height: isMobile ? 34 : 42, objectFit:"contain",
              // Лого е тъмно — добавяме светъл shadow за четимост
              filter:"drop-shadow(0 1px 8px rgba(0,0,0,0.5))" }} />
        </button>

        {!isMobile && (
          <div style={{ display:"flex", gap:"2rem", alignItems:"center" }}>
            {[["about","За нас"],["services","Услуги"],["projects","Проекти"],["contact","Контакти"]].map(([id, label]) => (
              <button key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" })}
                style={{ background:"none", border:"none", fontFamily:"var(--sans)", fontSize:"0.63rem", letterSpacing:"0.22em", color:"rgba(255,255,255,0.7)", cursor:"pointer", textTransform:"uppercase", transition:"color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.color="#fff"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.7)"}>
                {label}
              </button>
            ))}
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
              style={{ background:"var(--gold)", border:"none", color:"#fff", padding:"0.6rem 1.4rem", fontFamily:"var(--sans)", fontSize:"0.62rem", letterSpacing:"0.2em", textTransform:"uppercase", cursor:"pointer", transition:"background 0.3s" }}
              onMouseEnter={e => e.currentTarget.style.background="#c8a84e"}
              onMouseLeave={e => e.currentTarget.style.background="var(--gold)"}>
              Запитване
            </button>
          </div>
        )}

        {isMobile && (
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })}
            style={{ background:"var(--gold)", border:"none", color:"#fff", padding:"0.5rem 1rem", fontFamily:"var(--sans)", fontSize:"0.58rem", letterSpacing:"0.15em", textTransform:"uppercase", cursor:"pointer" }}>
            Контакт
          </button>
        )}
      </nav>

      {/* ── HERO ТЕКСТ — compact, оставя място за услугите ── */}
      <div style={{
        position:"relative", zIndex:5, flex:1,
        display:"flex", flexDirection:"column", justifyContent:"center",
        padding: isMobile ? "0 1.25rem" : "0 3.5rem",
        maxWidth:1400, margin:"0 auto", width:"100%",
        ...fade(0.15),
      }}>
        <p style={{
          fontFamily:"var(--sans)", fontSize: isMobile ? "0.56rem" : "0.62rem",
          letterSpacing:"0.42em", color:"#ffffff",
          textTransform:"uppercase", marginBottom: isMobile ? "0.6rem" : "0.9rem",
          display:"flex", alignItems:"center", gap:"0.6rem",
        }}>
          <span style={{ display:"inline-block", width:22, height:1, background:"var(--gold)" }} />
          Основана 1990 · България
        </p>

        {/* Голям текст с ясен contrast */}
        <h1 style={{
          fontFamily:"var(--serif)",
          fontSize: isMobile ? "clamp(2.6rem,12vw,4rem)" : "clamp(3rem,6.5vw,6rem)",
          fontWeight:400, lineHeight:0.95, letterSpacing:"-0.01em",
          marginBottom: isMobile ? "0.75rem" : "1rem",
          // Бял текст + тежък text-shadow за четимост върху снимка
          color:"#ffffff",
          textShadow:"0 2px 20px rgba(0,0,0,0.5), 0 0 60px rgba(0,0,0,0.3)",
        }}>
          АЯКС<br />
          <span style={{ fontStyle:"italic", color:"rgba(255,255,255,0.65)", textShadow:"0 2px 20px rgba(0,0,0,0.6)" }}>холдинг</span>
        </h1>

        <p style={{
          fontFamily:"var(--serif)", fontSize: isMobile ? "0.88rem" : "1rem",
          color:"#ffffff", lineHeight:1.7, fontStyle:"italic",
          maxWidth:400, marginBottom: isMobile ? "1rem" : "1.5rem",
          textShadow:"0 1px 8px rgba(0,0,0,0.4)",
        }}>
          „С професионализъм можем да се справим с всеки един проект."
        </p>

        {/* Stats */}
        <div style={{ display:"flex", gap: isMobile ? "1.25rem" : "2.5rem", flexWrap:"wrap" }}>
          {[["30+","Години опит"],["100+","Проекти"],["1990","Основана"]].map(([v,l]) => (
            <div key={v}>
              <div style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "1.5rem" : "2rem", color:"var(--gold)", lineHeight:1, textShadow:"0 1px 8px rgba(0,0,0,0.4)" }}>{v}</div>
              <div style={{ fontFamily:"var(--sans)", fontSize:"0.52rem", letterSpacing:"0.2em", color:"rgba(255,255,255)", textTransform:"uppercase", marginTop:"0.2rem" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}


// ─── SERVICES SECTION ────────────────────────────────────────────────────────

function ServicesSection({ isMobile, onSvcClick }) {
  const [secRef, secVis] = useInView(0.08);

  return (
    <section id="services" style={{
      background: "var(--cream)",
      borderTop: "3px solid var(--gold)",
    }}>
      {/* Header */}
      <div ref={secRef} style={{
        maxWidth: 1400, margin: "0 auto",
        padding: isMobile ? "3rem 1.5rem 2rem" : "5rem 3.5rem 3rem",
        opacity: secVis ? 1 : 0,
        transform: secVis ? "none" : "translateY(16px)",
        transition: "opacity 0.8s, transform 0.8s",
      }}>
        <p style={{
          fontFamily: "var(--sans)", fontSize: "0.6rem",
          letterSpacing: "0.38em", color: "var(--gold)",
          textTransform: "uppercase", marginBottom: "0.6rem",
          display: "flex", alignItems: "center", gap: "0.6rem",
        }}>
          <span style={{ display: "inline-block", width: 22, height: 1, background: "var(--gold)" }} />
          Нашите услуги
        </p>
        <div style={{
          display: "flex", justifyContent: "space-between",
          alignItems: "flex-end", flexWrap: "wrap", gap: "1rem",
        }}>
          <h2 style={{
            fontFamily: "var(--serif)",
            fontSize: isMobile ? "1.9rem" : "clamp(2rem,3vw,2.8rem)",
            fontWeight: 400, color: "var(--ink)",
          }}>
            Какво предлагаме
          </h2>
          {!isMobile && (
            <p style={{
              fontFamily: "var(--serif)", fontSize: "0.9rem",
              color: "var(--muted)", fontStyle: "italic",
            }}>
              Кликнете за повече информация
            </p>
          )}
        </div>
      </div>

      {/* Карти — хоризонтален списък на десктоп, квадрати на мобилен */}
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        display: "flex", flexDirection: "column",
        gap: "2px", background: "var(--border)",
      }}>
        {SERVICES.map((s, i) => (
          <ServiceCard
            key={s.id}
            s={s}
            img={SVC_IMAGES[i]}
            idx={i}
            isMobile={isMobile}
            onClick={() => onSvcClick(s, SVC_IMAGES[i])}
          />
        ))}
      </div>

      {/* Bottom note */}
      <div style={{
        maxWidth: 1400, margin: "0 auto",
        padding: isMobile ? "1.5rem" : "2rem 3.5rem",
        borderTop: "1px solid var(--border)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
      }}>
        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.88rem",
          color: "var(--muted)", fontStyle: "italic",
        }}>
          Стойността на услугите се определя спрямо сложността и обема на проекта.
        </p>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          style={{
            background: "var(--gold)", border: "none", color: "#fff",
            padding: "0.8rem 1.8rem",
            fontFamily: "var(--sans)", fontSize: "0.63rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            cursor: "pointer", transition: "background 0.3s",
            flexShrink: 0, width: isMobile ? "100%" : "auto",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#c8a84e"}
          onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
        >
          Свържете се с нас
        </button>
      </div>
    </section>
  );
}

function ServiceCard({ s, img, idx, isMobile, onClick }) {
  const [hov, setHov] = useState(false);

  // ── МОБИЛЕН: запазваме стария квадратен стил ──────────────────────────────
  if (isMobile) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          position: "relative",
          height: "72vw",
          overflow: "hidden",
          cursor: "pointer",
          background: "#1a1714",
        }}
      >
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${img})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: hov ? "scale(1.07)" : "scale(1)",
          transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
          filter: hov ? "brightness(0.72)" : "brightness(0.55)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(14,11,7,0.95) 0%, rgba(14,11,7,0.25) 55%, transparent 100%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "1.5rem", zIndex: 2,
        }}>
          <p style={{ fontFamily:"var(--sans)", fontSize:"0.55rem", letterSpacing:"0.28em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.4rem" }}>{s.subtitle}</p>
          <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.35rem", fontWeight:400, color:"#fff", lineHeight:1.15, marginBottom:"0.4rem" }}>{s.title}</h3>
          <div style={{ width:28, height:1, background:"var(--gold)", marginBottom:"0.75rem" }} />
          <p style={{ fontFamily:"var(--serif)", fontSize:"0.85rem", color:"rgba(255,255,255,0.62)", lineHeight:1.75 }}>{s.short}</p>
        </div>
      </div>
    );
  }

  // ── ДЕСКТОП: хоризонтален ред ─────────────────────────────────────────────
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        height: 160,
        overflow: "hidden",
        cursor: "pointer",
        background: hov ? "#f7f3ec" : "var(--cream)",
        transition: "background 0.35s",
        position: "relative",
      }}
    >
      {/* Gold left accent */}
      <div style={{
        width: hov ? 4 : 0,
        background: "var(--gold)",
        flexShrink: 0,
        transition: "width 0.35s cubic-bezier(0.4,0,0.2,1)",
      }} />

      {/* Снимка вляво — фиксирана ширина */}
      <div style={{
        width: 220,
        flexShrink: 0,
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: hov ? "brightness(0.85)" : "brightness(0.75) saturate(0.7)",
        transition: "filter 0.5s, transform 0.6s cubic-bezier(0.4,0,0.2,1)",
        transform: hov ? "scale(1.04)" : "scale(1)",
      }} />

      {/* Номер — вертикален разделител */}
      <div style={{
        width: 80, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderLeft: "1px solid var(--border)", borderRight: "1px solid var(--border)",
        background: hov ? "rgba(184,150,62,0.06)" : "transparent",
        transition: "background 0.35s",
      }}>
        <span style={{
          fontFamily: "var(--serif)",
          fontSize: "2.2rem",
          color: hov ? "var(--gold)" : "rgba(184,150,62,0.35)",
          transition: "color 0.35s",
          lineHeight: 1,
        }}>{s.num}</span>
      </div>

      {/* Основен текст */}
      <div style={{
        flex: 1,
        padding: "0 2.5rem",
        display: "flex", flexDirection: "column", justifyContent: "center",
        minWidth: 0,
      }}>
        <p style={{
          fontFamily: "var(--sans)", fontSize: "0.56rem",
          letterSpacing: "0.3em", color: "var(--gold)",
          textTransform: "uppercase", marginBottom: "0.45rem",
        }}>{s.subtitle}</p>

        <h3 style={{
          fontFamily: "var(--serif)",
          fontSize: "clamp(1.2rem, 1.6vw, 1.55rem)",
          fontWeight: 400, color: "var(--ink)", lineHeight: 1.15,
          marginBottom: "0.6rem",
        }}>{s.title}</h3>

        <div style={{
          width: hov ? 48 : 28, height: 1,
          background: "var(--gold)", marginBottom: "0.7rem",
          transition: "width 0.4s ease",
        }} />

        <p style={{
          fontFamily: "var(--serif)", fontSize: "0.88rem",
          color: "var(--muted)", lineHeight: 1.65,
          maxWidth: 420,
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}>{s.description}</p>
      </div>

      {/* Дясна страна — stat + стрелка */}
      <div style={{
        width: 180, flexShrink: 0,
        borderLeft: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "0.4rem",
        padding: "1.5rem",
        background: hov ? "rgba(184,150,62,0.05)" : "transparent",
        transition: "background 0.35s",
      }}>
        <span style={{
          fontFamily: "var(--serif)",
          fontSize: "2rem",
          color: "var(--gold)", lineHeight: 1,
        }}>{s.stat}</span>
        <span style={{
          fontFamily: "var(--sans)", fontSize: "0.54rem",
          letterSpacing: "0.2em", color: "var(--muted)",
          textTransform: "uppercase", textAlign: "center",
        }}>{s.statLabel}</span>
        <div style={{
          marginTop: "0.75rem",
          width: 32, height: 32,
          border: `1px solid ${hov ? "var(--gold)" : "rgba(184,150,62,0.3)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "var(--gold)", fontSize: "0.85rem",
          transition: "border-color 0.3s, transform 0.3s",
          transform: hov ? "translateX(3px)" : "none",
        }}>→</div>
      </div>
    </div>
  );
}




// ─── ABOUT ────────────────────────────────────────────────────────────────────

function AboutSection({ isMobile }) {
  const [ref1, vis1] = useInView();
  const [ref2, vis2] = useInView();

  return (
    <section id="about" style={{ background:"#fff", borderTop:"1px solid var(--border)", overflow:"hidden" }}>

      {/* ── РЕД 1: Голям текст + снимка ── */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", minHeight: isMobile ? "auto" : "520px" }}>

        {/* Текст */}
        <div ref={ref1}
          style={{
            padding: isMobile ? "3.5rem 1.5rem" : "6rem 5rem 6rem 3.5rem",
            display:"flex", flexDirection:"column", justifyContent:"center",
            opacity: vis1?1:0, transform: vis1?"none":"translateX(-24px)",
            transition:"opacity 0.9s ease, transform 0.9s ease",
          }}>
          <p style={{ fontFamily:"var(--sans)", fontSize:"0.6rem", letterSpacing:"0.38em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"1.25rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
            <span style={{ display:"inline-block", width:22, height:1, background:"var(--gold)" }} />
            За нас
          </p>

          <h2 style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "2rem" : "clamp(2rem,3vw,2.8rem)", fontWeight:400, color:"var(--ink)", lineHeight:1.2, marginBottom:"1.75rem" }}>
            Едно от първите<br />
            <em style={{ color:"var(--gold)" }}>частни дружества</em><br />
            в България
          </h2>

          <p style={{ fontFamily:"var(--serif)", fontSize:"1rem", color:"var(--muted)", lineHeight:1.9, marginBottom:"1.5rem", maxWidth:460 }}>
            Компанията е създадена през 1990 г. — едно от първите частни
            дружества в страната. Преминавайки през различни сфери на
            дейност и придобивайки опит, сме се усъвършенствали в
            строителството и ремонтните дейности.
          </p>

          <p style={{ fontFamily:"var(--serif)", fontSize:"1rem", color:"var(--muted)", lineHeight:1.9, maxWidth:460 }}>
            През последните 30 години сме изградили множество сгради с
            най-разнообразно предназначение и сложност. Развивали сме
            дейността си в България и зад граница, изграждайки успешни
            партньорства с утвърдени компании.
          </p>
        </div>

        {/* Снимка */}
        <div style={{
          backgroundImage:"url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85')",
          backgroundSize:"cover", backgroundPosition:"center",
          minHeight: isMobile ? "52vw" : "auto",
          position:"relative",
        }}>
          {/* Overlay с цитат */}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(14,11,7,0.75) 0%, rgba(14,11,7,0.1) 60%)" }} />
          <div style={{ position:"absolute", bottom:"2rem", left:"2rem", right:"2rem" }}>
            <p style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "0.95rem" : "1.1rem", color:"rgba(245,240,232,0.9)", lineHeight:1.75, fontStyle:"italic" }}>
              „Опитът ни дава увереност и решителност, че с
              професионализъм можем да се справим с всеки
              един проект."
            </p>
            <div style={{ width:36, height:1, background:"var(--gold)", marginTop:"1rem" }} />
          </div>
        </div>
      </div>

      {/* ── РЕД 2: Статистики + стойности ── */}
      <div ref={ref2}
        style={{

      
          padding: isMobile ? "3rem 1.5rem" : "4rem 3.5rem",
          opacity: vis2?1:0, transform: vis2?"none":"translateY(20px)",
          transition:"opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
        }}>

        <div style={{ maxWidth:1400, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap:"0", borderTop:"1px solid var(--border)", borderLeft:"1px solid var(--border)" }}>
          {[
            { num:"1990", label:"Година на основаване", sub:"Едно от първите частни дружества" },
            { num:"30+",  label:"Години опит",           sub:"В строителство и реновация" },
            { num:"100+", label:"Завършени проекти",     sub:"В България и чужбина" },
            { num:"BG+",  label:"Международно присъствие", sub:"Реализирани проекти зад граница" },
          ].map((s, i) => (
            <div key={s.num}
              style={{
                padding: isMobile ? "1.5rem 1rem" : "2.5rem 2rem",
                borderRight:"1px solid var(--border)",
                borderBottom:"1px solid var(--border)",
                opacity: vis2?1:0,
                transition:`opacity 0.6s ease ${0.1 + i*0.1}s`,
              }}>
              <div style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "2rem" : "2.8rem", color:"var(--gold)", lineHeight:1, marginBottom:"0.5rem" }}>{s.num}</div>
              <div style={{ fontFamily:"var(--sans)", fontSize:"0.65rem", letterSpacing:"0.15em", color:"var(--ink)", textTransform:"uppercase", marginBottom:"0.35rem", fontWeight:500 }}>{s.label}</div>
              <div style={{ fontFamily:"var(--serif)", fontSize:"0.82rem", color:"var(--muted)", fontStyle:"italic" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function ProjectsSection({ isMobile }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [animating, setAnimating] = useState(false);
  const touchX = useRef(null);
  const [hRef, hVis] = useInView();

  const goTo = useCallback((idx) => {
    if (animating || idx === active) return;
    setDir(idx > active ? 1 : -1);
    setAnimating(true);
    setTimeout(() => { setActive(idx); setAnimating(false); }, 420);
  }, [active, animating]);

  const p = PROJECTS[active];
  const img = PROJ_IMAGES[active];

  return (
    <section id="projects" style={{ background:"var(--cream)", borderTop:"1px solid var(--border)", padding: isMobile ? "4rem 0 3rem" : "7rem 0 5rem" }}>
      <div style={{ maxWidth:1400, margin:"0 auto", padding: isMobile ? "0 1.5rem" : "0 3.5rem" }}>

        {/* Header */}
        <div ref={hRef} style={{ marginBottom: isMobile ? "2rem" : "4rem", display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"1rem",
          opacity: hVis?1:0, transform: hVis?"none":"translateY(18px)", transition:"opacity 0.8s, transform 0.8s" }}>
          <div>
            <p style={{ fontFamily:"var(--sans)", fontSize:"0.6rem", letterSpacing:"0.35em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.4rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <span style={{ display:"inline-block", width:22, height:1, background:"var(--gold)" }} />Портфолио
            </p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "1.9rem" : "clamp(2rem,3.5vw,3rem)", fontWeight:400, color:"var(--ink)" }}>
              Завършени проекти
            </h2>
          </div>
          {!isMobile && (
            <div style={{ display:"flex", gap:"0.5rem" }}>
              {["←","→"].map((a,i) => (
                <button key={a} onClick={() => goTo(i===0 ? (active>0?active-1:PROJECTS.length-1) : (active<PROJECTS.length-1?active+1:0))}
                  style={{ background:"none", border:"1px solid var(--border)", width:44, height:44, color:"var(--muted)", fontSize:"1rem", cursor:"pointer", transition:"all 0.3s", display:"flex", alignItems:"center", justifyContent:"center" }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="var(--gold)";e.currentTarget.style.color="var(--gold)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)";}}>{a}</button>
              ))}
            </div>
          )}
        </div>

        {isMobile ? (
          <div onTouchStart={e=>{touchX.current=e.touches[0].clientX;}}
            onTouchEnd={e=>{const d=touchX.current-e.changedTouches[0].clientX;if(Math.abs(d)>40)goTo(d>0?(active<PROJECTS.length-1?active+1:0):(active>0?active-1:PROJECTS.length-1));touchX.current=null;}}>
            <div key={`mi-${active}`} style={{ height:"56vw", background:`url(${img}) center/cover`, position:"relative", overflow:"hidden", marginBottom:"1.5rem", animation:"fadeIn 0.4s ease" }}>
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, var(--cream) 0%, transparent 55%)" }} />
              <div style={{ position:"absolute", top:"1rem", right:"1rem", background:"rgba(245,240,232,0.9)", padding:"0.25rem 0.65rem", fontFamily:"var(--sans)", fontSize:"0.55rem", letterSpacing:"0.2em", color:"var(--gold)" }}>{p.year}</div>
              <div style={{ position:"absolute", bottom:"1rem", left:"1.25rem" }}>
                <p style={{ fontFamily:"var(--sans)", fontSize:"0.55rem", letterSpacing:"0.2em", color:"var(--gold)", marginBottom:"0.2rem" }}>{p.cat}</p>
                <h3 style={{ fontFamily:"var(--serif)", fontSize:"1.3rem", color:"var(--ink)", lineHeight:1.2 }}>{p.title}</h3>
                <p style={{ fontFamily:"var(--sans)", fontSize:"0.62rem", color:"var(--muted)", marginTop:"0.15rem" }}>{p.sub}</p>
              </div>
            </div>
            <div style={{ display:"flex", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)", marginBottom:"1.25rem" }}>
              {p.specs.map((s,i)=>(
                <div key={s.l} style={{ flex:1, padding:"0.85rem 0.65rem", borderRight:i<p.specs.length-1?"1px solid var(--border)":"none" }}>
                  <div style={{ fontFamily:"var(--serif)", fontSize:"1.1rem", color:"var(--gold)" }}>{s.v}</div>
                  <div style={{ fontFamily:"var(--sans)", fontSize:"0.52rem", letterSpacing:"0.12em", color:"var(--muted)", textTransform:"uppercase", marginTop:"0.2rem" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <p style={{ fontFamily:"var(--serif)", fontSize:"0.92rem", color:"var(--muted)", lineHeight:1.8, marginBottom:"1.5rem" }}>{p.desc}</p>
            <div style={{ display:"flex", gap:"0.4rem" }}>
              {PROJECTS.map((_,i)=>(
                <button key={i} onClick={()=>goTo(i)} style={{ width:i===active?22:5, height:2, background:i===active?"var(--gold)":"var(--border)", border:"none", cursor:"pointer", padding:0, transition:"width 0.4s, background 0.3s" }} />
              ))}
            </div>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>
               {/* Image */}
            <div style={{ position:"relative" }}>
              <div key={`pi-${active}`} style={{ aspectRatio:"4/5", backgroundImage:`url(${img})`, backgroundSize:"cover", backgroundPosition:"center", position:"relative", overflow:"hidden", animation: dir>0?"slideInRight 0.5s ease":"slideInLeft 0.5s ease" }}>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(20,16,10,0.5) 0%, transparent 55%)" }} />
                <div style={{ position:"absolute", top:"1.25rem", right:"1.25rem", background:"rgba(245,240,232,0.92)", padding:"0.3rem 0.7rem", fontFamily:"var(--sans)", fontSize:"0.58rem", letterSpacing:"0.2em", color:"var(--gold)" }}>{p.year}</div>
                <div style={{ position:"absolute", bottom:"1.25rem", left:"1.25rem" }}>
                  <p style={{ fontFamily:"var(--serif)", fontSize:"1.1rem", color:"rgba(245,240,232,0.9)" }}>{p.area}</p>
                </div>
              </div>
              <div style={{ position:"absolute", bottom:-12, right:-12, width:"55%", height:"38%", border:"1px solid var(--border)", zIndex:-1, pointerEvents:"none" }} />
            </div>
            {/* Text */}
            <div key={`pt-${active}`} style={{ animation:"fadeSlideLeft 0.5s ease" }}>
              <div style={{ display:"flex", gap:"0.65rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
                {PROJECTS.map((proj,i)=>(
                  <button key={proj.id} onClick={()=>goTo(i)}
                    style={{ background:"none", border:"none", fontFamily:"var(--sans)", fontSize:"0.6rem", letterSpacing:"0.12em", color:i===active?"var(--gold)":"var(--border)", cursor:"pointer", transition:"color 0.3s", padding:"0.2rem 0" }}
                    onMouseEnter={e=>{if(i!==active)e.currentTarget.style.color="var(--muted)";}}
                    onMouseLeave={e=>{if(i!==active)e.currentTarget.style.color="var(--border)";}}>
                    {proj.num}
                    {i===active && <span style={{ display:"block", width:"100%", height:1, background:"var(--gold)", marginTop:"0.25rem" }} />}
                  </button>
                ))}
              </div>
              <p style={{ fontFamily:"var(--sans)", fontSize:"0.6rem", letterSpacing:"0.28em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.6rem" }}>{p.cat} · {p.year}</p>
              <h3 style={{ fontFamily:"var(--serif)", fontSize:"clamp(1.8rem,2.8vw,2.6rem)", fontWeight:400, color:"var(--ink)", lineHeight:1.15, marginBottom:"0.5rem" }}>{p.title}</h3>
              <p style={{ fontFamily:"var(--sans)", fontSize:"0.7rem", letterSpacing:"0.1em", color:"var(--gold)", marginBottom:"2rem" }}>{p.sub}</p>
              <div style={{ width:32, height:1, background:"var(--gold)", marginBottom:"1.5rem" }} />
              <p style={{ fontFamily:"var(--serif)", fontSize:"0.97rem", color:"var(--muted)", lineHeight:1.9, marginBottom:"2.5rem", maxWidth:400 }}>{p.desc}</p>
              <div style={{ display:"flex", borderTop:"1px solid var(--border)", marginBottom:"2.5rem" }}>
                {p.specs.map((s,i)=>(
                  <div key={s.l} style={{ padding:"1.1rem 1.5rem 1.1rem 0", marginRight:"1.5rem", borderRight:i<p.specs.length-1?"1px solid var(--border)":"none" }}>
                    <div style={{ fontFamily:"var(--serif)", fontSize:"1.35rem", color:"var(--gold)", lineHeight:1 }}>{s.v}</div>
                    <div style={{ fontFamily:"var(--sans)", fontSize:"0.55rem", letterSpacing:"0.14em", color:"var(--muted)", textTransform:"uppercase", marginTop:"0.3rem" }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:"0.45rem" }}>
                {PROJECTS.map((_,i)=>(
                  <button key={i} onClick={()=>goTo(i)} style={{ width:i===active?26:6, height:2, background:i===active?"var(--gold)":"var(--border)", border:"none", cursor:"pointer", padding:0, transition:"width 0.4s, background 0.3s" }} />
                ))}
              </div>
            </div>

         
          </div>
        )}
      </div>
    </section>
  );
}

// ─── CONTACTS — само телефон, имейл, соц. мрежи ───────────────────────────────

function ContactsSection({ isMobile }) {
  const [ref, vis] = useInView();

  return (
    <section id="contact" style={{ background:"#1c1914", padding: isMobile ? "4rem 0" : "7rem 0" }}>
      <div ref={ref} style={{ maxWidth:1400, margin:"0 auto", padding: isMobile ? "0 1.5rem" : "0 3.5rem",
        opacity: vis?1:0, transform: vis?"none":"translateY(20px)", transition:"opacity 0.9s, transform 0.9s" }}>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "3rem" : "6rem", alignItems:"center" }}>

          {/* Left: heading */}
          <div>
            <p style={{ fontFamily:"var(--sans)", fontSize:"0.62rem", letterSpacing:"0.38em", color:"var(--gold)", textTransform:"uppercase", marginBottom:"0.75rem", display:"flex", alignItems:"center", gap:"0.6rem" }}>
              <span style={{ display:"inline-block", width:22, height:1, background:"var(--gold)" }} />
              Контакти
            </p>
            <h2 style={{ fontFamily:"var(--serif)", fontSize: isMobile ? "2rem" : "clamp(2rem,3.5vw,3rem)", fontWeight:400, color:"#f5f0e8", lineHeight:1.15, marginBottom:"1.5rem" }}>
              Готови сме да<br />
              <em style={{ color:"var(--gold)" }}>обсъдим проекта ви</em>
            </h2>
            <p style={{ fontFamily:"var(--serif)", fontSize:"0.98rem", color:"rgba(245,240,232,0.45)", lineHeight:1.8, fontStyle:"italic", maxWidth:380 }}>
              Свържете се с нас за консултация и индивидуална оферта.
            </p>
          </div>

          {/* Right: contact info */}
          <div style={{ display:"flex", flexDirection:"column", gap:"0" }}>
            {/* Телефон */}
            <a href="tel:+35929999999"
              style={{ display:"flex", alignItems:"center", gap:"1.25rem", padding:"1.5rem 0", borderBottom:"1px solid rgba(255,255,255,0.08)", textDecoration:"none", transition:"opacity 0.2s", opacity:0.85 }}
              onMouseEnter={e=>e.currentTarget.style.opacity=1}
              onMouseLeave={e=>e.currentTarget.style.opacity=0.85}>
              <div style={{ width:46, height:46, border:"1px solid rgba(184,150,62,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold)", fontSize:"1rem", flexShrink:0 }}>✆</div>
              <div>
                <p style={{ fontFamily:"var(--sans)", fontSize:"0.56rem", letterSpacing:"0.22em", color:"rgba(245,240,232,0.35)", textTransform:"uppercase", marginBottom:"0.3rem" }}>Телефон</p>
                <p style={{ fontFamily:"var(--serif)", fontSize:"1.15rem", color:"#f5f0e8" }}>+359 2 XXX XXXX</p>
              </div>
            </a>

            {/* Имейл */}
            <a href="mailto:office@ajaxholding.bg"
              style={{ display:"flex", alignItems:"center", gap:"1.25rem", padding:"1.5rem 0", borderBottom:"1px solid rgba(255,255,255,0.08)", textDecoration:"none", transition:"opacity 0.2s", opacity:0.85 }}
              onMouseEnter={e=>e.currentTarget.style.opacity=1}
              onMouseLeave={e=>e.currentTarget.style.opacity=0.85}>
              <div style={{ width:46, height:46, border:"1px solid rgba(184,150,62,0.3)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold)", fontSize:"1rem", flexShrink:0 }}>✉</div>
              <div>
                <p style={{ fontFamily:"var(--sans)", fontSize:"0.56rem", letterSpacing:"0.22em", color:"rgba(245,240,232,0.35)", textTransform:"uppercase", marginBottom:"0.3rem" }}>Имейл</p>
                <p style={{ fontFamily:"var(--serif)", fontSize:"1.15rem", color:"#f5f0e8" }}>office@ajaxholding.bg</p>
              </div>
            </a>

            {/* Социални мрежи */}
            <div style={{ paddingTop:"2rem", display:"flex", gap:"1rem" }}>
              {[
                { label:"Instagram", icon:"IG", href:"https://instagram.com/ajaxholding" },
                { label:"Facebook",  icon:"FB", href:"https://facebook.com/ajaxholding" },
              ].map(soc => (
                <a key={soc.label} href={soc.href} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", gap:"0.75rem", border:"1px solid rgba(184,150,62,0.3)", padding:"0.75rem 1.25rem", textDecoration:"none", transition:"all 0.3s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="var(--gold)"; e.currentTarget.style.background="rgba(184,150,62,0.08)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(184,150,62,0.3)"; e.currentTarget.style.background="transparent"; }}>
                  <span style={{ fontFamily:"var(--sans)", fontSize:"0.65rem", fontWeight:600, color:"var(--gold)", letterSpacing:"0.05em" }}>{soc.icon}</span>
                  <span style={{ fontFamily:"var(--sans)", fontSize:"0.6rem", letterSpacing:"0.18em", color:"rgba(245,240,232,0.55)", textTransform:"uppercase" }}>{soc.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer({ isMobile }) {
  return (
    <footer style={{ background:"#141210", borderTop:"1px solid rgba(255,255,255,0.06)", padding: isMobile ? "1.5rem" : "2rem 3.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"1rem" }}>
      <img src={logoSrc} alt="Аякс Холдинг" style={{ height:28, objectFit:"contain", opacity:0.35, filter:"brightness(10)" }} />
      <p style={{ fontFamily:"var(--sans)", fontSize:"0.56rem", letterSpacing:"0.15em", color:"rgba(255,255,255,0.2)" }}>
        © 1990 – {new Date().getFullYear()} АЯКС ХОЛДИНГ · ВСИЧКИ ПРАВА ЗАПАЗЕНИ
      </p>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [modal, setModal] = useState(null);
  const isMobile = useIsMobile();

  return (
    <div>
      <style>{`
        :root {
          --serif: 'Georgia', 'Times New Roman', serif;
          --sans: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          --gold: #b8963e;
          --cream: #f5f0e8;
          --ink: #1c1914;
          --muted: #7a7268;
          --border: #e0d8cc;
        }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:var(--cream); }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:#141210; }
        ::-webkit-scrollbar-thumb { background:var(--gold); }

        @keyframes fadeIn {
          from{opacity:0;}to{opacity:1;}
        }
        @keyframes fadeSlideLeft {
          from{opacity:0;transform:translateX(-14px);}
          to{opacity:1;transform:translateX(0);}
        }
        @keyframes slideInRight {
          from{opacity:0;transform:translateX(26px);}
          to{opacity:1;transform:translateX(0);}
        }
        @keyframes fadeIn {
          from{opacity:0;}to{opacity:1;}
        }
        @keyframes fadeSlideItem {
          from{opacity:0;transform:translateX(-8px);}
          to{opacity:1;transform:translateX(0);}
        }
        @keyframes slideInLeft {
          from{opacity:0;transform:translateX(-26px);}
          to{opacity:1;transform:translateX(0);}
        }

        input::placeholder, textarea::placeholder {
          color:var(--muted); font-family:var(--serif); font-style:italic;
        }
        a { text-decoration:none; }
      `}</style>

      <HeroAndServices isMobile={isMobile} onSvcClick={(svc, img) => setModal({ svc, img })} />
      <ServicesSection isMobile={isMobile} onSvcClick={(svc, img) => setModal({ svc, img })} />
      <AboutSection isMobile={isMobile} />
      <ProjectsSection isMobile={isMobile} />
      <ContactsSection isMobile={isMobile} />
      <Footer isMobile={isMobile} />

      {modal && (
        <ServiceModal svc={modal.svc} img={modal.img} onClose={() => setModal(null)} isMobile={isMobile} />
      )}
    </div>
  );
}