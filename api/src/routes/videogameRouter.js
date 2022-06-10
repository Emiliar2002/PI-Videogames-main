const { Router } = require("express");
const axios = require("axios");
const { Videogame, Genre, Platform } = require("../db.js");
const { API_KEY } = process.env;

const router = Router();

router.get("/:id", async (req, res) => {
  //agarro el id de los parametros
  let { id } = req.params;

  let videogame = {};

  //si al inicio me mandan una u, agarro el numero que sigue despues para ver si
  //existe en mi db. de lo contrario, busco en la api externa.
  if (id[0] === "u") {
    //validaciones y query
    let parsedId = parseInt(id.slice(1));
    if (isNaN(parsedId) || parsedId < 1)
      res.send({ Error: "El id debe ser un número mayor a 0." });
    let videogameQuery = await Videogame.findByPk(parsedId, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
        {
          model: Platform,
          attributes: ["name"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    //Pongo lo necesario en videogame si el query me devolvió algo y después si existe lo mando
    if (videogameQuery) {
      videogame = {
        id: videogameQuery.dataValues.id,
        name: videogameQuery.dataValues.name,
        description: videogameQuery.dataValues.description,
        releaseDate: videogameQuery.dataValues.release_date,
        rating: videogameQuery.dataValues.rating,
        genres: videogameQuery.genres.map((g) => {
          return g.name;
        }),
        platforms: videogameQuery.platforms.map((p) => {
          return p.name;
        }),
        userMade: true,
      };
    } else videogame = false;

    videogame
      ? res.send(videogame)
      : res.send({ Error: "No existe ningun juego con ese id." });
  } else {
    //validaciones y try catch. si el request no encuentra el juego me voy a parar al catch.
    let parsedId = parseInt(id);
    if (isNaN(parsedId) || parsedId < 1)
      return res.send({ Error: "El id debe ser un número mayor a 0." });
    try {
      let videogameRequest = await axios.get(
        `https://api.rawg.io/api/games/${parsedId}?key=${API_KEY}`
      );
      let requestData = videogameRequest.data;

      videogame = {
        id: requestData.id,
        name: requestData.name,
        description: requestData.description,
        releaseDate: requestData.release_date,
        rating: requestData.rating,
        image: requestData.background_image,
        genres: requestData.genres.map((g) => {
          return g.name;
        }),
        platforms: requestData.platforms.map((p) => {
          return p.platform.name;
        }),
      };

      res.send(videogame);
    } catch (e) {
      //caso de id invalido en la api externa
      res.send({ Error: "No existe ningun juego con ese id." });
    }
  }
});

module.exports = router;
