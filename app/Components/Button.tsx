import React, { ReactNode } from 'react'
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'

type PropiedadesBoton={
    title:string,
    icono?:ReactNode,
    posicionicono?:'izquierda'|'dercha',
    onPress:()=> void,
    disable?:boolean,
    variante?:'primario'|'secundario'|'peligro',
    estilo?:StyleProp<ViewStyle>
}

const Boton=(props:PropiedadesBoton)=> {
    const getVariante=()=>{
        switch(props.variante){
            case 'secundario':return styles.secundario
            case 'peligro': return styles.peligro
            default: return styles.primario
        }
    }
  return (
    <Pressable>
        <Text>(PropiedadesBoton.title)</Text>
    </Pressable>
  )
}

export default Boton

const styles = {
    boton: {
      backgroundColor: '#00A2E8',
      marginTop: 5,
    },
    primario: {
      backgroundColor: '#00A2E8',
    },
    secundario: {
      backgroundColor: '#0077AB',
    },
    peligro: {
      backgroundColor: '#EB3324',
    },
    disable: {
      opacity: .6,
    },
  };
