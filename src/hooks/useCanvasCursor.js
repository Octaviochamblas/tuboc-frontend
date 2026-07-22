import { useEffect } from 'react';

/* Estela de cursor sobre canvas.
   Portado de cursify (ui-layouts) a JS plano. La física (springs, dampening,
   tension y las curvas cuadráticas) es la del original; se corrigieron:

   1. Color: el original animaba el hue con hsla() → arcoíris. Aquí va fijo en
      --accent, que es el mismo valor en ambos temas.
   2. El original llamaba preventDefault() en touchmove, lo que bloquea el
      scroll en móvil. Eliminado; los listeners táctiles van passive.
   3. El cleanup del original quitaba listeners pasando arrow functions nuevas
      (referencias distintas), así que no quitaba nada. Aquí son nombradas.
   4. El handler de 'blur' del original ponía running = true, o sea nunca
      pausaba y el rAF corría para siempre. Aquí pausa de verdad.

   Además usa clientX/clientY también para touch: el original mezclaba pageX
   con un canvas position:fixed, lo que desalinea la estela al hacer scroll. */

const CONFIG = {
  friction: 0.5,
  trails: 20,
  size: 50,
  dampening: 0.25,
  tension: 0.98,
};

// --accent (#6997CF) con la opacidad del original.
const STROKE = 'rgba(105, 151, 207, 0.2)';

class Node {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
  }
}

class Line {
  constructor(spring, pos) {
    this.spring = spring + 0.1 * Math.random() - 0.02;
    this.friction = CONFIG.friction + 0.01 * Math.random() - 0.002;
    this.nodes = [];
    for (let i = 0; i < CONFIG.size; i++) this.nodes.push(new Node(pos.x, pos.y));
  }

  update(pos) {
    let spring = this.spring;
    let node = this.nodes[0];
    node.vx += (pos.x - node.x) * spring;
    node.vy += (pos.y - node.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      node = this.nodes[i];
      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * CONFIG.dampening;
        node.vy += prev.vy * CONFIG.dampening;
      }
      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= CONFIG.tension;
    }
  }

  draw(ctx) {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;
    ctx.beginPath();
    ctx.moveTo(x, y);

    let i = 1;
    for (const last = this.nodes.length - 2; i < last; i++) {
      const node = this.nodes[i];
      const next = this.nodes[i + 1];
      x = 0.5 * (node.x + next.x);
      y = 0.5 * (node.y + next.y);
      ctx.quadraticCurveTo(node.x, node.y, x, y);
    }

    const node = this.nodes[i];
    const next = this.nodes[i + 1];
    ctx.quadraticCurveTo(node.x, node.y, next.x, next.y);
    ctx.stroke();
    ctx.closePath();
  }
}

export default function useCanvasCursor(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    // Mismo criterio que el border-glow de Beneficios: solo desktop con hover.
    // En táctil no hay cursor y el rAF constante sería gasto de batería puro.
    const enabled = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!enabled || reduced) return undefined;

    const ctx = canvas.getContext('2d');

    /* Los nodos viven en coordenadas de DOCUMENTO, y al dibujar se traslada
       por -scrollY. Así la estela ya trazada queda anclada al contenido y
       baja con él al scrollear, en vez de quedar pegada a la pantalla.
       (El canvas sigue siendo fixed y del tamaño del viewport: uno del alto
       del documento serían decenas de MB de bitmap.)

       El cursor se guarda en coordenadas de VIEWPORT y su equivalente en
       página se recalcula cada frame. Si se derivara solo en 'mousemove',
       al scrollear con el mouse quieto la estela se quedaría clavada a su
       punto de página y luego cruzaría la pantalla de un latigazo. */
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: cursor.x, y: cursor.y + window.scrollY };
    let lines = [];
    let running = true;
    let frame = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const spawn = () => {
      lines = [];
      for (let i = 0; i < CONFIG.trails; i++) {
        lines.push(new Line(0.4 + (i / CONFIG.trails) * 0.025, pos));
      }
    };

    const move = (e) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    const render = () => {
      if (!running) return;
      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 'lighter' suma luz: sobre el fondo blanco del tema claro daría invisible.
      ctx.globalCompositeOperation =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? 'source-over'
          : 'lighter';
      ctx.strokeStyle = STROKE;
      ctx.lineWidth = 1;

      // La cabeza persigue el cursor; el resto queda anclado al documento.
      const scrollY = window.scrollY;
      pos.x = cursor.x;
      pos.y = cursor.y + scrollY;

      // Documento → viewport. Los nodos guardan coordenadas de página.
      ctx.save();
      ctx.translate(0, -scrollY);
      for (const line of lines) {
        line.update(pos);
        line.draw(ctx);
      }
      ctx.restore();
      frame = window.requestAnimationFrame(render);
    };

    const pause = () => {
      running = false;
      window.cancelAnimationFrame(frame);
    };

    const resume = () => {
      if (running) return;
      running = true;
      render();
    };

    resize();
    spawn();
    render();

    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', move);
    window.addEventListener('blur', pause);
    window.addEventListener('focus', resume);

    return () => {
      pause();
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', move);
      window.removeEventListener('blur', pause);
      window.removeEventListener('focus', resume);
    };
  }, [canvasRef]);
}
