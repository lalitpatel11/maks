import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacit, StatusBar, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import Loader from '../../component/Loader'
import KeyStore from '../../KeyStore/LocalKeyStore'
import { postRequestMediaApi, executeAppointmentPayment, requestPostApi, executeSubscriptionPayment } from '../../WebApi/Index'
import Header from '../../component/Header'
import { NavigationActions, StackActions, CommonActions } from '@react-navigation/native'


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'rgba(234, 241, 248, 1.0)' },
})

export default class PaymentWebView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      token: '',
      redirectUrl: '',
      paymentInitiate: false,
      endPoint: '',
      callType: '',
      plan_name: '',
      plan_price: '',
    }
  }

  static navigationOptions = {
    //  title: '',
    header: null,
    gesturesEnabled: false,
    disableGestures: true
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    const plan_name = this.props.route.params.plan_name
    const plan_price = this.props.route.params.plan_price
    const url = this.props.route.params.paymentUrl
    const endPoint = this.props.route.params.endPoint
    const callType = this.props.route.params.callType

    this.setState({ redirectUrl: url, endPoint: endPoint, callType: callType, plan_name: plan_name, plan_price: plan_price })
    // this.setState({redirectUrl:'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-1L503106D0544400M'})


    KeyStore.getKey('data', (err, value) => {
      if (value) {
        const { token } = JSON.parse(value);
        this.setState({ token })
      }
    });

  }

  render() {
    console.warn(this.state.redirectUrl);
    const { navigate } = this.props.navigation;
    const { goBack } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Header
          title="Payment"
          onPress={() => this.props.navigation.goBack()}
          iconName="arrowleft"
        />

        <View style={{
          justifyContent: "center", alignItems: "center",
          backgroundColor: "#FFFFFF"
        }}>
          {this.state.plan_name ?
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
              }}
            >{this.state.plan_name}
            </Text>
            :
            null
          }
          {
            this.state.plan_price ?
              <Text
                style={{
                  fontWeight: "bold",
                }}
              >${this.state.plan_price}</Text>
              :
              null
          }

        </View>
        <WebView
          style={{ height: 400 }}
          // onLoadStart={() => this.setState({loading:true})}
          // onLoadEnd={()=>this.setState({loading:false})}
          source={{ uri: this.state.redirectUrl }}
          onNavigationStateChange={this._onNavigationStateChange}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onShouldStartLoadWithRequest={() => true}
          startInLoadingState={false}
          onLoadEnd={(syntheticEvent) => {
            // update component to be aware of loading status
            const { nativeEvent } = syntheticEvent;
            this.isLoading = nativeEvent.loading;
            this.setState({ loading: this.isLoading })
          }}

          onLoadStart={(syntheticEvent) => {
            // update component to be aware of loading status
            const { nativeEvent } = syntheticEvent;
            this.isLoading = nativeEvent.loading;
            this.setState({ loading: this.isLoading })

          }}

        />


        <Loader isLoader={this.state.loading}> </Loader>
      </View>
    );
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
      // appointment_id, payer_id, payment_id, token, user_id
      const { appointment_id, user_id, paymentId, token, PayerID } = params
      console.log(appointment_id)
      if (!this.state.paymentInitiate) {
        this.setState({ paymentInitiate: true })
        this.successPaymentVerify(params)
      }
    }
  }

  async successPaymentVerify(params) {
    this.setState({ loading: true })

    // let body = {appointment_id:params.appointment_id,payer_id:params.PayerID,
    //   payment_id:params.paymentId,token:params.token,user_id:params.user_id}

    // const { responseJson, err } = await requestPostApi(executeAppointmentPayment, body, 'POST', this.state.token)


    const formData = new FormData()

    if (this.state.endPoint == executeSubscriptionPayment) {
      formData.append('plan_id', params.plan_id)

    } else {
      formData.append('appointment_id', params.appointment_id)
      formData.append('appointment_id', params.appointment_id)
      formData.append('call_type', this.state.callType)

    }

    formData.append('payer_id', params.PayerID)
    formData.append('payment_id', params.paymentId)
    formData.append('token', params.token)
    formData.append('user_id', params.user_id)

    const token = this.state.token
    this.setState({ loading: true })
    const { responseJson, err } = await postRequestMediaApi(this.state.endPoint, formData, token)

    this.setState({ loading: false })

    if (err == null) {
      if (responseJson.status) {

        Alert.alert(
          'Success',
          responseJson.message,
          [

            {
              text: 'OK', onPress: () => {

                if (this.state.endPoint == executeSubscriptionPayment) {
                  //   this.props.navigation.navigate('TabBar')
                  this.resetStack('TabBar')
                } else {
                  // this.props.navigation.goBack()
                  this.resetStack('TabBar')
                }

              }
            },
          ],
          { cancelable: false },
        );

        console.log(responseJson)
      } else {
        Alert.alert('', responseJson.message)
      }
    } else {
      Alert.alert('', 'Something went wrong!')
    }
  }

  resetStack(route) {

    this.props.navigation.dispatch(
      StackActions.replace(route, {
      })
    );
    // this.props.navigation.dispatch(
    //   CommonActions.navigate({
    //     name: route,
    //   })
    // );
  }
}