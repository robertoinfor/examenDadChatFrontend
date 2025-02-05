import React, { useEffect, useState } from 'react';
import './Content.css';


interface MenuProps {
    id: number
}
interface Chat {
    id_chat: number;
    id_usuario: number;
    mensaje: string;
    fecha_hora: string;
    emisor: string;
}

const Content: React.FC<MenuProps> = ({ id }) => {
    const [messages, setMessages] = useState<Chat[]>([]);

    useEffect(() => {
        fetch("http://localhost:3002/api/chat/" + id)
            .then(res => res.json())
            .then(setMessages)
            .catch(err => console.error("Error al obtener los mensajes", err));
        console.log(messages)
    }, []);
    return (
        <div className="chat-history">
            <ul className="m-b-0">
                {messages.map((item) => (
                    <li className="clearfix">
                        {item.emisor !== "yo" && <><div className="message-data text-right">
                            <span className="message-data-time">{item.fecha_hora}</span>
                        </div><div className="message other-message float-right">{item.mensaje}</div></>
                        }
                        {item.emisor === "yo" && <><div className="message-data">
                            <span className="message-data-time">{item.fecha_hora}</span>
                        </div>
                            <div className="message my-message">{item.mensaje}</div></>
                        }
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Content;