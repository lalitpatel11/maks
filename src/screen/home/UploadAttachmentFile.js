import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity,Image,TextInput,Alert,Keyboard,Platform,PermissionsAndroid} from 'react-native'
import FormTemplateBox from '../../component/FormTemplateBox'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'
import Loader from '../../component/Loader'
import KeyStore from '../../KeyStore/LocalKeyStore'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import DocumentPicker from 'react-native-document-picker';
import {postRequestMediaApi,upload_attachment} from '../../WebApi/Index'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
 import RNFetchBlob from 'react-native-fetch-blob'

export default class UploadFileAttachment extends Component {

    constructor(){
        super()
        this.state={
   
  
    title:'',
    note:'',
    attachment:'',
    loading:false,
    token:'',
    uploadPicker:'',
    // attachment:{}
        }
    }

async pickAttachment(){
 
  Keyboard.dismiss()

    try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
         
        if(Platform.OS == 'android'){
          let paths = await RNFetchBlob.fs.stat(res.uri)
          res.uri = 'file://'+paths.path
          this.setState({uploadPicker:res})
        }else{
          this.setState({uploadPicker:res})
        }

        } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
}

    async componentDidMount() {
      requestReadExternalStorage()
        KeyStore.getKey('data', (err, value) => {
          if (value) {
            const {token} = JSON.parse(value);
           this.setState({token})
          // console.warn(value)
          } else {
          }
        });
      }

async onUpload(){

const {title,note,token} = this.state
// console.warn("fds",token)
const formData = new FormData()
formData.append('title',title)
formData.append('note',note)
// formData.append('attachment',this.state.uploadPicker)

  formData.append("attachment", {
    uri : Platform.OS === "android" ? this.state.uploadPicker.uri  :  this.state.uploadPicker.uri.replace("file://", ""),
    type : this.state.uploadPicker.type,
    name : this.fileNameFromUrl(this.state.uploadPicker.uri)//fileName+'.png',
  })
 

this.setState({loading:true})

const {responseJson,err} = await postRequestMediaApi(upload_attachment,formData,token)
this.setState({loading:false})

if(responseJson.status){

    this.setState({title:'',note:'',uploadPicker:''})
    Alert.alert(
      'Success',
      responseJson.message,
      [
        { text: 'OK', onPress: () => 
        this.props.navigation.goBack()
       }
      ],
      { cancelable: false }
    );
    
}else{
    Alert.alert('',responseJson.message)
}
      }

      fileNameFromUrl(url) {
        var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
        if (matches.length > 1) {
          return matches[1];
        }
        return null;
     }


    render() {
               return (
            <View style={{flex:1}}>
                <Header
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
               title="File Attachment "/>
<KeyboardAwareScrollView>
<View style={{marginHorizontal:wp(5),marginVertical:hp(3)}}>

<View style={{backgroundColor:'#fff',borderRadius:15,marginBottom:hp(2)}} >

<View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(2.5),paddingHorizontal:wp(4),borderRadius:15}}>
    <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:17}}>Upload Attachment Files</Text>
</View>
<View style={{paddingVertical:hp(4)}}>

<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2),marginBottom:hp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
   <TextInput
   style={{padding:0,fontSize:15,flex:1}}
   placeholder="Enter Title"
   placeholderTextColor='#404040'

   value={this.state.title}
   onChangeText={title=>this.setState({title})}
   />
   
</View>

</View>

<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2),marginBottom:hp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',
justifyContent:'space-between',paddingVertical:hp(1.5),
borderRadius:50,paddingHorizontal:wp(3),
alignItems:'center',borderColor:'#8F8F8F',}}>
        <TouchableOpacity onPress={()=>this.pickAttachment()} style={{flex:5}}>
        <Text numberOfLines={2} style={{fontSize:15,color:'#8F8F8F',textAlign:'justify'}}>{this.state.uploadPicker ? this.state.uploadPicker.name : "Attach File"}</Text>
        </TouchableOpacity>
    <Text onPress={()=>this.pickAttachment()} style={{color:colors.themeColor,fontSize:15}}>Upload</Text>
</View>
                
</View>
<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2),marginBottom:hp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1),borderRadius:15,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
   <TextInput
   style={{padding:0,fontSize:15,flex:1}}
   //multiline={true}
  // numberOfLines={4}
   
   placeholder="Add Notes"
   placeholderTextColor='#404040'

   value={this.state.note}
   onChangeText={note=>this.setState({note})}
   />
   
</View>

</View>

</View>
            </View>


            <TouchableOpacity onPress={()=>this.onUpload()} style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,justifyContent:'center',alignItems:'center',marginHorizontal:wp(20),marginVertical:hp(3)}}>
    <Text style={{fontSize:17,color:'#fff',textAlign:"center"}}>Upload and Send File</Text>
</TouchableOpacity>


</View>
</KeyboardAwareScrollView>
<Loader isLoader={this.state.loading}/>

            </View>
        )
    }
}

const styles = StyleSheet.create({})


export const requestReadExternalStorage = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
};
