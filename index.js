const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = async (req, res) => {
  const API_KEY = process.env.API_KEY;
  const NICKNAME = process.env.NICKNAME;

  if (!API_KEY || !NICKNAME) {
    res.status(500).send("API_KEY или NICKNAME не заданы в переменных окружения");
    return;
  }

  try {
    const response = await fetch(`https://open.faceit.com/data/v4/players?nickname=${NICKNAME}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!data.games || !data.games.cs2 || !data.games.cs2.faceit_elo) {
      res.status(500).send("Ошибка получения ELO");
      return;
    }

    const elo = data.games.cs2.faceit_elo;
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(`${elo}`);
  } catch (err) {
    res.status(500).send("Ошибка сервера: " + err.message);
  }
};
