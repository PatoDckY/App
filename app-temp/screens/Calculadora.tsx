import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Boton from '../Components/Boton';

const Calculadora = () => {
    //Estados v1,v2,res
    const [v1,setv1]=useState<string>('');
    const [v2,setv2]=useState<string>('');
    const [res,setres]=useState<number>(0);

    //lgica del componnte

    const suma=()=>{
        const n1:number=parseFloat(v1);
        const n2:number=parseFloat(v2);
        const resultado=n1+n2;
        setres(resultado);
    }

    const resta=()=>{
        const n1:number=parseFloat(v1);
        const n2:number=parseFloat(v2);
        setres(n1-n2);
    }

    const multiplicacion=()=>{
        const n1:number=parseFloat(v1);
        const n2:number=parseFloat(v2);
        setres(n1*n2);
    }

    const division=()=>{
        const n1:number =parseFloat(v1);
        const n2:number=parseFloat(v2);
        setres(n1/n2);
    }

    //renderizado de nuestro componente
  return (
    <View>
        <Text>Valor 1</Text>
        <TextInput placeholder='Valor 1'
        onChangeText={(x)=>{setv1(x)}}/>

        <Text>Valor 2</Text>
        <TextInput placeholder='Valor 2'
        onChangeText={setv2}/>

        <View>
            <Boton titulo='+' onPress={()=>{suma()}}/>
            <Boton titulo='-' onPress={()=>{resta()}}/>
            <Boton titulo='*' onPress={()=>{multiplicacion()}}/>
            <Boton titulo='/' onPress={()=>{division()}}/>
        </View>
        <Text>El resultado de la operacion es : {res}</Text>
        <Text>Valor de V1 : {v1} y Valor de v2 : {v2}</Text>
    </View> 
  )
}

export default Calculadora

const styles = StyleSheet.create({})