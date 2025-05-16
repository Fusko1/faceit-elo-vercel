const express = require("express");
const fetch = require("node-fetch");
const app = express();

const API_KEY = process.env.API_KEY;
const NICKNAME = process.env.NICKNAME;

app.get("/", async (req, res) => {
  try {
    const url = `https://open.faceit.com/data/v4/players?nickname=${NICKNAME}`;
    const result = await fetch(url, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });
    const data = await result.json();
    const elo = data.games.cs2.faceit_elo;
    res.setHeader("Content-Type", "text/plain");
    res.send(`${elo}`);
  } catch (e) {
    res.status(500).send("Ошибка");
  }
});

module.exports = app;
