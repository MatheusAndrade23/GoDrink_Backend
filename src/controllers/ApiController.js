const fetch = require('node-fetch');

module.exports = class ApiController {
  static Favorites = async (req, res) => {};

  static Search = async (req, res) => {
    const letters = req.params.letters;
    try {
      const response = await fetch(
        `www.thecocktaildb.com/api/json/v1/1/search.php?f=${letters}`,
      );
      const drink = await response.json();

      res.status(200).json(drink);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static GetById = async (req, res) => {
    const id = req.params.id;
    try {
      const response = await fetch(
        `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const drink = await response.json();

      res.status(200).json(drink);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static GetRandom = async (req, res) => {
    try {
      const response = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/random.php',
      );
      const drink = await response.json();
      res.status(200).json(drink);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  static GetList = async (req, res) => {
    const type = req.params.type;
    try {
      const response = await fetch(
        `www.thecocktaildb.com/api/json/v1/1/search.php?i=${id}`,
      );
      const drink = await response.json();

      res.status(200).json(drink);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};
