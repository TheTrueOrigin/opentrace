import React, {useState} from 'react';
import { ScrollView, View, Text, TextInput, SafeAreaView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Image} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

function ProductListing({ navigation, data }) {
  let name = data["Name"];
  let companyName = data["Unternehmen"]["Name"];
  let herstellungsort = data["Herstellungsort"];
  let country_codes = {'AC': 'Ascension', 'AD': 'Andorra', 'AE': 'Vereinigte Arabische Emirate', 'AF': 'Afghanistan', 'AG': 'Antigua und Barbuda', 'AI': 'Anguilla', 'AL': 'Albanien', 'AM': 'Armenien', 'AN': 'Niederländische Antillen', 'AO': 'Angola', 'AQ': 'Antarktis', 'AR': 'Argentinien', 'AS': 'Amerikanisch-Samoa', 'AT': 'Österreich', 'AU': 'Australien', 'AW': 'Aruba', 'AX': 'Alandinseln', 'AZ': 'Aserbaidschan', 'BA': 'Bosnien u. Herzegowina', 'BB': 'Barbados', 'BD': 'Bangladesch', 'BE': 'Belgien', 'BF': 'Burkina Faso', 'BG': 'Bulgarien', 'BH': 'Bahrain', 'BI': 'Burundi', 'BJ': 'Benin', 'BL': 'St. Barthélemy', 'BM': 'Bermuda', 'BN': 'Brunei Darussalam', 'BO': 'Bolivien', 'BQ': 'Britisches Antarktis-Territorium', 'BR': 'Brasilien', 'BS': 'Bahamas', 'BT': 'Bhutan', 'BV': 'Bouvetinsel', 'BW': 'Botsuana', 'BY': 'Belarus', 'BZ': 'Belize', 'CA': 'Kanada', 'CC': 'Kokosinseln', 'CD': 'Demokratische Republik Kongod', 'CF': 'Zentralafrikanische Republik', 'CG': 'Kongo-Brazzavilled', 'CH': 'Schweiz', 'CI': 'Elfenbeinküste', 'CK': 'Cookinseln', 'CL': 'Chile', 'CM': 'Kamerun', 'CN': 'China', 'CO': 'Kolumbien', 'CP': 'Clipperton', 'CR': 'Costa Rica', 'CS': 'Serbien und Montenegro', 'CT': 'Phoenixinseln', 'CU': 'Kuba', 'CV': 'Kap Verde', 'CX': 'Weihnachtsinsel', 'CY': 'Zypern', 'CZ': 'Tschechische Republik', 'DD': 'Ostdeutschland', 'DE': 'Deutschland', 'DG': 'Diego Garcia', 'DJ': 'Dschibuti', 'DK': 'Dänemark', 'DM': 'Dominica', 'DO': 'Dominikanische Republik', 'DZ': 'Algerien', 'EA': 'Ceuta und Melilla', 'EC': 'Ecuador', 'EE': 'Estland', 'EG': 'Ägypten', 'EH': 'Westsahara', 'ER': 'Eritrea', 'ES': 'Spanien', 'ET': 'Äthiopien', 'EU': 'EU', 'FI': 'Finnland', 'FJ': 'Fidschi', 'FK': 'Falklandinseln', 'FM': 'Mikronesien', 'FO': 'Färöer', 'FQ': 'Französische Süd- und Antarktisgebiete', 'FR': 'Frankreich', 'FX': 'Metropolitan-Frankreich', 'GA': 'Gabun', 'GB': 'Vereinigtes Königreich', 'GD': 'Grenada', 'GE': 'Georgien', 'GF': 'Französisch-Guayana', 'GG': 'Guernsey', 'GH': 'Ghana', 'GI': 'Gibraltar', 'GL': 'Grönland', 'GM': 'Gambia', 'GN': 'Guinea', 'GP': 'Guadeloupe', 'GQ': 'Äquatorialguinea', 'GR': 'Griechenland', 'GS': 'Südgeorgien und die Südlichen Sandwichinseln', 'GT': 'Guatemala', 'GU': 'Guam', 'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HK': 'Hongkong', 'HM': 'Heard- und McDonald-Inseln', 'HN': 'Honduras', 'HR': 'Kroatien', 'HT': 'Haiti', 'HU': 'Ungarn', 'IC': 'Kanarische Inseln', 'ID': 'Indonesien', 'IE': 'Irland', 'IL': 'Israel', 'IM': 'Isle of Man', 'IN': 'Indien', 'IO': 'Britisches Territorium im Indischen Ozean', 'IQ': 'Irak', 'IR': 'Iran', 'IS': 'Island', 'IT': 'Italien', 'JE': 'Jersey', 'JM': 'Jamaika', 'JO': 'Jordanien', 'JP': 'Japan', 'JT': 'Johnston-Atoll', 'KE': 'Kenia', 'KG': 'Kirgisistan', 'KH': 'Kambodscha', 'KI': 'Kiribati', 'KM': 'Komoren', 'KN': 'St. Kitts und Nevis', 'KP': 'Nordkorea', 'KR': 'Republik Korea', 'KW': 'Kuwait', 'KY': 'Kaimaninseln', 'KZ': 'Kasachstan', 'LA': 'Laos', 'LB': 'Libanon', 'LC': 'St. Lucia', 'LI': 'Liechtenstein', 'LK': 'Sri Lanka', 'LR': 'Liberia', 'LS': 'Lesotho', 'LT': 'Litauen', 'LU': 'Luxemburg', 'LV': 'Lettland', 'LY': 'Libyen', 'MA': 'Marokko', 'MC': 'Monaco', 'MD': 'Republik Moldau', 'ME': 'Montenegro', 'MF': 'St. Martin', 'MG': 'Madagaskar', 'MH': 'Marshallinseln', 'MI': 'Midwayinseln', 'MK': 'Mazedonien', 'ML': 'Mali', 'MM': 'Myanmar', 'MN': 'Mongolei', 'MO': 'Macaud', 'MP': 'Nördliche Marianen', 'MQ': 'Martinique', 'MR': 'Mauretanien', 'MS': 'Montserrat', 'MT': 'Malta', 'MU': 'Mauritius', 'MV': 'Malediven', 'MW': 'Malawi', 'MX': 'Mexiko', 'MY': 'Malaysia', 'MZ': 'Mosambik', 'NA': 'Namibia', 'NC': 'Neukaledonien', 'NE': 'Niger', 'NF': 'Norfolkinsel', 'NG': 'Nigeria', 'NI': 'Nicaragua', 'NL': 'Niederlande', 'NO': 'Norwegen', 'NP': 'Nepal', 'NQ': 'Königin-Maud-Land', 'NR': 'Nauru', 'NT': 'Neutrale Zone', 'NU': 'Niue', 'NZ': 'Neuseeland', 'OM': 'Oman', 'PA': 'Panama', 'PC': 'Treuhandgebiet Pazifische Inseln', 'PE': 'Peru', 'PF': 'Französisch-Polynesien', 'PG': 'Papua-Neuguinea', 'PH': 'Philippinen', 'PK': 'Pakistan', 'PL': 'Polen', 'PM': 'St. Pierre und Miquelon', 'PN': 'Pitcairn', 'PR': 'Puerto Rico', 'PS': 'Palästinensische Autonomiegebiete', 'PT': 'Portugal', 'PU': 'U.S. Miscellaneous Pacific Islands', 'PW': 'Palau', 'PY': 'Paraguay', 'PZ': 'Panamakanalzone', 'QA': 'Katar', 'QO': 'Äußeres Ozeanien', 'RE': 'Réunion', 'RO': 'Rumänien', 'RS': 'Serbien', 'RU': 'Russische Föderation', 'RW': 'Ruanda', 'SA': 'Saudi-Arabien', 'SB': 'Salomonen', 'SC': 'Seychellen', 'SD': 'Sudan', 'SE': 'Schweden', 'SG': 'Singapur', 'SH': 'St. Helena', 'SI': 'Slowenien', 'SJ': 'Svalbard und Jan Mayen', 'SK': 'Slowakei', 'SL': 'Sierra Leone', 'SM': 'San Marino', 'SN': 'Senegal', 'SO': 'Somalia', 'SR': 'Suriname', 'ST': 'São Tomé und Príncipe', 'SU': 'Sowjetunion', 'SV': 'El Salvador', 'SY': 'Syrien', 'SZ': 'Swasiland', 'TA': 'Tristan da Cunha', 'TC': 'Turks- und Caicosinseln', 'TD': 'Tschad', 'TF': 'Französische Süd- und Antarktisgebiete', 'TG': 'Togo', 'TH': 'Thailand', 'TJ': 'Tadschikistan', 'TK': 'Tokelau', 'TL': 'Osttimor', 'TM': 'Turkmenistan', 'TN': 'Tunesien', 'TO': 'Tonga', 'TR': 'Türkei', 'TT': 'Trinidad und Tobago', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TZ': 'Tansania', 'UA': 'Ukraine', 'UG': 'Uganda', 'UM': 'United States Minor Outlying Islands', 'US': 'Vereinigte Staaten', 'UY': 'Uruguay', 'UZ': 'Usbekistan', 'VA': 'Vatikanstadt', 'VC': 'St. Vincent und die Grenadinen', 'VD': 'Nordvietnam', 'VE': 'Venezuela', 'VG': 'Britische Jungferninseln', 'VI': 'Amerikanische Jungferninseln', 'VN': 'Vietnam', 'VU': 'Vanuatu', 'WF': 'Wallis und Futuna', 'WK': 'Wake', 'WS': 'Samoa', 'YD': 'Volksdemokratische Republik Jemen', 'YE': 'Jemen', 'YT': 'Mayotte', 'ZA': 'Südafrika', 'ZM': 'Sambia', 'ZW': 'Simbabwe', 'ZZ': 'Unbekannte oder ungültige Region'}
  let url = `https://raw.githubusercontent.com/TheTrueOrigin/opentrace-database/refs/heads/main/Medien/${name.replace(/\s+/g, '_').toLowerCase()}.jpg`
  return(
    <>
    <TouchableOpacity style={styles.productListingChildrenContainer} onPress={() => {navigation.navigate('Info', {navigation: navigation, data: data})}}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: url}} // Path to the image file
          style={styles.image}
        />
      </View>
      <View style={styles.productListingChildrenTextContainer}>
        <Text style={styles.productNames}>{name}</Text>
        <Text style={styles.productCompanyNames}>{companyName} &#x2022; {country_codes[herstellungsort]}</Text>
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
    const url = `http://192.168.0.102:8000/produkt/name/${name}`;
  
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
    productList = <>{products.map((product, index) => (
      <ProductListing key={index} navigation={navigation} data={product}/> // Pass the product's name to the Test component
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
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
    width: "100%",
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