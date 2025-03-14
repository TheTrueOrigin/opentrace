import React from 'react';
import { ScrollView, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

function TableRow({left, right}) {
  return (
    <>
      <View style={styles.tableRow}>
        <Text style={styles.tableTitle}>{left}</Text>
        <Text style={styles.tableTitle}>{right}</Text>
      </View>
    </>
  )
}

function Row({value}) {
  return (
    <>
      <View style={styles.tableRow}>
        <Text style={styles.tableTitle2}>{value}</Text>
      </View>
    </>
  )
}

function HDivider() {
  return (
    <View style={styles.dividerHorizontal}></View>
  )
}

function get_emission(emission) {
  if (emission < 1) {
    return (emission * 1000).toFixed(0) + " g"; 
  }
  if (emission > 1000) {
    return (emission / 1000).toFixed(0) + " t"; 
  }
  return (emission).toFixed(0) + " kg"; 
}

export default function InfoScreen({ navigation, route }) {
  const { data } = route.params;

  let url = `https://raw.githubusercontent.com/TheTrueOrigin/opentrace-database/refs/heads/main/Medien/${encodeURIComponent(data["Name"].replace(/\s+/g, '_').toLowerCase())}.jpg`

  return (
    <>
      <SafeAreaView style={styles.container}>
          <View style={styles.containerTop}>
              <TouchableOpacity style={styles.button} onPress={() => {
                  navigation.goBack();
              }}>
                  <AntDesign name="arrowleft" size={30} color="black" />
              </TouchableOpacity>
          </View>
          <ScrollView style={styles.containerBottom} contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}>
            <View style={styles.imageContainer}>
              <Image
                source={{uri: url}} // Path to the image file
                style={styles.image}
              />
            </View>
            <Text style={styles.mainTitle}>{data["Name"]}</Text>
            {data["Herstellungsort"] !== "-" ? <Text style={styles.infoSubtitle}>{data["Unternehmen"]["Name"]} &#x2022; {data["Herstellungsort"]} &#x2022; {data["Barcode"]}</Text> : null}
            <View style={styles.infobox}>
              <View style={styles.infoboxLeft}>
                <Text style={styles.title}>{data["Distanz"]} km</Text>
                <Text>Gesamtstrecke</Text>
              </View>
              <View style={styles.divider}></View>
              <View style={styles.infoboxRight}>
                <Text style={styles.title}>{data["Emission"] === "-" ? "-" : get_emission(data["Emission"])}</Text>
                <Text>CO₂ Emission</Text>
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Bestandteile</Text>
              <View style={styles.tablebox}>
                {data["Bestandteile"].map((value, index) => (
                  <React.Fragment key={index}>
                    <TableRow left={value["Name"]} right={value["Herstellungsort"]} />
                    {index !== data["Bestandteile"].length - 1 && (
                      <HDivider></HDivider>
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Nährwerte (pro 100g/ml)</Text>
              <View style={styles.tablebox}>
                <TableRow left={"Brennwert"} right={data["Nährwerte"]["Brennwert"]}></TableRow>
                <HDivider></HDivider>
                <TableRow left={"Fettgehalt"} right={data["Nährwerte"]["Fettgehalt"]}></TableRow>
                <HDivider></HDivider>
                <TableRow left={"Gesättigte Fettsäuren"} right={data["Nährwerte"]["Gesättigte_Fettsäuren"]}></TableRow>
                <HDivider></HDivider>
                <TableRow left={"Kohlenhydrate"} right={data["Nährwerte"]["Kohlenhydrate"]}></TableRow>
                <HDivider></HDivider>
                <TableRow left={"Zuckergehalt"} right={data["Nährwerte"]["Zuckergehalt"]}></TableRow>
                <HDivider></HDivider>
                <TableRow left={"Eiweißgehalt"} right={data["Nährwerte"]["Eiweißgehalt"]}></TableRow>
                <HDivider></HDivider>
                <TableRow left={"Salzgehalt"} right={data["Nährwerte"]["Salzgehalt"]}></TableRow>
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Labels</Text>
              <View style={styles.tablebox}>
                {data["Labels"].map((value, index) => (
                  <React.Fragment key={index}>
                    <Row value={value} />
                    {index !== data["Labels"].length - 1 && (
                      <HDivider></HDivider>
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Allergene</Text>
              <View style={styles.tablebox}>
                {data["Allergene"].map((value, index) => (
                  <React.Fragment key={index}>
                    <Row value={value} />
                    {index !== data["Allergene"].length - 1 && (
                      <HDivider></HDivider>
                    )}
                  </React.Fragment>
                ))}
              </View>
            </View>
          </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: 'space-between',
    alignItems: "center",
  },
  button: {
    width: 50, // Set width to the icon's size
    height: 50, // Set height to the icon's size
    justifyContent: 'center', // Center the icon vertically
    alignItems: 'center', // Center the icon horizontally
    backgroundColor: "white",
    borderRadius: 25,
  },
  containerTop: {
    width: "100%",
    flexDirection: 'row', // Arrange items in a row (horizontal)
    justifyContent: 'space-between', // Space out items evenly
    paddingTop: Platform.OS === "android" ? 40 : 10,
    
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 20,
  },
  containerBottom: {
    flexDirection: "column",
    width: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    marginBottom: 20,
    width: 150,
    height: 150,
    borderRadius: 20,
    borderColor: "black",
    borderWidth: 2,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 20,
    width: "80%",
    textAlign: "center",
    marginBottom: 5,
  },
  infoSubtitle: {
    width: "80%",
    textAlign: "center",
  },
  infobox: {
    marginTop: 40,
    marginBottom: 30,
    width: "80%",
    height: 100,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: "row",
  },
  infoboxLeft: {
    width: "50%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    height: "100%",
    width: 1,
    backgroundColor: "black",
  },
  infoboxRight: {
    width: "50%",
    height: "100%",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer: {
    width: "80%",
    marginBottom: 30,
  },
  tablebox: {
    marginTop: 20,
    width: "100%",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
    flexDirection: "column",
  },
  dividerHorizontal: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
  },
  tableTitle: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    maxWidth: "50%",
  },
  tableTitle2: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 20,
    maxWidth: "100%",
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
});