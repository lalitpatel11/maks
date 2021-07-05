import React, { Component } from 'react'
import { Text, View ,Linking} from 'react-native'
import {getRequestApi,supportDoc} from '../../WebApi/Index'
import Header from '../../component/Header'
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

export default class SupportDoc extends Component {

constructor(){
    super()
    this.state={
        docArr:[],

    }
}

async componentDidMount(){

        const {responseJson,err} = await getRequestApi(supportDoc,{},'')
        if(responseJson.status){
             this.setState({docArr:responseJson.data})

}
}
    render() 
    {
      const{goBack} = this.props.navigation
      const{docArr} = this.state

        return (
            <View style={{height:'100%',width:'100%'}}>

                        <Header
                title="Support Document"
                onPress={()=>this.props.navigation.goBack()}
                iconName="arrowleft"
                />
                <ScrollView>
                {
                    docArr.map((item,index)=>
                    <TouchableOpacity onPress={()=>{
                        Linking.canOpenURL(item.file_name).then(supported => {
                            if (supported) {
                              Linking.openURL(item.file_name);
                            } 
                          });
                      
                    }
                    } style={{width:'80%',alignSelf:'center',backgroundColor:'white',flexDirection:'row',
                    margin:16,borderRadius:10,alignItems:'center',borderColor:'gray',borderWidth:1}}>
                        <Text style={{padding:16,flex:1}}>{item.title}</Text>
                        <Text style={{padding:16}}>View</Text>
                    </TouchableOpacity>
                    )
                }
                </ScrollView>
            </View>
        )
    }
}