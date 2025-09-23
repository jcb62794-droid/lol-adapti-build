import i18n from 'i18n';

i18n.configure({
    locales: ['en', 'pt-BR'],
    directory: __dirname + '/../locales',
    defaultLocale: 'pt-BR',
    autoReload: true,
    syncFiles: true,
    cookie: 'lang',
});

export default i18n;