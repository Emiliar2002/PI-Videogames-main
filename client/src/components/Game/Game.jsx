import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import React from "react";
import { getGame } from "../../redux/actions";
import Navbar from "../Navbar/Navbar";



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

    <main>
      <Link to={'/'}>Volver</Link>
      <h1>{game.name}</h1>

      {game.image ? (
        <img src={game.image} />
      ) : (
        <img
          src={
            "https://searx.tiekoetter.com/image_proxy?url=https%3A%2F%2Fs1.qwant.com%2Fthumbr%2F474x474%2F8%2Fa%2Fb0e75215e03386a2ffc6606cab618e87a0f9641f16a01cacbaef097c26c794%2Fth.jpg%3Fu%3Dhttps%253A%252F%252Ftse4.mm.bing.net%252Fth%253Fid%253DOIP.O4tCD5ABPlCCijlvAe8wXAHaHa%2526pid%253DApi%26q%3D0%26b%3D1%26p%3D0%26a%3D0&h=0d5d6cf63e9236d756ec1f8884973748882c0636c4985d20a2fea9e12d522da9"
          }
        />
      )
      }

      <div dangerouslySetInnerHTML={{ __html: game.description }} />
      
      <br />

      <p>Generos: </p>{game.genres.map((g) => {
        return <span key={gKey++}>{g}</span>;
      })}

      <p>Plataformas: </p>{game.platforms.map((p) => {
        return <span key={pKey++}>{p}</span>;
      })}

      <p>Rating: {game.rating ? game.rating : 'N/A'}</p>
      <p>Fecha de lanzamiento: {game.releaseDate ? game.releaseDate : 'N/A'}</p>



    </main>
  
    :
     
    !game.Error ? <main><Link to={'/'}>Volver</Link><h1>Cargando...</h1></main> :  <main><Link to={'/'}>Volver</Link><h1>Ese juego no existe.</h1></main>
  );
  
};

export default Game;
