// Dot-matrix лоадер поверх картинок, пока они грузятся (hero-фото,
// скриншоты кейсов, флоу-схемы) — вместо пустого/белого «мигания».
// Порядок точек — спираль по часовой от края к центру в сетке 5×5
// (см. src/styles/components/loader.css).
const SPIRAL_ORDER = [
  0, 1, 2, 3, 4,
  15, 16, 17, 18, 5,
  14, 23, 24, 19, 6,
  13, 22, 21, 20, 7,
  12, 11, 10, 9, 8,
];

const SELECTOR = '.case-hero__media img, .case-shot img, .case-flow img';
const HOST_SELECTOR = '.case-hero__media, .case-shot, .case-flow';

function buildLoader() {
  const loader = document.createElement('div');
  loader.className = 'dotmatrix-loader';
  loader.setAttribute('aria-hidden', 'true');

  const grid = document.createElement('div');
  grid.className = 'dotmatrix-loader__grid';
  SPIRAL_ORDER.forEach((order) => {
    const dot = document.createElement('span');
    dot.className = 'dotmatrix-loader__dot';
    dot.style.setProperty('--dmx-order', order);
    grid.appendChild(dot);
  });
  loader.appendChild(grid);

  return loader;
}

// Задержка перед показом — без неё лоадер вставлялся сразу и на быстрых
// загрузках (особенно hero-фото, eager+high-priority, во весь экран)
// успевал мелькнуть на один кадр как резкая вспышка бежевого прямоугольника
// на весь экран. Показываем лоадер только если картинка ДЕЙСТВИТЕЛЬНО не
// успела загрузиться за это время — так на обычных загрузках его вообще
// не видно, а не только в кэше (см. img.complete выше).
const SHOW_DELAY_MS = 200;

export function initImageLoaders() {
  document.querySelectorAll(SELECTOR).forEach((img) => {
    if (img.complete) return; // уже в кэше — незачем показывать лоадер

    const host = img.closest(HOST_SELECTOR);
    if (!host) return;

    let loader = null;
    const showTimer = setTimeout(() => {
      loader = buildLoader();
      host.appendChild(loader);
    }, SHOW_DELAY_MS);

    const remove = () => {
      clearTimeout(showTimer);
      if (!loader) return;
      loader.classList.add('is-hidden');
      setTimeout(() => loader.remove(), 300);
    };
    img.addEventListener('load', remove, { once: true });
    img.addEventListener('error', remove, { once: true });
  });
}
