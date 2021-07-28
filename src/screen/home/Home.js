import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, Platform, Alert, Modal } from 'react-native'
import { color } from 'react-native-reanimated'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import FormTemplateBox from '../../component/FormTemplateBox'
import KeyStore from '../../KeyStore/LocalKeyStore'
import { getRequestApi, getTaxTypes, postRequestMediaApi, checkStatus, get_tax_advisory, submit_tax_advisory, requestPostApiMedia } from '../../WebApi/Index';
import FormHistoryBox from '../../component/FormHistoryBox';

import SubFormHistoryBox from '../../component/SubFormHistory';

import ImagePicker from 'react-native-image-picker';
import Loader from '../../component/Loader';


export default class Home extends Component {

  constructor() {
    super()
    this.state = {
      selectedTab: 0,
      token: '',
      web_id: '',
      formHistoryArr: [],
      subTypeArr: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1,],
      showSubTypeView: false

    }
  }

  async componentDidMount() {
    this.getHideStatus()
    KeyStore.getKey('data', (err, value) => {
      if (value) {
        const { data, token } = JSON.parse(value);
        const { web_id } = data
        this.setState({ web_id, token })

      } else {
      }
    });
  }

  selectTab = (tabIndex) => {
    this.setState({ selectedTab: tabIndex });

    if (tabIndex == '1') {
      this.getFormHistory()
    }
  };

  render() {
    console.warn(`https://admin.makstaxapp.com/api/home-business-form/${this.state.web_id}`);
    return (
      <View style={{ flex: 1, }}>
        <Header navigation={this.props.navigation}
          title="HOME" />
        <View style={{ marginHorizontal: wp(5) }}>

          <View style={{ marginVertical: hp(3), backgroundColor: '', flexDirection: "row", justifyContent: 'space-around' }}>

            <TouchableOpacity onPress={() => this.selectTab(0)} style={{
              borderWidth: 2, borderColor: colors.
                themeColor, paddingVertical: 10, borderRadius: 30, paddingHorizontal: 10,
              backgroundColor: this.state.selectedTab == 0 ? '#D3D3D3' : "#fff"
            }}>

              <Text style={{ fontSize: 16, color: colors.themeColor, letterSpacing: 1 }}>Form Template</Text>

            </TouchableOpacity>


            <TouchableOpacity onPress={() => this.selectTab(1)} style={{
              borderWidth: 2,
              borderColor: colors.themeColor, paddingVertical: 10, borderRadius: 30, paddingHorizontal: 10,
              backgroundColor: this.state.selectedTab == 1 ? '#D3D3D3' : "#fff"
            }}>

              <Text style={{ fontSize: 16, color: colors.themeColor, letterSpacing: 1 }}>Form History</Text>

            </TouchableOpacity>
          </View>

          {
            this.state.selectedTab == 0 ? <View>
              <FormTemplateBox
                title="Income & Expenses Form"
                onPress={() => this.props.navigation.navigate('FillFormDetails', {
                  url: `https://admin.makstaxapp.com/api/manage-form/${this.state.web_id}`
                })}
              />
              <FormTemplateBox
                title="Home Business"
                onPress={() => this.props.navigation.navigate('FillFormDetails', {
                  url: `https://admin.makstaxapp.com/api/home-business-form/${this.state.web_id}`
                })}
              />
            </View>
             :
              <ScrollView style={{ marginBottom: hp(20) }} showsVerticalScrollIndicator={false}>
                {
                  this.state.formHistoryArr.length == 0 ?
                    <Text style={{ fontSize: 20, color: 'gray', 
                    fontWeight: 'bold', position: 'absolute', 
                    alignSelf: 'center', marginTop: 100
                   }}>No Data Found</Text>
                    :
                    this.state.formHistoryArr.map((item, index) =>
                      <FormHistoryBox
                        viewClick={this.viewAction.bind(this)}
                        navigation={this.props.navigation}
                        key={index}
                        addAttachment={this.addAttachment.bind(this)}
                        item={item}>
                      </FormHistoryBox>
                    )
                }

              </ScrollView>
          }
        </View>
        <Loader isLoader={this.state.loading}></Loader>

        <Modal
          visible={this.state.showSubTypeView}
          transparent={true}
          animationType="slide"
          onRequestClose={() => dws = false}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)' }}>

            <View style={{ height: 100, width: '100%', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => this.setState({ showSubTypeView: false, subTypeArr: [] })} style={{
                position: 'absolute',
                bottom: 16, right: 16
              }}>
                <Image style={{ height: 25, width: 25, resizeMode: 'contain', tintColor: 'white' }} source={require('../../assests/images/cancelSimple.png')}></Image>
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
              {
                this.state.subTypeArr.map((item, index) =>
                  <SubFormHistoryBox closeModal={() => this.setState({ showSubTypeView: false })}
                    viewClick={this.viewAction.bind(this)}
                    navigation={this.props.navigation}
                    key={index}
                    addAttachment={this.addAttachment.bind(this)}
                    item={item}>
                  </SubFormHistoryBox>
                )
              }
            </ScrollView>
          </View>
        </Modal>

      </View>
    )
  }

  //Actions
  addAttachment = (postId) => {

    this.captureImage(postId)
  }

  viewAction = (item) => {

    this.getSubTypes(item)
  }

  captureImage(postId) {

    var options = {
      title: 'Select Image',
      mediaType: 'photo',
      maxHeight: 200,
      maxWight: 200,
      quality: 0.8,
      allowsEditing: true,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    //IMAGE PICKER LOGIC

    ImagePicker.showImagePicker(options, response => {

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = response;
        this.uploadAttachment(source, postId)
      }
    });
  }

  async uploadAttachment(source, postId) {

    const formData = new FormData()

    var fileName = Math.floor(Math.random() * 100) + 1;
    formData.append('post_id', postId)
    formData.append("attachment_file", {
      uri: Platform.OS === "android" ? source.uri : source.uri.replace("file://", ""),
      type: source.type,
      name: this.fileNameFromUrl(source.uri)//fileName+'.png',
    })

    this.setState({ loading: true })
    const { responseJson, err } = await requestPostApiMedia(submit_tax_advisory, formData, 'POST', this.state.token)
    this.setState({ loading: false })
    if (err == null) {
      if (responseJson.status) {
        this.getFormHistory()
        //Alert.alert('',responseJson.message)
      } else {
        Alert.alert(responseJson.msg)
      }
    } else {
      Alert.alert('Something went wrong!')
    }
  }

  async getSubTypes(item) {

    this.setState({ loading: true })
    const { responseJson, err } = await getRequestApi(getTaxTypes + '/' + item.monthYear + '/' + item.post_type, {}, this.state.token)
    this.setState({ loading: false })
    if (responseJson.status) {

      this.setState({ subTypeArr: responseJson.data, showSubTypeView: true })
    }
  }

  async getFormHistory() {

    this.setState({ loading: true })
    const { responseJson, err } = await getRequestApi(get_tax_advisory, {}, this.state.token)
    this.setState({ loading: false })

    if (responseJson.status) {
      this.setState({ formHistoryArr: responseJson.data })
    }
  }


  fileNameFromUrl(url) {
    var matches = url.match(/\/([^\/?#]+)[^\/]*$/);
    if (matches.length > 1) {
      return matches[1];
    }
    return null;
  }

  async getHideStatus() {

    const { responseJson, err } = await getRequestApi(checkStatus, {}, this.state.token)

    if (responseJson.status) {
      let message = responseJson.message
      global.showAfterLive = message
    }
  }


}

const styles = StyleSheet.create({})