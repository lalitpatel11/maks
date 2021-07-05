import React, { Component } from 'react'
import { Text, StyleSheet, View,Alert ,Linking,TouchableOpacity,Keyboard,Image,TextInput,ScrollView,FlatList,Platform} from 'react-native'
import FormTemplateBox from '../../component/FormTemplateBox'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'

import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import {getRequestApi,get_tax_advisory,getAttachmentList} from '../../WebApi/Index'
import KeyStore from '../../KeyStore/LocalKeyStore'
import moment from 'moment';
import Entypo from 'react-native-vector-icons/Entypo'
import DocumentPicker from 'react-native-document-picker';
import {postRequestMediaApi,upload_attachment,upload_reply_attachment} from '../../WebApi/Index'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
 import RNFetchBlob from 'react-native-fetch-blob'
import {requestReadExternalStorage} from './UploadAttachmentFile';


export default class AttachmentResponse extends Component {

    constructor(){
        super()
        this.state={
    time:'',
    note:'',
    attachment:'',
    loading:false,
    token:'',
    uploadPicker:'',
    replyStaus:true,
    appointmentId:'',
    responseArr:[],
}

    }

    componentDidMount(){
      requestReadExternalStorage()
        const{id} = this.props.route.params
        this.setState({appointmentId:id})

        KeyStore.getKey('data', (err, value) => {
            if (value) {
              const {token,data} = JSON.parse(value);
             this.setState({token})
              this.getAttachmentResponse(id)
            }
          });
    }

    async getAttachmentResponse(id){
        const{item} = this.props.route.params

        this.setState({appointmentId:this.props.route.params.id,responseArr:[item]})

        const body = ''
            const token=this.state.token
            this.setState({loading:true})
            const {responseJson,err} = await getRequestApi(getAttachmentList+'/'+id,body,token)
            this.setState({loading:false})
            if(responseJson.status){
                let arr = this.state.responseArr
                let responseArr = responseJson.data.reverse()
                responseArr.map((item,index)=>{
                    item.title = item.note
                    arr.push(item)
                })
                 this.setState({responseArr:arr})    
            }
         }
    

    render() {
        
        return (
            <View style={{flex:1}}>
                <Header
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
               title="Attachment Response"/>
<KeyboardAwareScrollView>

<View style={{marginHorizontal:wp(5),marginVertical:hp(3)}}>

<FlatList
data={this.state.responseArr}
renderItem={({item,index}) => this.renderItems(item,index)}
showsVerticalScrollIndicator={false}
keyExtractor={(item, index) => item.key}

/>
            {
                this.state.replyStaus ?
                 <TouchableOpacity onPress={()=>this.setState({replyStaus:false})}
                  style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,justifyContent:'space-around',alignItems:'center',marginLeft:wp(50),marginVertical:hp(3),flexDirection:'row',paddingHorizontal:wp(2)}}>
                <AntDesign
                name="back"
                size={20}
                color="#fff"
                />
    <Text style={{fontSize:17,color:'#fff'}}>Attach Reply</Text>
</TouchableOpacity>
:<View>
<View style={{borderRadius:10,elevation:1,backgroundColor:'#fff',paddingVertical:hp(4),paddingHorizontal:wp(5),marginVertical:hp(2)}}>

<TouchableOpacity onPress={()=>this.pickAttachment()} style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',
borderRadius:50,paddingHorizontal:wp(3),height:50,alignItems:'center',borderColor:'#8F8F8F',marginBottom:hp(3)}}>
    <Text  style={{fontSize:15,color:'#8F8F8F',}}>{this.state.uploadPicker ? this.state.uploadPicker.name : "Attach File"}</Text>
    <Text style={{color:colors.themeColor}}></Text>
    </TouchableOpacity>

<View style={{borderRadius:10,height:100,justifyContent:'center',borderWidth:1,borderRadius:15,borderColor:'#8F8F8F'}}>
<TextInput
style={{padding:16,
fontSize:15}}
multiline={true}
numberOfLines={4}
autoCorrect={false}
value={this.state.note}
placeholderTextColor='#404040'

onChangeText={(value)=>this.setState({note:value})}
placeholder="Note"
/>
</View>

</View>

<TouchableOpacity onPress={()=>this.sendAttachemnt()} style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,justifyContent:'space-around',alignItems:'center',marginHorizontal:wp(20),marginVertical:hp(3),flexDirection:'row',paddingHorizontal:wp(2)}}>
                
    <Text style={{fontSize:17,color:'#fff'}}>Send Attachment</Text>
</TouchableOpacity>
</View>
            }
</View>
</KeyboardAwareScrollView>
            </View>
        )
    }

    renderItems=(item,index)=>

     <View key={index} style={{backgroundColor:'#fff',borderRadius:15,marginBottom:hp(2)}} >

    <View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(2.5),paddingHorizontal:wp(4),borderRadius:15}}>
        <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:15}}>{item.title}</Text>
    </View>
    <View style={{paddingVertical:hp(1)}}>
    
    <View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp(2)}}>
    {
        item.file_name != ''
?
<TouchableOpacity  onPress={()=>this.openFile(item.file_name)} style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',borderRadius:30,paddingHorizontal:wp(2),alignItems:'center',borderColor:'#8F8F8F'}}>
<Text numberOfLines={1} style={{fontSize:14,color:'#8F8F8F',flex:1}}>{this.fileNameFromUrl(item.file_name)}</Text>
    <Feather
    name='image'
    size={18}
    color={colors.themeColor}
    />
</TouchableOpacity>

: null
    }
   
    <View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:30,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
<Text  numberOfLines={1}  style={{fontSize:14,color:'#8F8F8F',flex:1}}>{ moment(item.created_date).format('YYYY-MM-DD') }</Text>
        <Image
        source={require('../../assests/images/clock_ic.png')}
        style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
        />
    </View>
    </View>    
    
    </View>
                </View>

fileNameFromUrl(url) {
    var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches != null){
        if (matches.length > 1 || matches != null) {
            return matches[1];
          }
      
    }
    return null;
 }

 openFile(url){
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.log("Don't know how to open URI: " + url);
        }
      });
 }

async sendAttachemnt(){


    const {uploadPicker,note,token,appointmentId} = this.state

    if(note == ''){
        Alert.alert('Please enter note')
    }else{

const formData = new FormData()
formData.append('note',note)
formData.append('upload_attachment_id',appointmentId)

        if(uploadPicker){
            formData.append("attachment", {
                uri : Platform.OS === "android" ?  this.state.uploadPicker.uri :  this.state.uploadPicker.uri.replace("file://", ""),
                type : this.state.uploadPicker.type,
                name : this.fileNameFromUrl(this.state.uploadPicker.uri)//fileName+'.png',
              })            
        }

this.setState({loading:true})

const {responseJson,err} = await postRequestMediaApi(upload_reply_attachment,formData,token)
this.setState({loading:false})
this.setState({replyStaus:true,uploadPicker:'',note:''})

if(responseJson.status){

    this.setState({title:'',note:'',uploadPicker:''})
    Alert.alert(
      'Success',
      responseJson.message,
      [
        { text: 'OK', onPress: () => 
        this.getAttachmentResponse(this.state.appointmentId)
       }
      ],
      { cancelable: false }
    );

}else{
    Alert.alert('',responseJson.message)
}
    }
}


 async pickAttachment(){
 
    Keyboard.dismiss()
  
      try {
          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          });
          //   this.setState({uploadPicker:res})
          // console.log(res);
        
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
  
}
const styles = StyleSheet.create({})