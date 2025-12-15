const express = require('express');
const path = require('path');
const reviewEngine = require('./reviewEngine');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/review', async (req, res) => {
    const { code, language } = req.body;
    try {
        const review = reviewEngine.reviewCode(code, language);
        res.json({ review });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
