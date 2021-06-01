import React, {Fragment, useState} from 'react';

const useCriptomoneda = (label, stateInicial, opciones) => {

    // State de nuestro custom hook 

    const [state, actualizarState] = useState(stateInicial);

    // lo que va a enseñar en pantalla

    const SelectCripto = () => ( 
        <Fragment>
            <label className="coin-title">{label}</label>
            <select onChange={e => actualizarState(e.target.value)} value={state} className="cripto-input">
                <option value="">Seleccionar Cripto</option>
                 {opciones.map(opcion => (
                    <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))} 
            </select>
        </Fragment>
    );

    // Retornar State, Interfaz y Función que modifica el State
    
    return [state, SelectCripto, actualizarState];
}

export default useCriptomoneda;