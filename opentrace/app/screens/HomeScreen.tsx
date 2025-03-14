import React, {useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, Camera } from "expo-camera";
import { useFocusEffect } from '@react-navigation/native';

const CONFIG_URL = "https://raw.githubusercontent.com/TheTrueOrigin/opentrace-backend/refs/heads/main/endpoint.json";

async function getAPI() {
  const response = await fetch(CONFIG_URL);
  const json = await response.json();
  if (json.API) {
    return json.API;
  }
  return null
}

function CameraScreen({ onBarcodeScanned }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (<>
    <CameraView
      onBarcodeScanned={onBarcodeScanned}
      barcodeScannerSettings={{
        barcodeTypes: ["ean13", "ean8"],
      }}
      style={styles.camera}
    />
    </>
  );
}

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState(null);
  const [backendUrl, setBackendUrl] = useState(null);

  const timeoutRef = useRef(null); // Store timeout ID
  let scanned = useRef(false);

  useFocusEffect(
    React.useCallback(() => {
      timeoutRef.current = setTimeout(() => {
        scanned.current = false;
      }, 1000);

      // Cleanup function to clear timeout if screen loses focus
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, [])
  );

  useEffect(() => {
    if (data) {
      navigation.navigate('Info', {data: data});
    }
  }, [data, navigation]);

  useEffect(() => {
    const fetchAPI = async () => {
      const url = await getAPI();
      setBackendUrl(url);
    };

    fetchAPI();
  }, [])
  

  const onScan = ({ type, data }) => {
    if (scanned.current) return;
    scanned.current = true;
    console.log(data, backendUrl);
    fetch(`${backendUrl.replace(/\/$/, "")}/produkt/barcode/${data}`)
    .then(response => {
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Parse the response as JSON
    })
    .then(responseData => {
      setData(responseData);
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  };

  return (<>
    <View style={styles.cameraContainer}>
      <CameraScreen onBarcodeScanned={onScan}></CameraScreen>
    </View>
    <SafeAreaView style={styles.container}>
        <View style={styles.containerTop}>
            <TouchableOpacity style={styles.button} onPress={() => {
                scanned.current = true;
                navigation.navigate("Search", {api: backendUrl});
              }}>
                <AntDesign name="search1" size={30} color="black" />
            </TouchableOpacity>
        </View>
        <View style={styles.containerBottom}>
            <Text style={styles.text}>Bitte ein Produkt scannen...</Text>
        </View>
    </SafeAreaView></>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  containerBackgroundImage: {
    height: "80%",
    width: "100%",
  },
  containerTop: {
    width: "100%",
    flexDirection: 'row-reverse', // Arrange items in a row (horizontal)
    justifyContent: 'space-between', // Space out items evenly
    paddingTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  containerBottom: {
    width: "90%",
    height: 200,
    borderRadius: 20,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 50, // Set width to the icon's size
    height: 50, // Set height to the icon's size
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    backgroundColor: "white",
    borderRadius: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cameraContainer: {
    height: "100%",
    width: "100%",
    borderRadius: 30,
    overflow: "hidden",
    position: "absolute",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  rescan: {
    width: 300,
    height: 300,
    backgroundColor: "red",
  }
});