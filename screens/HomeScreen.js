import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Modal,
  TextInput,
  AsyncStorage,
  Alert,
} from 'react-native';

import Lodash from 'lodash';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toDoListItem: {
    padding: 20,
  },
  toDoListItemText: {
    fontSize: 20,
  },
  completedToDoListItemText: {
    fontSize: 20,
    textDecorationLine: 'line-through',
    color: '#edeaec',
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
    borderRadius: 62 / 2,
  },
  plusFont: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  modalView: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    // height: 250,
    width: 350,
  },
  okButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1,
    flex: 1,
  },
  okText: {
    fontSize: 20,
  },
  buttonView: {
    flexDirection: 'row',
  },
  modalTitle: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  modalTitleView: {
    backgroundColor: '#f2e3f7',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    margin: 10,
  },
});

const sentenceList = [
  '오늘도 화이팅!',
  '꿈에 한발짝 더!',
  '수고했어!',
  '우리가 노력 없이 얻는 거의 유일한 것은 노년이다',
  '인생에서 원하는 것을 얻기 위한 첫 번째 단계는 내가 무엇을 원하는지 결정하는 것이다.',
  '많이 보고 많이 겪고 많이 공부하는 것은 배움의 세 기둥이다.',
  '당신의 행복은 무엇이 당신의 영혼을 노래하게 하는가에 따라 결정된다',
  '기운과 끈기는 모든 것을 이겨낸다.',
  '운명은 우연이 아닌, 선택이다. 기다리는 것이 아니라, 성취하는 것이다.',
  '여가시간을 가지려면 시간을 잘 써라.',
  '인간의 삶 전체는 단지 한 순간에 불과하다. 인생을 즐기자.',
  '경험을 현명하게 사용한다면, 어떤 일도 시간 낭비는 아니다.',
];

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    modalVisible: false,
    text: '',
    toDoList: [],
  };

  componentDidMount() {
    this.loadToDoList();
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  loadToDoList = () =>
    AsyncStorage.getItem('@MySuperStore:toDoList')
      .then((toDoListJSonString) => {
        const toDoList = (toDoListJSonString !== null)
          ? JSON.parse(toDoListJSonString)
          : [];
        this.setState({ toDoList });
      });

  addToDoList = (toDoText) => {
    const newToDoList = this.state.toDoList.concat([{ description: toDoText, completed: false }]);
    return AsyncStorage.setItem('@MySuperStore:toDoList', JSON.stringify(newToDoList))
      .then(() => this.loadToDoList());
  }

  completeToDo = (index) => {
    const newToDoList = this.state.toDoList.concat();
    newToDoList[index].completed = true;
    AsyncStorage.setItem('@MySuperStore:toDoList', JSON.stringify(newToDoList))
      .then(() => this.loadToDoList());
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
          data={this.state.toDoList}
          renderItem={
            ({ item, index }) => (
              <TouchableOpacity
                style={styles.toDoListItem}
                onPress={() => {
                  Alert.alert(
                    '오늘의 한마디',
                    Lodash.sample(sentenceList),
                    [
                      { text: 'OK', onPress: () => this.completeToDo(index) },
                    ],
                  );
                }}
              >
                <Text style={
                  (item.completed === true)
                    ? styles.completedToDoListItemText : styles.toDoListItemText
                  }
                >
                  {item.description}
                </Text>
              </TouchableOpacity>
            )
          }
          keyExtractor={(item, index) => `${item.description}/${index}`}
        />

        <TouchableOpacity
          style={styles.plus}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.plusFont}>
            +
          </Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
        >
          <View style={styles.modalView}>
            <View style={styles.modal}>
              <View style={styles.modalTitleView}>
                <Text style={styles.modalTitle}>
                할 일 추가
                </Text>
              </View>
              <TextInput
                style={styles.textInput}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />
              <View style={styles.buttonView}>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    this.addToDoList(this.state.text);
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.okText}>
                    확인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.okButton}
                  onPress={() => {
                    this.setModalVisible(!this.state.modalVisible);
                  }}
                >
                  <Text style={styles.okText}>
                    취소
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

