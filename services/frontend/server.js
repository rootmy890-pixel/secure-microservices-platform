const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080/api/v1/data';

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(BACKEND_URL);
        res.json({
            service: "frontend-gateway",
            backend_response: response.data
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to connect to backend microservice",
            details: error.message
        });
    }
});

app.get('/health', (req, res) => {
    res.status(200).json({ status: "healthy" });
});

app.listen(PORT, () => {
    console.log(`Frontend service running on port ${PORT}`);
});
