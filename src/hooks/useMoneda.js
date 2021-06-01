import React, {Fragment, useState} from 'react';

const useMoneda = (label, stateInicial, opciones) => {

    // State de nuestro custom hook 

    const [state, actualizarState] = useState(stateInicial);

    // lo que va a enseñar en pantalla

    const Seleccionar = () => ( 
        <Fragment>
            <label className="coin-title">{label}</label>
            <select onChange={e => actualizarState(e.target.value)} value={state} className="coin-input">
                <option value="">Seleccionar Moneda</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </select>
        </Fragment>
    );

    // Retornar State, Interfaz y Función que modifica el State
    
    return [state, Seleccionar, actualizarState];
}

export default useMoneda;