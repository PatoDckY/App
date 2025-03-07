import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Boton from '../../app-temp/Components/Boton'
import { useRouter } from 'expo-router'

const productos = () => {

    const ruta= useRouter();
    //definimos la estructura de datos a emplear por cada item
    type producto={
        id:number,
        title:string,
        price:number,
        description?:string,
        category?:string,
        image:string,
        rating?:{
            rate:number,
            count:number
        }
    }
    //definicion de estados en la app Productos, cargando
    const [Productos,setProductos]=useState<producto[]>([]);
    const [Cargando,setCargando]=useState<boolean>(true);
    
    //definimos la peticion web con el hook useEffect
    useEffect(()=>{
        const CargaDatos= async ()=>{
            setCargando(true);
            try {
                //vamos a realizar la peticion fetch
                const respuesta= await fetch('https://fakestoreapi.com/products');
                //verificamos si  diosito no quiso 
                if(!respuesta.ok){
                    throw new Error('Error al conectar con la fuente de datos : ${respuesta.status}');
                }
                //procedemos a pasar la respuesta a un objeto json
                const datos= await respuesta.json();
                setProductos(datos);
                setCargando(false);
                console.log(datos);
            } catch (error) {
                console.log('Error durante la obtencion de datos',error);
            }
        }
        CargaDatos();
    },[])

    //pantalla UnLoadScreen
    const UnLoadScreen=()=>{
        return(
            <View style={styles.loadscreen}>
                <Text style={styles.titulo}>Cargando Datos...</Text>
                <ActivityIndicator/>
            </View>
        )
    }

    //pantalla LoadScreen
    const LoadScreen=()=>{
        return(
            <View style={styles.loadscreen}>
                <Text style={styles.titulo}>Lista de Productos</Text>
                <FlatList 
                data={Productos}
                renderItem={({item})=><ProductoItem 
                title={item.title}
                price={item.price}
                image={item.image}
                id={item.id}/>}
                keyExtractor={item=>item.id}
                style={styles.flatlist}/>
            </View>
        )
    }

    //definimos el item por producto a imprimir en el flat
    const ProductoItem=(props:producto)=>{

        const produc = JSON.stringify(props);

        return(
            <View style={styles.card}>
                <Text>Producto : {props.title}</Text>
                <Text>Precio : ${props.price}</Text>
                <Image source={{uri:props.image}} 
                style={{height:80,width:80,borderRadius:40}}/>
                <Boton titulo='Ver Detalles' 
                onPress={()=>{ruta.push('../producto/'+props.id)}}/>

                <Boton titulo='Detalles objeto'
                onPress={()=>{ruta.push({
                    pathname:'../producto/[data]',
                    params:{'data':produc}
                })}}/>
            </View>
        )

    }

  return (
    <View style={styles.container}>
      {Cargando?UnLoadScreen():LoadScreen()}
    </View>
  )
}

export default productos

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    card:{
        backgroundColor:'white',
        padding:10,
        margin:10,
        borderRadius:5,
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.8,
        shadowRadius:2,
        elevation:5
    }, flatlist:{
        width:'100%'
    },loadscreen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },titulo:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    link:{
        fontSize: 20,
        color: 'blue',
        margin: 10 
    }
})