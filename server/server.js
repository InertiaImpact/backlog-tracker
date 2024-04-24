// Dynamically import fetch
let fetch;

import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch:', err));

const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001; // Ensure this port is free or adjust as needed
const apiKey = '8672273D9213A77AEDE5AD802B4D16D1';

app.use(cors());

app.get('/api/getPlayerAchievements', async (req, res) => {
    const { appid, steamid } = req.query;
    const url = `http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${apiKey}&steamid=${steamid}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        res.status(500).json({ error: 'Failed to fetch data from Steam API' });
    }
});

// Add this endpoint to your Express server in server.js

app.get('/api/getOwnedGames', async (req, res) => {
    const { steamid } = req.query;
    const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamid}&format=json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        res.json(data.response.games);
    } catch (error) {
        console.error('Failed to fetch owned games:', error);
        res.status(500).json({ error: 'Failed to fetch owned games' });
    }
});


app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
