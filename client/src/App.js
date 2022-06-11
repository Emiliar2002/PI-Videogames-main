import Router, { Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Navbar from './components/Navbar/Navbar';



function App() {
  return (
    <div className="App">
      <Route exact path={'/'} component={LandingPage}/>
      <Route exact path={'/home'} component={Navbar}/>
    </div>
  );
}

export default App;
