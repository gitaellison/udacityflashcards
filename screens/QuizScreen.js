import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text, Platform, TextInput, View} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { withNavigation } from 'react-navigation';
import {red, purple, white} from '../utils/colors'
import {connect} from "react-redux"

class QuizScreen extends React.Component {
  state = {
    correctAnswer:0, 
    questionNumber:0, 
    showAnswer:false, 
    lastQuestion: true
  }

  showAnswer(question){
    if(this.state.showAnswer){
      return(
        <View><Text style={{fontSize:32}}>{question.answer}</Text>
        {this.correct()}
        {this.incorrect()}
        </View>
      )
    }
  }

  correct(){
    return(<TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.setState(() => ({questionNumber: this.state.questionNumber+1, 
      showAnswer: false, correctAnswer: this.state.correctAnswer+1}))}>
        <Text style={styles.submitBtnText}>Correct</Text>
    </TouchableOpacity>)
  }

  incorrect(){
    return(<TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.setState(() => ({questionNumber: this.state.questionNumber+1, 
      showAnswer:false}))}>
        <Text style={styles.submitBtnText}>incorrect</Text>
    </TouchableOpacity>)
  }

  restartQuiz(){
    return (<TouchableOpacity
      style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
      onPress={() => this.setState(() => ({questionNumber:0, correctAnswer:0}))}>
        <Text style={styles.submitBtnText}>Restart Quiz</Text>
    </TouchableOpacity>)
  }

  backToDeck(deck){
      return (<TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={() => this.props.navigation.navigate(
              "Deck",
              { title: deck.title }
             )}>
              <Text style={styles.submitBtnText}>Back to Deck</Text>
          </TouchableOpacity>)
  }
  render(){
    debugger;
    const deck = this.props.data[this.props.navigation.state.params.title.title]
    const questions = deck.questions;
    if(questions.length == 0){
      return(
        <ScrollView style={styles.container} contentContainerStyle={styles.center}>
        <Text style={{fontSize:64}}>You have no questions</Text>
        {this.backToDeck(deck)}
        </ScrollView>
        );
    }
    const questionsRemaining = questions.length - this.state.questionNumber;
    const endOfQuiz = questionsRemaining === 0; 
    if(endOfQuiz){
      return(
        <ScrollView style={styles.container} contentContainerStyle={styles.center}>
        <Text style={{fontSize:24}}>Score: {this.state.correctAnswer}</Text>
        {this.backToDeck(deck)}
        {this.restartQuiz()}
        </ScrollView>
      )
    }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.center}>
      <Text style={{fontSize:64}}>Question: {questions[this.state.questionNumber].question}</Text>
      {this.showAnswer(questions[this.state.questionNumber])}
      <Text/>
      <TouchableOpacity
            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
            onPress={() => this.setState(() => ({showAnswer:true}))}>
              <Text style={styles.submitBtnText}>Show Answer</Text>
      </TouchableOpacity>
      <Text/>
      <Text style={{fontSize:20}}>Questions remaining: {questionsRemaining -1}</Text>
    </ScrollView>
  );
}}

QuizScreen.navigationOptions = {
  title: 'Quiz',
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

const mapStateToProps = state => {
  return {
      data: state
  }
}

export default connect(mapStateToProps)(withNavigation(QuizScreen));