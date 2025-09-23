import express from 'express';
import './config/i18n.ts';

const app = express();

// Middleware for i18n
app.use(i18n.init);

// Set the default language
app.use((req, res, next) => {
    const lang = req.query.lang || 'pt-BR'; // Default to Portuguese
    i18n.setLocale(req, lang);
    next();
});

// Sample route
app.get('/', (req, res) => {
    res.send(i18n.__('welcome_message')); // Use translation key
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});