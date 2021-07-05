import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from '../screen/auth/Splash';
import SignInUp from '../screen/auth/SignInUp';
import SignUp from '../screen/auth/SignUp';
import SignUp2 from '../screen/auth/SignUp2';
import SignIn from '../screen/auth/SignIn';

import WelcomeFirst from '../screen/auth/WelcomeFirst';
import WelcomeSecond from '../screen/auth/WelcomeSecond';
import WelcomeThird from '../screen/auth/WelcomeThird';
import WelcomeFourth from '../screen/auth/WelcomeFourth';
import TabBar from '../screen/home/tabBar';
import UploadAttachmentFile from '../screen/home/UploadAttachmentFile';
import ViewForms from '../screen/home/ViewForms';
import FillFormDetails from '../screen/home/FillFormDetails';

import Subscriptions from '../screen/home/Subscriptions';
import AttachmentResponseList from '../screen/home/AttachmentResponseList';
import AttachmentResponse from '../screen/home/AttachmentResponse';
import Profile from '../screen/home/Profile';
import Header from '../component/Header';
import ChangePassword from '../screen/home/ChangePassword';
import PaymentWebView from '../screen/home/PaymentWebView';
import ForgotPassword from '../screen/auth/ForgotPassword';
import ResetPassword from '../screen/auth/ResetPassword';
import SupportDoc from '../screen/home/SupportDoc';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator  headerMode="none" initialRouteName="Splash" screenOptions={{gestureEnabled: false}}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignInUp" component={SignInUp} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUp2" component={SignUp2} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />

        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="WelcomeFirst" component={WelcomeFirst} />
        <Stack.Screen name="WelcomeSecond" component={WelcomeSecond} />
        <Stack.Screen name="WelcomeThird" component={WelcomeThird} />
        <Stack.Screen name="WelcomeFourth" component={WelcomeFourth} />
        <Stack.Screen name="TabBar" component={TabBar} />
        <Stack.Screen name="Header" component={Header} />
        <Stack.Screen
          name="UploadAttachmentFile"
          component={UploadAttachmentFile}
        />
        <Stack.Screen name="ViewForms" component={ViewForms} />
        <Stack.Screen name="FillFormDetails" component={FillFormDetails} />
        <Stack.Screen
          name="AttachmentResponseList"
          component={AttachmentResponseList}
        />
        <Stack.Screen name="Subscriptions" component={Subscriptions}  />

        <Stack.Screen
          name="AttachmentResponse"
          component={AttachmentResponse}
        />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="PaymentWebView" component={PaymentWebView} />
        <Stack.Screen name="SupportDoc" component={SupportDoc} />

        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
