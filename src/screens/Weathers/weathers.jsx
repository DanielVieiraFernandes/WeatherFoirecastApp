import { Text, StyleSheet, View } from 'react-native'
import React from 'react'

export default function Weathers() {

    return (
      <View style={styles.container}>
        <Text>Weathers</Text>
      </View>
    )
  
}

const styles = StyleSheet.create({
    
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems:'center'
    }


})