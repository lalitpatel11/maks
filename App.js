import React, { Component } from 'react'
import { Text, StyleSheet, View ,StatusBar} from 'react-native'
import StackNavigation from './src/navigation/Index';
export default class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
       <StatusBar backgroundColor="#009997" barStyle="dark-content"/>
        <StackNavigation/>
      </View>
    )
  }
}

const styles = StyleSheet.create({})
