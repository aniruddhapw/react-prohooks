
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import { Home } from './Home';
import Search from './Search';

function App() {
  return (
    <div className="App">
  <Router>
    <header>
      <div>Books with Hooks</div>
      <ul className="menu"><li><Link to="/">Home</Link></li><li><Link to="/search">Search</Link></li></ul>
    </header>
    <Security issuer='https://dev-97867221.okta.com/oauth2/default'
              clientId='0oa8paj7o4MhTwZVL5d7'
              redirectUri={window.location.origin + '/callback'}
              pkce={true}>
      <Route path='/' exact={true} component={Home}/>
      <SecureRoute path='/search' exact={true} component={Search}/>
      <Route path='/callback' component={LoginCallback}/>
    </Security>
  </Router>
</div>
  );
}

export default App;
