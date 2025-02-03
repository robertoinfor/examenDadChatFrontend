import React, { useEffect, useState } from 'react';
import './Bar.css';

interface Usuario {
    id_usuario: number;
    nombre: string;
    telefono: string;
    estado: string;
}
interface MenuProps {
    getMessages: (id: number) => void
}

const Bar: React.FC<MenuProps> = ({ getMessages }) => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);

    useEffect(() => {
        fetch("http://localhost:3002/api/usuarios")
            .then(res => res.json())
            .then(setUsuarios)
            .catch(err => console.error("Error al obtener alumnos", err));

        fetch("http://localhost:3002/api/chat")
    }, []);

    return (
        <div id="plist" className="people-list">
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fa fa-search"></i></span>
                </div>
                <input type="text" className="form-control" placeholder="Search..." />
            </div>
            <ul className="list-unstyled chat-list mt-2 mb-0">
                {usuarios.map((item) => (
                    <li className="clearfix" >
                        <div className="about" key={item.id_usuario} onClick={() => getMessages(item.id_usuario)} >
                            <div className="name">{item.nombre}</div>
                            <div className="status"> <i className="fa fa-circle offline"></i>{item.estado}</div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bar;
