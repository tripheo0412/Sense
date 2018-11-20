/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';
import Amplify, { Auth } from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class SignInScreen extends React.Component {
  signIn() { // 1
    Auth.signIn('myCoolUsername', 'MyCoolP@ssword2!')
      .then(user => {
        console.warn(user)
      })
      .catch(err => {
        console.log('error signing in: ', err)
      })
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Sign In</Text>
        <Button title='Sign In' onPress={this.signIn())} />
      </View>
    );
  }
}

class SignUpScreen extends React.Component {
  state = { // 1
    authCode: ''
  }
  onChangeText(authCode) { // 2
    this.setState({ authCode })
  }
  signUp() {
    Auth.signUp({ // 3
      username: 'myCoolUsername',
      password: 'MyCoolP@ssword2!',
      attributes: {
        phone_number: '+15555555555',
        email: 'tripheo0412@gmail.com'
      }
    })
    .then(res => {
      console.log('successful signup: ', res)
    })
    .catch(err => {
      console.log('error signing up: ', err)
    })
  }
  confirmUser() { // 4
    const { authCode } = this.state
    Auth.confirmSignUp('myCoolUsername', authCode)
      .then(res => {
        console.log('successful confirmation: ', res)
        Auth.currentAuthenticatedUser().then(res => console.warn(res))
      })
      .catch(err => {
        console.log('error confirming user: ', err)
      })
  }
  render() {
  return (
      <View style={styles.container}>
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
        <TextInput
          placeholder='Input Code'
          onChangeText={value => this.onChangeText(value)}
          style={styles.input}
        />
        <Button
          title='Confirm User'
          onPress={this.confirmUser.bind(this)}
        />
      </View>
    )
  }
}

const TabNavigator = createBottomTabNavigator({
  SignIn: { screen: SignInScreen },
  SignUp: { screen: SignUpScreen },
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: '#ededed',
    marginVertical: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  }
})
