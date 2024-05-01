import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Carrinho from './pages/Carrinho';
import Detalhes from './pages/Detalhes';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route exact path="/carrinho" component={ Carrinho } />
          <Route exact path="/detalhes/:id" component={ Detalhes } />
          <Route exact path="/pagamento" component={ Checkout } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
