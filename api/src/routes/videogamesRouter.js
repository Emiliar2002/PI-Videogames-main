const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db.js");
const { API_KEY } = process.env;

const router = Router();

router.get("/", async (req, res) => {
  let { name } = req.query;

  try {
    //Busco los juegos. Si no tengo name, traigo todos los de mi db. De lo contrario,
    //traigo los juegos con sus id, nombre y géneros.
    let videogamesFromDbQuery = !name
      ? await Videogame.findAll({
          attributes: ["id", "name"],

          include: [
            {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
        })
      : await Videogame.findAll({
          attributes: ["id", "name"],

          include: [
            {
              model: Genre,
              attributes: ["name"],
              through: {
                attributes: [],
              },
            },
          ],
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        });

    //mapeo los juegos solo para tener los nombres de los generos y una propiedad
    //que me diga si fue hecho por usuarios
    let videoGamesFromDb = videogamesFromDbQuery.map((v) => {
      return {
        id: v.id,
        name: v.name,
        genres: v.genres.map((g) => {
          return g.name;
        }),
        rating: v.rating,
        userMade: true,
      };
    });

    //Lo mismo que con mi db solo que con la api y la img
    const videogamesFromApiRequest = name
      ? await axios.get(
          `https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`
        )
      : await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    let videoGamesFromApiArr = videogamesFromApiRequest.data.results;
    let videoGamesFromApi = videoGamesFromApiArr.map((v) => {
      return {
        id: v.id,
        name: v.name,
        image: v.background_image,
        genres: v.genres.map((g) => {
          return g.name;
        }),
        rating: v.rating,
      };
    });

    const videogames = [...videoGamesFromDb, ...videoGamesFromApi];

    //Si no tengo juegos mando un arr vacio, de lo contrario mando el json
    videogames.length === 0
      ? res.send([])
      : res.send(videogames);
  } catch (e) {
    //si pasa algo, lo mando como error.
    res.send({ Error: e });
  }
});

router.post("/", async (req, res) => {
  //Tomo lo que se me mandó por body
  let { name, description, releaseDate, rating, platforms, genres } = req.body;

  //Si falta algun campo obligatorio mando un error
  if (!name || !platforms || !genres)
    res.send({ Error: "Faltan propiedades." });

  try {
    //Creo el juego en la db
    const videogame = await Videogame.create({
      name,
      description,
      release_date: releaseDate,
      rating,
    });

    //Busco la plataforma, si no existe la creo y despues se la asigno al juego que recién cree.
    platforms.forEach(async (p) => {
      let platform = await Platform.findOrCreate({
        where: { name: p },
        defaults: { name: p },
      });

      await videogame.addPlatforms(platform[0].dataValues.id);
    });

    //Lo mismo que con la plataforma
    genres.forEach(async (g) => {
      let genre = await Genre.findOrCreate({
        where: { name: g },
        defaults: { name: g },
      });

      await videogame.addGenres(genre[0].dataValues.id);
    });

    //Envio respuesta de que cree el juego x con el id n.
    res.send({
      success: `Videojuego ${videogame.dataValues.name} creado con el id "u${videogame.dataValues.id}".`, 
      id: videogame.dataValues.id
    });
  } catch (e) {
    //si pasa algo inesperado, lo atrapo.
    res.send({ Error: e });
  }
});

module.exports = router;
