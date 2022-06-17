import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import React from "react";
import { getGame } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";
import css from './Game.module.css'



const Game = () => {

  let gKey = 0
  let pKey = 0

  let dispatch = useDispatch();
  let game = useSelector((state) => state.game);

  console.log(game)

const { id } = useParams();


  React.useEffect(() => {
    dispatch(getGame(id));
  }, []);

  return (


    game.name ? 

    <main className={css.container}>
      <Navbar/>
      <div className={css.game}>
      <h1>{game.name}</h1>

      {game.image && <img className={css.img} src={game.image} />}

      <div className={css.desc} dangerouslySetInnerHTML={{ __html: game.description }} />

      <div className={css.list}>
      <p>Generos: </p>{game.genres.map((g) => {
        return <span key={gKey++}>{g}</span>;
      })}
      </div>

      <div className={css.list}>
      <p>Plataformas: </p>{game.platforms.map((p) => {
        return <span key={pKey++}>{p}</span>;
      })}
      </div>

      <p>Rating: {game.rating ? game.rating : 'N/A'}</p>
      <p>Fecha de lanzamiento: {game.releaseDate ? game.releaseDate : 'N/A'}</p>


    </div> 
    </main>
  
    :
     
    !game.Error ? <main className={css.container}><Navbar/><h1>Cargando...</h1></main> :  <main className={css.container}><Navbar/><h1>Ese juego no existe.</h1></main>
  );
  
};

export default Game;
