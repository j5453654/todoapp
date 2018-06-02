import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import { FlatList } from 'react-native-gesture-handler';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  loadToDoList() {
    const toDoList = [
      {
        description:"eat",
        completed:false,
      },
      {
        description:"과제",
        completed:true,
      },
      {
        description:"공부",
        completed:false,
      },
      {
        description:"컴퓨터커뮤니케이션",
        completed:true,
      },
      {
        description:"201500434",
        completed:true,
      },
    ];
    
    return toDoList;
  }

  render() {
    return (
      <View style={styles.container}>
    
        <View style={styles.header}>
          <Text style={styles.headerTitleText}>
            JIWON TO DO
          </Text>
        </View>
        
        <FlatList
          data={this.loadToDoList()}
          renderItem={
            ({item}) =>
              <View style={styles.toDoListItem}>
                <Text style={styles.toDoListItemText}>
                  {item.description}
                </Text>
              </View>
          }
        />
        
        <TouchableOpacity style={styles.plus}>
          <Text style={styles.plusFont}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  toDoListItem: {
    padding: 20,
  },
  toDoListItemText: {
    fontSize: 20,  
  },
  header: {
    height: 62,
    backgroundColor: '#e1a7f9',
    paddingTop: 12,
    justifyContent: 'center',    
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  plus: {
    position: 'absolute', 
    bottom: 20,
    right: 20,
    backgroundColor: '#f2e3f7',
    height: 62,
    width: 62,
    justifyContent: 'center',    
    alignItems: 'center',
    borderRadius: 62/2,
  },
  plusFont: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
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
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
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
  welcomeView: {
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});
