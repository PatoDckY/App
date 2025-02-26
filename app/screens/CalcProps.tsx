import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Historial from '../Components/Historial';

interface Calculo {
  id: string;
  monto: number;
  porcentaje: number;
  propina: number;
  total: number;
}

const CalculadoraP = () => {
  const [monto, setMonto] = useState<string>('');
  const [porcentaje, setPorcentaje] = useState<number>(10);
  const [propina, setPropina] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [historial, setHistorial] = useState<Calculo[]>([]);

  const calcularPropina = () => {
    const montoNum = parseFloat(monto);
    if (isNaN(montoNum)) {
      alert('Por favor, ingresa un monto válido.');
      return;
    }

    const propinaCalculada = (montoNum * porcentaje) / 100;
    const totalCalculado = montoNum + propinaCalculada;

    setPropina(propinaCalculada);
    setTotal(totalCalculado);

    const nuevoCalculo: Calculo = {
      id: Math.random().toString(),
      monto: montoNum,
      porcentaje,
      propina: propinaCalculada,
      total: totalCalculado,
    };

    setHistorial([nuevoCalculo, ...historial]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Propinas</Text>

      <TextInput
        style={styles.input}
        placeholder="Monto del consumo"
        placeholderTextColor="#A68A64"
        keyboardType="numeric"
        value={monto}
        onChangeText={(text) => setMonto(text)}
      />

      <Text style={styles.subtitulo}>Selecciona el porcentaje de propina:</Text>
      <View style={styles.botonesPorcentaje}>
        <TouchableOpacity
          style={[styles.botonPorcentaje, porcentaje === 10 && styles.botonSeleccionado]}
          onPress={() => setPorcentaje(10)}
        >
          <Text style={styles.textoBoton}>10%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonPorcentaje, porcentaje === 15 && styles.botonSeleccionado]}
          onPress={() => setPorcentaje(15)}
        >
          <Text style={styles.textoBoton}>15%</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.botonPorcentaje, porcentaje === 20 && styles.botonSeleccionado]}
          onPress={() => setPorcentaje(20)}
        >
          <Text style={styles.textoBoton}>20%</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Porcentaje personalizado"
        placeholderTextColor="#A68A64"
        keyboardType="numeric"
        value={porcentaje.toString()}
        onChangeText={(text) => setPorcentaje(parseFloat(text))}
      />

      <TouchableOpacity style={styles.botonCalcular} onPress={calcularPropina}>
        <Text style={styles.textoBotonCalcular}>Calcular Propina</Text>
      </TouchableOpacity>

      <View style={styles.resultadosContainer}>
        <Text style={styles.resultado}>Propina: ${propina.toFixed(2)}</Text>
        <Text style={styles.resultado}>Total a Pagar: ${total.toFixed(2)}</Text>
      </View>

      <Text style={styles.subtitulo}>Historial de Cálculos:</Text>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Historial item={item} />}
        style={styles.lista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4E9DA', // Fondo café claro
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#5D4037', // Café oscuro
  },
  input: {
    height: 50,
    borderColor: '#A68A64', // Café medio
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderRadius: 10,
    fontSize: 16,
    color: '#5D4037', // Café oscuro
    backgroundColor: '#FFFFFF', // Blanco
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#5D4037', // Café oscuro
  },
  botonesPorcentaje: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  botonPorcentaje: {
    backgroundColor: '#D7CCC8', // Café claro
    padding: 10,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
  },
  botonSeleccionado: {
    backgroundColor: '#A68A64', // Café medio
  },
  textoBoton: {
    fontSize: 16,
    color: '#5D4037', // Café oscuro
  },
  botonCalcular: {
    backgroundColor: '#8D6E63', // Café medio oscuro
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  textoBotonCalcular: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF', // Blanco
  },
  resultadosContainer: {
    marginBottom: 20,
  },
  resultado: {
    fontSize: 18,
    color: '#5D4037', // Café oscuro
    marginBottom: 5,
  },
  lista: {
    flex: 1,
  },
});

export default CalculadoraP;