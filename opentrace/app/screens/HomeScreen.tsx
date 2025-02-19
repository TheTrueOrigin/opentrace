import React, {useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, Camera } from "expo-camera";

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
  let scanned = useRef(false);

  function switchScanned() {
    scanned.current = false;
  }

  if (data) {
    navigation.navigate('Info', {data: data, switchScanned: switchScanned});
  }

  const onScan = ({ type, data }) => {
    if (scanned.current) return;
    scanned.current = true;
    fetch(`https://live-chat.duckdns.org/produkt/barcode/${data}`)
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
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Search")}>
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