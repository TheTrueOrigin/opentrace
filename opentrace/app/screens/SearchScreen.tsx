import React, {useState} from 'react';
import { ScrollView, View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

function ProductListing({ navigation, data }) {
  let name = data["Name"];
  let companyName = data["Unternehmen"]["Name"];
  let herstellungsort = data["Herstellungsort"];
  let url = `https://raw.githubusercontent.com/TheTrueOrigin/opentrace-database/refs/heads/main/Medien/${name.replace(/\s+/g, '_').toLowerCase()}.jpg`
  return(
    <>
    <TouchableOpacity style={styles.productListingChildrenContainer} onPress={() => {navigation.navigate('Info', {data: data})}}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: url}} // Path to the image file
          style={styles.image}
        />
      </View>
      <View style={styles.productListingChildrenTextContainer}>
        <Text style={styles.productNames}>{name}</Text>
        <Text style={styles.productCompanyNames}>{companyName} &#x2022; {herstellungsort}</Text>
      </View>
    </TouchableOpacity>
    </>
  )
}

export default function SearchScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  function getProduct(name) {
    if (name === "") {
      setProducts([]);
      return;
    }
    // Construct the URL dynamically with the given product name
    const url = `https://live-chat.duckdns.org/produkt/name/${name}`;
  
    // Fetch the product data from the API
    fetch(url)
      .then(response => {
        // Check if the response is ok (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then(responseData => {
        setProducts(responseData); // Set the list of products to the state
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  let productList = <></>;
  if (products.length > 0) {
    productList = <>
      {products.map((product, index) => (
        <React.Fragment key={index}>
          <ProductListing navigation={navigation} data={product}/>
        </React.Fragment>
      ))}</>
  }

  return (
    <>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardContainer}
    >
      <SafeAreaView style={styles.container}>
          <View style={styles.containerTop}>
              <TouchableOpacity style={styles.button} onPress={() => {
                  navigation.goBack();
                }}>
                  <AntDesign name="arrowleft" size={30} color="black" />
              </TouchableOpacity>
          </View>
          <View style={styles.containerBottom}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Suche Produkt..."
                onChangeText={(text) => {getProduct(text)}}
                placeholderTextColor="black"
              />
            </View>
            <ScrollView style={styles.productListingContainer}>
              {productList}
            </ScrollView>
          </View>
      </SafeAreaView>
    </KeyboardAvoidingView></>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  containerTop: {
    width: "100%",
    flexDirection: 'row', // Arrange items in a row (horizontal)
    justifyContent: 'space-between', // Space out items evenly
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  containerBottom: {
    width: "100%",
    flex: 1,
    flexDirection: "column-reverse",
  },
  button: {
    width: 50, // Set width to the icon's size
    height: 50, // Set height to the icon's size
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    backgroundColor: "white",
    borderRadius: 25,
  },
  input: {
    width: "100%",
    height: 70,
    borderColor: "white",
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 2,
    paddingLeft: 20,
    fontSize: 20,
    color: "black",
  },
  inputContainer: {
    width: "100%",
    padding: 20,
  },
  productListingContainer: {
    marginTop: 30,
    width: "100%",
    flex: 1,
    padding: 10,
  },
  productListingChildrenContainer: {
    width: "100%",
    height: 100,
    marginBottom: 20,
    flexDirection: "row",
    paddingLeft: 20,
    alignItems: "center",
  },
  imageContainer: {
    backgroundColor: "white",
    width: 90,
    height: 90,
    borderRadius: 15,
    borderColor: "black",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 15,
  },
  productListingChildrenTextContainer: {
    width: "70%",
    height: "100%",
    paddingLeft: 15,
    paddingTop: 20,
    justifyContent: "start",

  },
  productNames: {
    fontWeight: "bold",
    fontSize: 20,
  },
  productCompanyNames: {
    paddingTop: 3,
  }
});