import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
/* font awesosome */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* icono usuario */
import { faUser } from "@fortawesome/free-solid-svg-icons";
/* icono llave */
import { faLock } from "@fortawesome/free-solid-svg-icons";
import "../css/estilos.css";
import axios from "axios";
import Cookies from 'universal-cookie';

const url = "http://localhost:8080/usuarios/listar";
const cookies = new Cookies();

class Login extends Component {
  state = {
    usuario: {
      username: "",
      password: "",
    },
  };

  /* almacena valores de los inputs */
  handleChange = async (e) => {
    await this.setState({
      usuario: {
        ...this.state.usuario,
        [e.target.name]: e.target.value,
      },
    });
  };

  iniciarSesion = async () => {
    await axios
      .get(url, {
        params: {
          username: this.state.usuario.username,
          password: this.state.usuario.password
        },
      })
      .then(res => {
        return res.data;
      })
      .then(res => {
        var respuesta = res[0];
        if (respuesta != null) {
          if (respuesta.role==='admin') {
            cookies.set('id', respuesta.id, { path: "/" });
            cookies.set('telefono', respuesta.role, { path: "/" });
            cookies.set('username', respuesta.username, { path: "/" });
            cookies.set('correo', respuesta.correo, { path: "/" });
            cookies.set('telefono', respuesta.telefono, { path: "/" });
            alert(`Bienvenido ${respuesta.username}`);
            window.location.href = "./menu";
          }else{
          alert('Lo sentimos, solo puede ingresar personal autorizado')
          }
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  /* cookie de referencia para en caso este logeado no mostrar login */
  componentDidMount() {
    if (cookies.get('username')) {
      window.location.href = "./menu";
    }
  }

  render() {
    return (
      <div className="modal-dialog text-center">
        <div className="col-sm-8 main-section">
          <div className="modal-content">
            <div className="col-12 user-img">
              <img src="user.png" alt="imagen de usuario" />
            </div>

            <div className="form-group container">
              <h1>Iniciar Sesion</h1>
              <div className="row p-3">
                {/*usuario */}
                <div
                  className="col-2 p-0"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div
                  className="col-10"
                  style={{ paddingRight: 40, paddingLeft: 0 }}
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de usuario"
                    name="username"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* contraseña */}
              <div className="row p-3">
                <div
                  className="col-2 p-0"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </div>
                <div
                  className="col-10"
                  style={{ paddingRight: 40, paddingLeft: 0 }}
                >
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              {/* boton */}
              <button className="btn btn-primary m-3" onClick={() => this.iniciarSesion()}>Ingresar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
