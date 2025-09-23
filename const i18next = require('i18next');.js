const i18next = require('i18next');
const i18nextHttpMiddleware = require('i18next-http-middleware');

i18next
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    // suas configurações aqui
  });

// Use o middleware em seu aplicativo Express
app.use(i18nextHttpMiddleware.handle(i18next));