import React, { Component } from 'react'
import { Text, StyleSheet, View ,TouchableOpacity,Image,FlatList,TextInput} from 'react-native'
import FormTemplateBox from '../../component/FormTemplateBox'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'
import {getRequestApi,get_tax_advisory,getAttachmentList} from '../../WebApi/Index'
import Loader from '../../component/Loader'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import KeyStore from '../../KeyStore/LocalKeyStore'
import moment from 'moment';


export default class AttachmentResponseList extends Component {



    constructor(){
        super()
        this.state={
   
  
    title:'',
    note:'',
    attachment:'',
    loading:false,
    token:'',
    uploadPicker:'',
    data:'',
    loading:false,
    
        }
    }
    
 async getTaxAdvisory(){
    const body = ''
        const token=this.state.token
        this.setState({loading:true})
        const {responseJson,err} = await getRequestApi(getAttachmentList,body,token)
        this.setState({loading:false})
        if(responseJson.status){
             this.setState({data:responseJson.data})    
        }
     }
    
        async componentDidMount() {
            KeyStore.getKey('data', (err, value) => {
              if (value) {
                const {token,data} = JSON.parse(value);
               this.setState({token})
                this.getTaxAdvisory()
              } else {
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
    

renderItems=(item,index)=>

     <View key={index} style={{backgroundColor:'#fff',borderRadius:15,margin:10}} >

    <View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(2.5),paddingHorizontal:wp(4),borderRadius:15}}>
        <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:15}}>{item.title}</Text>
    </View>
    <View style={{paddingVertical:hp(1)}}>
    
    <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
    <View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',borderRadius:30,paddingHorizontal:wp(2),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text numberOfLines={1} style={{fontSize:14,color:'#8F8F8F',flex:1}}>{this.fileNameFromUrl(item.file_name)}</Text>
        <Feather
        name='image'
        size={18}
        color={colors.themeColor}
        />
    </View>
    <View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:30,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  numberOfLines={1}  style={{fontSize:14,color:'#8F8F8F',flex:1}}>{ moment(item.created_date).format('YYYY-MM-DD') }</Text>
        <Image
        source={require('../../assests/images/clock_ic.png')}
        style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
        />
    </View>
    </View>
    
    <View style={{flexDirection:'row',justifyContent:"flex-start",alignItems:'center',marginHorizontal:wp(3),marginBottom:hp(1)}}>
    <Entypo
    name="folder"
    size={20}
    color="#106CAD"
    />
    <TouchableOpacity
     onPress={()=>this.props.navigation.navigate('AttachmentResponse',{id:item.upload_attachment_id,item:item})} style={{flexDirection:'row'}}>
    <Text  style={{color:'#116DB0',paddingHorizontal:wp(3),fontSize:15,paddingRight:wp(1)}}>View file Attachment Response  <Feather
    name="arrow-right"
    size={15}
    color="#106CAD"
    /></Text>
    
    </TouchableOpacity>
    </View>    
    
    </View>
                </View>

render() {
        return (
            <View style={{flex:1}}>
                <Header
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
               title="Uploaded File List"/>


{
      this.state.data.length == 0 ?

      <Text style={{fontSize:20,color:'gray',fontWeight:'bold',position:'absolute',alignSelf:'center',marginTop:100}}>No Data Found</Text>
      :

<FlatList
data={this.state.data}
renderItem={({item,index}) => this.renderItems(item,index)}
showsVerticalScrollIndicator={false}
keyExtractor={(item, index) => item.key}
/>
}

<Loader isLoader={this.state.loading}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
