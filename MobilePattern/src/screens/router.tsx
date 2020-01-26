import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Auth from './auth';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './home/index';
import Services from './services/index';

const configFilev = require('../../config.json');
console.log('configFilev', configFilev);
const parsedConfigFile = configFilev;

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: Auth,
  },
});

const CustomDrawerContentComponent = props => (
  <ScrollView>
    <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

let MyDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: Home,
    },
    Services: {
      screen: Services,
    },
  },
  {
    contentComponent: CustomDrawerContentComponent,
    drawerBackgroundColor: 'rgba(255,255,255,.9)',
    overlayColor: 'rgba(0,0,0,0.5)',
    drawerLockMode: 'unlocked',
    contentOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#6b52ae',
    },
  },
);

if (parsedConfigFile.kindOfNavigation === 'bottom') {
  MyDrawerNavigator = createBottomTabNavigator({
    Home: {
      screen: Home,
    },
    Services: {
      screen: Services,
    },
  });
}

const AppNavigator = createStackNavigator({
  MyDrawerNavigator,
  AuthNavigator,
});

export default createAppContainer(AppNavigator);
