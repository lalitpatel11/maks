import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,ScrollView,TouchableOpacity} from 'react-native';
import {hp, wp} from '../../utility/size';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import styless from '../../utility/style'
export default class WelcomeFirst extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF',paddingBottom:hp(0)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
      
       <View style={{justifyContent:'center',alignItems:'center',backgroundColor:""}}>
       <Image
          source={require('../../assests/images/logo.png')}
          style={{width: wp(50), height: hp(30), resizeMode: 'contain',}}
        />
       </View>

      
     
       <View>
       <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Merriweather-Regular',
          }}>
          
          WELCOME
        </Text>
       </View>
      

<View style={{marginVertical:hp(3),marginHorizontal:wp(5),elevation:10}}>

<Text style={{fontSize:16,marginBottom:hp(1),textAlign:'center',fontFamily: 'Merriweather-Bold',fontWeight:'bold'}}>Welcome to M.A.K.S. Mobile App
</Text>
<Text style={{fontSize:16,marginBottom:hp(1),textAlign:'center',fontFamily: 'Merriweather-Bold',fontWeight:'bold'}}>M.A.K.S. is short for Monthly Account-Keeping System
</Text>

    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify'}}>M.A.K.S. Mobile App was designed by a tax accountant who
wanted to create a simple solution for those who needed
professional help to get their business income & expenses ready for
tax time using a mobile device. </Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',marginTop:hp(1)}}>Did you know that the IRS requires all earned income from business or
hobbies to be reported using a 1040 Schedule C form attached to your
1040 Income Tax Return?
</Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify'}}>If you have expenses working from home, you must attach Form 8829.
(Expenses for Business Use of Your Home)
</Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',marginVertical:hp(1)}}>If you are a self-employed contractor, freelancer, work-from home
business, earned income from a side hustle or gig, this app is a perfect
solution for you. </Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',marginVertical:hp(1)}}>If you are looking for a simple way to keep up with receipts, make
preparing your taxes less stressful without using an accounting or
bookkeeping software M.A.K.S. Mobile App will become your best friend. </Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',fontWeight:'bold'}}>How does M.A.K.S. work? I’m glad you asked.</Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',marginVertical:hp(1)}}>Take a look to see how M.A.K.S. Mobile App will work seamlessly behind
the scene to minimize tax liabilities and give you peace of mind by
eliminating stress when filing your taxes</Text>

<Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:16,textAlign:'justify',marginVertical:hp(1)}}>Try before you buy. Sign up today for 14 day trial!</Text>




</View>






      
       </ScrollView>
          

       <View style={{marginHorizontal:wp(4),marginVertical:hp(2),alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('WelcomeSecond')} style={{backgroundColor:"#EBEBEB",width:wp(40),justifyContent:'center',alignItems:'center',padding:10,borderRadius:10,shadowColor:'red',elevation:10,borderWidth:1,borderColor:'#d3d3d3'}}>
<Text style={{fontWeight:'bold',fontSize:18}}>Next</Text>
</TouchableOpacity>




</View>
          

      </View>
    );
  }
}

const styles = StyleSheet.create({});
