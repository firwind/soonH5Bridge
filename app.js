import React, {Component} from 'react';
import {Platform, ScrollView, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {List} from 'antd-mobile';
import * as WeChat from 'react-native-wechat';
import Router from './router';

export default class App extends Component {
  
  render() {
    return (
      <Router />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
