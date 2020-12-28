import React from "react";
import Header from "../Header/index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Login";
import Registration from "../Registration";
import ProductList from "../ProductList";
import AddProduct from "../AddProduct";
import Edit from "../edit";


class App extends React.Component {
  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact />
          <Route path="/login" component={Login} />
          <Route path="/auth" component={Registration} />
          <Route path="/product" component={ProductList} />
          <Route path="/addProduct" component={AddProduct} />
          <Route path="/edit" component={Edit} />
        </Switch>
      </Router>
    );
  }
}

export default App;
