import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [cripto, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      // evitamos la ejecución la primera vez
      if(moneda === '') return;

      // consultar la api para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      guardarResultado(resultado.data.DISPLAY[cripto][moneda])
    }

    cotizarCriptomoneda();
  }, [moneda, cripto])

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
      <Cotizacion 
          resultado={resultado}
        />
    </div>
  );
}

export default App;
