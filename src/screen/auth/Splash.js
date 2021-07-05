import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image} from 'react-native'
import KeyStore from '../../KeyStore/LocalKeyStore'
export default class Splash extends Component {





async componentDidMount() {
    KeyStore.getKey('data', (err, value) => {
      if (value) {
        setTimeout(() => {
          this.props.navigation.navigate('TabBar');
        }, 0);
      } else {

        KeyStore.getKey('lanch', (err, value) => {
          if (value) {
            setTimeout(() => {
              this.props.navigation.navigate('SignInUp');
              // this.props.navigation.navigate('WelcomeFirst');

            }, 0);
          } else {
            setTimeout(() => {
              this.props.navigation.navigate('WelcomeFirst');
            }, 3000);
          }
        });
      }
    });
  }

    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
               <Image
               source={require('../../assests/images/splash-logo.png')}
               style={{height:200,width:200}}
               />
            </View>
        )
    }
}

const styles = StyleSheet.create({})
