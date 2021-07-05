import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Image,TextInput,TouchableOpacity,ImageBackground ,Alert} from 'react-native'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {get_profile,getRequestApi,update_profile,postRequestMediaApi} from '../../WebApi/Index'
import Loader from '../../component/Loader'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

// import DocumentPicker from 'react-native-document-picker';
// import ImagePicker from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-picker';

export default class Profile extends Component {

    constructor(){
        super()
        this.state={
   
  
    title:'',
    note:'',
    attachment:'',
    loading:false,
    token:'',
    uploadPicker:'',
    data:[],
    loading:false,
    selectedButton:false,
    name:'',
    email:'',
    proprietor_name:'',
    security_no:'',
    principal_business:'',
    secretary:'',
    profile_pic:'',
    image:'',
    source:{},
        }
    }


    // async pickAttachment(){
    //     try {
    //         const res = await DocumentPicker.pick({
    //           type: [DocumentPicker.types.images],
    //         });
    // this.setState({image:res})
    //         console.log(
    //           res
              
    //         );
    //       } catch (err) {
    //         if (DocumentPicker.isCancel(err)) {
    //           // User cancelled the picker, exit any dialogs or menus and move on
    //         } else {
    //           throw err;
    //         }
    //       }
    // }

async onUpdateProfile(){
    const {name,email,proprietor_name,security_no,principal_business,secretary} = this.state

  if(proprietor_name == ''|| security_no == ''|| principal_business == ''|| secretary == '' || name == ''){
    Alert.alert('','Please fill all details.')
    return
  }


    this.setState({loading:true})
const formData = new FormData()
formData.append('name',name)
formData.append('proprietor_name',proprietor_name)
formData.append('security_no',security_no)
formData.append('principal_business',principal_business)
formData.append('secretary',secretary)

if (this.state.source.uri != undefined){
  formData.append("profile_pic", {
    uri : Platform.OS === "android" ?  this.state.source.uri :  this.state.source.uri.replace("file://", ""),
    type : this.state.source.type,
    name : this.fileNameFromUrl(this.state.source.uri)
  })
}

const token=this.state.token

const {responseJson,err} = await postRequestMediaApi(update_profile,formData,token)
this.setState({loading:false})
this.setState({selectedButton:!this.state.selectedButton})   

if(responseJson.status){
    Alert.alert('',responseJson.message)
}else{
  Alert.alert('',responseJson.message)
}
}


pickAttachment(){

  var options = {
      title: 'Select Image',
    //  mediaType:'photo',
      maxHeight:200,
      maxWight:200,
      quality:0.8,
      allowsEditing:true,
      storageOptions: {
        skipBackup: true,
       path: 'images',
      },
    };
      
  //IMAGE PICKER LOGIC

    ImagePicker.showImagePicker(options, response => {
 
      if (response.didCancel) {

      } else if (response.error) {
        console.warn(response.error)
      } else if (response.customButton) {

      } else {

        let source = response;
        this.setState({source:source})
    }
    });
}

fileNameFromUrl(url) {
  var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
  if (matches.length > 1) {
    return matches[1];
  }
  return null;
}

 async getProfile(){

  const body = ''
    const token=this.state.token
    this.setState({loading:true})
    const {responseJson,err} = await getRequestApi(get_profile,body,token)
    this.setState({loading:false})
//console.warn("yesssss",responseJson)
    if(responseJson.status){
        const {name,email,proprietor_name,security_no,principal_business,secretary,profile_pic}= responseJson.data
this.setState({name,email,proprietor_name,security_no,principal_business,secretary,profile_pic})

    }
//console.warn("11111111111",responseJson.data.profile_pic)
 }   

    async componentDidMount() {
        KeyStore.getKey('data', (err, value) => {
          if (value) {
            const {token,data} = JSON.parse(value);
           this.setState({token})
            this.getProfile()
          } else {
          }
        });

      }

    render() {
        const {name,email,proprietor_name,security_no,principal_business,secretary} = this.state
        return (
            <View style={{flex:1}}>
                <Header
                title="Profile"
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
                />

<KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal:wp(5),marginVertical:hp(2),}}>

<View style={{flexDirection:'row'}}>
<View style={{flex:15,backgroundColor:'',justifyContent:'center',alignItems:'center',backgroundColor:"",marginBottom:hp(1)}}>
<ImageBackground 
source={require('../../assests/images/profile_img_bg.png')}
resizeMode='cover'
style={{height:wp(50),width:wp(70),backgroundColor:"",justifyContent:"center",alignItems:"center"}}

>
<View style={{backgroundColor:colors.themeColor,height:wp(30),width:wp(30),borderRadius:250,borderWidth:2,justifyContent:"center",alignItems:'center',borderColor:colors.themeColor}}>
<TouchableOpacity 
disabled={this.state.selectedButton ?false:true}
onPress={()=>this.pickAttachment()}
>

     <Image
    source={{uri:this.state.source.uri != undefined ? this.state.source.uri : this.state.profile_pic ? this.state.profile_pic: "https://www.mightyplace.com/Images/Common/profile.jpg"}}

   // source={{uri:this.state.image ? this.state.image.uri : this.state.profile_pic ? this.state.profile_pic: "https://www.mightyplace.com/Images/Common/profile.jpg"}}
    style={{height:wp(28),width:wp(28),borderRadius:200}}
    />

</TouchableOpacity>
</View>

</ImageBackground>
<View>
        <TextInput
        style={{fontWeight:'bold',fontSize:18,textAlign:'center',marginTop:hp(2),padding:0}}
        value={name}
        onChangeText={name=>this.setState({name})}
        placeholderTextColor='#404040'

        editable={this.state.selectedButton ? true:false}
        />
        <Text style={{fontWeight:'500',fontSize:16,textAlign:'center'}}>{email}</Text>
</View>

</View>

</View>


<View style={{marginVertical:hp(2)}}>
<TextInput
     editable={this.state.selectedButton ? true:false}
     value={name}
     onChangeText={name=>this.setState({name})}
    placeholder="Username"
    placeholderTextColor='#404040'

    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),borderRadius:20,
      paddingVertical:hp(2),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />

    <TextInput
     editable={this.state.selectedButton ? true:false}
     value={security_no}
     onChangeText={security_no=>this.setState({security_no})}
    placeholder="Mobile Text"
    placeholderTextColor='#404040'

    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),borderRadius:20,
      paddingVertical:hp(2),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />

    <TextInput
    value={proprietor_name}
    onChangeText={proprietor_name=>this.setState({proprietor_name})}
    editable={this.state.selectedButton ? true:false}
    placeholder="Name of Proprietor"
    placeholderTextColor='#404040'

    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),
      borderRadius:20,paddingVertical:hp(2),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />

<TextInput
 value={principal_business}
 onChangeText={principal_business=>this.setState({principal_business})}
 editable={this.state.selectedButton ? true:false}
    placeholder="Business Name"
    placeholderTextColor='#404040'

    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),
      borderRadius:20,paddingVertical:hp(2),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />
    <TextInput
     editable={this.state.selectedButton ? true:false}
    value={secretary}
    onChangeText={secretary=>this.setState({secretary})}
    placeholder="Business Type"
    placeholderTextColor='#404040'

    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),borderRadius:20,
      paddingVertical:hp(2),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />    
</View>

<TouchableOpacity onPress={()=>{
this.state.selectedButton ?
this.onUpdateProfile() :
this.setState({selectedButton:!this.state.selectedButton})   
}} 
style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,justifyContent:'center',alignItems:'center',marginHorizontal:wp(20),marginVertical:hp(3)}}>
<Text style={{fontSize:17,color:'#fff',fontWeight:'bold'}}>{this.state.selectedButton ? "Save Profile":"Edit Profile" }</Text>
</TouchableOpacity>
</KeyboardAwareScrollView>


<Loader isLoader={this.state.loading}/>




            </View>
        )
    }
}

const styles = StyleSheet.create({})
