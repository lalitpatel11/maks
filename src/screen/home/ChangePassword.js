import React, { Component } from 'react'
import { Text, StyleSheet, View,ScrollView,Image,TextInput,TouchableOpacity,ImageBackground ,Alert} from 'react-native'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {change_password,postRequestMediaApi} from '../../WebApi/Index'
import Loader from '../../component/Loader'

export default class ChangePassword extends Component {

    constructor(){
        super()
        this.state={
   
    loading:false,
    token:'',
    oldPassword:'',
    newPassword:'',
    confirmPassword:'',
    oldPasswordError:'',
    newPasswordError:'',
    confirmPasswordError:''
   
        }
    }


async onUpdatePassword(){
    const {oldPassword,newPassword,confirmPassword} = this.state

if(oldPassword===''&&newPassword===''&&confirmPassword===''){
    this.setState({
        oldPasswordError:"Please fill Old Password",
        newPasswordError:"Please fill New Password",
        confirmPasswordError:"Please fill Confirm Password"
    })}
else if(oldPassword===''){
    this.setState({oldPasswordError:"Please fill Old Password"})
}else if(newPassword===''){
    this.setState({newPasswordError:"Please fill New Password"})
}
else if(newPassword.length <6){
    this.setState({newPasswordError:"New Password must be greater than 6"})
}else if(confirmPassword===''){
    this.setState({confirmPasswordError:"Please fill Confirm Password"})
}else if(this.state.newPassword !=this.state.confirmPassword ){
    this.setState({confirmPasswordError:"Confirm password must be equal to New Password"})
}else {

    this.setState({loading:true})
    const formData = new FormData()
    formData.append('old_password',oldPassword)
    formData.append('new_password',newPassword)
    
    const token= this.state.token
    const {responseJson,err} = await postRequestMediaApi(change_password,formData,token)
    this.setState({loading:false})
if(responseJson.status){
Alert.alert('',responseJson.message,[
    {
        text:'OK',
        onPress:()=>{this.props.navigation.goBack()
        this.setState({oldPassword:'',newPassword:'',confirmPassword:''})}
    }
])




}else{
    Alert.alert('',responseJson.message)
}


}









}





  

    async componentDidMount() {
        KeyStore.getKey('data', (err, value) => {
          if (value) {
            const {token,data} = JSON.parse(value);
           this.setState({token})
           
          // console.warn(data)
          } else {
          }
        });







      }

    render() {
    //   console.warn("pic",this.state.profile_pic)
        const {newPassword,oldPassword,confirmPassword} = this.state
        return (
            <View style={{flex:1}}>
                <Header
                title="Change Password"
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
                />
                


<ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal:wp(5),marginVertical:hp(2),}}>




<View style={{marginVertical:hp(2)}}>
    <TextInput
    ref='old'
    placeholderTextColor='#404040'

    onSubmitEditing={() => {
        this.refs.new.focus();
      }}
     value={oldPassword}
     onChangeText={oldPassword=>this.setState({oldPassword,oldPasswordError:''})}
    placeholder="Enter Old Password"
    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),borderRadius:20,paddingVertical:hp(1),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />

{
   this.state.oldPasswordError ? <Text style={{color:'red',marginVertical:hp(1),marginHorizontal:wp(5)}}>{this.state.oldPasswordError}</Text>:null
}

<TextInput
ref="new"
placeholderTextColor='#404040'

 value={newPassword}
 onChangeText={newPassword=>this.setState({newPassword,newPasswordError:''})}
 onSubmitEditing={() => {
    this.refs.confirm.focus();
  }}
    placeholder="Enter New Password"
    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),borderRadius:20,paddingVertical:hp(1),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />


{
   this.state.newPasswordError ? <Text style={{color:'red',marginVertical:hp(1),marginHorizontal:wp(5)}}>{this.state.newPasswordError}</Text>:null
}


    <TextInput
    ref="confirm"
  
    value={confirmPassword}
    onChangeText={confirmPassword=>this.setState({confirmPassword,confirmPasswordError:''})}

    placeholder="Confirm New Password"
    placeholderTextColor='#404040'

    style={{padding:0,borderWidth:1,marginHorizontal:wp(5),borderRadius:20,paddingVertical:hp(1),fontSize:15,paddingHorizontal:wp(3),marginVertical:hp(1),borderColor:'#585858'}}
    />
   {
   this.state.confirmPasswordError ? <Text style={{color:'red',marginVertical:hp(1),marginHorizontal:wp(5)}}>{this.state.confirmPasswordError}</Text>:null
}

   
    
</View>


<TouchableOpacity onPress={()=>this.onUpdatePassword()
} 
style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,justifyContent:'center',alignItems:'center',marginHorizontal:wp(20),marginVertical:hp(3)}}>
<Text style={{fontSize:17,color:'#fff'}}>Update Password</Text>
</TouchableOpacity>
</ScrollView>





<Loader isLoader={this.state.loading}/>




            </View>
        )
    }
}

const styles = StyleSheet.create({})
