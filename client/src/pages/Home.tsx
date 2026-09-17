import { useEffect, useState, type FormEvent } from "react";
import {
  CakeSlice,
  ChefHat,
  ChevronDown,
  Clock3,
  CupSoda,
  Egg,
  Heart,
  MapPin,
  Menu,
  Phone,
  Sandwich,
  ShoppingBag,
  Truck,
  Utensils,
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

const products: Array<{
  name: string;
  detail: string;
  tag: string;
  image: string;
  tone: string;
}> = [];

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
    icon: null,
    number: "03",
    title: "Sempre especial",
    text: "Do pedido mais simples à grande encomenda, colocamos a mesma dedicação em cada detalhe.",
  },
];

const priceGroups = [
  { title: "Salgados", note: "Preço por dúzia", icon: Utensils, items: [["Rissóis de camarão", "7.000 Kz"], ["Rissóis de atum", "7.000 Kz"], ["Coxinhas de frango", "7.000 Kz"], ["Croquetes de carne", "7.000 Kz"], ["Pastéis de massa tenra", "7.000 Kz"], ["Empadas de frango", "7.000 Kz"], ["Chamucas de frango", "9.000 Kz"], ["Box de 100 mini salgados", "35.000 Kz"], ["Folar de carnes", "40.000 Kz"]] },
  { title: "Doces & bebidas", note: "Preços conforme a lista", icon: CakeSlice, items: [["Bolas de Berlim com creme · dúzia", "11.000 Kz"], ["Bolas de Berlim sem creme · dúzia", "10.000 Kz"], ["Pastéis de nata · dúzia", "13.100 Kz"], ["Gasosa em lata", "800 Kz"], ["Sumol · Coca-Cola · Fanta · Sprite", "Consultar"]] },
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
        <img src="./assets/logo-optimized.webp" alt="" />
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

function PriceGroup({ group, index }: { group: (typeof priceGroups)[number]; index: number }) {
  const Icon = group.icon;
  return (
    <article className={`price-group reveal delay-${(index % 3) + 1}`}>
      <div className="price-group-heading"><span className="price-group-icon"><Icon size={20} strokeWidth={1.6} /></span><div><h3>{group.title}</h3><small>{group.note}</small></div></div>
      <div className="price-list">
        {group.items.map(([name, price]) => <div className="price-row" key={`${group.title}-${name}`}><span className="price-item-icon"><Icon size={14} strokeWidth={1.7} /></span><span className="price-name">{name}</span><strong>{price}</strong></div>)}
      </div>
    </article>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [customerName, setCustomerName] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  const handleOrderSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = `Olá Wikamana!%0A%0ANome: ${encodeURIComponent(customerName)}%0A Pedido: ${encodeURIComponent(orderMessage)}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank", "noopener,noreferrer");
  };

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
            <a className="header-phone" href="tel:+244939622421" aria-label="Ligar para +244 939 622 421">
              <Phone size={16} />
              <span>+244 939 622 421</span>
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
                <a className="button button-primary" href="#menu">Explorar o menu</a>
              </div>
              <div className="hero-footnote"><span className="mini-rule" /> Entregas em Camama Chimbicato <MapPin size={14} /></div>
            </div>
            <div className="hero-visual reveal is-visible delay-2">
              <div className="hero-stamp"><span>W</span><small>feito<br />para<br />partilhar</small></div>
              <div className="hero-main-image">
                <img src="./assets/pastel-de-nata-optimized.webp" alt="Pastéis de nata dourados da Wikamana" />
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
            <span>Rissóis de camarão</span><span>Coxinhas de frango</span><span>Bolas de Berlim</span><span>Pastéis de nata</span><span>Folar de carnes</span><span>Gasosa em lata</span>
          </div>
        </section>

        <section className="menu-section section-pad" id="menu">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <div className="eyebrow eyebrow-blue"><span className="eyebrow-dot" /> O nosso menu</div>
                <h2>Escolha o seu<br /><em>favorito.</em></h2>
              </div>
              <div className="heading-side"><p>Consulte os nossos preços e faça a sua encomenda por WhatsApp.</p></div>
            </div>
            <div className="price-heading reveal">
              <div className="eyebrow eyebrow-blue"><span className="eyebrow-dot" /> Catálogo de preços</div>
              <p>Lista atual de produtos e preços disponíveis para encomenda.</p>
            </div>
            <div className="price-grid">
              {priceGroups.map((group, index) => <PriceGroup group={group} index={index} key={group.title} />)}
            </div>
            <div className="menu-note reveal"><span>Esta é a lista atual da Wikamana. Faça o seu pedido através do formulário de encomenda.</span></div>
          </div>
        </section>

        <section className="about-section section-pad" id="sobre">
          <div className="container about-grid">
            <div className="about-collage reveal">
              <div className="collage-main"><img src="./assets/empadas-optimized.webp" alt="Empadas douradas preparadas pela Wikamana" loading="lazy" /></div>
              <div className="collage-small"><img src="./assets/doces-optimized.webp" alt="Doces da Wikamana" loading="lazy" /></div>
              <div className="collage-label"><span>Desde</span><strong>2021</strong><small>com sabor</small></div>
            </div>
            <div className="about-copy reveal delay-2">
              <div className="eyebrow"><span className="eyebrow-dot" /> A Wikamana</div>
              <h2>Pequenos detalhes.<br /><em>Grandes vontades.</em></h2>
              <p>Na Wikamana, acreditamos que a comida tem o poder de mudar o ritmo de um dia. Por isso, fazemos cada doce e cada salgado com ingredientes escolhidos, receitas honestas e vontade de deixar uma memória boa.</p>
              <div className="signature"><span className="signature-line" /><span>Wikamana</span></div>
            </div>
          </div>
        </section>

        <section className="values-section section-pad">
          <div className="container">
            <div className="values-top reveal"><div className="eyebrow eyebrow-blue"><span className="eyebrow-dot" /> O nosso jeito</div><p>Porque o sabor está nos ingredientes, mas também está na intenção.</p></div>
            <div className="values-grid">
              {values.map((value, index) => {
                const Icon = value.icon;
                return <article className={`value-card reveal delay-${index + 1}`} key={value.number}><div className="value-top"><span className="value-number">{value.number}</span>{Icon ? <Icon size={24} strokeWidth={1.4} /> : null}</div><h3>{value.title}</h3><p>{value.text}</p></article>;
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
            </div>
            <div className="delivery-details">
              <div className="detail-item"><span className="detail-icon"><MapPin size={20} /></span><div><small>Localização</small><strong>Camama Chimbicato</strong></div></div>
              <div className="detail-item"><span className="detail-icon"><Clock3 size={20} /></span><div><small>Atendimento</small><strong>Todos os dias · por mensagem</strong></div></div>
              <div className="detail-item"><span className="detail-icon"><Truck size={20} /></span><div><small>Entrega</small><strong>Combinamos consigo no WhatsApp</strong></div></div>
              <a className="delivery-number" href="tel:+244939622421" aria-label="Ligar para +244 939 622 421"><span className="delivery-phone-icon"><Phone size={17} /></span><strong>+244 939 622 421</strong></a>
            </div>
            <div className="delivery-shape shape-one" /><div className="delivery-shape shape-two" />
          </div>
        </section>

        <section className="order-section section-pad" id="encomenda">
          <div className="container order-panel reveal">
            <div className="order-copy">
              <div className="eyebrow eyebrow-blue"><span className="eyebrow-dot" /> Faça a sua encomenda</div>
              <h2>O que vai<br /><em>saborear hoje?</em></h2>
              <p>Escreva o seu nome e diga-nos o que pretende. A mensagem abre diretamente no WhatsApp da Wikamana.</p>
              <div className="order-callout"><Phone size={17} /><span>Resposta rápida pelo <strong>+244 939 622 421</strong></span></div>
            </div>
            <form className="order-form" onSubmit={handleOrderSubmit}>
              <label htmlFor="customer-name">O seu nome</label>
              <input id="customer-name" name="name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Como podemos chamar-lhe?" required />
              <label htmlFor="order-message">O seu pedido</label>
              <textarea id="order-message" name="message" value={orderMessage} onChange={(event) => setOrderMessage(event.target.value)} placeholder="Escreva os produtos e quantidades..." rows={5} required />
              <button className="button button-primary" type="submit">Enviar para o WhatsApp</button>
            </form>
          </div>
        </section>

        <section className="closing-section section-pad">
          <div className="container closing-inner reveal">
            <div className="closing-mark"><ChefHat size={34} strokeWidth={1.3} /></div>
            <p className="closing-kicker">Para a sua próxima pausa</p>
            <h2>Vai querer<br /><em>mais um?</em></h2>
            <p className="closing-text">Uma mensagem basta para começar a escolher.</p>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <Logo compact />
          <p>Doces e salgados com sabor de casa.<br />Feitos para partilhar.</p>
          <div className="footer-socials"><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram da Wikamana"><SocialIcon type="instagram" /></a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" aria-label="Facebook da Wikamana"><SocialIcon type="facebook" /></a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Wikamana</span><span>Camama Chimbicato · Luanda</span><a href="tel:+244939622421">+244 939 622 421</a></div>
      </footer>

    </div>
  );
}
