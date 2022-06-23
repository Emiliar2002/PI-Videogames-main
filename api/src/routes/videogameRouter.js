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
        releaseDate: requestData.released,
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

router.delete('/:id',  async (req, res) => {

  //agarro el id de los parametros
  let { id } = req.params;

  if(id[0] !== 'u') return res.send({Error: 'No se puede borrar ese juego.'})

  let parsedId = parseInt(id.slice(1));


  const destroyed = await Videogame.destroy({where: {id: parsedId}})

  let response = destroyed ? `Videojuego con el id ${id} eliminado.` : `El juego ${id} no existe o no se puede eliminar.`

  res.send(response)

});

router.put('/:id', async (req, res) => {
  //agarro el id de los parametros
  let {id} = req.params
  let { name, description, releaseDate, rating, platforms, genres } = req.body;

  let parsedId = parseInt(id.slice(1));

  console.log(releaseDate)

  try{
  const edited = await Videogame.findByPk(parsedId)

  console.log(edited)

  await edited.update({
    name: name ? name : edited.dataValues.name,
    description: description ? description : edited.dataValues.description,
    release_date: releaseDate ? releaseDate : edited.dataValues.release_date,
    rating: rating ? rating : edited.dataValues.rating
  })

    platforms && platforms.forEach(async (p) => {
      let platform = await Platform.findOrCreate({
        where: { name: p },
        defaults: { name: p },
      });

      await edited.addPlatforms(platform[0].dataValues.id);
    });

    genres && genres.forEach(async (g) => {
      let genre = await Genre.findOrCreate({
        where: { name: g },
        defaults: { name: g },
      });

      await edited.addGenres(genre[0].dataValues.id);
    });


    console.log(edited)
    res.send({
      success: `Videojuego editado.`, 
    });

  }catch(e){
    console.log(e)
    res.send({ Error: e });
  }


})

module.exports = router;
