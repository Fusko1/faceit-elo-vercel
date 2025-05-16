const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const NICKNAME = process.env.NICKNAME;

  if (!API_KEY || !NICKNAME) {
    return res.status(500).send("API_KEY или NICKNAME не указаны");
  }

  try {
    const response = await fetch(`https://open.faceit.com/data/v4/players?nickname=${NICKNAME}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();
    const elo = data?.games?.cs2?.faceit_elo;

    if (!elo) return res.status(500).send("ELO не найден");

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(String(elo));
  } catch (error) {
    res.status(500).send("Ошибка: " + error.message);
  }
};
