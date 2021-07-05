import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,ImageBackground,TouchableOpacity,TextInput,ScrollView,KeyboardAvoidingView,Alert} from 'react-native'
import Loader from '../../component/Loader'
import {hp,wp} from '../../utility/size'
import {postRequestApi,forgotPassword} from '../../WebApi/Index'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class ResetPassword extends Component {

constructor(){
    super()
    this.state={
        otp:'',
        otpError:'',
        password:'',
        passwordError:'',
        email:'',

    }
}

componentDidMount(){

    const {email} = this.props.route.params;
    this.setState({email:email})

}

  fullValidation() {
    const {otp,password} = this.state;
    if (otp === '') {
      this.setState({
        otpError: 'OTP can not be empty',
      });
    } else if (password === '') {
        this.setState({
          passwordError: 'Password can not be empty',
        });
      } 
      else if (password.length < 5) {
        this.setState({
          passwordError: 'Password should contain atleast 6 digits',
        });
      } 
    else {
      return true;
    }
  }

  async onSubmit(){

    if(this.fullValidation()){
    
        const {otp,password,email}= this.state
        this.setState({loading:true})
        const formData = new FormData()
        formData.append('email',email)        
        formData.append('otp',otp)        
        formData.append('password',password)        

        const {responseJson,err}= await postRequestApi(forgotPassword,formData)
        this.setState({loading:false})

        if(responseJson.status){
            Alert.alert('',responseJson.message,[
                {
                  text:'Ok',
                  onPress:()=>{
                    this.props.navigation.navigate('SignIn',{email:email})
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
<Text style={{fontSize:40,fontWeight:'bold',color:'#fff',letterSpacing:1}}>Reset Password</Text>
</View>
</View>


<View style={{backgroundColor:'',flex:1,marginVertical:hp(5),marginHorizontal:wp(10)}}>

<TextInput
ref="Otp"
onSubmitEditing={() => {
  this.refs.pass.focus();
}}
placeholderTextColor='#404040'

placeholder="Enter Otp"
autoCapitalize='none'

style={{padding:0,borderWidth:1,borderRadius:20,paddingHorizontal:wp(5),paddingVertical:wp(3),fontSize:16,marginBottom:hp(1)}}
value={this.state.otp}
secureTextEntry={false}
onChangeText={otp=>this.setState({otp,otpError:''})}
/>
{<Text style={{color: 'red',marginBottom:hp(2)}}>{this.state.otpError}</Text>}


<TextInput
ref="pass"
placeholderTextColor='#404040'

secureTextEntry={true}
autoCapitalize='none'
placeholder="Enter Password"
style={{padding:0,borderWidth:1,borderRadius:20,paddingHorizontal:wp(5),paddingVertical:wp(3),fontSize:16,marginBottom:hp(1)}}
value={this.state.password}
onChangeText={password=>this.setState({password,passwordError:''})}
/>
{<Text style={{color: 'red',marginBottom:hp(2)}}>{this.state.passwordError}</Text>}





<View style={{flex:1,alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.onSubmit()} style={{backgroundColor:'#009997',width:wp(30),justifyContent:'center',alignItems:'center',paddingVertical:hp(1),borderRadius:20,elevation:8}}>
<Text style={{fontSize:22,fontWeight:'bold',color:'#fff',letterSpacing:1}}>Submit</Text>
</TouchableOpacity>
</View>

<TouchableOpacity style={{alignSelf:'center',marginTop:20}} onPress={()=>goBack()}>
    <Text style={{fontSize:18,fontWeight:'bold',color:'#979797'}}>{"< Back"}</Text>
    </TouchableOpacity>


</View>

            </View>
           <Loader isLoader={this.state.loading}/>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({})
