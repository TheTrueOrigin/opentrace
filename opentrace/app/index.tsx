import * as React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function HomeScreen() {
  const [inputName, setInputName] = React.useState('');  // state to hold input text
  const [productName, setproductName] = React.useState("");
  const [productHerkunft, setproductHerkunft] = React.useState("");
  const handleClickName = async () => {
    try {
      const response = await fetch(`http://192.168.0.101:8000/produkt/name/${inputName}`);
      const data = await response.json();
      setproductName(JSON.stringify(data[0]["Name"]));
      setproductHerkunft(JSON.stringify(data[0]["Herstellungsort"]))
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'start', paddingTop: 30, backgroundColor: "orange", fontFamily: "proximanova_black", fontSize: 30}}>
      <TextInput
        style={{
          height: 60,
          marginBottom: 20,
          width: '80%',
          backgroundColor: "red",
          fontFamily: "proximanova_black",
          fontSize: 20,
          padding: 8,
        }}
        placeholder="Enter name"
        placeholderTextColor="black"
        value={inputName}
        onChangeText={setInputName}
      />
      <Button title="Fetch Data" onPress={handleClickName} />
      
      {/* Display the JSON response in another TextInput */}
      <View style={{width: "80%"}}>
        <Text style={{fontSize: 20}}>Name: {productName}</Text>
        <Text style={{fontSize: 20}}>Herkunft: {productHerkunft}</Text>
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;
