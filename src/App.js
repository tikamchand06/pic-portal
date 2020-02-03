import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Home from './components/Home';
import Search from './components/Search';
import Random from './components/Random';
import Likes from './components/Likes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => (
  <Router>
    <Navbar />
    <Container fluid className="body m-0">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/random" component={Random} />
        <Route exact path="/likes" component={Likes} />
        <Route exact path="" component={Home} />
      </Switch>
    </Container>
    <Footer />
  </Router>
);

export default App;
