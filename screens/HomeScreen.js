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
} from 'react-native';

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
                onPress={() => { this.completeToDo(index); }}
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

