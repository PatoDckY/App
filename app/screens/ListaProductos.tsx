import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const ListaProductos = () => {
    //definimos la estructura de datos a emplear por cada item
    type producto={
        id?:number,
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
            <View>
                <Text>Cargando Datos...</Text>
                <ActivityIndicator/>
            </View>
        )
    }

    //pantalla LoadScreen
    const LoadScreen=()=>{
        return(
            <View>
                <Text>Lista de Productos</Text>
                <FlatList 
                data={Productos}
                renderItem={({item})=><ProductoItem 
                title={item.title}
                price={item.price}
                image={item.image}/>}
                keyExtractor={item=>item.id}/>
            </View>
        )
    }

    //definimos el item por producto a imprimir en el flat
    const ProductoItem=(props:producto)=>{
        return(
            <View style={styles.containerItem}>
                <Text>Producto : {props.title}</Text>
                <Text>Precio : ${props.price}</Text>
                <Image source={{uri:props.image}} 
                style={{height:80,width:80,borderRadius:40}}/>
            </View>
        )

    }

  return (
    <View style={styles.container}>
      {Cargando?UnLoadScreen():LoadScreen()}
    </View>
  )
}

export default ListaProductos

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    containerItem:{
        backgroundColor:'#FA8',
        borderRadius:15,
        borderWidth:2,
        borderColor:'#000'
    }
})