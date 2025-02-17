import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { CameraView, useCameraPermissions } from "expo-camera";

function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  return (
    <CameraView facing="back" style={styles.camera}>
    </CameraView>
  );
}

export default function HomeScreen({ navigation }) {
  return (<>
    <View style={styles.cameraContainer}>
      <CameraScreen></CameraScreen>
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
  }
});