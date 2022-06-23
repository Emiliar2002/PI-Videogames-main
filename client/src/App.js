import { Route, Switch } from 'react-router-dom';
import Formulario from './components/Formulario/Formulario';
import Home from './components/Home/Home';
import LandingPage from './components/LandingPage/LandingPage';
import Game from './components/Game/Game';
import NotFound from './components/NotFound/NotFound';
import EditGame from './components/EditGame/EditGame';



function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={LandingPage}/>
        <Route exact path={'/home'} component={Home}/>
        <Route exact path={'/crear'} component={Formulario}/>
        <Route exact path={'/editar'} component={EditGame}/>
        <Route exact path={'/game/:id'} component={Game}/>
        <Route exact path={'*'} component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
