import React, { Component } from 'react'
import { Text, StyleSheet, View ,Image,TouchableOpacity} from 'react-native'
import colors from '../utility/colors'
import {hp,wp} from '../utility/size'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'

export default class FormTemplateBox extends Component {
    render() {
        return(
            <TouchableOpacity 
 onPress={this.props.onPress}
style={{flexDirection:'row',justifyContent:"space-around",borderWidth:0,borderRadius:10,backgroundColor:'#fff',paddingVertical:hp(5),elevation:5,marginBottom:hp(3)}}>
<View style={{flex:10}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'#636363',marginLeft:wp(5)}}>{this.props.title}</Text>
</View>
<View style={{flex:2}}>
<Image
source={require('../assests/images/ic_right-arrow.png')}
style={{height:20,width:20,resizeMode:'contain'}}
            
/>

    </View>
</TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({})
