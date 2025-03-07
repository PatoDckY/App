import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Boton from '../../app-temp/Components/Boton';
import { useRouter } from 'expo-router';

const productos = () => {
  const ruta = useRouter();

  // Definir la estructura de datos para los productos
  type producto = {
    id: number;
    title: string;
    price: number;
    description?: string;
    category?: string;
    image: string;
    rating?: {
      rate: number;
      count: number;
    };
  };

  // Estados de la aplicación
  const [Productos, setProductos] = useState<producto[]>([]);
  const [Cargando, setCargando] = useState<boolean>(true);
  const [CategoriaSeleccionada, setCategoriaSeleccionada] = useState<string>(''); // Para manejar la categoría seleccionada

  // Petición para obtener los productos
  useEffect(() => {
    const CargaDatos = async () => {
      setCargando(true);
      try {
        const respuesta = await fetch('https://fakestoreapi.com/products');
        if (!respuesta.ok) {
          throw new Error('Error al conectar con la fuente de datos');
        }
        const datos = await respuesta.json();
        setProductos(datos);
        setCargando(false);
      } catch (error) {
        console.log('Error durante la obtención de datos', error);
      }
    };
    CargaDatos();
  }, []);

  // Función para obtener las categorías únicas
  const obtenerCategorias = () => {
    const categorias = Productos.map((producto) => producto.category);
    return [...new Set(categorias)]; // Elimina duplicados
  };

  // Función para filtrar productos por categoría
  const filtrarPorCategoria = (categoria: string) => {
    setCategoriaSeleccionada(categoria);
  };

  // Pantalla de carga
  const UnLoadScreen = () => {
    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Cargando Datos...</Text>
        <ActivityIndicator />
      </View>
    );
  };

  // Pantalla con la lista de productos
  const LoadScreen = () => {
    // Filtrar productos según la categoría seleccionada
    const productosFiltrados = CategoriaSeleccionada
      ? Productos.filter((producto) => producto.category === CategoriaSeleccionada)
      : Productos;

    return (
      <View style={styles.loadscreen}>
        <Text style={styles.titulo}>Lista de Productos</Text>
        
        {/* Menú de categorías */}
        <View style={styles.menuCategorias}>
          <Text style={styles.titulo}>Categorías</Text>
          {obtenerCategorias().map((categoria) => (
            <TouchableOpacity key={categoria} onPress={() => filtrarPorCategoria(categoria)}>
              <Text style={styles.categoria}>{categoria}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={productosFiltrados}
          renderItem={({ item }) => (
            <ProductoItem
              title={item.title}
              price={item.price}
              image={item.image}
              id={item.id}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.flatlist}
        />
      </View>
    );
  };

  // Definición de cada item en la lista de productos
  const ProductoItem = (props: producto) => {
    const produc = JSON.stringify(props);
    return (
      <View style={styles.card}>
        <Text>Producto: {props.title}</Text>
        <Text>Precio: ${props.price}</Text>
        <Image
          source={{ uri: props.image }}
          style={{ height: 80, width: 80, borderRadius: 40 }}
        />
        <Boton
          titulo="Ver Detalles"
          onPress={() => {
            ruta.push('../producto/' + props.id);
          }}
        />
        <Boton
          titulo="Detalles objeto"
          onPress={() => {
            ruta.push({
              pathname: '../producto/[data]',
              params: { data: produc },
            });
          }}
        />
      </View>
    );
  };

  return <View style={styles.container}>{Cargando ? UnLoadScreen() : LoadScreen()}</View>;
};

export default productos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  flatlist: {
    width: '100%',
  },
  loadscreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  categoria: {
    fontSize: 20,
    color: 'blue',
    marginVertical: 5,
  },
  menuCategorias: {
    padding: 20,
    width: '100%',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
});
