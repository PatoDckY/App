import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const objeto = () => {
    const {data}=useLocalSearchParams();
    const datajson=JSON.parse(data+'');
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>el producto es : {datajson.title}</Text>
        <Text style={styles.titulo}>el precio es : {datajson.price}</Text>
    </View>
  )
}

export default objeto

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#EDE0D4',
        alignItems:'center',
        justifyContent:'center'
    },
    titulo:{
        fontSize:30,
        fontWeight:'bold',
        color:'#4B2E1E'
    },
    link:{
        color:'#4B2E1E',
        fontSize:20
    }
})