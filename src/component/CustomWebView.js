import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
 import Loader from '../component/Loader'
 const webviewRef = null;

 
export default class CustomWebView extends Component {
  webView = {
    canGoBack: false,
    ref: null,
  }
  
    constructor(){
        super()
        this.state={
            loading:false
        }
    }   
      // onMessage(data) {
      //  alert(data)
      //   this.props.navigation.navigate("TabBar");
      // }

  render() {
    return <View style={{flex:1}}>
        <WebView 
        
        ref={(webView) => { this.webView.ref = webView; }}
        source={{ uri: this.props.link }}
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
      }}
      
    pullToRefreshEnabled={true}
    startInLoadingState={true}
    onNavigationStateChange={this._onNavigationStateChange}

    renderLoading={() =>  <Loader isLoader={true}/>}
   // ref="webview"
  //  onMessage={this.onMessage()}
    />
   
    </View>;
  }

  _onNavigationStateChange = (webViewState) => {

    console.log(webViewState)
      if (webViewState.url.includes('https://admin.makstaxapp.com/ExecutePayment.php?success=true')) {
        let url = webViewState.url
        let regex = /[?&]([^=#]+)=([^&#]*)/g,
          params = {},
          match
        while ((match = regex.exec(url))) {
          params[match[1]] = match[2]
          console.log(match[1], match[2])
        }
       }
    }
}