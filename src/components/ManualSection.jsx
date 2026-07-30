import { motion } from 'framer-motion';
import { Check, X, ShieldCheck } from 'lucide-react';
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
  { title: 'Enjuaga antes del primer uso', desc: <>Agua a temperatura ambiente. Retira cualquier residuo de fabricación.</> },
  { title: 'Carga el agua', desc: <><span className="manual-fill">COMPLETAR: por dónde se llena</span> — hasta el nivel indicado en el punto 3.</> },
  { title: 'Carga la pieza', desc: <>Sin compactar. Una carga suelta tira mejor y se consume parejo.</> },
  { title: 'Aspira con calma', desc: <>Calada constante y suave. Forzar el tiro arrastra agua hacia la boquilla.</> },
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
  'Agua hirviendo sobre vidrio frío. El borosilicato resiste mucho más que el vidrio común, pero el choque térmico brusco lo fisura igual.',
  'Lavavajillas, cloro, esponjas abrasivas o cepillos metálicos.',
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
  { label: 'Carcasa', value: 'Incluida' },
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
          <span className="manual-eyebrow">Manual de uso · POC · Primera edición</span>
          <h1>
            Instrucciones de uso pipa POC<br />
            <span>Léelo una vez y disfrútalo siempre</span>
          </h1>
          <p>
            POC filtra con agua en un formato de pipa directa. No se usa igual que un bong
            convencional: el nivel de agua y el ángulo son lo único que necesitas dominar.
            Todo lo demás es cuidado.
          </p>
        </motion.header>

        <div className="manual-grid">

          <Block n="1" title="Qué recibes">
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <TickList items={boxContents} />
            </div>
          </Block>

          <Block n="2" title="Primeros 60 segundos" delay={0.08}>
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
                <svg
                  className="manual-tube"
                  viewBox="-18 0 110 210"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-label="Diagrama: el agua llena aproximadamente el tercio inferior del tubo, bajo la marca de nivel máximo"
                >
                  <rect x="17" y="6" width="40" height="198" rx="20" stroke="currentColor" strokeWidth="2" opacity=".5" />
                  <path d="M19 126h36v58a20 20 0 0 1-20 20h0a20 20 0 0 1-16-20z" fill="currentColor" opacity=".26" />
                  <line x1="19" y1="126" x2="55" y2="126" stroke="currentColor" strokeWidth="2.5" />
                  <line x1="60" y1="126" x2="72" y2="126" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                  <line x1="19" y1="86" x2="55" y2="86" stroke="currentColor" strokeWidth="1.2" strokeDasharray="4 4" opacity=".45" />
                  <text x="62" y="89" fill="currentColor" fontFamily="Montserrat" fontSize="9" fontWeight="600" opacity=".75">máx</text>
                  <text x="12" y="130" fill="currentColor" fontFamily="Montserrat" fontSize="9" fontWeight="800" textAnchor="end">ok</text>
                </svg>
                <div className="manual-water-copy">
                  <p>Llena hasta <span className="manual-fill">COMPLETAR: nivel / ml</span>. Es el único dato que define una buena primera calada.</p>
                  <p><b>De más:</b> el agua sube por el tubo y llega a la boca.</p>
                  <p><b>De menos:</b> no filtra, el humo entra caliente y seco.</p>
                  <p><b>Ángulo:</b> mantenla dentro de <span className="manual-fill">COMPLETAR: inclinación máx.</span> al aspirar.</p>
                </div>
              </div>
            </div>
          </Block>

          <Block n="4" title="Limpieza" delay={0.08}>
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <TickList items={cleaning} />
            </div>
          </Block>

          <Block n="5" title="Transporte y guardado">
            <div className="manual-rule">
              <ShieldCheck size={26} aria-hidden="true" />
              <p><b>Regla de oro:</b> nunca la transportes con agua adentro. Vacía, seca, guarda.</p>
            </div>
            <div className="glass-card manual-card" onMouseMove={handleGlow}>
              <TickList items={transport} />
            </div>
          </Block>

          <Block n="6" title="No hagas esto" delay={0.08}>
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

        <Block n="7" title="Ficha técnica">
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
          <p>
            <b>Soporte y reposición:</b> si la pieza llegó dañada en el transporte, escríbenos por{' '}
            <a href="https://wa.me/56976141490" target="_blank" rel="noreferrer">WhatsApp</a>{' '}
            con fotografías del empaque y de la pieza recibida.
          </p>
        </motion.aside>

      </div>
    </div>
  );
}
