import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,ScrollView,TouchableOpacity,BackHandler,Alert} from 'react-native';
import {hp, wp} from '../../utility/size';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import styless from '../../utility/style'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {checkStatus,getRequestApi} from '../../WebApi/Index';


export default class WelcomeFourth extends Component {

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
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
       <View style={{justifyContent:'center',alignItems:'center',backgroundColor:""}}>
       <Image
          source={require('../../assests/images/logo.png')}
          style={{width: wp(60), height: hp(50), resizeMode: 'contain',}}
        />
       </View>

      
       <ScrollView>
       <View>
       <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Merriweather-Regular',
          }}>
          
          Monthly Account-Keeping System
        </Text>
       </View>
      

<View style={{marginVertical:hp(3),marginHorizontal:wp(5)}}>

<Text style={{fontWeight:'bold',fontSize:18,marginBottom:hp(1)}}>A Simple Solution to Track Tax Deductions</Text>

<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>Manage your income and expenses</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>Manage your work-from-home deductions</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>Manage your mileage log</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18,textAlign:'justify'}}>Get Advisory Services with experts</Text>
</View>
</View>



</View>


<View style={{flex:1,flexDirection:'row',marginHorizontal:wp(5),marginVertical:hp(3),justifyContent:'space-between',alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.goToAuth('SignIn')} style={{backgroundColor:"#EBEBEB",width:wp(40),justifyContent:'center',alignItems:'center',padding:10,borderRadius:10,shadowColor:'red',elevation:10,borderWidth:1,borderColor:'#d3d3d3'}}>
<Text style={{fontWeight:'bold',fontSize:18}}>Sign in</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>this.goToAuth('SignUp2')} style={{backgroundColor:"#EBEBEB",width:wp(40),justifyContent:'center',alignItems:'center',padding:10,borderRadius:10,shadowColor:'red',elevation:10,borderWidth:1,borderColor:'#d3d3d3'}}>
<Text style={{fontWeight:'bold',fontSize:18}}>Create Account</Text>
</TouchableOpacity>


</View>
      
       </ScrollView>
          
          

      </View>
    );
  }

  goToAuth(route){
    
    KeyStore.setKey('lanch',true)
    this.props.navigation.navigate(route)

  }

  async getHideStatus(){

    const {responseJson,err} = await getRequestApi(checkStatus,{},'')
  
    if(responseJson.status){
        let message = responseJson.message
        global.showAfterLive = message
    }
  }   


}

const styles = StyleSheet.create({});
