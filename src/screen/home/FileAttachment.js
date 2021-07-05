import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity,Image} from 'react-native'
import FormTemplateBox from '../../component/FormTemplateBox'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'

export default class FileAttachment extends Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Header
                navigation={this.props.navigation}
               title="File Attachment "/>
        
<View style={{marginHorizontal:wp(5),marginVertical:hp(3)}}>
<FormTemplateBox
title="Upload Attachment Files"
onPress={()=>this.props.navigation.navigate('UploadAttachmentFile')}
/>
            

<TouchableOpacity 
onPress={()=>this.props.navigation.navigate('AttachmentResponseList')}
style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,
justifyContent:'center',alignItems:'center',marginHorizontal:wp(10),marginVertical:hp(3)}}>
    <Text style={{fontSize:17,color:'#fff',textAlign:"center"}}>View Uploaded File Response</Text>
</TouchableOpacity>



</View>
<View style={{flex:1,backgroundColor:'',justifyContent:'flex-end'}}>


<Image
source={require('../../assests/images/file-upload.png')}
style={{resizeMode:'stretch',width:wp(90),height:hp(40)}}
/>
</View>

            </View>
        )
    }
}

const styles = StyleSheet.create({})
