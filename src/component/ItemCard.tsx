import {Alert, Button, Text, View} from 'react-native';
import Edit from '../../EditFile';
import {styles} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dispatch, SetStateAction} from 'react';
type ItemProps = {
  title: string;
  setTempArray: Dispatch<SetStateAction<never[]>>;
  setEditValues: Dispatch<SetStateAction<never>>;
};

const Item = ({title, setTempArray, setEditValues}: ItemProps) => {
  const removeselectedItem = async () => {
    const deleteItem = await AsyncStorage.getItem('my_key');
    let deleteItem2 = JSON.parse(deleteItem);
    Alert.alert(title, 'Is Deleted');
    var index = deleteItem2.indexOf(title); // we are finding index of array
    if (index > -1) {
      deleteItem2.splice(index, 1);
    }
    await AsyncStorage.setItem('my_key', JSON.stringify(deleteItem2));
    //await getValueFunction();
    setTempArray(deleteItem2);
  };

  return (
    <View style={styles.item}>
      <Text style={{color: 'white', width: 'auto', fontWeight: 'bold'}}>
        {title}
      </Text>
      <View
        style={{
          backgroundColor: 'darkgoldenrod',
          width: 100,
          borderRadius: 12,
          margin: 10,
          alignSelf: 'flex-end',
          borderColor: 'red',
        }}>
        <Button onPress={() => setEditValues(title)} title="Edit"></Button>
      </View>
      <View
        style={{
          backgroundColor: 'darkgoldenrod',
          width: 100,
          alignSelf: 'flex-end',
          borderRadius: 12,
          margin: 10,
        }}>
        <Button onPress={() => removeselectedItem()} title="Delete"></Button>
      </View>
    </View>
  );
};
export default Item;
