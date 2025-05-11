import React from 'react';
import '../styles/Notificacion.css'; // Importa tus estilos

const Notificacion = ({ message }) => {
    if (message === null) {
        return null;
    }

    const { message: text, type } = message;
    const className = `notification ${type === 'success' ? 'success' : 'error'}`;

    return (
        <div className={className}>
        {text}
        </div>
    );
};

export default Notificacion;
