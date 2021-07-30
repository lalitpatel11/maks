import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, Image, TextInput, TouchableOpacity, ImageBackground, Alert, Linking } from 'react-native'
import Header from '../../component/Header'
import colors from '../../utility/colors'
import { hp, wp } from '../../utility/size'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import KeyStore from '../../KeyStore/LocalKeyStore'
import { getRequestApi, get_profile } from '../../WebApi/Index'
export default class MyAccount extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            note: '',
            attachment: '',
            loading: false,
            token: '',
            uploadPicker: '',
            data: '',
            profile_pic: '',
            email: '',
            name: '',
            token: ''
        }
    }

    async getProfile() {

        const body = {}
        const token = this.state.token
        this.setState({ loading: true })
        const { responseJson, err } = await getRequestApi(get_profile, body, token)
        this.setState({ loading: false })
        if (responseJson.status) {
            const { name, email, profile_pic } = responseJson.data
            this.setState({ name, email, profile_pic })

        }
    }

    async componentDidMount() {

    }

    async componentWillMount() {
        KeyStore.getKey('data', (err, value) => {
            if (value) {
                const { token, data } = JSON.parse(value);
                this.setState({ data, token })
                this.getProfile()
            } else {
            }
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    title="My Account"
                    navigation={this.props.navigation}
                />


                <ScrollView showsVerticalScrollIndicator={false} style={{ marginHorizontal: wp(5), marginVertical: hp(2), }}>


                    <View style={{ backgroundColor: "#fff", justifyContent: "center", alignItems: "center", paddingVertical: hp(2), borderRadius: 10 }}>
                        <View style={{ backgroundColor: colors.themeColor, height: wp(27), width: wp(27), borderRadius: 200, borderWidth: 2, justifyContent: "center", alignItems: 'center', borderColor: colors.themeColor }}>
                            <Image
                                source={{ uri: this.state.profile_pic ? this.state.profile_pic : "https://www.mightyplace.com/Images/Common/profile.jpg" }}
                                style={{ height: wp(25), width: wp(25), borderRadius: 200 }}
                            />
                        </View>
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 16, textAlign: 'center', marginTop: hp(2) }}>{this.state.name}</Text>
                            <Text style={{ fontWeight: '500', fontSize: 14, textAlign: 'center' }}>{this.state.email}</Text>
                        </View>
                    </View>



                    <TouchableOptions
                        iconName="user"
                        title="My Profile"
                        onClick={() => this.props.navigation.navigate('Profile')}
                    />

                    {

                        global.showAfterLive == '2' ?
                            <TouchableOptions
                                iconName="credit"
                                title="Subscriptions"
                                onClick={() => this.props.navigation.navigate('Subscriptions', { isFromAccount: true,flag:0 })}
                            />
                            : null

                    }

                    {/* <TouchableOptions
iconName="mail"
title="Contact Us"
onClick={()=>console.warn("hey")}
/> */}



                    <TouchableOptions
                        iconName="lock"
                        title="Change Password"
                        onClick={() => this.props.navigation.navigate('ChangePassword')}
                    />

                    <TouchableOptions
                        iconName="folder"
                        title="Support Document"
                        onClick={() =>

                            this.props.navigation.navigate('SupportDoc')

                        }
                    />


                    <TouchableOptions
                        iconName="creative-commons-share"
                        title="Terms & Conditions"
                        onClick={() => {
                            Linking.canOpenURL('https://admin.makstaxapp.com/term-and-conditions').then(supported => {
                                if (supported) {
                                    Linking.openURL('https://admin.makstaxapp.com/term-and-conditions');
                                }
                            });

                        }
                        }
                    />



                    <TouchableOptions
                        iconName="creative-commons-share"
                        title="Privacy Policy"
                        onClick={() => {
                            Linking.canOpenURL('https://admin.makstaxapp.com/privacy-policy').then(supported => {
                                if (supported) {
                                    Linking.openURL('https://admin.makstaxapp.com/privacy-policy');
                                }
                            });

                        }}
                    />

                    <TouchableOptions
                        iconName="log-out"
                        title="Log Out"
                        onClick={() => Alert.alert('', 'Are you sure want to log out ?', [
                            {
                                text: 'YES',
                                onPress: () => {
                                    KeyStore.setKey('data', null)
                                    KeyStore.getKey('data', (err, value) => {
                                        if (value) {
                                            const { token, data } = JSON.parse(value);


                                        } else {
                                            this.props.navigation.navigate('SignInUp')
                                        }
                                    });
                                }
                            },
                            {
                                text: 'NO',

                            }
                        ])}
                    />




                </ScrollView>










            </View>
        )
    }
}

const styles = StyleSheet.create({})



class TouchableOptions extends Component {
    render() {
        return <TouchableOpacity onPress={this.props.onClick} style={{ flexDirection: "row", backgroundColor: "#fff", elevation: 1, marginVertical: hp(2), borderRadius: 10, paddingVertical: hp(2), alignItems: "center", marginBottom: 0 }}>
            <View style={{ flex: 2, backgroundColor: "", alignItems: "center", borderRadius: 10 }}>

                <Entypo
                    name={this.props.iconName}
                    size={25}
                    color="#000"
                />

            </View>
            <View style={{ flex: 10, backgroundColor: "", justifyContent: "center" }}>
                <Text style={{ fontSize: 17, fontWeight: "bold", color: '#697478' }}>{this.props.title}</Text>
            </View>
            <View style={{ flex: 2, backgroundColor: "", justifyContent: "center", alignItems: "center", borderRadius: 10 }}>

                <Feather
                    name="arrow-right"
                    size={30}
                    color="#000"
                />

            </View>
        </TouchableOpacity>
    }
}

