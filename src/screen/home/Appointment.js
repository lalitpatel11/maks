import React, { Component } from 'react'
import { Text, StyleSheet, View ,ScrollView,TouchableOpacity,TextInput,Image,Alert,FlatList,Linking} from 'react-native'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { wp ,hp} from '../../utility/size'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Loader from '../../component/Loader'
import KeyStore from '../../KeyStore/LocalKeyStore'
import {book_appointment,postRequestMediaApi,getRequestApi,appointment_list,getAppointmentUrl,executeAppointmentPayment} from '../../WebApi/Index'
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';


export default class Appointment extends Component {
    constructor(){
        super()
        this.state={
    selectedTab:0,
    option:1,
    title:'',
    date:'',
    time:'',
    call_type:'',
    loading:false,
    token:'',
    data:[],
    isDateTimePickerVisible: false,
    choosenDate: '',
    mode:'',
    choosenTime: '',
        }
    }
    
    async componentDidMount() {
        KeyStore.getKey('data', (err, value) => {
          if (value) {
            const {token} = JSON.parse(value);
           this.setState({token})
          } else {
          }
        });
      }

      showDateTimePicker = (data) => {
        this.setState({isDateTimePickerVisible: true,mode:data});
      };
    
      hideDateTimePicker = () => {
        this.setState({isDateTimePickerVisible: false});
      };
    
      handleDatePicked = (datetime) => {
        this.setState({isDateTimePickerVisible: false});
    
if(this.state.mode=="date")
{
        this.setState({
            choosenDate: moment(datetime).format('YYYY-MM-DD'),
        });}else if(this.state.mode=="time"){
            this.setState({
                choosenTime: moment(datetime).format('HH:mm'),
            });
        }
      };

async onConfirmAppointment(){
const {title,date,time,call_type,choosenDate,choosenTime} = this.state

const formData = new FormData()
formData.append('title',title)
formData.append('date',choosenDate)
formData.append('time',choosenTime)
formData.append('call_type',this.state.option)
// 
const token=this.state.token
this.setState({loading:true})
const {responseJson,err} = await postRequestMediaApi(book_appointment,formData,token)
this.setState({loading:false})
if(responseJson.status){
    this.setState({title:'',choosenDate:'',choosenTime:''})
 
    Alert.alert('',
    "To confirm the Appointment kindly proceed and pay",
    [
        {text:"Proceed",
        onPress:()=>{
            this.props.navigation.navigate('PaymentWebView',{paymentUrl:responseJson.data.approvalUrl,
                endPoint:executeAppointmentPayment,callType:this.state.option})
            }
        },
        {
            text:"Cancel",
            onPress:()=>console.log("Cancel"),
            style:"cancel",
        }
    
    ]
    )
}else{    
    Alert.alert('',responseJson.message)
}
}

renderItems(item){
    const {id,title,date,time,call_type,status} = item.item

    
return(
    <View key={id} style={{backgroundColor:'#fff',borderRadius:20,marginBottom:hp(2)}} >

<View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(1),borderRadius:20,
flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    
    <View style={{flex:1}}>
    <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:17,padding:8}}>{title}</Text>
    </View>

    <View style={{flexDirection:'row',
    backgroundColor:'#fff',
    alignItems:'center',justifyContent:'center',borderRadius:10,margin:4,height:40,width:100}}>

<FontAwesome
name="dot-circle-o"
size={17}
color="green"
/>

<Text style={{color:'green',fontSize:16,padding:8}}>{this.getStatus(status)}</Text>
    </View>
</View>

<View style={{paddingVertical:hp(4)}}>

<View style={{flexDirection:'row',justifyContent:'space-around',marginBottom:hp(2)}}>
<View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
<Text  style={{fontSize:15,color:'#8F8F8F'}}>{date}</Text>
    <Image
    source={require('../../assests/images/calender_input.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</View>
<View style={{width:wp(40),borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(2),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
<Text  style={{fontSize:15,color:'#8F8F8F'}}>{time}</Text>
    <Image
    source={require('../../assests/images/clock_ic.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</View>
</View>

<TouchableOpacity onPress={()=>this.appointmentCallTap(item.item)} style={{flexDirection:'row',backgroundColor:'',marginHorizontal:wp(4),marginVertical:hp(1)}}>
    <Feather
    name={call_type === "2" ? "video" : "phone-call"}
    size={20}
    color="#116CAF"
    />
    <Text style={{paddingHorizontal:wp(3),color:'#116CAF',fontSize:15}}>{call_type == '2' ? 'Video Call':'Audio Call'}</Text>
</TouchableOpacity>

</View>

            </View>
)

}


getStatus(status){
if (status == '3'){
return 'Pending'
}else if(status == '2'){
    return 'Rejected'

}else{
    return 'Approved'

}
}

async getAppointmentList(){
const body = ''
    const token=this.state.token
    this.setState({loading:true})
    const {responseJson,err} = await getRequestApi(appointment_list,body,token)
    this.setState({loading:false})
if(responseJson.status){
    this.setState({data:responseJson.data})
}
}



appointmentCallTap(item){

    if(item.appointment_status != 'Accepted')
    {
        Alert.alert('Your appointment status is pending from admin.')
    }
    else 
    if (item.call_type == '2'){
        this.getMeetingUrl(item.id,'2')
    }else if (item.call_type == '1'){
        this.getMeetingUrl(item.id,'1')
    }
}

async getMeetingUrl(id,type){
    const body = ''
        const token=this.state.token
        this.setState({loading:true})
        const {responseJson,err} = await getRequestApi(getAppointmentUrl+id,body,token)
        this.setState({loading:false})
        if(responseJson.status){
            // voice_calling_number:"+918287599998"
            if(type == '1'){
                let phoneNumber =  responseJson.data.voice_calling_number
                callNumber(phoneNumber)
            }else{
                Linking.canOpenURL(responseJson.data.video_url).then(supported => {
                    if (supported) {
                      Linking.openURL(responseJson.data.video_url);
                    } else {
                      console.log("Don't know how to open URI: " + responseJson.data.video_url);
                    }
                  });
    
            }
            }else{
            Alert.alert(responseJson.message)
        }

        console.log(responseJson)
    
    }
    
    render() {
        return (
            <View style={{flex:1}}>
                <Header
                navigation={this.props.navigation}
               title="Appointment"/>


<View style={{marginVertical:hp(2),backgroundColor:'',flexDirection:"row",
justifyContent:'space-around',}}>

<TouchableOpacity  onPress={()=>this.setState({selectedTab:0})} style={{borderWidth:2,
    borderColor:colors.themeColor,paddingVertical:10,borderRadius:30,width:"48%",
    alignItems:"center",justifyContent:"center",
    paddingHorizontal:10,elevation:this.state.selectedTab ===0 ? 1:0,
    backgroundColor:this.state.selectedTab ==0 ? '#D3D3D3':"#fff"}}>

<Text style={{fontSize:16,color:colors.themeColor,letterSpacing:0,textAlign:"center"}}>Book An Appointment</Text>

</TouchableOpacity>


<TouchableOpacity onPress={()=>{
    this.setState({selectedTab:1})
    this.getAppointmentList()
}} style={{borderWidth:2,borderColor:colors.themeColor,paddingVertical:10,width:"48%",
alignItems:"center",justifyContent:"center",
borderRadius:30,paddingHorizontal:10,elevation:this.state.selectedTab ===1 ? 1:0,
backgroundColor:this.state.selectedTab ==1 ? '#D3D3D3':"#fff"}}>

<Text style={{fontSize:16,color:colors.themeColor,letterSpacing:0,textAlign:"center"}}>Appointment List</Text>

</TouchableOpacity>
    </View>

               <ScrollView showsVerticalScrollIndicator={false} style={{marginHorizontal:wp(5)}}>
               
               
               {
                   this.state.selectedTab ===0 ? <View>
                       <View style={{backgroundColor:'#fff',borderRadius:15,marginBottom:hp(2)}} >

<View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(2.5),paddingHorizontal:wp(4),borderRadius:15}}>
    <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:17}}>Book an Appointment</Text>
</View>
<View style={{paddingVertical:hp(4)}}>

<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2),marginBottom:hp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
   <TextInput
   style={{padding:0,fontSize:15,flex:1,paddingVertical:hp(0.6)}}
   placeholder="Enter Title"
   placeholderTextColor='#404040'

   value={this.state.title}
onChangeText={title=>this.setState({title})}
   />
   
</View>

</View>

<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2),marginBottom:hp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1.5),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
    <Text  style={{fontSize:15,color:'#8F8F8F'}}>{this.state.choosenDate ? this.state.choosenDate : "Select Date"}</Text>
    <TouchableOpacity onPress={()=>this.showDateTimePicker("date")}>
        <Image
        source={require('../../assests/images/calender_input.png')}
        style={{height:20,width:20,resizeMode:'contain'}}
        />
    </TouchableOpacity>
</View>

</View>

<View style={{flexDirection:'row',justifyContent:'space-around',marginHorizontal:wp(2),marginBottom:hp(2)}}>
<View style={{flex:1,borderWidth:1,flexDirection:'row',justifyContent:'space-between',paddingVertical:hp(1.5),borderRadius:50,paddingHorizontal:wp(3),alignItems:'center',borderColor:'#8F8F8F'}}>
               <Text  style={{fontSize:15,color:'#8F8F8F'}}>{this.state.choosenTime ? this.state.choosenTime : "Select Time"}</Text>
    <TouchableOpacity onPress={()=>this.showDateTimePicker("time")} >
        <Image
        source={require('../../assests/images/clock_ic.png')}
        style={{height:20,width:20,resizeMode:'contain'}}
        />
    </TouchableOpacity>
</View>

</View>

<Text style={{color:'#333333',fontWeight:'bold',fontSize:15,marginVertical:hp(2),marginHorizontal:wp(3)}}>Select Appointment Contact Type</Text>



<View style={{marginHorizontal:wp(1)}}>

<View style={{flexDirection:'row',alignItems:'center'}}>

<TouchableOpacity onPress={()=>this.setState({option:1,call_type:1})} 
style={{flexDirection:"row",alignItems:"center"}}>
<View style={{height:20,width:20,borderRadius:50,backgroundColor:this.state.option ===1 ?
 '#116CAD' : '#c5c5c5',margin:5,justifyContent:'center',alignItems:'center',padding:2}}>
     {
         this.state.option ===1 ?
     <View style={{width:10,height:10,borderRadius:100,backgroundColor:"#FFF"}}/>
         :
         null
     }
{/* <Feather
name="disc"
size={18}
color="#fff"
/> */}
</View>
<Text style={{color:this.state.option ===1 ? '#116CAD' : '#c5c5c5',fontSize:14}}>Phone Call Appointment</Text>
</TouchableOpacity>

</View>


<View style={{flexDirection:'row',alignItems:'center'}}>

<TouchableOpacity onPress={()=>this.setState({option:2,call_type:2})}
 style={{flexDirection:"row",alignItems:"center"}}>
<View style={{
height:20,margin:5,width:20,borderRadius:50,
backgroundColor:this.state.option ===2 ? '#116CAD' : '#c5c5c5',
justifyContent:'center',alignItems:'center'
}}>
     {
         this.state.option ===2 ?
     <View style={{width:10,height:10,borderRadius:100,backgroundColor:"#FFF"}}/>
         :
         null
     }
{/* <Feather
name="check"
size={18}
color="#fff"
/> */}
</View>

<Text style={{color:this.state.option ===2 ? '#116CAD' : '#c5c5c5',fontSize:14}}>Video Call Appointment</Text>
</TouchableOpacity>

</View>


</View>


</View>
            </View>


            <TouchableOpacity onPress={()=>this.onConfirmAppointment()} style={{paddingVertical:hp(2),backgroundColor:colors.themeColor,borderRadius:50,justifyContent:'center',alignItems:'center',marginHorizontal:wp(15),marginVertical:hp(2)}}>
    <Text style={{fontSize:17,color:'#fff',fontWeight:'bold'}}>Confirm Appointment</Text>
</TouchableOpacity>

                   </View>
                    :
                   
                  

<View>

{
      this.state.data.length == 0 ?

      <Text style={{fontSize:20,color:'gray',fontWeight:'bold',position:'absolute',alignSelf:'center',marginTop:100}}>No Data Found</Text>
      :
    <FlatList
    data={this.state.data.reverse()}
    renderItem={(item)=>this.renderItems(item)}
    />
}
</View>
                   
               }
</ScrollView>



<Loader isLoader={this.state.loading}/>

<DateTimePicker
          mode={this.state.mode}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDateTimePicker}
          is24Hour={true}
          headerTextIOS=''
        //  onChange={this.handleDatePicked}
          // onConfirm={(date)=>this._handleDatePicked(date)}
        />
            </View>
        )
    }
}

const styles = StyleSheet.create({})


class AppointmentListBox extends Component {
    render(){
        return (
            <View style={{backgroundColor:'#fff',borderRadius:20,marginBottom:hp(2)}} >

<View style={{backgroundColor:'#D3F5F6',paddingVertical:hp(2),paddingHorizontal:wp(4),borderRadius:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
    <View style={{}}>
    <Text style={{fontWeight:'bold',color:colors.themeColor,fontSize:17}}>Tax Consultant</Text>
    </View>

    <View style={{flexDirection:'row',justifyContent:'space-between',backgroundColor:'#fff',paddingVertical:hp(1),paddingHorizontal:wp(3),borderRadius:50,alignItems:'center'}}>
<FontAwesome
name="dot-circle-o"
size={17}
color="green"
/>
<Text style={{color:'green',paddingHorizontal:wp(2),fontSize:16}}>Confirmed</Text>
    </View>
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
    <Image
    source={require('../../assests/images/clock_ic.png')}
    style={{tintColor:colors.themeColor,height:20,width:20,resizeMode:'contain'}}
    />
</View>
</View>

<View style={{flexDirection:'row',backgroundColor:'',marginHorizontal:wp(4),marginVertical:hp(1)}}>
    <Feather
    name="video"
    size={20}
    color="#116CAF"
    />
    <Text style={{paddingHorizontal:wp(3),color:'#116CAF',fontSize:15}}>Video Call Appointment</Text>
</View>

</View>

            </View>

        )
    }
}



export const callNumber = phone => {
	const url = 'telprompt:'+phone;
	Linking.canOpenURL(url)
		.then((supported) => {
			if (!supported) {
				console.error('Can\'t handle url: ' + url);
			} else {
				return Linking.openURL(url)
					.then((data) => console.error("then", data))
					.catch((err) => { throw err; });
			}
		})
		.catch((err) => console.error('An error occurred', err));
  };
  