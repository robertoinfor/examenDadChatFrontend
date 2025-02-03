import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import Bar from '../components/Bar';
import Content from '../components/Content';
import ExportButton from '../components/ExportButton';

interface Usuario {
  id_usuario: number;
  nombre: string;
  telefono: string;
  estado: string;
}

interface Chat {
  id_chat: number;
  id_usuario: number;
  mensaje: string;
  fecha_hora: string;
  emisor: string;
}

const Home: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [messages, setMessages] = useState<Chat[]>([]);
  const [userChat, setUserChat] = useState<Usuario>(usuarios[0]);

  useEffect(() => {
    fetch("http://localhost:3002/api/usuarios")
      .then(res => res.json())
      .then(setUsuarios)
      .catch(err => console.error("Error al obtener alumnos", err));

    fetch("http://localhost:3002/api/chat/1")
      .then(res => res.json())
      .then(setMessages)
      .catch(err => console.error("Error al obtener los mensajes", err));
  }, []);

  function getMessages(id: number) {
    fetch("http://localhost:3002/api/chat/" + id)
      .then(res => res.json())
      .then(setMessages)
      .catch(err => console.error("Error al obtener los mensajes", err));

    fetch("http://localhost:3002/api/usuarios/" + id)
      .then(res => res.json())
      .then(setUserChat)
      .catch(err => console.error("Error al obtener los mensajes", err));
  }

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>
        <div className="container">
          <div className="row clearfix">
            <div className="col-lg-12">
              <div className="card chat-app">
                <Bar getMessages={getMessages}></Bar>
                <div className="chat">
                  <div className="chat-header clearfix">
                    <div className="row">
                      <div className="col-lg-6">
                        <a href="" data-toggle="modal" data-target="#view_info">
                        </a>
                        <div className="chat-about">
                          <h6 className="m-b-0">{userChat?.nombre || usuarios[0]?.nombre}</h6>
                          <small>{userChat?.estado || usuarios[0]?.estado}</small>
                        </div>
                        <br></br>
                      </div>
                      <br></br>
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
                      <div className="col-lg-6 hidden-sm text-right">
                        <a href="" className="btn btn-outline-secondary"><i className="fa fa-camera"></i></a>
                        <a href="" className="btn btn-outline-primary"><i className="fa fa-image"></i></a>
                        <a href="" className="btn btn-outline-info"><i className="fa fa-cogs"></i></a>
                        <a href="" className="btn btn-outline-warning"><i className="fa fa-question"></i></a>
                      </div>
                    </div>
                  </div>
                  <div className="chat-message clearfix">
                    <div className="input-group mb-0">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fa fa-send"></i></span>
                      </div>
                      <input type="text" className="form-control" placeholder="Enter text here..." />
                    </div>
                    <ExportButton messagesexport={messages} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;
