import { View,StyleSheet, ActivityIndicator } from "react-native";


export function Loading(){
    return( 
    <View style={estilo.container}>
        <ActivityIndicator color="#7C3AED"/>
    </View>)}

const estilo = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
