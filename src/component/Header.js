import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,TouchableOpacity,Alert} from 'react-native';
import {hp} from '../utility/size';
import AntDesign from 'react-native-vector-icons/AntDesign';
import KeyStore from '../KeyStore/LocalKeyStore'
import { NavigationActions,StackActions,CommonActions } from '@react-navigation/native'
// import { NavigationActions,StackActions } from 'react-navigation'


export default class Header extends Component {

  constructor(){
    super()
    this.state={


title:'',
note:'',
attachment:'',
loading:false,
token:'',
uploadPicker:'',
data:[],
loading:false,


    }
}

async onLogOut(){

Alert.alert('','Are you sure want to logout ?',[
  {
    text:'Yes',
    onPress:()=>{
      KeyStore.setKey('data',null)
    // this.props.navigation.navigate('SignInUp')
    this.resetStack('SignInUp')
  }
  },
  {
    text:"No"
  }])
}

 resetStack(route) {


  this.props.navigation.dispatch(
    CommonActions.navigate({
      name: route,
    })
  );
 }

  render() {
    return (
      <View
        style={{  
          height: hp(10),
          backgroundColor: '#009997',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {this.props.iconName ? (
          <View style={{marginLeft:20}}>
            <AntDesign name={this.props.iconName} size={30} onPress={this.props.onPress} color="#fff" />
          </View>
        ) : (
          <View style={{marginTop:15,backgroundColor:"#fff",borderRadius:200,height:40,width:40,justifyContent:'center',alignItems:'center',marginLeft:10}}>
            <Image
            source={require('../assests/images/logo.png')}
            style={{
              height: 40,
              width: 40,
             resizeMode:'contain'
              
            }}
          />
            </View>
        )}

        <Text
          style={{
            fontSize: 20,
            color: '#fff',
            fontWeight: 'bold',
            letterSpacing: 1,
           marginTop:15
          }}>
          {this.props.title}
        </Text>

        <TouchableOpacity
        onPress={()=>this.onLogOut()}
          style={{backgroundColor:"",marginRight:20,marginTop:15}}>
       {this.props.iconName ? null: <AntDesign
        name="logout"
        size={25}
        color="#fff"
        />}
        </TouchableOpacity>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({});
