import React, { Component } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Menu extends Component {
    cerrarSesion = () => {
        cookies.remove('id', { path: "/" });
        cookies.remove('username', { path: "/" });
        cookies.remove('correo', { path: "/" });
        cookies.remove('telefono', { path: "/" });
        window.location.href = "./";
    }

    /* cookie de referencia para en caso este logeado no mostrar login */
    componentDidMount() {
        if (!cookies.get('username')) {
            window.location.href = "./";
        }
    }

    render() {
        return (
            <div className="container p-5">
                <h1 className="display-5 titulo">LIMA RUTAS</h1>
                <nav>
                    <a href="/usuarios">Usuarios</a>
                    <a href="/empresas">Empresas</a>
                    <a href="/rutas">Rutas</a>
                    <a href="/transportes">Transportes</a>
                    <a href="/servicios">Servicios</a>
                    <a href="/viajes">Viajes</a>
                    <a href="/reservas">Reservas</a>
                    <div className="animation"></div>
                </nav>
                <div className="d-flex justify-content-center p-5 gif-image" align="center">
                    <img src="ride-bus.gif" alt="imagen de usuario" />
                </div>
                <div className="d-flex justify-content-center salir" align="center">
                    <button className="btn btn-danger" onClick={() => this.cerrarSesion()} >Cerrar Sesion</button>
                </div>
            </div>
        )
    }
}

export default Menu;