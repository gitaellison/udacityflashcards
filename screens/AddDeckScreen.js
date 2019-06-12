import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, Platform, TextInput} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from 'react-navigation';
import {red, purple, white} from '../utils/colors'
import {connect} from "react-redux"
import {addDeck} from "../actions"
import {validateInput} from "../utils/helpers"

class AddDeckScreen extends React.Component {
      state = {
        title: ""
    }

  submit(){
    const deckTitle = this.state.title

    if(!validateInput(deckTitle)){
      return;
    }

        this.props.dispatch(addDeck(this.state.title))
        this.setState(() =>({
            title: ""
        }))
        this.props.navigation.navigate(
          "Deck",
          { title: deckTitle }
      )
    }
  render(){
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      {/**
       * Go ahead and delete ExpoLinksView and replace it with your content;
       * we just wanted to provide you with some helpful links.
       */}
      <TextInput style={styles.inputField} placeholder= 'Title' onChangeText={(title) => this.setState({title})} 
                value={this.state.title}>
                    </TextInput>
                    <Text/>
      <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.submit()}>
        <Text style={styles.submitBtnText}>Add Deck</Text>
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

export default connect()(withNavigation(AddDeckScreen));
