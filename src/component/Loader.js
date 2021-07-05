import React, { Component } from 'react'
import { Text, StyleSheet, View,ActivityIndicator } from 'react-native'
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { hp,wp } from '../utility/size'

export default class Loader extends Component {
    render() {
        return (
            <>
            {       
                this.props.isLoader ? 
            
                    <View style={{elevation:3,position:'absolute',height:'100%',width:'100%', flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' }}>

                    
<View style={{ backgroundColor: 'white', borderRadius: 10, height: 130, width: 130, justifyContent: 'center', alignItems: 'center' }}>

<ActivityIndicator size="large" color='#004473' />
<Text style={{ textAlign: 'center', padding: 8 }} >Loading...</Text>

</View>


                    {/* <Bubbles size={20} color="#fff" /> */}


                    </View>

:<></>
            }
        </>
        )
    }
}

const styles = StyleSheet.create({})
