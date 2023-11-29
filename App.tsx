import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Button,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNPickerSelect from 'react-native-picker-select';
import Edit from './EditFile';
import Item from './src/component/ItemCard';

export default function App() {
  // To get the value from the TextInput
  const [textInputValue, setTextInputValue] = useState('');
  // To set the value on Text
  const [getValue, setGetValue] = useState('');
  const [tempArray, setTempArray] = useState([]);
  const [editValues, setEditValues] = useState<string>('');
  const saveValueFunction = async () => {
    var AsyncArrayStr = await AsyncStorage.getItem('my_key');
    var AsyncArray = !!AsyncArrayStr ? await JSON.parse(AsyncArrayStr) : [];
    if (textInputValue) {
      AsyncArray.push(textInputValue);
      await AsyncStorage.setItem('my_key', JSON.stringify(AsyncArray));
      Alert.alert('Data Saved');
      setTextInputValue('');
    } else {
      Alert.alert('Please fill data');
    }
    setTempArray(AsyncArray);
  };

  const getValueFunction = async () => {
    await AsyncStorage.getItem('my_key').then(value => {
      let StoreValue = JSON.parse(value);
      setTempArray(StoreValue);
    });
  };

  useEffect(() => {
    getValueFunction();
  }, []);

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('my_key');
      getValueFunction();
      Alert.alert('All Data Cleared');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.titleText}>AsyncStorage to Store Data</Text>
          <TextInput
            placeholder="Enter Your Text here"
            id="inputText"
            value={textInputValue}
            onChangeText={data => setTextInputValue(data)}
            keyboardType="default"
            style={styles.textInputStyle}
          />
          <View style={{alignSelf: 'center', padding: 20, height: 50}}>
            <RNPickerSelect
              onValueChange={value => console.log(value)}
              items={[
                {label: 'Surat', value: 'Surat'},
                {label: 'Vadodra', value: 'Vadodra'},
                {label: 'Ahemdabad', value: 'Ahemdabad'},
                {label: 'Mumbai', value: 'Mumbai'},
                {label: 'Valsad', value: 'Valsad'},
                {label: 'Vapi', value: 'Vapi'},
                {label: 'Bharuch', value: 'Bharuch'},
              ]}
            />
          </View>
          <TouchableOpacity
            onPress={saveValueFunction}
            style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}> Save Data </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={removeData} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}> Delete All </Text>
          </TouchableOpacity>
          <FlatList
            data={tempArray}
            renderItem={({item}) => (
              <Item
                title={item}
                setTempArray={setTempArray}
                setEditValues={setEditValues}
              />
            )}
            keyExtractor={item => item}
            style={{height: 30, backgroundColor: 'white', paddingTop: 20}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <Edit
        editValues={editValues}
        setEditValues={setEditValues}
        setTempArray={setTempArray}
      />
    </>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  item: {
    backgroundColor: 'burlywood',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 12,
    height: 150,
    width: 350,
    fontFamily: 'times new roman',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 15,
    fontFamily: 'times new roman',
  },
  textStyle: {
    padding: 10,
    textAlign: 'center',
    fontFamily: 'times new roman',
    fontSize: 20,
    alignSelf: 'center',
  },
  buttonStyle: {
    fontSize: 16,
    color: 'white',
    backgroundColor: 'green',
    padding: 5,
    marginTop: 20,
    minWidth: 200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  buttonTextStyle: {
    padding: 5,
    color: 'white',
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    height: 40,
    width: '50%',
    fontWeight: 'bold',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 36,
    alignSelf: 'center',
    fontFamily: 'times new roman',
  },
});

export default App;
