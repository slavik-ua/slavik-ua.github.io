const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const figure = document.querySelector('.orbit-art');
const canvas = document.querySelector('#orbit-canvas');
if (figure && canvas) {
  const context = canvas.getContext('2d', { alpha: false });
  let renderer;
  let loading = false;
  let visible = false;
  let timer;
  let elapsed = 8;
  let last;
  const stop = () => { clearTimeout(timer); timer = undefined; last = undefined; };
  const active = () => renderer && visible && !document.hidden && !reducedMotion.matches;
  const tick = () => {
    timer = undefined;
    if (!active()) return;
    const now = performance.now();
    if (last !== undefined) elapsed += Math.min((now - last) / 1000, 0.5);
    last = now;
    renderer(elapsed);
    timer = setTimeout(tick, innerWidth < 640 ? 250 : 160);
  };
  const sync = () => { stop(); if (active()) tick(); };
  async function load() {
    if (renderer || loading || !context) return;
    loading = true;
    try {
      const { default: createFrame, meta } = await import('./assets/ascii/edge-orbit.js');
      const frame = createFrame();
      const colors = new Uint8Array(meta.cols * meta.rows);
      const size = canvas.width / meta.cols;
      const glyphs = ['·', '•', '●'];
      const lightPalette = [
        '#eeefee', '#e0e4e3', '#ced6d8', '#b5c3ca', '#93a9b5', '#748e9d', '#5b7689', '#3d5b72',
        '#e9e8e5', '#d5d2ce', '#b2ada8', '#8b8989',
        '#eee4db', '#e2c9b6', '#cca185', '#bb7c57', '#be632c', '#c4471c', '#d5702f',
        '#e7ddd1', '#ceb493', '#b98b59', '#ad6b2b', '#a95525', '#9d451d', '#873917', '#783015'
      ];
      function makeAtlas(palette) {
        const atlas = document.createElement('canvas');
        atlas.width = size * glyphs.length;
        atlas.height = size * palette.length;
        const ink = atlas.getContext('2d');
        ink.font = `${size}px monospace`;
        ink.textAlign = 'center';
        ink.textBaseline = 'middle';
        palette.forEach((color, row) => {
          ink.fillStyle = color;
          glyphs.forEach((glyph, col) => ink.fillText(glyph, (col + 0.5) * size, (row + 0.5) * size));
        });
        return atlas;
      }
      const darkAtlas = makeAtlas(meta.palette);
      const lightAtlas = makeAtlas(lightPalette);
      renderer = time => {
        const light = document.documentElement.dataset.theme === 'light';
        const atlas = light ? lightAtlas : darkAtlas;
        const picture = frame(time, { color: colors, paper: light });
        context.fillStyle = light ? '#faf9f6' : '#05080e';
        context.fillRect(0, 0, canvas.width, canvas.height);
        let cell = 0;
        for (const glyph of picture) {
          if (glyph === '\n') continue;
          const col = glyphs.indexOf(glyph);
          if (col >= 0) context.drawImage(atlas, col * size, colors[cell] * size, size, size, (cell % meta.cols) * size, Math.floor(cell / meta.cols) * size, size, size);
          cell++;
        }
      };
      renderer(elapsed);
      canvas.classList.add('is-ready');
      sync();
    } catch {
      loading = false;
    }
  }
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting && entries[0].intersectionRatio > 0.01;
    if (visible) load();
    sync();
  }, { threshold: 0.01 }).observe(figure);
  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', sync);
  new MutationObserver(() => { if (renderer) renderer(elapsed); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
}
