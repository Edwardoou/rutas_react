import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Menu from "../components/Menu";
/* tablas */
import Empresa from "../components/Empresa";
import Usuario from "../components/Usuario";
import Viaje from "../components/Viaje";
import Reserva from "../components/Reserva";
import Ruta from "../components/Ruta";
import Servicio from "../components/Servicio";
import Transporte from "../components/Transporte";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/usuarios" component={Usuario} />
        <Route exact path="/empresas" component={Empresa} />
        <Route exact path="/viajes" component={Viaje} />
        <Route exact path="/reservas" component={Reserva} />
        <Route exact path="/rutas" component={Ruta} />
        <Route exact path="/servicios" component={Servicio} />
        <Route exact path="/transportes" component={Transporte} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
