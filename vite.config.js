import { defineConfig } from 'vite';
import { resolve } from 'path';
import handlebars from 'vite-plugin-handlebars';
import { readFileSync } from 'fs';

// Базовый путь без слэша на конце — им же префиксуем ссылки в шаблонах,
// т.к. Vite сам переписывает base только для img/script/link, но не для <a href>.
const REPO_BASE = '/portfolio';

// --- Загружаем словари переводов ---------------------------------
const ru = JSON.parse(readFileSync(resolve(__dirname, 'src/locales/ru.json'), 'utf-8'));
const en = JSON.parse(readFileSync(resolve(__dirname, 'src/locales/en.json'), 'utf-8'));

// --- Загружаем контент главной (кейсы / опыт / визуалы) по языкам ---
const casesRu = JSON.parse(readFileSync(resolve(__dirname, 'src/data/cases.ru.json'), 'utf-8'));
const casesEn = JSON.parse(readFileSync(resolve(__dirname, 'src/data/cases.en.json'), 'utf-8'));
const experienceRu = JSON.parse(readFileSync(resolve(__dirname, 'src/data/experience.ru.json'), 'utf-8'));
const experienceEn = JSON.parse(readFileSync(resolve(__dirname, 'src/data/experience.en.json'), 'utf-8'));
const visualsRu = JSON.parse(readFileSync(resolve(__dirname, 'src/data/visuals.ru.json'), 'utf-8'));
const visualsEn = JSON.parse(readFileSync(resolve(__dirname, 'src/data/visuals.en.json'), 'utf-8'));

// Каждой странице отдаём её язык и нужный словарь.
// Ключ — путь к html относительно корня.
function pageContext(lang) {
  const isEn = lang === 'en';
  return {
    lang,
    base: REPO_BASE,
    t: isEn ? en : ru,
    cases: isEn ? casesEn.cases : casesRu.cases,
    experience: isEn ? experienceEn.items : experienceRu.items,
    visuals: isEn ? visualsEn.items : visualsRu.items,
  };
}

export default defineConfig({
  // базовый путь; при деплое на свой домен оставь '/',
  // для GitHub Pages в подпапке — поменяй на '/имя-репо/'
  base: REPO_BASE + '/',

  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      helpers: {
        eq: (a, b) => a === b,
      },
      // контекст выбирается по расположению страницы: /en/... => английский
      context(pagePath) {
        const isEn = pagePath.startsWith('/en/') || pagePath === '/en/index.html';
        return pageContext(isEn ? 'en' : 'ru');
      },
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        // -------- RU (по умолчанию) --------
        main:          resolve(__dirname, 'index.html'),
        notFound:      resolve(__dirname, '404.html'),
        caseSamokat:   resolve(__dirname, 'cases/samokat-geo.html'),
        caseBeeline:   resolve(__dirname, 'cases/beeline-crm.html'),
        caseDrivers:   resolve(__dirname, 'cases/fortis-drivers.html'),
        caseDs:        resolve(__dirname, 'cases/fortis-ds.html'),
        visual1:       resolve(__dirname, 'visuals/visual-1.html'),
        visual2:       resolve(__dirname, 'visuals/visual-2.html'),
        visual3:       resolve(__dirname, 'visuals/visual-3.html'),
        visual4:       resolve(__dirname, 'visuals/visual-4.html'),
        visual5:       resolve(__dirname, 'visuals/visual-5.html'),

        // -------- EN --------
        enMain:        resolve(__dirname, 'en/index.html'),
        enCaseSamokat: resolve(__dirname, 'en/cases/samokat-geo.html'),
        enCaseBeeline: resolve(__dirname, 'en/cases/beeline-crm.html'),
        enCaseDrivers: resolve(__dirname, 'en/cases/fortis-drivers.html'),
        enCaseDs:      resolve(__dirname, 'en/cases/fortis-ds.html'),
        enVisual1:     resolve(__dirname, 'en/visuals/visual-1.html'),
        enVisual2:     resolve(__dirname, 'en/visuals/visual-2.html'),
        enVisual3:     resolve(__dirname, 'en/visuals/visual-3.html'),
        enVisual4:     resolve(__dirname, 'en/visuals/visual-4.html'),
        enVisual5:     resolve(__dirname, 'en/visuals/visual-5.html'),
      },
    },
  },
});
