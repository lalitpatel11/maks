import React, { Component } from 'react'
import { Text, StyleSheet, View ,ImageBackground,Image,TouchableOpacity,BackHandler,Alert} from 'react-native'
import {hp,wp} from '../../utility/size'
import {checkStatus,getRequestApi} from '../../WebApi/Index';

export default class SignInUp extends Component {


    componentDidMount(){
        this.getHideStatus()
    }

    componentWillMount() {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick,
        );
      }

      componentWillUnmount() {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.handleBackButtonClick,
        );
      }
    
      handleBackButtonClick = () => {
        //this.props.navigation.isFocused() helps to exit the app in one screen not in the whole
        if (this.props.navigation.isFocused()) {
            Alert.alert(
                '',
                'Do you want to close app?',
                [
                    {
                        text:'No',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: 'Yes',
                        onPress: () => BackHandler.exitApp()
                    }
                ],
                { cancelable: false },
            );
            return true;
        }
      }
    


    render() {
        return (
           
                <View style={{flex:1}}>
<Image
resizeMethod='resize'
style={{height:hp(60),width:wp(100),resizeMode:'cover'}}
source={require('../../assests/images/signIn-signUp.png')}

/>

<View style={{flex:1,marginVertical:hp(5),marginHorizontal:wp(10),justifyContent:'center',alignItems:'center'}}>

<TouchableOpacity onPress={()=>this.props.navigation.navigate('SignIn')}>
<View style={{backgroundColor:"#02969A",borderRadius:50,padding:15,justifyContent:'center',alignItems:'center',width:wp(40)}}>
<Text style={{color:"#fff",fontSize:20}}>Sign In</Text>
</View>
</TouchableOpacity>


<TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp2')}>
<View style={{backgroundColor:"#fff",borderRadius:50,marginTop:20,padding:15,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#02969A',width:wp(40)}}>
<Text style={{color:"#02969A",fontSize:20}}>Sign Up</Text>
</View>
</TouchableOpacity>

</View>

                </View>
        )
    }

    async getHideStatus(){

        const {responseJson,err} = await getRequestApi(checkStatus,{},'')
      
        if(responseJson.status){
            let message = responseJson.message
            global.showAfterLive = message
        }
      }   
      
}

const styles = StyleSheet.create({})




