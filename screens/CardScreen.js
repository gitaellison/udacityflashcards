import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, Platform, TextInput } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from 'react-navigation';
import { purple, white } from '../utils/colors'
import {addCard} from "../actions"
import {connect} from "react-redux"
import {validateInput} from "../utils/helpers"
class CardScreen extends React.Component {
    state = {
      question: "",
      answer: ""
  }

  submit(){
      const card = {
          question: this.state.question,
          answer: this.state.answer
      }
      if(!validateInput(card.question) || !validateInput(card.answer)){
        return
      }

      this.props.dispatch(addCard(this.props.navigation.state.params.title, card))

      this.setState(() => ({
          question: "",
          answer: ""
      }))

      this.props.navigation.navigate('Deck');
  }

  render(){
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <TextInput style={styles.inputField} placeholder= 'Question' 
      onChangeText={(question) => this.setState({ question })}
                        value={this.state.question}>
          </TextInput>
          <TextInput style={styles.inputField} placeholder= 'Answer' 
          onChangeText={(answer) => this.setState({ answer })}
              value={this.state.answer}>
          </TextInput>
      <Text/>
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.submit()}>
        <Text style={styles.submitBtnText}>SUBMIT</Text>
    </TouchableOpacity>
    </ScrollView>
  );
}}

CardScreen.navigationOptions = {
  title: 'Add Question',
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
  inputField: {
    borderColor: "#000000",
    borderRadius: 4,
    borderWidth: 0.5,
    height: 45,
    width: 300,
    alignItems:"center",
    fontSize: 20
},
});

export default connect()(withNavigation(CardScreen));