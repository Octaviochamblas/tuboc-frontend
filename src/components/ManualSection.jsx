import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';
import heroAvif from '../assets/optimized/poc-hero-1.avif';
import heroWebp from '../assets/optimized/poc-hero-1.webp';
import heroJpg from '../assets/optimized/poc-hero-1.jpg';
import nivelAguaAvif from '../assets/optimized/poc-nivel-agua.avif';
import nivelAguaWebp from '../assets/optimized/poc-nivel-agua.webp';
import nivelAguaJpg from '../assets/optimized/poc-nivel-agua.jpg';
import inclinadaAvif from '../assets/optimized/poc-inclinada.avif';
import inclinadaWebp from '../assets/optimized/poc-inclinada.webp';
import inclinadaJpg from '../assets/optimized/poc-inclinada.jpg';
import './ManualSection.css';

const easePremium = [0.16, 1, 0.3, 1];

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, margin: '-60px' },
};

// Glow de borde que sigue al cursor, igual que en Beneficios y Especificaciones
const handleGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const boxContents = [
  <><b>Pieza de vidrio POC</b> — pipa hecha en vidrio borosilicato azul oscuro, formato tubular portatil.</>,
  <><b>Carcasa protectora</b> — a medida, opaca, para guardado y transporte.</>,
  <><b>Rejilla de borosilicato</b> — filtro para que las cenizas no entren en el quemador.</>,
  <><b>Estuche de viaje</b> — guarda tus accesorios esenciales, como encendedor, moledor o cenicero portátil.</>,
];

const firstSteps = [
  { title: 'Carga el agua', desc: <>Por el orificio de aspirado, agrega agua con mucho cuidado hasta una altura de 2cm máximo (Rellena hasta la mitad de la altura del vidrio semi-transparente).</> },
  { title: 'Carga la pieza', desc: <>Agrega tus flores, sin compactar ni apretarlas. Una carga suelta genera mejor fluidez del aire caliente y mayor arrastre de componentes activos sin que estos se pierdan en el quemado.</> },
  { title: 'Aspira con calma', desc: <>Caladas suaves y constantes generan un flujo de aire controlado que minimiza la entrada de ceniza dentro de la pipa e impide que el agua salte bruscamente hacia tu boca.</> },
];

const cleaning = [
  <><b>Después de cada uso:</b> vacía el agua, enjuaga y seca. Toma 30 segundos y evita el 90% de los problemas.</>,
  <><b>Limpieza profunda:</b> alcohol isopropílico con sal gruesa. Tapa, agita, deja actuar y enjuaga con abundante agua.</>,
  <><b>Seca por completo</b> antes de guardar. Humedad dentro de la carcasa cerrada genera olor.</>,
  <><b>Señales de que toca limpiar:</b> el tiro cuesta más, el agua se tiñe rápido o aparece olor al abrir.</>,
];

const transport = [
  <>La carcasa <b>absorbe impactos y contiene olores</b>. Guárdala siempre dentro.</>,
  <>Es protección, <b>no blindaje</b>. Sigue siendo vidrio: evita caídas directas.</>,
  <>Limpia la carcasa por dentro cada tanto y no la cierres húmeda.</>,
];

const donts = [
  'Evita el uso de esponjas abrasivas o cepillos metálicos que rayen el material.',
  'Guardarla con agua o sucia: mancha, huele y no siempre se recupera.',
  'Dejarla en el auto al sol, en el congelador o en un bolsillo trasero.',
  'Tocar la zona de combustión recién usada: queda caliente.',
];

const specs = [
  { label: 'Largo aproximado', value: '95 mm' },
  { label: 'Diámetro aproximado', value: '32 mm' },
  { label: 'Peso aproximado', value: '75 g' },
  { label: 'Material', value: 'Vidrio de borosilicato' },
  { label: 'Color disponible', value: 'Azul oscuro' },
  { label: 'Carcasa', value: <>Largo: 130mm<br />Diámetro: 40mm</> },
];

function Block({ n, title, children, delay = 0 }) {
  return (
    <motion.section
      className="manual-block"
      {...reveal}
      transition={{ duration: 0.6, ease: easePremium, delay }}
    >
      <div className="manual-kicker">
        <span className="manual-n">{n}</span>
        <h2>{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function TickList({ items }) {
  return (
    <ul className="manual-ticks">
      {items.map((item, i) => (
        <li key={i}>
          <Check size={15} className="manual-tick-icon" aria-hidden="true" />
          <div>{item}</div>
        </li>
      ))}
    </ul>
  );
}

export default function ManualSection() {
  return (
    <div className="manual">
      <div className="container">

        <motion.header
          className="manual-lede"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easePremium }}
        >
          <div className="manual-lede-copy">
            <span className="manual-eyebrow">Manual de uso · POC · Primera edición</span>
            <h1>
              Instrucciones de uso pipa POC<br />
              <span>Léelo una vez y disfrútalo siempre</span>
            </h1>
            <p>
              POC es el nuevo formato de pipas de agua portatil. No se usa igual que un bong
              convencional: el nivel de agua y el ángulo son lo único que necesitas dominar.
              Todo lo demás es cuidado.
            </p>
          </div>

          <div className="manual-lede-media glass-card">
            <picture>
              <source srcSet={heroAvif} type="image/avif" />
              <source srcSet={heroWebp} type="image/webp" />
              <img src={heroJpg} alt="POC de TUBOC junto a su carcasa protectora" />
            </picture>
          </div>
        </motion.header>

        <div className="manual-grid">

          <Block n="1" title="Qué recibes">
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <TickList items={boxContents} />
            </div>
          </Block>

          <Block n="2" title="Instrucciones" delay={0.08}>
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <ol className="manual-steps">
                {firstSteps.map((step, i) => (
                  <li key={step.title}>
                    <span className="manual-step-n">{i + 1}</span>
                    <div>
                      <b>{step.title}</b>
                      <p>{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Block>

          <Block n="3" title="Nivel de agua">
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <div className="manual-water">
                <picture className="manual-water-photo">
                  <source srcSet={nivelAguaAvif} type="image/avif" />
                  <source srcSet={nivelAguaWebp} type="image/webp" />
                  <img src={nivelAguaJpg} alt="Pipa POC en vertical mostrando el nivel de agua correcto" />
                </picture>
                <div className="manual-water-copy">
                  <p>Llena de agua hasta 2cm de altura. Sólo necesitas un poco de agua. Nunca llenes hasta arriba.</p>
                  <p><b>Si tiene mucha agua:</b> al fumar, el agua sube por el tubo y llega a la boca.</p>
                  <p><b>Si tiene menos:</b> el agua no filtra el humo. Entra caliente, seco y con micro-cenizas.</p>
                  <p><b>Ángulo:</b> mantenla entre 30° y 60° de inclinación al aspirar.</p>
                </div>
              </div>
            </div>
          </Block>

          <Block n="4" title="Modo de uso" delay={0.08}>
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <div className="manual-water manual-water--stacked">
                <div className="manual-water-copy">
                  <p><b>Para un uso óptimo</b>: se sugiere fumar usando la pipa con una leve inclinación: <b>entre 30° y 60°</b>.</p>
                  <p><b>Si se usa completamente horizontal:</b> el nivel del agua disminuye y el humo no percola en el agua.</p>
                  <p><b>Si se inclina hacia arriba:</b> el agua puede salir de la pipa y entrar en tu boca.</p>
                </div>
                <picture className="manual-water-photo">
                  <source srcSet={inclinadaAvif} type="image/avif" />
                  <source srcSet={inclinadaWebp} type="image/webp" />
                  <img src={inclinadaJpg} alt="Pipa POC inclinada mostrando el ángulo correcto de uso" />
                </picture>
              </div>
            </div>
          </Block>

          <Block n="5" title="Limpieza">
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <TickList items={cleaning} />
            </div>
          </Block>

          <Block n="6" title="Transporte y guardado" delay={0.08}>
            <div className="manual-rule">
              <ShieldCheck size={26} aria-hidden="true" />
              <p><b>Regla de oro:</b> nunca la transportes con agua adentro. Vacía, seca, guarda.</p>
            </div>
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <TickList items={transport} />
            </div>
          </Block>

          <Block n="7" title="No hagas esto">
            <div className="glass-card manual-card manual-dont" onMouseMove={handleGlow}>
              <h3>Daña la pieza</h3>
              <ul className="manual-ticks">
                {donts.map((item) => (
                  <li key={item}>
                    <X size={15} className="manual-tick-icon" aria-hidden="true" />
                    <div>{item}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Block>
        </div>

        <Block n="8" title="Ficha técnica">
          <div className="manual-specs">
            {specs.map((spec, i) => (
              <motion.div
                className="glass-card manual-spec"
                key={spec.label}
                onMouseMove={handleGlow}
                {...reveal}
                transition={{ duration: 0.5, ease: easePremium, delay: i * 0.06 }}
              >
                <span>{spec.label}</span>
                <strong>{spec.value}</strong>
              </motion.div>
            ))}
          </div>
        </Block>

        <motion.aside className="manual-legal" {...reveal} transition={{ duration: 0.6, ease: easePremium }}>
          <p>
            <b>Venta exclusiva para mayores de 18 años.</b> Mantener fuera del alcance de menores.
            Uso responsable: no utilizar antes de conducir ni de operar maquinaria. Producto de
            vidrio: pese a su formato tubular reforzado, puede romperse ante impactos directos.
          </p>
        </motion.aside>

      </div>
    </div>
  );
}
