const {Router} = require('express')
const { Genre } = require('../db.js')


const router = Router()


router.get('/', async(req, res) => {

    const genres = await Genre.findAll()

    res.send(genres)

})

module.exports = router;