const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const NICKNAME = process.env.NICKNAME;

  try {
    const response = await fetch(`https://open.faceit.com/data/v4/players?nickname=${NICKNAME}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

    const data = await response.json();
    const elo = data.games?.cs2?.faceit_elo;

    res.setHeader('Content-Type', 'text/plain');
    res.status(200).send(String(elo || 'Ошибка'));
  } catch (err) {
    res.status(500).send('Ошибка: ' + err.message);
  }
};
