import {
  Modal,
  TextInput,
  View,
  SafeAreaView,
  Button,
  Text,
  Alert,
} from 'react-native';
import {styles} from './App';
import {Dispatch, SetStateAction, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
type ItemProps = {
  editValues: string;
  setTempArray: Dispatch<SetStateAction<never[]>>;
  setEditValues: Dispatch<SetStateAction<string>>;
};

const Edit = ({editValues, setEditValues, setTempArray}: ItemProps) => {
  const [textVal, setTextVal] = useState(editValues);
  console.log({textVal, editValues});

  useEffect(() => {
    console.log('running', {editValues});
    setTextVal(editValues);
  }, [editValues]);

  const editData = async () => {
    try {
      const EditItem = await AsyncStorage.getItem('my_key');
      let EditItem2 = JSON.parse(EditItem);
      var index = EditItem2.indexOf(editValues); // we are finding index of array
      EditItem2[index] = textVal;
      await AsyncStorage.setItem('my_key', JSON.stringify(EditItem2));
      Alert.alert('Data Item Updated');
      setTempArray(EditItem2);
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <View>
      <Modal transparent={false} visible={!!editValues}>
        <SafeAreaView>
          <TextInput
            placeholder="Enter Your Text here"
            id="inputText"
            value={textVal}
            onChangeText={data => setTextVal(data)}
            keyboardType="default"
            style={[
              styles.textInputStyle,
              {
                borderRadius: 0,
              },
            ]}
          />
          <Button onPress={() => editData(editValues)} title="Save" />
          <Button onPress={() => setEditValues('')} title="Cancel" />
        </SafeAreaView>
      </Modal>
    </View>
  );
};
export default Edit;
