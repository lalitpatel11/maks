import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,ScrollView,TouchableOpacity} from 'react-native';
import {hp, wp} from '../../utility/size';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import styless from '../../utility/style'
export default class WelcomeThird extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
     
     <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={require('../../assests/images/2.png')}
          style={{width: wp(100), height: hp(50), resizeMode: 'contain'}}
        />

      
      
       <View>
       <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Merriweather-Regular',
            marginTop:hp(2)
          }}>
          
        Schedule Appointments
        </Text>
       </View>
      

<View style={{marginVertical:hp(3),marginHorizontal:wp(5)}}>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify'}}>M.A.K.S. Mobile App has a built in Advisory
Service feature to schedule appointments with
a tax expert or business advisor.
</Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',marginVertical:hp(1)}}>A fee is required to schedule an appointment.</Text>
<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify'}}>Simply create an account and schedule a time
that is convenient for you.</Text>


</View>





      
       </ScrollView>
          
       <View style={{marginHorizontal:wp(4),marginVertical:hp(2),alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('WelcomeFourth')} style={{backgroundColor:"#EBEBEB",width:wp(40),justifyContent:'center',alignItems:'center',padding:10,borderRadius:10,shadowColor:'red',elevation:10,borderWidth:1,borderColor:'#d3d3d3'}}>
<Text style={{fontWeight:'bold',fontSize:18}}>Next</Text>
</TouchableOpacity>




</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({});
