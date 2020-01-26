import React from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Auth from './auth';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './home/index';
import Services from './services/index';

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: Auth,
  },
});

const TabScreens = createBottomTabNavigator({
  Home: {
    screen: Home,
  },
  Services: {
    screen: Services,
  },
});

const AppNavigator = createStackNavigator({
  TabScreens,
  AuthNavigator,
});

export default createAppContainer(AppNavigator);
