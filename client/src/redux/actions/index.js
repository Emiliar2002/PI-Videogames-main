export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_GAME = 'GET_GAME'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'


export const getAllGames = (game) => dispatch => {
    if(typeof game === 'undefined'){
    return fetch('http://localhost:3001/videogames')
    .then(response => response.json())
    .then(json => dispatch({type:GET_ALL_GAMES, payload: json}))
    }
    else{
        return fetch('http://localhost:3001/videogames?name=' + game)
        .then(response => response.json())
        .then(json => dispatch({type:GET_ALL_GAMES, payload: json}))
    }
}

export const getGame = (id) => dispatch => {
    return fetch('http://localhost:3001/videogame/' + id)
    .then(response => response.json())
    .then(json => dispatch({type: GET_GAME, payload: json}))
}

export const getAllGenres = () => dispatch => {
    return fetch('http://localhost:3001/genres')
    .then(response => response.json())
    .then(json => dispatch({type: GET_ALL_GENRES, payload: json}))
}