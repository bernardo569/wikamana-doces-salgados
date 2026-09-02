import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChefHat,
  ChevronDown,
  Clock3,
  Heart,
  MapPin,
  Menu,
  Phone,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

const WHATSAPP_NUMBER = "244939622421";
const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=Olá%20Wikamana!%20Gostaria%20de%20fazer%20uma%20encomenda.`;

const navItems = [
  { label: "Início", href: "#inicio" },
  { label: "O nosso menu", href: "#menu" },
  { label: "A Wikamana", href: "#sobre" },
  { label: "Entrega", href: "#entrega" },
];

const products = [
  {
    name: "Pastéis de nata",
    detail: "Crocantes por fora, cremosos no centro.",
    tag: "Doce da casa",
    image: "/manus-storage/pastel-de-nata_b3b1789d.jpg",
    tone: "terracotta",
  },
  {
    name: "Quiche especial",
    detail: "Uma receita generosa para partilhar.",
    tag: "Salgado",
    image: "/manus-storage/quiche_075f5398.jpg",
    tone: "blue",
  },
  {
    name: "Sortido de doces",
    detail: "Pequenos momentos, grandes sabores.",
    tag: "Encomenda",
    image: "/manus-storage/doces_c499a1a3.jpg",
    tone: "gold",
  },
  {
    name: "Cachorro especial",
    detail: "Quente, completo e com aquela crocância.",
    tag: "Salgado",
    image: "/manus-storage/cachorro-quente_f7c73750.jpg",
    tone: "blue",
  },
  {
    name: "Empadas artesanais",
    detail: "Massa dourada e recheio cheio de sabor.",
    tag: "Favorito",
    image: "/manus-storage/empadas_d497de8f.jpg",
    tone: "terracotta",
  },
  {
    name: "Mesa de salgados",
    detail: "Para festas, encontros e dias especiais.",
    tag: "Para partilhar",
    image: "/manus-storage/salgados_c448e048.jpg",
    tone: "gold",
  },
];

const values = [
  {
    icon: ChefHat,
    number: "01",
    title: "Feito com cuidado",
    text: "Cada fornada é preparada com atenção, bons ingredientes e o sabor de quem cozinha para a sua própria família.",
  },
  {
    icon: Heart,
    number: "02",
    title: "Sabor que aproxima",
    text: "Doces e salgados pensados para celebrar, receber visitas ou simplesmente tornar o dia mais gostoso.",
  },
  {
    icon: Sparkles,
    number: "03",
    title: "Sempre especial",
    text: "Do pedido mais simples à grande encomenda, colocamos a mesma dedicação em cada detalhe.",
  },
];

function SocialIcon({ type }: { type: "instagram" | "facebook" }) {
  if (type === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="social-svg">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.6" cy="6.6" r="1" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="social-svg">
      <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.87.25-1.47 1.53-1.47h1.64V3.95c-.28-.04-1.24-.12-2.35-.12-2.33 0-3.93 1.42-3.93 4.02V10H7.76v3h2.64v8h3.1Z" />
    </svg>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#inicio" className={`brand ${compact ? "brand-compact" : ""}`} aria-label="Wikamana, voltar ao início">
      <span className="brand-mark">
        <img src="/manus-storage/logo_4ee17ea3.jpg" alt="" />
      </span>
      <span className="brand-copy">
        <strong>Wikamana</strong>
        <small>DOCES &amp; SALGADOS</small>
      </span>
    </a>
  );
}

function ProductCard({ product, index }: { product: (typeof products)[number]; index: number }) {
  return (
    <article className={`product-card tone-${product.tone} reveal delay-${(index % 3) + 1}`}>
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="product-image" />
        <span className="product-tag">{product.tag}</span>
      </div>
      <div className="product-meta">
        <div>
          <h3>{product.name}</h3>
          <p>{product.detail}</p>
        </div>
        <span className="product-number">0{index + 1}</span>
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => setIsLoading(false), 700);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 },
    );
    const revealItems = document.querySelectorAll(".reveal");
    revealItems.forEach((item) => observer.observe(item));

    return () => {
      window.clearTimeout(loaderTimer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`site-shell ${isLoading ? "is-loading" : ""}`}>
      <div className="loader" aria-hidden={!isLoading}>
        <div className="loader-inner">
          <span className="loader-mark"><ChefHat size={28} strokeWidth={1.5} /></span>
          <span className="loader-word">Wikamana</span>
          <span className="loader-line" />
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <Logo />
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>
            ))}
            <a className="nav-order mobile-only" href={whatsappLink} target="_blank" rel="noreferrer">Fazer encomenda</a>
          </nav>
          <div className="header-actions">
            <a className="header-phone" href="tel:+244939622421" aria-label="Ligar para 939 622 421">
              <Phone size={16} />
              <span>939 622 421</span>
            </a>
            <a className="button button-dark button-small header-cta" href={whatsappLink} target="_blank" rel="noreferrer">Encomendar</a>
            <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="container hero-grid">
            <div className="hero-copy reveal is-visible">
              <div className="eyebrow"><span className="eyebrow-dot" /> Pastelaria artesanal em Camama</div>
              <h1>O sabor que faz <em>ficar.</em></h1>
              <p className="hero-lede">Doces e salgados feitos com tempo, cuidado e aquele toque especial que transforma qualquer momento.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#menu">Explorar o menu <ArrowRight size={18} /></a>
                <a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">Falar connosco</a>
              </div>
              <div className="hero-footnote"><span className="mini-rule" /> Entregas em Camama Chimbicato <MapPin size={14} /></div>
            </div>
            <div className="hero-visual reveal is-visible delay-2">
              <div className="hero-stamp"><span>W</span><small>feito<br />para<br />partilhar</small></div>
              <div className="hero-main-image">
                <img src="/manus-storage/pastel-de-nata_b3b1789d.jpg" alt="Pastéis de nata dourados da Wikamana" />
              </div>
              <div className="floating-card floating-card-top">
                <span className="floating-icon"><ShoppingBag size={16} /></span>
                <span><strong>Pedidos</strong><small>via WhatsApp</small></span>
              </div>
              <div className="floating-card floating-card-bottom">
                <span className="floating-stars">★★★★★</span>
                <span><strong>Feito hoje</strong><small>com carinho</small></span>
              </div>
              <div className="hero-side-note">DOCES <span>×</span> SALGADOS</div>
            </div>
          </div>
          <div className="scroll-cue"><span>deslize para descobrir</span><span className="scroll-line" /></div>
        </section>

        <section className="ticker" aria-label="Especialidades da Wikamana">
          <div className="ticker-track">
            <span>Pastéis de nata</span><span>Empadas artesanais</span><span>Quiches especiais</span><span>Doces para partilhar</span><span>Pastéis de nata</span><span>Empadas artesanais</span>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <div className="eyebrow eyebrow-blue"><span className="eyebrow-dot" /> O nosso menu</div>
                <h2>Escolha o seu<br /><em>momento favorito.</em></h2>
              </div>
              <div className="heading-side"><p>Receitas que chegam à mesa com sabor, textura e uma boa dose de carinho.</p><a className="text-link" href={whatsappLink} target="_blank" rel="noreferrer">Encomendar agora</a></div>
            </div>
            <div className="product-grid">
              {products.map((product, index) => <ProductCard product={product} index={index} key={product.name} />)}
            </div>
            <div className="menu-note reveal"><span>Tem uma ocasião especial? Criamos combinações à medida para festas, reuniões e celebrações.</span><a href={whatsappLink} target="_blank" rel="noreferrer">Pedir sugestão <ArrowRight size={16} /></a></div>
          </div>
        </section>

        <section className="about-section section-pad" id="sobre">
          <div className="container about-grid">
            <div className="about-collage reveal">
              <div className="collage-main"><img src="/manus-storage/empadas_d497de8f.jpg" alt="Empadas douradas preparadas pela Wikamana" loading="lazy" /></div>
              <div className="collage-small"><img src="/manus-storage/doces_c499a1a3.jpg" alt="Sortido de doces Wikamana" loading="lazy" /></div>
              <div className="collage-label"><span>Desde</span><strong>2024</strong><small>com sabor</small></div>
            </div>
            <div className="about-copy reveal delay-2">
              <div className="eyebrow"><span className="eyebrow-dot" /> A Wikamana</div>
              <h2>Pequenos detalhes.<br /><em>Grandes vontades.</em></h2>
              <p>Na Wikamana, acreditamos que a comida tem o poder de mudar o ritmo de um dia. Por isso, fazemos cada doce e cada salgado com ingredientes escolhidos, receitas honestas e vontade de deixar uma memória boa.</p>
              <div className="signature"><span className="signature-line" /><span>Wikamana</span></div>
              <a className="button button-outline" href={whatsappLink} target="_blank" rel="noreferrer">Conhecer a Wikamana</a>
            </div>
          </div>
        </section>

        <section className="values-section section-pad">
          <div className="container">
            <div className="values-top reveal"><div className="eyebrow eyebrow-blue"><span className="eyebrow-dot" /> O nosso jeito</div><p>Porque o sabor está nos ingredientes, mas também está na intenção.</p></div>
            <div className="values-grid">
              {values.map((value, index) => {
                const Icon = value.icon;
                return <article className={`value-card reveal delay-${index + 1}`} key={value.number}><div className="value-top"><span className="value-number">{value.number}</span><Icon size={24} strokeWidth={1.4} /></div><h3>{value.title}</h3><p>{value.text}</p></article>;
              })}
            </div>
          </div>
        </section>

        <section className="delivery-section section-pad" id="entrega">
          <div className="container delivery-panel reveal">
            <div className="delivery-content">
              <div className="eyebrow eyebrow-light"><span className="eyebrow-dot" /> A entrega</div>
              <h2>O seu pedido,<br /><em>à sua porta.</em></h2>
              <p>Estamos em Camama Chimbicato e levamos as nossas fornadas até si. Envie uma mensagem, escolha os seus favoritos e tratamos do resto.</p>
              <a className="button button-light" href={whatsappLink} target="_blank" rel="noreferrer">Pedir pelo WhatsApp</a>
            </div>
            <div className="delivery-details">
              <div className="detail-item"><span className="detail-icon"><MapPin size={20} /></span><div><small>Localização</small><strong>Camama Chimbicato</strong></div></div>
              <div className="detail-item"><span className="detail-icon"><Clock3 size={20} /></span><div><small>Atendimento</small><strong>Todos os dias · por mensagem</strong></div></div>
              <div className="detail-item"><span className="detail-icon"><Truck size={20} /></span><div><small>Entrega</small><strong>Combinamos consigo no WhatsApp</strong></div></div>
              <div className="delivery-number"><span>939</span><strong>622 421</strong></div>
            </div>
            <div className="delivery-shape shape-one" /><div className="delivery-shape shape-two" />
          </div>
        </section>

        <section className="closing-section section-pad">
          <div className="container closing-inner reveal">
            <div className="closing-mark"><ChefHat size={34} strokeWidth={1.3} /></div>
            <p className="closing-kicker">Para a sua próxima pausa</p>
            <h2>Vai querer<br /><em>mais um?</em></h2>
            <p className="closing-text">Uma mensagem basta para começar a escolher.</p>
            <a className="button button-primary" href={whatsappLink} target="_blank" rel="noreferrer">Falar no WhatsApp</a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <Logo compact />
          <p>Doces e salgados com sabor de casa.<br />Feitos para partilhar.</p>
          <div className="footer-socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram da Wikamana"><SocialIcon type="instagram" /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook da Wikamana"><SocialIcon type="facebook" /></a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Wikamana</span><span>Camama Chimbicato · Luanda</span><a href="tel:+244939622421">939 622 421</a></div>
      </footer>

      <a className="whatsapp-float" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="Falar com a Wikamana no WhatsApp"><span className="whatsapp-pulse" /><svg viewBox="0 0 32 32" aria-hidden="true"><path d="M16 4.5A11.45 11.45 0 0 0 6.1 21.7L4.5 27.5l6-1.55A11.5 11.5 0 1 0 16 4.5Z" fill="none" stroke="currentColor" strokeWidth="1.7" /><path d="M12.2 10.6c.3-.35.65-.4.97-.4.25 0 .5.02.72.03.24.02.54-.1.84.62.3.73 1.02 2.5 1.1 2.68.1.18.16.38.03.62-.12.25-.19.4-.38.61-.18.21-.4.46-.57.62-.2.18-.4.37-.17.74.24.37 1.05 1.72 2.26 2.78 1.55 1.38 2.86 1.81 3.27 2 .4.18.64.16.88-.1.24-.25 1-1.15 1.27-1.55.27-.4.53-.33.9-.2.37.13 2.33 1.1 2.73 1.3.4.2.66.3.76.47.1.18.1 1.02-.24 1.97-.33.95-1.93 1.82-2.67 1.94-.68.1-1.53.15-2.48-.15-.57-.18-1.3-.42-2.24-.83-3.94-1.7-6.52-5.68-6.72-5.95-.2-.27-1.6-2.14-1.6-4.08 0-1.94 1-2.9 1.34-3.3Z" fill="currentColor" /></svg><span className="whatsapp-label">WhatsApp</span></a>
    </div>
  );
}
