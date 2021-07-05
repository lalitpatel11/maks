import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {hp, wp} from '../../utility/size';
import Loader from '../../component/Loader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
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

  async onNext() {
   if(this.fullValidation()){

    const {name, email, password} = this.state;
    const data = {
      name,
      email,
      password,
    };
    this.props.navigation.navigate('SignUp2', data);

   } else{
   }
  
  }

  render() {
     const{goBack} = this.props.navigation
    return (
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <View>
          <View style={{backgroundColor: ''}}>
            <Image
              source={require('../../assests/images/signIn-bg.png')}
              resizeMethod="resize"
              style={{width: wp(100), height: hp(45), resizeMode: 'cover'}}
            />
            <View style={{position: 'absolute', bottom: hp(20), left: wp(10)}}>
              <Text
                style={{
                  fontSize: 40,
                  fontWeight: 'bold',
                  color: '#fff',
                  letterSpacing: 1,
                }}>
                Create Account
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: '',
              flex: 1,
              marginTop: hp(4),
              marginHorizontal: wp(10),
            }}>
            <TextInput
             autoCapitalize='none'
            placeholderTextColor='#404040'

            ref="name"
            onSubmitEditing={() => {
              this.refs.email.focus();
            }}
              placeholder="Name"
              style={{
                padding: 0,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: wp(5),
                paddingVertical: wp(3),
                fontSize: 16,
                marginBottom: hp(1),
              }}
              value={this.state.name}
              onChangeText={(name) => this.setState({name,nameError:''})}
            />
{<Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.nameError}</Text>}
            <TextInput
            ref="email"
            autoCapitalize='none'
            placeholderTextColor='#404040'

            onSubmitEditing={() => {
              this.refs.pass.focus();
            }}
              placeholder="Email ID"
              style={{
                padding: 0,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: wp(5),
                paddingVertical: wp(3),
                fontSize: 16,
                marginBottom: hp(1),
              }}
              value={this.state.email}
              onChangeText={(email) => this.setState({email,emailError:''})}
            />
{<Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.emailError}</Text>}
            <TextInput
            ref="pass"
            placeholderTextColor='#404040'

            autoCapitalize='none'
              secureTextEntry
            onSubmitEditing={() => {
              this.refs.confirm.focus();
            }}
              placeholder="Password"
              style={{
                padding: 0,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: wp(5),
                paddingVertical: wp(3),
                fontSize: 16,
                marginBottom: hp(1),
              }}
              value={this.state.password}
              onChangeText={(password) => this.setState({password,passwordError:''})}
            />
{<Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.passwordError}</Text>}
            <TextInput
            ref='confirm'
            placeholderTextColor='#404040'

            autoCapitalize='none'
              secureTextEntry
              placeholder="Confirm Password"
              style={{
                padding: 0,
                borderWidth: 1,
                borderRadius: 20,
                paddingHorizontal: wp(5),
                paddingVertical: wp(3),
                fontSize: 16,
                marginBottom: hp(1),
              }}
              value={this.state.confirmPassword}
              onChangeText={(confirmPassword) =>
                this.setState({confirmPassword,confirmPassError:''})
              }
            />
{<Text style={{color: 'red',marginBottom:hp(1)}}>{this.state.confirmPassError}</Text>}

            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => this.onNext()}
                style={{
                  backgroundColor: '#009997',
                  width: wp(30),
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: hp(1),
                  borderRadius: 20,
                  elevation: 8,
                }}>
                <Text 
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#fff',
                    letterSpacing: 1,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>

            </View>
           <TouchableOpacity style={{alignSelf:'center',marginTop:20}} onPress={()=>goBack()}>
    <Text style={{fontSize:18,fontWeight:'bold',color:'#979797'}}>Back To Login</Text>
    </TouchableOpacity>

          </View>
        </View>
        <Loader isLoader={this.state.loading} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({});
