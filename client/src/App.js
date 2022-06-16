import { Route } from 'react-router-dom';
import Formulario from './components/Formulario/Formulario';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Game from './components/Game/Game';



function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component={LandingPage}/>
      <Route exact path={'/home'} component={Home}/>
      <Route exact path={'/crear'} component={Formulario}/>
      <Route exact path={'/game/:id'} component={Game}/>
    </div>
  );
}

export default App;
