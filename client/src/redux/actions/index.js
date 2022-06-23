export const GET_ALL_GAMES = 'GET_ALL_GAMES'
export const GET_GAME = 'GET_GAME'
export const GET_ALL_GENRES = 'GET_ALL_GENRES'



export const getAllGames = (game) => dispatch => {
    console.log(process.env)
    if(typeof game === 'undefined'){
    return fetch(process.env.REACT_APP_API_URL + '/videogames')
    .then(response => response.json())
    .then(json => dispatch({type:GET_ALL_GAMES, payload: json}))
    }
    else{
        return fetch(process.env.REACT_APP_API_URL + '/videogames?name=' + game)
        .then(response => response.json())
        .then((json) =>{ 
            console.log(json)
            dispatch({type:GET_ALL_GAMES, payload: json})
        })
    }
}

export const getGame = (id) => dispatch => {
    return fetch(process.env.REACT_APP_API_URL + '/videogame/' + id)
    .then(response => response.json())
    .then(json => dispatch({type: GET_GAME, payload: json}))
}

export const getAllGenres = () => dispatch => {
    return fetch(process.env.REACT_APP_API_URL + '/genres')
    .then(response => response.json())
    .then(json => dispatch({type: GET_ALL_GENRES, payload: json}))
}