/**
 * Annova Özel Eğitim Kurumları ERP yazılımı
 * 
 * Copyright (c) Annova Software 2021
 * 
 * File:      App.js
 * 
 * Contents:  React eğitimi amaçlı deneme programı
 * 
 * History:   08.03.2021, drx
 */
import Home from "./components/Home";
import About from "./components/About";
import Shop from "./components/Shop";
import Error from "./components/Error";
import Navbar from "./components/Navbar";
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Navbar />
    <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/about" component={About} />
        <Route path="/shop" component={Shop} />
        <Route component={Error} />
    </Switch>
    </div>
  );
};

export default App;