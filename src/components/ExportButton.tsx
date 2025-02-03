import React, { useEffect, useState } from 'react';
import './Content.css';
import { IonButton } from '@ionic/react';
import jsPDF from 'jspdf';

interface ContentProps {
    messagesexport: Chat[];
}

interface Chat {
    id_chat: number;
    id_usuario: number;
    mensaje: string;
    fecha_hora: string;
    emisor: string;
}

const Content: React.FC<ContentProps> = ({ messagesexport }) => {
    const descargar = () => {
        const doc = new jsPDF({
            format: 'a4',
            unit: 'px',
        });
        doc.setFont('Arial', 'normal')
        doc.setFontSize(30)
        doc.text("Mensajes del chat", 20, 30)
        doc.setFontSize(12)
        let tamanio = 40
        messagesexport.map((message) => (
            doc.text("Mensaje: " + message.mensaje + "         Fecha: " + message.fecha_hora, 20, tamanio + 10),
            tamanio += 20
        ))
        doc.text("--------------------------", 20, tamanio)
        doc.save("Mensajes.pdf");
    }

    return (
        <IonButton onClick={descargar}>Descargar conversacion</IonButton>
    );
};

export default Content;