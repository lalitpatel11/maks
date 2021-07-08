import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,Alert,ScrollView
} from 'react-native';
import {hp, wp} from '../../utility/size';
import Loader from '../../component/Loader';
import {register,postRequestApi} from '../../WebApi/Index'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class SignUp2 extends Component {
  constructor() {
    super();
    this.state = {
      user_group: '',
      proprietor_name: '',
      principal_business: '',
      security_no: '',

      secretary: '',
      loading: false,

      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      nameError:'',
      emailError: '',
      passwordError: '',
      confirmPassError:''




    };
  }

  validateEmail() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(this.state.email).toLowerCase());
  }

  fullValidation() {
    const {email, password,name,confirmPassword} = this.state;
    if (name==='' &&email === '' && password === ''&&confirmPassword==='') {
      this.setState({
        nameError:'Name can not be empty',
        emailError: 'Email can not be empty',
        passwordError: 'Password can not be empty',
        confirmPassError: 'Confirm Password can not be empty',
      });
    }else if (name.length <=3) {
      this.setState({nameError: 'Name must be grater than 3'});
    } else if (email === '') {
      this.setState({emailError: 'Email can not be empty'});
    }
     else if (!this.validateEmail()) {
      this.setState({emailError: 'Please enter right  Format of email'});
    } else if (password === '') {
      this.setState({passwordError: 'Password can not be empty'});
    } 
    else if (password.length <= 5) {
      this.setState({passwordError: ' password must be grater than 6'});
    }else if (confirmPassword === '') {
      this.setState({confirmPassError: 'Confirm Password can not be empty'});
    } 
    else if (confirmPassword != password) {
      this.setState({confirmPassError: ' password does not matched'});
    } 
     else {
      return true;
    }
  }

  componentDidMount() {

  }

  async onSignUp() {

  //  const {} = this.props.route.params;
    if(!this.fullValidation()){
      return
    }
  const {user_group,
      proprietor_name,
      security_no,
      principal_business,
      secretary,name, email, password
    } = this.state;

    const formData = new FormData()

formData.append('name',name)
formData.append('email',email)
formData.append('password',password)
formData.append('user_group',3)
formData.append('proprietor_name',proprietor_name)
formData.append('security_no',security_no)
formData.append('principal_business',principal_business)
formData.append('secretary',secretary)
this.setState({loading:true})
const {responseJson,err} = await postRequestApi(register,formData)
this.setState({loading:false})
if(responseJson.status){
    
      KeyStore.setKey('data', JSON.stringify(responseJson));
if(global.showAfterLive == '2')
{
  Alert.alert(
    "",
    responseJson.message,
    [

      { text: "OK", onPress: () => this.props.navigation.navigate('Subscriptions',{isFromAccount:false,flag:1}) }
    ],
    { cancelable: false }
  );
  
}else{

  this.props.navigation.navigate('TabBar')

}

}else{
    this.setState({loading:false})
    Alert.alert('',responseJson.message)
}


  }

  render() {
const{goBack} = this.props.navigation
    return (
      <KeyboardAwareScrollView  style={{flex: 1,backgroundColor:''}}>
        <View >
          <ImageBackground
            source={require('../../assests/images/signIn-bg.png')}
            resizeMode='stretch'
            style={{width: '100%', height: hp(20),alignItems:'center',justifyContent:'center'}}
          >
            <Text
              style={{
                fontSize: 40,
                fontWeight: 'bold',
                color: '#fff',
                letterSpacing: 1,
              }}>
               Create Account
            </Text>
          
          </ImageBackground>
        </View>

        <View
          style={{
            backgroundColor: '',
            flex: 1,
           margin:20
          }}> 

        <TextInput
autoCapitalize='none'
placeholderTextColor='#404040'

            ref="name"
            onSubmitEditing={() => {
              this.refs.email.focus();
            }}
            returnType = 'next'
              placeholder="Username"
              style={styles.field}
              
              value={this.state.name}
              onChangeText={(name) => this.setState({name,nameError:''})}
            />

        { this.state.nameError ? <Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.nameError}</Text>: null}
           
            <TextInput
            ref="email"
            autoCapitalize='none'
            placeholderTextColor='#404040'

            onSubmitEditing={() => {
              this.refs.pass.focus();
            }}
              placeholder="Email ID"
              style={styles.field}
            
              value={this.state.email}
              onChangeText={(email) => this.setState({email,emailError:''})}
            />
{this.state.emailError ? <Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.emailError}</Text> : null}
            <TextInput
            ref="pass"
            autoCapitalize='none'
            secureTextEntry
              placeholderTextColor='#404040'

            onSubmitEditing={() => {
              this.refs.confirm.focus();
            }}
              placeholder="Password"
              style={styles.field}
              value={this.state.password}
              onChangeText={(password) => this.setState({password,passwordError:''})}
            />
{this.state.passwordError ? <Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.passwordError}</Text> : null}
            <TextInput
            ref='confirm'
            placeholderTextColor='#404040'

            onSubmitEditing={() => {
              this.refs.names.focus();
            }}
  
            autoCapitalize='none'
            secureTextEntry
              placeholder="Confirm Password"
              style={styles.field}
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) =>
                this.setState({confirmPassword,confirmPassError:''})
              }
            />
{this.state.confirmPassError ? <Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.confirmPassError}</Text> : null}


          <TextInput
          ref="names"
          autoCapitalize='none'
          placeholderTextColor='#404040'

          onSubmitEditing={() => {
            this.refs.sec.focus();
          }}
            placeholder="Name of Proprietor"
            style={styles.field}
            value={this.state.proprietor_name}
            onChangeText={(proprietor_name) => this.setState({proprietor_name})}
          />

          <TextInput
          ref='sec'
          autoCapitalize='none'
          placeholderTextColor='#404040'

          onSubmitEditing={() => {
            this.refs.pri.focus();
          }}
            placeholder="Mobile Text"
            style={styles.field}
            value={this.state.security_no}
            onChangeText={(security_no) => this.setState({security_no})}
          />

          <TextInput
          ref='pri'onSubmitEditing={() => {
            this.refs.state.focus();
          }}
          placeholderTextColor='#404040'

            placeholder="Business Name"
            multiline={true}
            autoCapitalize='none'

            style={ {borderWidth: 1,
              borderRadius: 15,
              fontSize: 16,
              height:80,
              padding:10,
              margin:10
            }}
            value={this.state.principal_business}
            onChangeText={(principal_business) =>
              this.setState({principal_business})
            }
          />

          <TextInput
          ref='state'
          autoCapitalize='none'
          placeholderTextColor='#404040'

            placeholder="Business Type"
            multiline={true}
            style={ {borderWidth: 1,
              borderRadius: 15,
              fontSize: 16,
              height:80,
              padding:10,
              margin:10
            }}
            value={this.state.secretary}
            onChangeText={(secretary) => this.setState({secretary})}
          />

          <View style={{flex: 1, alignItems: 'flex-end'}}>
           
            <TouchableOpacity
              onPress={() => this.onSignUp()}
              style={{
                backgroundColor: '#009997',
                width: wp(30),
                justifyContent: 'center',
                alignItems: 'center',
               // paddingVertical: hp(3),
                borderRadius: 20,
                height:50,
                elevation: 8,
              }}
              >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                  letterSpacing: 1,
                }}>
                Sign Up
              </Text>
            </TouchableOpacity>

          </View>

          <TouchableOpacity style={{alignSelf:'center',marginTop:20,marginBottom:30}} onPress={()=>goBack()}>
    <Text style={{fontSize:18,fontWeight:'bold',color:'#979797'}}>{"< Back"}</Text>
    </TouchableOpacity>

        </View>
        <Loader isLoader={this.state.loading} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({

field : {borderWidth: 1,
  borderRadius: 15,
  fontSize: 16,
  height:50,
  padding:10,
  margin:10
},
});