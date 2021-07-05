import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,ImageBackground,TouchableOpacity,TextInput,ScrollView,KeyboardAvoidingView,Alert} from 'react-native'
import Loader from '../../component/Loader'
import {hp,wp} from '../../utility/size'
import {postRequestApi,login} from '../../WebApi/Index'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {checkStatus,getRequestApi} from '../../WebApi/Index';

export default class SignIn extends Component {

constructor(){
    super()
    this.state={
        email:'',
        password:'',
        loading:false,
        emailError: '',
        passwordError: '',
    }
}


validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  fullValidation() {
    const {email, password} = this.state;
    if (email === '' && password === '') {
      this.setState({
        emailError: 'Email can not be empty',
        passwordError: 'Password can not be empty',
      });
    } else if (!this.validateEmail()) {
      this.setState({emailError: 'Please enter right  Format of email'});
    } else if (password.length <= 5) {
      this.setState({passwordError: ' password must be greater than 6'});
    } else {
      return true;
    }
  }



async onSignIn(){

if(this.fullValidation()){

    const {email,password}= this.state
    this.setState({loading:true})
    const formData = new FormData()
    formData.append('email',email)
    formData.append('password',password)
    
    
    console.log("data from frontend",formData)
    
    const {responseJson,err}= await postRequestApi(login,formData)
    
    
    if(responseJson.status){
        this.setState({loading:false})
        KeyStore.setKey('data', JSON.stringify(responseJson));
        this.props.navigation.navigate('TabBar')
    console.warn(responseJson.status)
    }else{
        this.setState({loading:false})
        Alert.alert('',responseJson.message)
        console.warn(responseJson.status)
    }
    }
}




    render() 
    {
        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps='never'>
           
            <View style={{flex:1}}> 
           
  
<View style={{backgroundColor:''}}>
<Image
source={require('../../assests/images/signIn-bg.png')}
resizeMethod='resize'
style={{width:wp(100),height:hp(45),resizeMode:'cover'}}
/>
<View style={{position:'absolute',bottom:hp(20),left:wp(10)}}>
<Text style={{fontSize:40,fontWeight:'bold',color:'#fff',letterSpacing:1}}>Sign In</Text>
</View>
</View>


<View style={{backgroundColor:'',flex:1,marginVertical:hp(5),marginHorizontal:wp(10)}}>

<TextInput
ref="email"
onSubmitEditing={() => {
  this.refs.pass.focus();
}}
placeholder="Enter Email"
placeholderTextColor='#404040'
autoCapitalize='none'
keyboardType='email-address'
style={{padding:0,borderWidth:1,borderRadius:20,paddingHorizontal:wp(5),paddingVertical:wp(3),fontSize:16,marginBottom:hp(1)}}
value={this.state.email}
secureTextEntry={false}
onChangeText={email=>this.setState({email,emailError:''})}
/>
{<Text style={{color: 'red',marginBottom:hp(2)}}>{this.state.emailError}</Text>}

<TextInput
ref="pass"
placeholder="Enter Password"
secureTextEntry={true}
autoCapitalize='none'
placeholderTextColor='#404040'

style={{padding:0,borderWidth:1,borderRadius:20,paddingHorizontal:wp(5),paddingVertical:wp(3),fontSize:16,marginBottom:hp(1),letterSpacing:-1}}
value={this.state.password}

onChangeText={password=>this.setState({password,passwordError:''})}
/>

{<Text style={{color: 'red',marginBottom:hp(2)}}>{this.state.passwordError}</Text>}

<View style={{flex:1,alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.onSignIn()} style={{backgroundColor:'#009997',width:wp(30),justifyContent:'center',alignItems:'center',paddingVertical:hp(1),borderRadius:20,elevation:8}}>
<Text style={{fontSize:22,fontWeight:'bold',color:'#fff',letterSpacing:1}}>Sign In</Text>
</TouchableOpacity>
</View>


<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:hp(10)}}>
<Text onPress={()=>this.props.navigation.navigate('SignUp2')} style={{fontSize:18,textDecorationLine:'underline',fontWeight:'bold',color:'#979797'}}>Sign Up</Text>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('ForgotPassword')}>
<Text style={{fontSize:18,textDecorationLine:'underline',fontWeight:'bold',color:'#979797'}}>Forgot Password?</Text>
</TouchableOpacity>
</View>
</View>

            </View>
           <Loader isLoader={this.state.loading}/>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({})
