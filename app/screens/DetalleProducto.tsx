import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator } from 'react-native';

const DetalleProducto = () => {
    const { query } = useRouter();
    const productoId = query.productoId; // Obtenemos el productoId desde la query string

    const [producto, setProducto] = useState<any>(null);
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        if (!productoId) {
            console.log("productoId no está disponible");
            setCargando(false);
            return;
        }

        const obtenerProducto = async () => {
            try {
                const respuesta = await fetch(`https://fakestoreapi.com/products/${productoId}`);
                if (!respuesta.ok) {
                    throw new Error('No se pudo obtener el producto');
                }
                const datos = await respuesta.json();
                setProducto(datos);
                setCargando(false);
            } catch (error) {
                console.log('Error obteniendo el producto', error);
                setCargando(false);
            }
        };

        obtenerProducto();
    }, [productoId]);

    if (cargando) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Cargando producto...</Text>
            </View>
        );
    }

    if (!producto) {
        return (
            <View style={styles.container}>
                <Text>No se encontró el producto.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: producto.image }} style={styles.imagenProducto} />
            <Text style={styles.titulo}>{producto.title}</Text>
            <Text style={styles.descripcion}>{producto.description}</Text>
            <Text style={styles.precio}>${producto.price}</Text>
            <Text style={styles.rating}>Rating: {producto.rating?.rate} ({producto.rating?.count} opiniones)</Text>
            <Text style={styles.categoria}>Categoría: {producto.category}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    imagenProducto: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
    },
    precio: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 10,
    },
    categoria: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default DetalleProducto;
