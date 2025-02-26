import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';

const ListaClima = () => {
    // Definir la estructura de los datos del pronóstico de clima
    type clima = {
        forecast: {
            forecastday: {
                date: string;
                day: {
                    maxtemp_c: number;
                    mintemp_c: number;
                    daily_chance_of_rain: number;
                    condition: {
                        text: string;
                        icon: string;
                    };
                };
            }[];
        };
    };

    // Definir los estados
    const [climaData, setClimaData] = useState<clima | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);

    // Definir la solicitud de API con useEffect
    useEffect(() => {
        const obtenerClima = async () => {
            setCargando(true);
            try {
                // Reemplaza 'YOUR_API_KEY' con tu clave de API de WeatherAPI
                const ciudad = 'Mexico'; // Cambia la ciudad si lo necesitas
                const respuesta = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=f6b9b26be4e54e37909190428241110&q=${ciudad}&days=5`);

                if (!respuesta.ok) {
                    throw new Error(`Error al conectar con la fuente de datos: ${respuesta.status}`);
                }

                // Convertir la respuesta a JSON
                const datos = await respuesta.json();
                setClimaData(datos);
                setCargando(false);
            } catch (error) {
                console.log('Error durante la obtención de datos', error);
            }
        };

        obtenerClima();
    }, []);

    // Pantalla de carga
    const UnLoadScreen = () => (
        <View style={styles.loadingContainer}>
            <Text>Cargando Datos...</Text>
            <ActivityIndicator />
        </View>
    );

    // Componente para mostrar el clima de cada día
    const WeatherCard = ({ item }: { item: any }) => {
        const { date, day } = item;
        const { maxtemp_c, mintemp_c, daily_chance_of_rain, condition } = day;

        // Función para determinar el color de fondo según la temperatura máxima
        const getBackgroundColor = (temp: number) => {
            if (temp < 20) return '#87CEFA'; // Azul
            if (temp >= 20 && temp <= 30) return '#FFD700'; // Amarillo
            return '#FF6347'; // Naranja
        };

        // Convertir la fecha al formato DD/MM/AAAA
        const [year, month, dayOfMonth] = date.split('-');
        const formattedDate = `${dayOfMonth}/${month}/${year}`;

        // Obtener el día de la semana
        const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
        const dayOfWeek = new Date(date).toLocaleDateString('es-ES', options);

        return (
            <View style={[styles.weatherCard, { backgroundColor: getBackgroundColor(maxtemp_c) }]}>
                <Text style={styles.day}>{dayOfWeek}</Text>
                <Text style={styles.date}>{formattedDate}</Text>
                <Image
                    source={{ uri: `https:${condition.icon}` }}
                    style={styles.weatherIcon}
                />
                <Text style={styles.condition}>{condition.text}</Text>
                <Text style={styles.temp}>
                    Max: {maxtemp_c}°C Min: {mintemp_c}°C
                </Text>
                <Text style={styles.rainChance}>Lluvia: {daily_chance_of_rain}%</Text>
            </View>
        );
    };

    // Pantalla con los datos de clima cargados
    const LoadScreen = () => (
        <FlatList
            data={climaData?.forecast.forecastday}
            renderItem={({ item }) => <WeatherCard item={item} />}
            keyExtractor={(item) => item.date}
        />
    );

    return (
        <View style={styles.container}>
            {cargando ? UnLoadScreen() : LoadScreen()}
        </View>
    );
};

export default ListaClima;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weatherCard: {
        width: 300,
        height: 200,
        margin: 10,
        borderRadius: 15,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: '#555',
        marginBottom: 10,
    },
    weatherIcon: {
        height: 50,
        width: 50,
        marginBottom: 10,
    },
    condition: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    temp: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    rainChance: {
        fontSize: 12,
        color: '#666',
    },
});
