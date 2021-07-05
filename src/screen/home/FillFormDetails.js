import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,Alert
} from 'react-native';
import FormTemplateBox from '../../component/FormTemplateBox';
import Header from '../../component/Header';
import colors from '../../utility/colors';
import {hp, wp} from '../../utility/size';
 
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import CustomWebView from '../../component/CustomWebView';
import { WebView } from 'react-native-webview';
import Loader from '../../component/Loader'


const injectedJavascript = `(function() {
  window.postMessage = function(data) {
 window.ReactNativeWebView.postMessage(data);
};
})()`



export default class FillFormDetails extends Component {

  webView = {
    canGoBack: false,
    ref: null,
  }


  constructor(props) {
    super(props)

    this.state = {
      complete:false  ,
      loading:false,
      
      }
  }



backAction(){

  //

  if (this.webView.canGoBack && this.webView.ref) {
    this.webView.ref.goBack();
    ////return true;
  }else{
    this.props.navigation.goBack()
  }

  ///return false;
}

  render() { 
    console.log("url",this.props.route.params.url) 
    return (
      <View style={{flex: 1}}>      
        <Header
          onPress={() =>this.backAction() }
          iconName="arrowleft"
          title="Fill Form Details"
        />
{/* <CustomWebView
link = {this.props.route.params.url}
/> */}

<View style={{flex:1}}>
        <WebView 
        ref={(webView) => { this.webView.ref = webView; }}
        source={{ uri: this.props.route.params.url }}
    onLoadEnd={(syntheticEvent) => {
        // update component to be aware of loading status
        const { nativeEvent } = syntheticEvent;
        this.isLoading = nativeEvent.loading;
    this.setState({loading:this.isLoading})
    }}
    onLoadStart={(syntheticEvent) => {
        // update component to be aware of loading status
        const { nativeEvent } = syntheticEvent;
        this.isLoading = nativeEvent.loading;
        this.setState({loading:this.isLoading})
      }}
    pullToRefreshEnabled={true}
    onNavigationStateChange={this._onNavigationStateChange}
    javaScriptEnabled={true}
    domStorageEnabled={true}
    onShouldStartLoadWithRequest={() => true}
    startInLoadingState={false}
   // onMessage={this.handleMessage}  
   // injectedJavaScript={injectedJavascript}
    allowFileAccess={true}
    mediaPlaybackRequiresUserAction={true}
  //  onMessage={this.handleMessage}  
      scrollEnabled={true}
        ref="webview"
  //  onMessage={this.onMessage()}
    />
    </View>
    {/* <TouchableOpacity 
    onPress={downButtonHandle}
    style={{height:50,width:50,backgroundColor:"#009997",
    justifyContent:"center",alignItems:"center",borderRadius:100,bottom:50,right:50,
    position:"absolute"
  
  }}>
      <Text>
        down
      </Text>
    </TouchableOpacity> */}
   
    <Loader isLoader={this.state.loading}></Loader>
   
      </View>

    );
  }

  handleMessage = ({nativeEvent:{ data }}) => {

    console.log(data)
    if( data == "GoBack"){
      Alert.alert(
        "Success",
        "Form successfully submitted",
        [
          { text: "OK", onPress: () => 
          this.props.navigation.goBack()
         }
        ],
        { cancelable: false }
      );

    }
  else{
    Alert.alert(
      "Success",
      "Form successfully submitted",
      [
        { text: "OK", onPress: () => 
        this.props.navigation.goBack()
       }
      ],
      { cancelable: false }
    );
  }
  }

  
  _onNavigationStateChange = (webViewState) => {

    this.webView.canGoBack = webViewState.canGoBack
    let navigationType = webViewState.navigationType

    let loading =  webViewState.loading

    if(loading || navigationType == 'reload'){

      if(this.state.complete){
        Alert.alert(
          "Success",
          "Form successfully submitted",
          [
            { text: "OK", onPress: () => 
            this.props.navigation.goBack()
           }
          ],
          { cancelable: false }
        );
  
      }else{
        this.setState({complete:true})

      }
    }

    // if(navigationType == 'reload'){
    //   Alert.alert(
    //     "Success",
    //     "Form successfully submitted",
    //     [
    //       { text: "OK", onPress: () => 
    //       this.props.navigation.goBack()
    //      }
    //     ],
    //     { cancelable: false }
    //   );
    // }
    
    console.log(webViewState)
      // if (webViewState.url.includes('https://www.niletechinnovations.com/projects/maks//ExecutePayment.php?success=true')) {
      //   let url = webViewState.url
      //   let regex = /[?&]([^=#]+)=([^&#]*)/g,
      //     params = {},
      //     match
      //   while ((match = regex.exec(url))) {
      //     params[match[1]] = match[2]
      //     console.log(match[1], match[2])
      //   }
      //  }
    }

    //   handleMessage = ({nativeEvent:{ data }}) => {

  //     console.log(data)
  //     const userInfo = JSON.parse(data);
  //  //   let pdfUrl = userInfo.pdfUrl
  //     console.log(userInfo)
  //     //Linking.openURL(pdfUrl)
  
  //   }
  
}
const styles = StyleSheet.create({});