import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from 'react-navigation';
import {red, purple, white} from '../utils/colors'
class AddCardScreen extends React.Component {
  render(){
  return (
    <ScrollView style={styles.container}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <ExpoLinksView />
      <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.props.navigation.navigate('Deck')}>
        <Text style={styles.submitBtnText}>Deck</Text>
    </TouchableOpacity>
    </ScrollView>
  );
}}

AddDeckScreen.navigationOptions = {
  title: 'AddDeck',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },iosSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: purple,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});


export default withNavigation(AddCardScreen);