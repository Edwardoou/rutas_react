import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableContainer,
    TableHead,
    TableCell,
    TableBody,
    TableRow,
    Modal,
    Button,
    TextField,
} from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const url = "http://localhost:8080/rutas";
const useStyles = makeStyles((theme) => ({
    modal: {
        position: "absolute",
        width: 400,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    },
    iconos: {
        cursor: "pointer",
    },
    inputMaterial: {
        width: "100%",
    },
}));

function EmpComponent() {
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [modalInsertar, setModalInsertar] = useState(false);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);

    /* valores de los TextField para el form de la consola seleccionada*/
    const [consolaSeleccionada, setConsolaSeleccionada] = useState({
        nombre: "",
        recorrido: "",
        paradero_inicial: "",
        paradero_final: ""
    });

    /* almacen de valores ingresados del form*/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setConsolaSeleccionada((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        console.log(consolaSeleccionada);
    };

    /* GET */
    const peticionGet = async () => {
        await axios.get(url + "/listar").then((res) => {
            setData(res.data);
        });
    };

    /* POST */
    const peticionPost = async () => {
        await axios.post(url + "/guardar/", consolaSeleccionada).then((res) => {
            setData(data.concat(res.data));
            /* cierra la ventana */
            abrirCerrarModalInsertar();
        });
    };

    /* PUT */
    const peticionPut = async () => {
        await axios
            .put(url + "/actualizar/" + consolaSeleccionada.id, consolaSeleccionada)
            .then((response) => {
                var dataNueva = data;
                dataNueva.map((ruta) => {
                    if (consolaSeleccionada.id === ruta.id) {
                        ruta.nombre = consolaSeleccionada.nombre;
                        ruta.recorrido = consolaSeleccionada.recorrido;
                        ruta.paradero_inicial = consolaSeleccionada.paradero_inicial;
                        ruta.paradero_final = consolaSeleccionada.paradero_final;
                    }
                });
                setData(dataNueva);
                abrirCerrarModalEditar();
            });
    };

    /* DELETE */
    const peticionDelete = async () => {
        await axios.delete(url + "/eliminar/" + consolaSeleccionada.id).then((response) => {
            setData(data.filter((empresa) => empresa.id !== consolaSeleccionada.id));
            abrirCerrarModalEliminar();
        });
    };

    /* Abrir y cerrar ventana */
    const abrirCerrarModalInsertar = () => {
        setModalInsertar(!modalInsertar);
        /* fuerza que se recargue la pagina con el get */
        peticionGet();
    };
    const abrirCerrarModalEditar = () => {
        setModalEditar(!modalEditar);
    };
    const abrirCerrarModalEliminar = () => {
        setModalEliminar(!modalEliminar);
    };
    /* ... */

    /* en caso editar abrir editar, caso contrario eliminar*/
    const seleccionarConsola = (empresa, caso) => {
        setConsolaSeleccionada(empresa);
        caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
    };

    useEffect(async () => {
        await peticionGet();
        if (!cookies.get('username')) {
            window.location.href = "./";
        }
    }, []);

    /* insertar */
    const bodyInsertar = (
        <div className={styles.modal}>
            <h3>Agregar Nueva Ruta</h3>
            <TextField
                name="nombre"
                className={styles.inputMaterial}
                label="Nombre"
                onChange={handleChange}
            />
            <br />
            <TextField
                name="recorrido"
                className={styles.inputMaterial}
                label="Recorrido"
                onChange={handleChange}
            />
            <br />
            <TextField
                name="paradero_inicial"
                className={styles.inputMaterial}
                label="Paradero Inicial"
                onChange={handleChange}
            />
            <br />
            <TextField
                name="paradero_final"
                className={styles.inputMaterial}
                label="Paradero Final"
                onChange={handleChange}
            />
            <br />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPost()}>
                    Insertar
                </Button>
                <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
            </div>
        </div>
    );

    /* editar */
    const bodyEditar = (
        <div className={styles.modal}>
            <h3>Editar Empresa</h3>
            <TextField
                name="nombre"
                className={styles.inputMaterial}
                label="Nombre"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.nombre}
            />
            <br />
            <TextField
                name="recorrido"
                className={styles.inputMaterial}
                label="Recorrido"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.recorrido}
            />
            <br />
            <TextField
                name="paradero_inicial"
                className={styles.inputMaterial}
                label="Paradero Inicial"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.paradero_inicial}
            />
            <br />
            <TextField
                name="paradero_final"
                className={styles.inputMaterial}
                label="Paradero Final"
                onChange={handleChange}
                value={consolaSeleccionada && consolaSeleccionada.paradero_final}
            />
            <br />
            <div align="right">
                <Button color="primary" onClick={() => peticionPut()}>
                    Editar
                </Button>
                <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
            </div>
        </div>
    );

    /* eliminar */
    const bodyEliminar = (
        <div className={styles.modal}>
            <p>
                Estás seguro que deseas eliminar la Ruta{" "}
                <b>{consolaSeleccionada && consolaSeleccionada.nombre}</b> ?{" "}
            </p>
            <div align="right">
                <Button color="secondary" onClick={() => peticionDelete()}>
                    Sí
                </Button>
                <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
            </div>
        </div>
    );

    /* hmtl */
    return (
        <div className="container">
            <div className="py-5">
                <a type="button" className="salir btn btn-outline-danger btn-light btn-lg" href="/menu">Volver</a>
            </div>
            <TableContainer style={{ backgroundColor: "white" }}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: '#D6DBDF' }}>
                            <TableCell style={{ fontSize: '30px', textAlign: 'center' }}>Ruta</TableCell>
                            <TableCell style={{ fontSize: '30px', textAlign: 'center' }}>Recorrido</TableCell>
                            <TableCell style={{ fontSize: '30px', textAlign: 'center' }}>Paradero Inicial</TableCell>
                            <TableCell style={{ fontSize: '30px', textAlign: 'center' }}>Paradero Final</TableCell>
                            <TableCell style={{ fontSize: '30px', textAlign: 'center' }}>Opciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((ruta) => (
                            <TableRow key={ruta.id}>
                                <TableCell style={{ fontSize: '20px', textAlign: 'center' }}>{ruta.nombre}</TableCell>
                                <TableCell style={{ fontSize: '20px', textAlign: 'center' }}>{ruta.recorrido}</TableCell>
                                <TableCell style={{ fontSize: '20px', textAlign: 'center' }}>{ruta.paradero_inicial}</TableCell>
                                <TableCell style={{ fontSize: '20px', textAlign: 'center' }}>{ruta.paradero_final}</TableCell>
                                <TableCell style={{ fontSize: '20px', textAlign: 'center' }}>
                                    <Edit
                                        className={styles.iconos}
                                        onClick={() => seleccionarConsola(ruta, "Editar")}
                                    />
                                    &nbsp;&nbsp;&nbsp;
                                    <Delete
                                        className={styles.iconos}
                                        onClick={() => seleccionarConsola(ruta, "Eliminar")}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="btn container p-4">
                <button type="button" className="btn btn-outline-primary btn-light btn-lg" onClick={() => abrirCerrarModalInsertar()}>Insertar</button>
            </div>

            <Modal open={modalInsertar} onClose={abrirCerrarModalInsertar}>
                {bodyInsertar}
            </Modal>

            <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
                {bodyEditar}
            </Modal>

            <Modal open={modalEliminar} onClose={abrirCerrarModalEliminar}>
                {bodyEliminar}
            </Modal>
        </div>
    );
}

export default EmpComponent;