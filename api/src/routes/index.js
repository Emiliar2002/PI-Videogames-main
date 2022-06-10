const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const videoGamesRouter = require('./videogamesRouter')
const videoGameRouter = require('./videogameRouter')
const genresRouter = require('./genresRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames', videoGamesRouter)
router.use('/videogame', videoGameRouter)
router.use('/genres', genresRouter)


module.exports = router;
