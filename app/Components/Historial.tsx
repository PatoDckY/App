import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface HistorialProps {
  item: {
    monto: number;
    porcentaje: number;
    propina: number;
    total: number;
  };
}

const Historial: React.FC<HistorialProps> = ({ item }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.texto}>Monto: ${item.monto.toFixed(2)}</Text>
      <Text style={styles.texto}>Propina: {item.porcentaje}% (${item.propina.toFixed(2)})</Text>
      <Text style={styles.texto}>Total: ${item.total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#D7CCC8', // Café claro
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  texto: {
    fontSize: 16,
    color: '#5D4037', // Café oscuro
  },
});

export default Historial;