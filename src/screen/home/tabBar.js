import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  AsyncStorage,
  Modal,
  Image,
  ImageBackground,
  BackHandler,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Dimensions,
} from 'react-native';
import TabBottom from '../../component/TabBottom';

import Home from './Home';
import Appointment from './Appointment';
import FileAttachment from './FileAttachment';
import MyAccount from './MyAccount';
import LocalKeyStore from '../../KeyStore/LocalKeyStore';
import { getRequestApi, get_subscription_popup_status } from '../../WebApi/Index';

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({});

export default class TabBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      tabArr: [
        {
          tabName: 'HOME',
          tabImg: require('../../assests/images/ic_home.png'),
          isSelect: true,
          tabAction: '',
        },
        { tabImg: require('../../assests/images/calender.png'), isSelect: false, tabAction: '' },
        { tabImg: require('../../assests/images/attachment_ic.png'), isSelect: false, tabAction: '' },
        { tabImg: require('../../assests/images/profile.png'), isSelect: false, tabAction: '' },
      ],
      selectedTabTitle: 'Home',
    };
  }

  static navigationOptions = {
    headerShown: false,
    gesturesEnabled: false,
    disableGestures: true,
  };

  componentDidMount() {
  }

  async componentWillMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    LocalKeyStore.getKey('data', (err, value) => {
      if (value) {
        const { token, data } = JSON.parse(value);
        this.setState({ token })
        this.getSubscriptionPopUp()
      } else {
      }
    });
  }

  async getSubscriptionPopUp() {
    const body = '';
    const token = this.state.token;
    try {
      const resp = await getRequestApi(get_subscription_popup_status, body, token);
      if (resp.responseJson.account_type=="Free Trial Expire" || resp.responseJson.account_type=="Free Trial") {
        const remainingDay=resp.responseJson.remaining_day
        if (remainingDay<=5) {
          if (remainingDay==0) {
            Alert.alert("Subscription Alert","Your free subscription plan expired")
          } else {
            Alert.alert("Subscription Alert",`${remainingDay} days is left of your free subscription`)
          }
        }
      }
    } catch (error) {
      console.log("error in getSubscriptionPopUp", error);
    }
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  // async mySubscriptionList() {
  //   const body = ''
  //   const token = this.state.token
  //   try {
  //     this.setState({ loading: true })
  //     const resp = await getRequestApi(current_subscription, body, token)
  //     if (resp) {
  //       this.setState({ loading: false, mySubscriptionData: resp.responseJson.data })
  //     }
  //   } catch (error) {
  //     console.log("error in mySubscriptionList", error);
  //     this.setState({ loading: false })
  //   }
  // }


  handleBackButtonClick = () => {
    //this.props.navigation.isFocused() helps to exit the app in one screen not in the whole
    if (this.props.navigation.isFocused()) {
      Alert.alert(
        '',
        'Do you want to close app?',
        [
          {
            text: 'No',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp()
          }
        ],
        { cancelable: false },
      );
      return true;
    }
  }

  render() {
    const { goBack } = this.props.navigation;
    return (
      <View>

        <View style={{ height: windowHeight - 100, width: '100%' }}>
          {this.state.tabArr[0].isSelect ? (
            <Home navigation={this.props.navigation}></Home>
          ) : this.state.tabArr[1].isSelect ? (
            <Appointment navigation={this.props.navigation}></Appointment>
          ) : this.state.tabArr[2].isSelect ? (
            <FileAttachment navigation={this.props.navigation}></FileAttachment>
          ) : (
            <MyAccount navigation={this.props.navigation}></MyAccount>
          )}
        </View>

        <TabBottom
          tabArr={this.state.tabArr}
          action={this.tabAction.bind(this)}></TabBottom>
      </View>
    );
  }

  tabAction = (index) => {
    let arr = [];
    const map = this.state.tabArr.map((item, index) => {
      item.isSelect = false;
      arr.push(item);
    });
    arr[index].isSelect = true;
    this.setState({
      tabArr: arr,
      selectedTabTitle: this.state.tabArr[index].tabName,
    });
  };
}
