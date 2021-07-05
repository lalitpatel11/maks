import React, {Component} from 'react';
import {Text, StyleSheet, View, Image,ScrollView,TouchableOpacity} from 'react-native';
import {hp, wp} from '../../utility/size';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import styless from '../../utility/style'
export default class WelcomeSecond extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
       <ScrollView showsVerticalScrollIndicator={false}>
       
        <Image
          source={require('../../assests/images/welcome-34.png')}
          resizeMethod='auto'
          style={{width: wp(100), height: hp(40), resizeMode: 'contain'}}
        />

      
       
       {/* <View>
       <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'Merriweather-Regular',
          }}>
          
          Enter Expenses and Upload Receipts
        </Text>
       </View> */}
      

{/* <View style={{marginVertical:hp(3),marginHorizontal:wp(5)}}>

<View style={{flexDirection:'row',justifyContent:'space-between',flex:1,}}>
<View style={{
    borderWidth:1,borderRadius:30,padding:10,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,width:wp(40),borderColor:'#A9A9A9'
}}>
<Text style={{color:'#A9A9A9'}}>22 August 2020</Text>
<FontAwesome
name="calendar"
size={18}
color='#A9A9A9'
/>
</View>

<View style={{
    borderWidth:1,borderRadius:30,padding:10,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,width:wp(40),borderColor:'#A9A9A9'
}}>
<Text  style={{color:'#A9A9A9'}}>11:00 AM</Text>
<Feather
name="clock"
size={18}
color='#A9A9A9'
/>
</View>

</View>

<View style={{
    borderWidth:1,borderRadius:30,padding:10,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,flex:1,borderColor:'#A9A9A9',marginTop:hp(2)
}}>
<Text style={{color:'#A9A9A9'}}>Attach File</Text>
<Text style={{color:'#a5c4dd'}}>Upload</Text>
</View>

</View>
 */}
<View style={{marginHorizontal:wp(5)}}>
<Text style={{fontWeight:'bold',fontSize:16,marginBottom:hp(1)}}>M.A.K.S. Mobile App is easy to use!</Text>

<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>Simply gather your documents.</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>Login using your secure password.</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>Begin by entering your expenses and income.</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>M.A.K.S. Mobile App comes with an easy to
follow guide to help you better understand
business tax deductions for self-employed. </Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>Upload your receipts for future reference.</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>Review your entries or monthly totals.</Text>
</View>
</View>
<View style={{flexDirection:'row'}}>
<View style={{flex:1}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:18}}>•</Text>
</View>
<View style={{flex:15}}>
    <Text style={{fontFamily:'NunitoSans-SemiBold',fontSize:15,textAlign:'justify'}}>Record home office deductions.</Text>
</View>
</View>


</View>



      
       </ScrollView>
          
       <View style={{marginHorizontal:wp(4),marginVertical:hp(2),alignItems:'flex-end'}}>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('WelcomeThird')} style={{backgroundColor:"#EBEBEB",width:wp(40),justifyContent:'center',alignItems:'center',padding:10,borderRadius:10,shadowColor:'red',elevation:10,borderWidth:1,borderColor:'#d3d3d3'}}>
<Text style={{fontWeight:'bold',fontSize:18}}>Next</Text>
</TouchableOpacity>




</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({});
