import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { checkPermission, requestPermission } from 'react-native-android-permissions';

import {
  StackNavigator,
} from 'react-navigation';

import Profile from './Profile';
const BasicApp = StackNavigator({
  Profile: {screen: Profile},
});

export default class Example extends Component {

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          console.log('POSTION', position);
          // this.props.navigation.navigate('Profile')
        }
      },
      (error) => {
        console.log('ERROR', error);
        if (error.code === 1) {
          console.log('ERROR INSIDE', error);
        }
      },
      {enableHighAccuracy: true }
    )
  }

  checkPerm = () => {
    requestPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
        console.log("Granted!", result);
        if (result.code === 'ALL_GRANTED') {
          this.getPosition();
        }
      }, (result) => {
        console.log("Not Granted!");
        console.log(result);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => Platform.OS === 'android' ? this.checkPerm() : this.getPosition() }
        >
          <Text>Check Perm</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
