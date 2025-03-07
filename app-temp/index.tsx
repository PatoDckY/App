import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link, router } from 'expo-router'
import Boton from './Components/Boton'

const index = () => {
  return (
    <View>
      <Text>index</Text>
      <Text>Menu de practicas</Text>
        <Text>1. Practica 1</Text>
        <Link href={"./screens/ListaProductos"}>
            Lista de productos...
        </Link>
        <Link href={"./screens/Tienda"}>
            Practica Tienda...
        </Link>
        <Link href={"./screens/Login"}>
            loging...
        </Link>
       <Boton titulo='Abaut' onPress={()=>{router.navigate('./about')}}/>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})