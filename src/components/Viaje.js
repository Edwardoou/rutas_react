import React, { useEffect, useState } from "react";
import axios from "axios";
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
const url = "http://localhost:8080/viajes";

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
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Usuario</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Transporte</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Destino Inicial</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Destino Final</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Fecha</TableCell>
                            <TableCell style={{fontSize: '30px',textAlign:'center'}}>Costo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((viaje) => (
                            <TableRow key={viaje.id}>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{viaje.usuario.username}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{viaje.transporte.nombre}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{viaje.destino_inicial}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{viaje.destino_final}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{viaje.fecha}</TableCell>
                                <TableCell style={{fontSize: '20px',textAlign:'center'}}>{viaje.costo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default EmpComponent;