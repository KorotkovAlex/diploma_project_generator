import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import Auth from './auth';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Home from './home/index';
import Services from './services/index';

// const configFilev = require('../../config.json');
// console.log('configFilev', configFilev);
// const parsedConfigFile = configFilev;

const genNavigation = config => {
  const parsedConfigFile = config;
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

  return AppNavigator;
};

export default class AppNavig extends React.Component {
  state = {
    isGettingConfig: true,
    config: {},
  };

  AppContainer = null;

  _generateNavigation = () => {
    const AppNavigator = genNavigation(this.state.config);
    const Nav = createAppContainer(AppNavigator);
    return <Nav />;
  };
  async componentDidMount() {
    const result = await fetch('http://192.168.1.65:3000/config', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const config = await result.json();

    console.log('config', config);
    this.setState({
      config,
      isGettingConfig: false,
    });
  }
  render() {
    if (this.state.isGettingConfig) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return this._generateNavigation();
  }
}
