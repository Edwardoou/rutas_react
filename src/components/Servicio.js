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
} from "@material-ui/core";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const url = "http://localhost:8080/servicios";
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
   const [data, setData] = useState([]);

    /* GET */
    const peticionGet = async () => {
        await axios.get(url + "/listar").then((res) => {
            setData(res.data);
        });
    };

    useEffect(async () => {
        await peticionGet();
        if (!cookies.get('username')) {
            window.location.href = "./";
        }
    }, []);

    /* hmtl */
    return (
        <div className="container">
            <div className="py-5">
                <a type="button" className="salir btn btn-outline-danger btn-light btn-lg" href="/menu">Volver</a>
            </div>
            <TableContainer style={{backgroundColor: "white"}}>
                <Table>
                    <TableHead>
                        <TableRow style={{backgroundColor:'#D6DBDF'}}>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Nombre</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Empresa</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Ruta</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Itinerario</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Dia Inicial</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Dia Final</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Precio</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((servicio) => (
                            <TableRow key={servicio.id}>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.nombre}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.empresa.nombre}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.ruta.nombre}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.itinerario}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.dia_inicial}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.dia_final}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{servicio.precio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default EmpComponent;