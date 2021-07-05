import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,ImageBackground,TouchableOpacity,TextInput,ScrollView,KeyboardAvoidingView,Alert} from 'react-native'
import Loader from '../../component/Loader'
import {hp,wp} from '../../utility/size'
import {postRequestApi,login,resetPassword} from '../../WebApi/Index'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class ForgotPassword extends Component {

constructor(){
    super()
    this.state={
        email:'',
        emailError:''
    }
}


validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  fullValidation() {
    const {email} = this.state;
    if (email === '') {
      this.setState({
        emailError: 'Email can not be empty',
      });
    } else if (!this.validateEmail()) {
      this.setState({emailError: 'Please enter right  Format of email'});
    } else {
      return true;
    }
  }

  async onSubmit(){

    if(this.fullValidation()){
    
        const {email}= this.state
        this.setState({loading:true})
        const formData = new FormData()
        formData.append('email',email)        
        const {responseJson,err}= await postRequestApi(resetPassword,formData)
        this.setState({loading:false})
        if(responseJson.status){
            Alert.alert('',responseJson.message,[
                {
                  text:'Ok',
                  onPress:()=>{
                    this.props.navigation.navigate('ResetPassword',{email:email})
                }
                },
                ])
        }else{
            this.setState({loading:false})
            Alert.alert('',responseJson.message)
            console.warn(responseJson.status)
        }
        }
    }

    render() 
    {
      const{goBack} = this.props.navigation
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
<Text style={{fontSize:40,fontWeight:'bold',color:'#fff',letterSpacing:1}}>Forgot Password</Text>
</View>
</View>


<View style={{backgroundColor:'',flex:1,marginVertical:hp(5),marginHorizontal:wp(10)}}>

<TextInput
ref="email"
onSubmitEditing={() => {
  this.refs.pass.focus();
}}
placeholderTextColor='#404040'

autoCapitalize='none'
placeholder="Enter Email"
style={{padding:0,borderWidth:1,borderRadius:20,paddingHorizontal:wp(5),paddingVertical:wp(3),fontSize:16,marginBottom:hp(1)}}
value={this.state.email}
secureTextEntry={false}
onChangeText={email=>this.setState({email,emailError:''})}
/>
{<Text style={{color: 'red',marginBottom:hp(2)}}>{this.state.emailError}</Text>}

<View style={{flex:1,alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.onSubmit()} style={{backgroundColor:'#009997',width:wp(30),justifyContent:'center',alignItems:'center',paddingVertical:hp(1),borderRadius:20,elevation:8}}>
<Text style={{fontSize:22,fontWeight:'bold',color:'#fff',letterSpacing:1}}>Submit</Text>
</TouchableOpacity>
</View>

<TouchableOpacity style={{alignSelf:'center',marginTop:20}} onPress={()=>goBack()}>
    <Text style={{fontSize:18,fontWeight:'bold',color:'#979797'}}>Back To Login</Text>
    </TouchableOpacity>
</View>
            </View>
           <Loader isLoader={this.state.loading}/>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({})
