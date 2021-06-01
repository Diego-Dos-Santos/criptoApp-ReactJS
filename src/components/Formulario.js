import React, { useState, useEffect } from 'react';
import axios from 'axios';

import useMoneda from './../hooks/useMoneda';
import useCriptomoneda from './../hooks/useCriptomoneda';
import Error from './Error'

const Formulario = ({guardarMoneda, guardarCriptomoneda}) => {

    // State del listasdo de criptomonedas

    const [listacripto, guardarCripto] = useState([]);

    // Error

    const [error, guardarError] = useState(false);

    // Arreglo de monedas

    const MONEDA = [
        {codigo: 'USD', nombre: 'Dólar Americano'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra'}
    ]

    // Utilizar useMoneda

    const [moneda, SelectMonedas] = useMoneda('Elige tu moneda', '', MONEDA);

     // Utilizar useCriptomoneda

     const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu criptomoneda', '', listacripto);

    // Ejecutar llamado a la API

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';


            const resultado = await axios.get(url);

            guardarCripto(resultado.data.Data);
        }
        consultarAPI();
    }, []);

    // cuando el usuario hace submit 

    const cotizarMoneda = e => {
        e.preventDefault();

        // validar si ambos los campos estan llenos

        if(moneda === '' || criptomoneda === ''){
            guardarError(true);
            return
        }

        // pasar los datos al componente principal 
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);
    }

    return ( 
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error message="Todos los campos son obligatorios"/> : null}

            <SelectMonedas />

            <SelectCripto />

            <input class="button-calc" type="submit" value="Calcular"/>
        </form>
     );
}
 
export default Formulario;