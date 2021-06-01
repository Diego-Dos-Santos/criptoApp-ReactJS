import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner/Spinner';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cripto, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      // evitamos la ejecución la primera vez
      if(moneda === '') return;

      // consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // mostrar el spinner

      guardarCargando(true);

      // ocultar el spinner y mostrar resultados 

      setTimeout(() => {

        // cambiar el estado de cargando
        guardarCargando(false);

        // guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[cripto][moneda])
      }, 3000)
    }

    cotizarCriptomoneda();
  }, [moneda, cripto])

  const componente = (cargando) ? <Spinner /> :  <Cotizacion resultado={resultado} />

  return (
    <div className="App">
      <div className="CA-title">
        <h1>Cripto App</h1>
      </div>
      <div className="CA-subtitle">
        <span>Cotiza Criptomonedas al instante</span>
      </div>
      <div className="container">
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />
      </div>

      {componente}
    </div>
  );
}

export default App;
