import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, Text, TextInput, View } from 'react-native';
import Login from './app-temp/screens/Login';
import Header from './app-temp/Components/Header';
import Foother from './app-temp/Components/Foother';
import Calculadora from './app-temp/screens/Calculadora';

export default function App() {
  return (
    <View style={styles.container}>
      <Header titulo='Calculadora' 
      nombre='Luis Alberto Mendoza' 
      imagen={require('./assets/guero.png')}/>

      <Calculadora/>
      
      <Foother fecha='2025-02-07' telefono='614-123-4567'/>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDE0D4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo:{
    fontSize:30,
    fontWeight:'bold',
    color:'#4B2E1E'
  }
});
