import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { withNavigation } from 'react-navigation';
import { ScrollView, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {red, white, purple} from '../utils/colors'
import { Platform } from 'react-native';
import {connect} from "react-redux"

class DeckScreen extends React.Component {
  render(){
    const deck = this.props.data[this.props.navigation.state.params.title]

  return (

    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
     <Text style={{fontSize: 64}}>{deck.title}</Text>
     <Text style={{fontSize: 32}}>{deck.questions === undefined ? "0" : deck.questions.length} cards</Text>
    <Text/>

    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.props.navigation.navigate(
          "Card",
          { title: deck }
      )}>
        <Text style={styles.submitBtnText}>AddCard</Text>
    </TouchableOpacity>
    <Text/>
    <TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.props.navigation.navigate('Quiz', 
      { title: deck }
      )}>
        <Text style={styles.submitBtnText}>StartQuiz</Text>
    </TouchableOpacity>
    <Text/>
    </ScrollView>
  );
}}

DeckScreen.navigationOptions = {
  title: 'Deck',
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

const mapStateToProps = state => {
  return {
      data: state
  }
}

export default connect(mapStateToProps)(withNavigation(DeckScreen));
