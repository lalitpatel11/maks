
import {Dimensions} from 'react-native'


 const  width = Dimensions.get('window').width

 const height = Dimensions.get('window').height


 export const wp = (amount)=>{

    return (amount*width)/100


 }
 export const hp = (amount)=>{

    return (amount*height)/100


 }




