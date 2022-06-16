// Importa las actions types que necesites acá:

import { GET_ALL_GAMES, GET_ALL_GENRES, GET_GAME } from "../actions";


const initialState = {
    games: [],
    game: {},
    genres: []
};

const rootReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_GAMES: return {...state, games: action.payload}
        case GET_GAME: return {...state, game: action.payload}
        case GET_ALL_GENRES: return {...state, genres: action.payload}
        default: return {...state}
    };
};

export default rootReducer;


