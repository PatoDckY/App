import { Stack } from "expo-router";

const layout=()=>{
    return(
        <Stack>
            <Stack.Screen name="/index"/>
            <Stack.Screen name="/ListaProductos"/>
            <Stack.Screen name="/Tienda"/>
        </Stack>
    )
}

export default layout;