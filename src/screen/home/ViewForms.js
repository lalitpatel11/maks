import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity,Image} from 'react-native'
import FormTemplateBox from '../../component/FormTemplateBox'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'

import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import { TextInput } from 'react-native-gesture-handler'
export default class ViewForms extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Header
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
               title="View Forms "/>

<View style={{marginHorizontal:wp(5),marginVertical:hp(3)}}>



<View style={{backgroundColor:'#fff',borderRadius:15,marginBottom:hp(2)}} >

<View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(2.5),paddingHorizontal:wp(4),borderRadius:15}}>
    <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:17}}>Form 1 Submission for Tax</Text>
</View>
<View style={{paddingVertical:hp(4)}}>

<View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp(2)}}>
<View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>22 August 2020</Text>
 
    <Image
    source={require('../../assests/images/calender_input.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</View>
<View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>11:00 AM</Text>
    <Feather
    name="clock"
    size={20}
    color={colors.themeColor}
    />
</View>
</View>

<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>Attach File</Text>
    <Text style={{color:colors.themeColor,fontSize:15}}>Upload</Text>
</View>

</View>

</View>
            </View>
          








</View>


            </View>
        )
    }
}

const styles = StyleSheet.create({})
