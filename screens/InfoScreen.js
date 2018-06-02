import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#777676',
    marginBottom: 10,
  },
  ground: {
    width: '100%',
    height: 20,
    marginTop: 12,
    marginBottom: 12,
    backgroundColor: '#cecece',
  },

});

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitleText}>
            JIWON TO DO
          </Text>
        </View>
        <ScrollView contentContainerStyle={styles.center}>
          <Image
            style={{ width: 200, height: 200, marginBottom: 20, marginTop: 20 }}
            source={require('../assets/images/profile-image.jpg')} // eslint-disable-line global-require
          />
          <Text style={styles.infoText}>
              정지원
          </Text>
          <Text style={styles.infoText}>
              충남대학교 언론정보학과
          </Text>
          <Text style={styles.infoText}>
              201500434
          </Text>

          <View style={styles.ground} />

          <Text style={styles.infoText}>
                2018-1학기
          </Text>
          <Text style={styles.infoText}>
                컴퓨터 커뮤니케이션 김재영 교수님
          </Text>
          <Text style={styles.infoText}>
                개인과제 프로젝트
          </Text>
        </ScrollView>
      </View>
    );
  }
}
