import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

import AntDesign from '@expo/vector-icons/AntDesign';
import { Link, useRouter } from "expo-router";
import Boton from "./Components/Boton";



export default function Login(){
    const ruta= useRouter();
    return(
        <View style={estilos.container}>
            <Text style={estilos.titulo} >PODAI</Text>
            
            <Text style={estilos.labels}>Usuario</Text>
            
            <TextInput placeholder="Usuario" style={estilos.cajas}/>
            
            <Text style={estilos.labels} >Password</Text>
            
            <TextInput placeholder="Password" style={estilos.cajas} />
            
            <Boton onPress={()=>ruta.push('./(tabs)/')} titulo='LOGIN'/>

            <Boton titulo="LOGIN +" 
            onPress={()=>{Alert.alert('Componente Boton')}}
            icono={<AntDesign name="youtube" size={24} color="white" />}
            posicionIcono='izquierda' />

            <Boton titulo="Facebook" onPress={()=>{console.log('Hola ...')}}
            icono={<AntDesign name="facebook-square" size={24} color="white"/>}
            estilo={estilos.boton} />
            <Link href={"../index"}>
            go back...
            </Link>
        </View>

    )
}

const estilos = StyleSheet.create({
    titulo:{
        fontSize:30,
        color:'#4B2E1E',
        fontWeight:'bold',
        alignSelf:'center'
    },
    container:{
        backgroundColor:'#EDE0D4',
        flex:1,
        alignItems:'stretch',
        justifyContent:'center',
        paddingHorizontal:20
    },
    labels:{
        fontSize:15,
        fontWeight:'700',
        color:'#4B2E1E'
    },
    cajas:{
        borderWidth:3,
        borderRadius:7,
        borderColor:'#4B2E1E',
        padding:10,
        marginVertical:10
    },
    boton:{
        backgroundColor:'blue'
    }
})