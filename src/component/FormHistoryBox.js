import React, { Component } from 'react'
import { Text, StyleSheet, View, ActivityIndicator, Image, TouchableOpacity, Linking } from 'react-native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { hp, wp } from '../utility/size'
import colors from '../utility/colors'
import moment from 'moment'

export default class FormHistoryBox extends Component {

    render() {

        const { item, addAttachment } = this.props
        return (

            <View style={{ backgroundColor: '#fff', borderRadius: 20, marginBottom: hp(2) }} >
                <View style={{ backgroundColor: '#D3F5F6', paddingVertical: hp(2.5), paddingHorizontal: wp(4), borderRadius: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: colors.themeColor, fontSize: 17 }}> {item.post_type == 'home_business' ? 'Home Business' : 'Income & Expenses Form'}</Text>
                    <Text style={{ color: colors.themeColor, fontSize: 14 }}> {moment(item.monthYear).format("MMM YYYY")}</Text>

                </View>
                <View style={{ paddingVertical: hp(1) }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <TouchableOpacity onPress={() => this.openUrl(item.preview)} style={{ width: wp(40), borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp(2), borderRadius: 50, paddingHorizontal: hp(2), alignItems: 'center', borderColor: '#8F8F8F' }}>
                            <Text style={{ fontSize: 15, color: '#8F8F8F' }}>Month View</Text>
                            <Image
                                source={require('../assests/images/view.png')}
                                style={{ tintColor: colors.themeColor, height: 20, width: 20, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.viewClick(item)}
                            style={{
                                width: wp(40), borderWidth: 1, flexDirection: 'row',
                                justifyContent: 'space-between', borderRadius: 50, paddingHorizontal: wp(3),

                                alignItems: 'center', borderColor: '#8F8F8F'
                            }}>
                            <Text style={{ fontSize: 15, color: '#8F8F8F' }}>Date View</Text>
                            <Image
                                source={require('../assests/images/view.png')}
                                style={{ tintColor: colors.themeColor, height: 20, width: 20, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                    </View>

                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-around',marginVertical:10}}>
                        <TouchableOpacity onPress={() => this.openUrl(item.annual_preview  )} style={{ width: wp(40), borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: hp(2), borderRadius: 50, paddingHorizontal: hp(2), alignItems: 'center', borderColor: '#8F8F8F' }}>
                            <Text style={{ fontSize: 15, color: '#8F8F8F' }}>Annual View</Text>
                            <Image
                                source={require('../assests/images/view.png')}
                                style={{ tintColor: colors.themeColor, height: 20, width: 20, resizeMode: 'contain' }}
                            />
                        </TouchableOpacity>
                    </View> */}

                    {/* <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-between'}}>
<TouchableOpacity onPress={()=>this.props.viewClick(item)} 
style={{width:wp(27),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1.5),
borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',
borderColor:'#8F8F8F',alignSelf:'center',marginTop:hp(1),marginRight:16}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>View</Text>
    <Image
    source={require('../assests/images/view.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</TouchableOpacity>
</View> */}







                    {/* <View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>{moment(item.created_date).format("hh:mm a") }</Text>
    <Image
    source={require('../assests/images/clock_ic.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</View> */}


                    {/* <View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2)}}>
<TouchableOpacity onPress={()=>addAttachment(item.post_id)} style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  style={{fontSize:15,color:'#8F8F8F',flex:1}}>{item.attachment_image == null ? 'Attach File' : this.fileNameFromUrl(item.attachment_image)}</Text>
   {
       item.attachment_image == null
       ?
       <Text style={{color:colors.themeColor,fontSize:15}}>Upload</Text>
       :null
   }
</TouchableOpacity>

</View> */}

                    {/* <View style={{flexDirection:'row',alignSelf:'center',justifyContent:'space-between'}}>
<TouchableOpacity onPress={()=>this.props.viewClick(item)} 
style={{width:wp(27),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1.5),
borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',
borderColor:'#8F8F8F',alignSelf:'center',marginTop:hp(1),marginRight:16}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>View</Text>
    <Image
    source={require('../assests/images/view.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</TouchableOpacity> */}
                    {/* 
{
    item.edit_from != ''
    ?
    <TouchableOpacity onPress={()=>this.props.navigation.navigate('FillFormDetails',{
        url:item.edit_from
    })}
    
style={{width:wp(27),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1.5),borderRadius:50,
paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F',
alignSelf:'center',marginTop:hp(1),marginLeft:16}}>

    <Text  style={{fontSize:15,color:'#8F8F8F'}}>Edit</Text>
    <Image
    source={require('../assests/images/edit.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</TouchableOpacity>
    :
    null
} */}

                    {/* </View> */}
                    {/* <TouchableOpacity style={{alignSelf:'center',borderWidth:0.7,borderRadius:20,borderColor:'gray',height:40,width:100,marginTop:16,alignItems:'center',justifyContent:'center'}}><Text style={{fontWeight:'bold',fontSize:15,color:'#8F8F8F'}}>View</Text></TouchableOpacity> */}
                </View>
            </View>
        )
    }

    fileNameFromUrl(url) {
        var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
        if (matches.length > 1) {
            return matches[1];
        }
        return null;
    }

    openUrl(url) {
        Linking.canOpenURL(url).then(supported => {
            if (supported) {
                Linking.openURL(url);
            } else {
                console.log("Don't know how to open URI: " + url);
            }
        });

    }
}



