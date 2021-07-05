import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  
} from 'react-native';

const styles = StyleSheet.create({
  selectedBtn: {
    flex: 1,
    
    alignItems: 'center',
    justifyContent:"center", backgroundColor: 'white'

  },
  unSelectbtn: {flex: 1, backgroundColor: 'white', alignItems: 'center',justifyContent:"center"},
});

export default class TabBottom extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {tabArr, action} = this.props;
    return (
      <View style={{height: 75, flexDirection: 'row'}}>
        {tabArr.map((item, index) => (
        
<View key={index} style={[ item.isSelect ? styles.selectedBtn : styles.unSelectbtn]}>

<TouchableOpacity  
key={index}
   onPress={() => action(index)}
style={{height:40,width:40,borderRadius:100,justifyContent:"center",alignItems:"center",backgroundColor:item.isSelect ?"#009997":"#fff",borderWidth:1,borderColor:"#009997"}}>
<Image
            source={item.tabImg}
            style={{height:20,width:20,tintColor:item.isSelect ? "#fff":'#009997' }}
            />
</TouchableOpacity>

</View>

        ))}
      </View>
    );
  }
}
