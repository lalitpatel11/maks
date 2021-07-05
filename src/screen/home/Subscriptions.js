import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ScrollView, TextInput, Alert
} from 'react-native';
import FormTemplateBox from '../../component/FormTemplateBox';
import Header from '../../component/Header';
import colors from '../../utility/colors';
import { hp, wp } from '../../utility/size';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { subscription_plan, current_subscription, getRequestApi, buy_subscription, postRequestMediaApi, executeSubscriptionPayment } from '../../WebApi/Index'
import KeyStore from '../../KeyStore/LocalKeyStore'
import Loader from '../../component/Loader'
import { FlatList } from 'react-native-gesture-handler';
import { NavigationActions, StackActions, CommonActions } from '@react-navigation/native'

export default class Subscriptions extends Component {

  constructor() {
    super()
    this.state = {
      title: '',
      note: '',
      selectedTab: 0,
      attachment: '',
      loading: false,
      token: '',
      uploadPicker: '',
      mySubscriptionData: [],
      data: [],
      loading: false,
      selectedPlan: '1',
      url: '',
      isFromAccount: false
    }
  }


  componentDidMount() {

    const { isFromAccount } = this.props.route.params
    this.setState({ isFromAccount: isFromAccount })

  }

  async mySubscriptionList() {
    const body = ''
    const token = this.state.token
    try {
      this.setState({ loading: true })
      const resp = await getRequestApi(current_subscription, body, token)
      if (resp) {
        console.warn(resp);
        this.setState({ loading: false, mySubscriptionData: resp.responseJson.data })
      }
    } catch (error) {
      console.log("error in mySubscriptionList", error);
      this.setState({ loading: false })
    }
  }
  async getSubscriptionList() {
    // console.warn(subscription_plan, body, token)
    const body = ''
    const token = this.state.token
    this.setState({ loading: true })
    const { responseJson, err } = await getRequestApi(subscription_plan, body, token)
    if (responseJson.status) {
      let arr = []
      responseJson.data.map((item, index) => {
        if (item.isDisabled == '0') {
          arr.push(item)
        }
      })
      this.setState({ loading: false, data: arr })
    }
  }
  async componentWillMount() {
    KeyStore.getKey('data', (err, value) => {
      if (value) {
        const { token, data } = JSON.parse(value);
        this.setState({ token })
        this.getSubscriptionList()
        this.mySubscriptionList()
      } else {
      }
    });
  }
  async buySubscription() {
    if (this.state.selectedPlan) {
      this.setState({ loading: true })
      const formData = new FormData()
      formData.append('plan_id', this.state.selectedPlan)
      const token = this.state.token
      const { responseJson, err } = await postRequestMediaApi(buy_subscription, formData, token)
      this.setState({ loading: false })
      if (responseJson.status) {

        this.props.navigation.dispatch(
          StackActions.replace('PaymentWebView', { paymentUrl: responseJson.data.approval_url, endPoint: executeSubscriptionPayment })
        );

        // this.props.navigation.navigate('PaymentWebView',{paymentUrl:responseJson.data.approval_url,endPoint:executeSubscriptionPayment})
      }

    } else {
      Alert.alert('Please select your plan.')
    }

  }

  renderItems(data) {
    // console.warn("mySubscriptionData",this.state.mySubscriptionData);
    const { item, index } = data
    const { plan_id, plan_name, plan_amount, plan_type, status, fetaures_list,expiry_date } = item
    // const money =plan_amount==0?0:plan_amount.split(".")
    // const rupees = money[0]
    // const paisa = money[1]
    const { isFromAccount } = this.state
    return (
      <TouchableOpacity onPress={() => this.setState({ selectedPlan: plan_id })} key={index}
        style={{
          flex: 1, marginTop: 15, marginHorizontal: 10,
          backgroundColor: this.state.selectedPlan === plan_id ? '#e9fefe' : "#FFFFFF",
          borderRadius: 15,
          borderWidth: 1.5,
          borderColor: this.state.selectedPlan === plan_id ? colors.themeColor : "#adadad"
        }}>
        <View
          style={{ paddingHorizontal: wp(15), paddingVertical: hp(2) }}>
          <Text style={{
            fontSize: 20, color: '#fff',
            backgroundColor: colors.themeColor, padding: 5,
            borderRadius: 20,
            textAlign: "center"
          }}>
            {item.plan_name}
          </Text>
        </View>
        <View style={{
          flexDirection: "row", justifyContent: "center",
          alignItems: "flex-end",
        }}>
          {
            plan_amount==0
            ?
            null
            :
            <>
            <Text style={{ color: '#000', fontWeight: "bold", fontSize: 25 }}>$ </Text>
            <Text
              style={{
                color: '#000',
                fontSize: 40,
                fontWeight: "bold",
              }}>
              {plan_amount}
            </Text>
            </>
          }
        
        </View>
        <Text style={{ color: '#a6a5a5', textAlign: "center", fontWeight: "bold", padding:expiry_date?5: 16 }}>
          {plan_type}
        </Text>
        {
          expiry_date
          ?
          <Text style={{ color: '#a6a5a5', textAlign: "center", fontWeight: "bold",padding:5 }}>
         Expiry Date : {expiry_date}
        </Text>
          :
          null
        }
      
        <View style={{}}>
          {
            fetaures_list
              ?
              fetaures_list.map((item, index) =>
                <View style={{
                  flexDirection: "row",
                  alignItems: "center", paddingHorizontal: 10,
                  backgroundColor: "#d9f0f0",
                  marginHorizontal: 15, marginBottom: 4,
                }}>
                  <Entypo
                    name="check"
                    size={18}
                    color="#000"
                  />
                  <Text style={{ color: '#000', padding: 10 }}>{item}</Text>
                </View>
              )
              :
              null
          }
        </View>
      </TouchableOpacity>
    )
  }




  render() {
    const { isFromAccount } = this.state


    return (
      <View style={{ flex: 1 }}>
        <Header
          navigation={this.props.navigation}
          onPress={() => this.props.navigation.goBack()}
          iconName={isFromAccount ? "arrowleft" : ""}
          title="Subscriptions"
        />
        <View style={{
          paddingVertical: hp(2), backgroundColor: '#d9f0f0', flexDirection: "row",
          justifyContent: 'space-around',
        }}>

          <TouchableOpacity onPress={() => this.setState({ selectedTab: 0 })} style={{
            borderWidth: 2,
            borderColor: this.state.selectedTab == 0 ? colors.themeColor : "#FFF", paddingVertical: 10, borderRadius: 30, marginRight: 5,
            paddingHorizontal: 10, elevation: this.state.selectedTab === 0 ? 1 : 0,
            width: "45%", alignItems: "center", justifyContent: "center",
            backgroundColor: this.state.selectedTab == 0 ? colors.themeColor : "#fff"
          }}>

            <Text style={{
              fontSize: 14, color: this.state.selectedTab == 0 ? "#fff" : colors.themeColor,
              textAlign: "center",
              letterSpacing: 0
            }}>Select Subscription</Text>

          </TouchableOpacity>


          <TouchableOpacity onPress={() => {
            this.setState({ selectedTab: 1 })
          }} style={{
            borderWidth: 2, borderColor: this.state.selectedTab == 1 ? colors.themeColor : "#fff", paddingVertical: 10,
            width: "45%", alignItems: "center", justifyContent: "center",
            borderRadius: 30, paddingHorizontal: 10, elevation: this.state.selectedTab === 1 ? 1 : 0,
            backgroundColor: this.state.selectedTab == 1 ? colors.themeColor : "#fff"
          }}>

            <Text style={{
              fontSize: 14, color: this.state.selectedTab == 1 ? "#FFF" : colors.themeColor,
              textAlign: "center",
              letterSpacing: 0
            }}>My Subscription</Text>

          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} >


          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 15,
              marginBottom: hp(2)
            }}>


            <FlatList
              data={this.state.selectedTab == 0 ? this.state.data : this.state.mySubscriptionData}
              renderItem={(item) => this.renderItems(item)}
              keyExtractor={(item, index) => index.toString()}
            />

            {
              this.state.selectedTab == 0 ?

                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('TabBar')}
                  style={{
                    paddingVertical: hp(2),
                    borderColor: colors.themeColor,
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wp(15),
                    marginVertical: hp(1),
                    borderWidth: 1,
                  }}>
                  <Text style={{ fontSize: 17, color: colors.themeColor, fontWeight: 'bold' }}>
                    Free Subscription
                  </Text>
                </TouchableOpacity>

                :
                null
            }
          </View>

        </ScrollView>
        {
          this.state.selectedTab == 0
            ?
            <TouchableOpacity
              onPress={() => this.buySubscription()}
              style={{
                height: 60,
                backgroundColor: colors.themeColor,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 30

              }}>
              <Text style={{ fontSize: 17, color: '#fff', fontWeight: 'bold' }}>
                Subscribe Now
              </Text>
            </TouchableOpacity>
            :
            null
        }
        <Loader isLoader={this.state.loading} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
