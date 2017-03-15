import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {checkPermission, requestPermission} from 'react-native-android-permissions';

import {
  StackNavigator,
} from 'react-navigation';

import Profile from './Profile';
const BasicApp = StackNavigator({
  Profile: {screen: Profile},
});

export default class Example extends Component {
  checkPerm = () => {
    requestPermission("android.permission.ACCESS_FINE_LOCATION").then((result) => {
        console.log("Granted!", result);
        // now you can set the listenner to watch the user geo location
        // do navigation to Profile screen for example
      }, (result) => {
        console.log("Not Granted!");
        console.log(result);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={ () => this.checkPerm() }
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
