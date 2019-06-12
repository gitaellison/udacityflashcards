import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList
} from 'react-native';
import {setLocalNotification} from '../utils/helpers'
import { MonoText } from '../components/StyledText';
import {red} from '../utils/colors'
import { connect } from "react-redux"
import { withNavigation } from 'react-navigation';

class HomeScreen extends React.Component {
  componentDidMount(){
    setLocalNotification()
  }

  render(){
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={
              __DEV__
                ? require('../assets/images/robot-dev.png')
                : require('../assets/images/robot-prod.png')
                
            }
            style={styles.welcomeImage}
          />

          <Text style={{fontSize:48, alignContent:"center"}}>Decks:</Text>
                          <FlatList keyExtractor={(item, index) => item}
                              data={Object.keys(this.props.data)}
                              renderItem={({ item }) => (
                                  <TouchableOpacity onPress={() => this.props.navigation.navigate(
                                      "Deck",
                                      { title: item }
                                  )}>
                                      <View key={item}>
                                          <Text key={`${item}BigText`} style={styles.bigText}>{item}</Text>
                                          <Text key={`${item}SmallText`} style={styles.smallText}>{this.props.data[item].questions.length} cards</Text> 
                                      </View>
                                  </TouchableOpacity>
                              )}
                          />
                  </View>

 
      </ScrollView>
    </View>
  );
}}

HomeScreen.navigationOptions = {
  header: null,
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderColor: red,
    borderRadius: 4,
    borderWidth:4,

  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 4,
    right: 4,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  bigText: {
    fontSize: 25,
    alignItems: "center"

},
smallText: {
    fontSize: 20
}
});

const mapStateToProps = state => {
  return {
      data: state
  }
}

export default connect(mapStateToProps)(withNavigation(HomeScreen));
