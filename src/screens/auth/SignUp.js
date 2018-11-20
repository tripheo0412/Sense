import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TextInput} from 'react-native';

export default class SignUp extends Component <{}> {
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

  // rest of code
}
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
