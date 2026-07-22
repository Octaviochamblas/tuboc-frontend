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

// --accent (#6997CF) con la opacidad del original, que además se modula
// por el fundido de entrada/salida.
const STROKE_RGB = '105, 151, 207';
const STROKE_ALPHA = 0.2;

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
       por -scrollY. Así la estela queda anclada al contenido y se va con él
       al scrollear, en vez de seguir al cursor por la pantalla.
       (El canvas sigue siendo fixed y del tamaño del viewport: uno del alto
       del documento serían decenas de MB de bitmap.)

       La posición de página se deriva SOLO en 'mousemove'. Eso por sí solo
       provocaba un latigazo: tras scrollear lejos, el primer movimiento del
       mouse hacía cruzar la estela por toda la pantalla. Se resuelve con el
       desvanecimiento por inactividad de más abajo: al apagarse queda
       aparcada, y al volver reaparece ya colocada en el cursor. */
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: cursor.x, y: cursor.y + window.scrollY };
    let lines = [];
    let running = true;
    let frame = 0;

    // Visibilidad: aparece al mover el cursor, se apaga sola si no se mueve.
    const IDLE_MS = 600;
    const FADE = 0.09;
    let alpha = 0;
    let targetAlpha = 0;
    let lastMove = 0;
    let parked = true;

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

    // Coloca toda la cadena en el cursor, sin velocidad: evita el barrido
    // desde la posición vieja cuando la estela reaparece tras apagarse.
    const snapToCursor = () => {
      for (const line of lines) {
        for (const node of line.nodes) {
          node.x = pos.x;
          node.y = pos.y;
          node.vx = 0;
          node.vy = 0;
        }
      }
    };

    const move = (e) => {
      // Scrollear puede emitir mousemove sin que el cursor se haya movido;
      // esos eventos no deben encender la estela.
      if (e.clientX === cursor.x && e.clientY === cursor.y) return;

      cursor.x = e.clientX;
      cursor.y = e.clientY;
      pos.x = cursor.x;
      pos.y = cursor.y + window.scrollY;

      if (parked) {
        snapToCursor();
        parked = false;
      }

      lastMove = performance.now();
      targetAlpha = 1;
    };

    const render = () => {
      if (!running) return;
      frame = window.requestAnimationFrame(render);

      if (targetAlpha === 1 && performance.now() - lastMove > IDLE_MS) targetAlpha = 0;
      alpha += (targetAlpha - alpha) * FADE;
      if (alpha < 0.01) {
        alpha = 0;
        parked = true;
      }

      ctx.globalCompositeOperation = 'source-over';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (alpha === 0) return; // apagada: nada que actualizar ni dibujar

      // 'lighter' suma luz: sobre el fondo blanco del tema claro daría invisible.
      ctx.globalCompositeOperation =
        document.documentElement.getAttribute('data-theme') === 'light'
          ? 'source-over'
          : 'lighter';
      ctx.strokeStyle = `rgba(${STROKE_RGB}, ${(STROKE_ALPHA * alpha).toFixed(3)})`;
      ctx.lineWidth = 1;

      // Documento → viewport. Los nodos guardan coordenadas de página, así
      // que la estela se desplaza con el contenido al scrollear.
      ctx.save();
      ctx.translate(0, -window.scrollY);
      for (const line of lines) {
        line.update(pos);
        line.draw(ctx);
      }
      ctx.restore();
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
