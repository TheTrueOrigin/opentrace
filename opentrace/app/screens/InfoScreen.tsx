import React from 'react';
import { ScrollView, View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

function calculateDistance(c1: string[], c2: string[]): Float {
  // ["a", "b"] ["a", "b"]
  let coord1 = [parseFloat(c1[0]), parseFloat(c1[1])]
  let coord2 = [parseFloat(c2[0]), parseFloat(c2[1])]
  
  const R = 6371; // Erdradius (in km)
  
  // Helper function to convert degrees to radians.
  const toRadians = (degree: number): number => {
    return degree * Math.PI / 180;
  };
  
  // Umwandeln in Bogenmaß
  const lat1 = toRadians(coord1[0]);
  const lon1 = toRadians(coord1[1]);
  const lat2 = toRadians(coord2[0]);
  const lon2 = toRadians(coord2[1]);
  
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;
  
  // Haversine-Formel
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  // Kilometeranzahl von c1 zu c2
  return Math.round(R * c);
}

function TableRow({left, right, key}) {
  return (
    <>
      <View key={key} style={styles.tableRow}>
        <Text style={styles.tableTitle}>{left}</Text>
        <Text style={styles.tableTitle}>{right}</Text>
      </View>
    </>
  )
}

function Row({value, key}) {
  return (
    <>
      <View key={key} style={styles.tableRow}>
        <Text style={styles.tableTitle}>{value}</Text>
      </View>
    </>
  )
}

function HDivider({key}) {
  return (
    <View key={key} style={styles.dividerHorizontal}></View>
  )
}

export default function InfoScreen({ navigation, route }) {
  const { data, switchScanned } = route.params;
  let url = `https://raw.githubusercontent.com/TheTrueOrigin/opentrace-database/refs/heads/main/Medien/${data["Name"].replace(/\s+/g, '_').toLowerCase()}.jpg`
  let country_data = {"Alpha-2 code": ["Latitude (average)", "Longitude (average)"], "-": ["0.0", "0.0"], "AF": ["33.0", "65.0"], "AL": ["41.0", "20.0"], "DZ": ["28.0", "3.0"], "AS": ["-14.3333", "-170.0"], "AD": ["42.5", "1.6"], "AO": ["-12.5", "18.5"], "AI": ["18.25", "-63.1667"], "AQ": ["-90.0", "0.0"], "AG": ["17.05", "-61.8"], "AR": ["-34.0", "-64.0"], "AM": ["40.0", "45.0"], "AW": ["12.5", "-69.9667"], "AU": ["-27.0", "133.0"], "AT": ["47.3333", "13.3333"], "AZ": ["40.5", "47.5"], "BS": ["24.25", "-76.0"], "BH": ["26.0", "50.55"], "BD": ["24.0", "90.0"], "BB": ["13.1667", "-59.5333"], "BY": ["53.0", "28.0"], "BE": ["50.8333", "4.0"], "BZ": ["17.25", "-88.75"], "BJ": ["9.5", "2.25"], "BM": ["32.3333", "-64.75"], "BT": ["27.5", "90.5"], "BO": ["-17.0", "-65.0"], "BA": ["44.0", "18.0"], "BW": ["-22.0", "24.0"], "BV": ["-54.4333", "3.4"], "BR": ["-10.0", "-55.0"], "IO": ["-6.0", "71.5"], "BN": ["4.5", "114.6667"], "BG": ["43.0", "25.0"], "BF": ["13.0", "-2.0"], "BI": ["-3.5", "30.0"], "KH": ["13.0", "105.0"], "CM": ["6.0", "12.0"], "CA": ["60.0", "-95.0"], "CV": ["16.0", "-24.0"], "KY": ["19.5", "-80.5"], "CF": ["7.0", "21.0"], "TD": ["15.0", "19.0"], "CL": ["-30.0", "-71.0"], "CN": ["35.0", "105.0"], "CX": ["-10.5", "105.6667"], "CC": ["-12.5", "96.8333"], "CO": ["4.0", "-72.0"], "KM": ["-12.1667", "44.25"], "CG": ["-1.0", "15.0"], "CD": ["0.0", "25.0"], "CK": ["-21.2333", "-159.7667"], "CR": ["10.0", "-84.0"], "CI": ["8.0", "-5.0"], "HR": ["45.1667", "15.5"], "CU": ["21.5", "-80.0"], "CY": ["35.0", "33.0"], "CZ": ["49.75", "15.5"], "DK": ["56.0", "10.0"], "DJ": ["11.5", "43.0"], "DM": ["15.4167", "-61.3333"], "DO": ["19.0", "-70.6667"], "EC": ["-2.0", "-77.5"], "EG": ["27.0", "30.0"], "SV": ["13.8333", "-88.9167"], "GQ": ["2.0", "10.0"], "ER": ["15.0", "39.0"], "EE": ["59.0", "26.0"], "ET": ["8.0", "38.0"], "FK": ["-51.75", "-59.0"], "FO": ["62.0", "-7.0"], "FJ": ["-18.0", "175.0"], "FI": ["64.0", "26.0"], "FR": ["46.0", "2.0"], "GF": ["4.0", "-53.0"], "PF": ["-15.0", "-140.0"], "TF": ["-43.0", "67.0"], "GA": ["-1.0", "11.75"], "GM": ["13.4667", "-16.5667"], "GE": ["42.0", "43.5"], "DE": ["51.0", "9.0"], "GH": ["8.0", "-2.0"], "GI": ["36.1833", "-5.3667"], "GR": ["39.0", "22.0"], "GL": ["72.0", "-40.0"], "GD": ["12.1167", "-61.6667"], "GP": ["16.25", "-61.5833"], "GU": ["13.4667", "144.7833"], "GT": ["15.5", "-90.25"], "GG": ["49.5", "-2.56"], "GN": ["11.0", "-10.0"], "GW": ["12.0", "-15.0"], "GY": ["5.0", "-59.0"], "HT": ["19.0", "-72.4167"], "HM": ["-53.1", "72.5167"], "VA": ["41.9", "12.45"], "HN": ["15.0", "-86.5"], "HK": ["22.25", "114.1667"], "HU": ["47.0", "20.0"], "IS": ["65.0", "-18.0"], "IN": ["20.0", "77.0"], "ID": ["-5.0", "120.0"], "IR": ["32.0", "53.0"], "IQ": ["33.0", "44.0"], "IE": ["53.0", "-8.0"], "IM": ["54.23", "-4.55"], "IL": ["31.5", "34.75"], "IT": ["42.8333", "12.8333"], "JM": ["18.25", "-77.5"], "JP": ["36.0", "138.0"], "JE": ["49.21", "-2.13"], "JO": ["31.0", "36.0"], "KZ": ["48.0", "68.0"], "KE": ["1.0", "38.0"], "KI": ["1.4167", "173.0"], "KP": ["40.0", "127.0"], "KR": ["37.0", "127.5"], "KW": ["29.3375", "47.6581"], "KG": ["41.0", "75.0"], "LA": ["18.0", "105.0"], "LV": ["57.0", "25.0"], "LB": ["33.8333", "35.8333"], "LS": ["-29.5", "28.5"], "LR": ["6.5", "-9.5"], "LY": ["25.0", "17.0"], "LI": ["47.1667", "9.5333"], "LT": ["56.0", "24.0"], "LU": ["49.75", "6.1667"], "MO": ["22.1667", "113.55"], "MK": ["41.8333", "22.0"], "MG": ["-20.0", "47.0"], "MW": ["-13.5", "34.0"], "MY": ["2.5", "112.5"], "MV": ["3.25", "73.0"], "ML": ["17.0", "-4.0"], "MT": ["35.8333", "14.5833"], "MH": ["9.0", "168.0"], "MQ": ["14.6667", "-61.0"], "MR": ["20.0", "-12.0"], "MU": ["-20.2833", "57.55"], "YT": ["-12.8333", "45.1667"], "MX": ["23.0", "-102.0"], "FM": ["6.9167", "158.25"], "MD": ["47.0", "29.0"], "MC": ["43.7333", "7.4"], "MN": ["46.0", "105.0"], "ME": ["42.0", "19.0"], "MS": ["16.75", "-62.2"], "MA": ["32.0", "-5.0"], "MZ": ["-18.25", "35.0"], "MM": ["22.0", "98.0"], "NA": ["-22.0", "17.0"], "NR": ["-0.5333", "166.9167"], "NP": ["28.0", "84.0"], "NL": ["52.5", "5.75"], "AN": ["12.25", "-68.75"], "NC": ["-21.5", "165.5"], "NZ": ["-41.0", "174.0"], "NI": ["13.0", "-85.0"], "NE": ["16.0", "8.0"], "NG": ["10.0", "8.0"], "NU": ["-19.0333", "-169.8667"], "NF": ["-29.0333", "167.95"], "MP": ["15.2", "145.75"], "NO": ["62.0", "10.0"], "OM": ["21.0", "57.0"], "PK": ["30.0", "70.0"], "PW": ["7.5", "134.5"], "PS": ["32.0", "35.25"], "PA": ["9.0", "-80.0"], "PG": ["-6.0", "147.0"], "PY": ["-23.0", "-58.0"], "PE": ["-10.0", "-76.0"], "PH": ["13.0", "122.0"], "PN": ["-24.7", "-127.4"], "PL": ["52.0", "20.0"], "PT": ["39.5", "-8.0"], "PR": ["18.25", "-66.5"], "QA": ["25.5", "51.25"], "RE": ["-21.1", "55.6"], "RO": ["46.0", "25.0"], "RU": ["60.0", "100.0"], "RW": ["-2.0", "30.0"], "SH": ["-15.9333", "-5.7"], "KN": ["17.3333", "-62.75"], "LC": ["13.8833", "-61.1333"], "PM": ["46.8333", "-56.3333"], "VC": ["13.25", "-61.2"], "WS": ["-13.5833", "-172.3333"], "SM": ["43.7667", "12.4167"], "ST": ["1.0", "7.0"], "SA": ["25.0", "45.0"], "SN": ["14.0", "-14.0"], "RS": ["44.0", "21.0"], "SC": ["-4.5833", "55.6667"], "SL": ["8.5", "-11.5"], "SG": ["1.3667", "103.8"], "SK": ["48.6667", "19.5"], "SI": ["46.0", "15.0"], "SB": ["-8.0", "159.0"], "SO": ["10.0", "49.0"], "ZA": ["-29.0", "24.0"], "GS": ["-54.5", "-37.0"], "SS": ["8.0", "30.0"], "ES": ["40.0", "-4.0"], "LK": ["7.0", "81.0"], "SD": ["15.0", "30.0"], "SR": ["4.0", "-56.0"], "SJ": ["78.0", "20.0"], "SZ": ["-26.5", "31.5"], "SE": ["62.0", "15.0"], "CH": ["47.0", "8.0"], "SY": ["35.0", "38.0"], "TW": ["23.5", "121.0"], "TJ": ["39.0", "71.0"], "TZ": ["-6.0", "35.0"], "TH": ["15.0", "100.0"], "TL": ["-8.55", "125.5167"], "TG": ["8.0", "1.1667"], "TK": ["-9.0", "-172.0"], "TO": ["-20.0", "-175.0"], "TT": ["11.0", "-61.0"], "TN": ["34.0", "9.0"], "TR": ["39.0", "35.0"], "TM": ["40.0", "60.0"], "TC": ["21.75", "-71.5833"], "TV": ["-8.0", "178.0"], "UG": ["1.0", "32.0"], "UA": ["49.0", "32.0"], "AE": ["24.0", "54.0"], "GB": ["54.0", "-2.0"], "US": ["38.0", "-97.0"], "UM": ["19.2833", "166.6"], "UY": ["-33.0", "-56.0"], "UZ": ["41.0", "64.0"], "VU": ["-16.0", "167.0"], "VE": ["8.0", "-66.0"], "VN": ["16.0", "106.0"], "VG": ["18.5", "-64.5"], "VI": ["18.3333", "-64.8333"], "WF": ["-13.3", "-176.2"], "EH": ["24.5", "-13.0"], "YE": ["15.0", "48.0"], "ZM": ["-15.0", "30.0"], "ZW": ["-20.0", "30.0"]}
  let country_codes = {'-': '-', 'AC': 'Ascension', 'AD': 'Andorra', 'AE': 'Vereinigte Arabische Emirate', 'AF': 'Afghanistan', 'AG': 'Antigua und Barbuda', 'AI': 'Anguilla', 'AL': 'Albanien', 'AM': 'Armenien', 'AN': 'Niederländische Antillen', 'AO': 'Angola', 'AQ': 'Antarktis', 'AR': 'Argentinien', 'AS': 'Amerikanisch-Samoa', 'AT': 'Österreich', 'AU': 'Australien', 'AW': 'Aruba', 'AX': 'Alandinseln', 'AZ': 'Aserbaidschan', 'BA': 'Bosnien u. Herzegowina', 'BB': 'Barbados', 'BD': 'Bangladesch', 'BE': 'Belgien', 'BF': 'Burkina Faso', 'BG': 'Bulgarien', 'BH': 'Bahrain', 'BI': 'Burundi', 'BJ': 'Benin', 'BL': 'St. Barthélemy', 'BM': 'Bermuda', 'BN': 'Brunei Darussalam', 'BO': 'Bolivien', 'BQ': 'Britisches Antarktis-Territorium', 'BR': 'Brasilien', 'BS': 'Bahamas', 'BT': 'Bhutan', 'BV': 'Bouvetinsel', 'BW': 'Botsuana', 'BY': 'Belarus', 'BZ': 'Belize', 'CA': 'Kanada', 'CC': 'Kokosinseln', 'CD': 'Demokratische Republik Kongod', 'CF': 'Zentralafrikanische Republik', 'CG': 'Kongo-Brazzavilled', 'CH': 'Schweiz', 'CI': 'Elfenbeinküste', 'CK': 'Cookinseln', 'CL': 'Chile', 'CM': 'Kamerun', 'CN': 'China', 'CO': 'Kolumbien', 'CP': 'Clipperton', 'CR': 'Costa Rica', 'CS': 'Serbien und Montenegro', 'CT': 'Phoenixinseln', 'CU': 'Kuba', 'CV': 'Kap Verde', 'CX': 'Weihnachtsinsel', 'CY': 'Zypern', 'CZ': 'Tschechische Republik', 'DD': 'Ostdeutschland', 'DE': 'Deutschland', 'DG': 'Diego Garcia', 'DJ': 'Dschibuti', 'DK': 'Dänemark', 'DM': 'Dominica', 'DO': 'Dominikanische Republik', 'DZ': 'Algerien', 'EA': 'Ceuta und Melilla', 'EC': 'Ecuador', 'EE': 'Estland', 'EG': 'Ägypten', 'EH': 'Westsahara', 'ER': 'Eritrea', 'ES': 'Spanien', 'ET': 'Äthiopien', 'EU': 'EU', 'FI': 'Finnland', 'FJ': 'Fidschi', 'FK': 'Falklandinseln', 'FM': 'Mikronesien', 'FO': 'Färöer', 'FQ': 'Französische Süd- und Antarktisgebiete', 'FR': 'Frankreich', 'FX': 'Metropolitan-Frankreich', 'GA': 'Gabun', 'GB': 'Vereinigtes Königreich', 'GD': 'Grenada', 'GE': 'Georgien', 'GF': 'Französisch-Guayana', 'GG': 'Guernsey', 'GH': 'Ghana', 'GI': 'Gibraltar', 'GL': 'Grönland', 'GM': 'Gambia', 'GN': 'Guinea', 'GP': 'Guadeloupe', 'GQ': 'Äquatorialguinea', 'GR': 'Griechenland', 'GS': 'Südgeorgien und die Südlichen Sandwichinseln', 'GT': 'Guatemala', 'GU': 'Guam', 'GW': 'Guinea-Bissau', 'GY': 'Guyana', 'HK': 'Hongkong', 'HM': 'Heard- und McDonald-Inseln', 'HN': 'Honduras', 'HR': 'Kroatien', 'HT': 'Haiti', 'HU': 'Ungarn', 'IC': 'Kanarische Inseln', 'ID': 'Indonesien', 'IE': 'Irland', 'IL': 'Israel', 'IM': 'Isle of Man', 'IN': 'Indien', 'IO': 'Britisches Territorium im Indischen Ozean', 'IQ': 'Irak', 'IR': 'Iran', 'IS': 'Island', 'IT': 'Italien', 'JE': 'Jersey', 'JM': 'Jamaika', 'JO': 'Jordanien', 'JP': 'Japan', 'JT': 'Johnston-Atoll', 'KE': 'Kenia', 'KG': 'Kirgisistan', 'KH': 'Kambodscha', 'KI': 'Kiribati', 'KM': 'Komoren', 'KN': 'St. Kitts und Nevis', 'KP': 'Nordkorea', 'KR': 'Republik Korea', 'KW': 'Kuwait', 'KY': 'Kaimaninseln', 'KZ': 'Kasachstan', 'LA': 'Laos', 'LB': 'Libanon', 'LC': 'St. Lucia', 'LI': 'Liechtenstein', 'LK': 'Sri Lanka', 'LR': 'Liberia', 'LS': 'Lesotho', 'LT': 'Litauen', 'LU': 'Luxemburg', 'LV': 'Lettland', 'LY': 'Libyen', 'MA': 'Marokko', 'MC': 'Monaco', 'MD': 'Republik Moldau', 'ME': 'Montenegro', 'MF': 'St. Martin', 'MG': 'Madagaskar', 'MH': 'Marshallinseln', 'MI': 'Midwayinseln', 'MK': 'Mazedonien', 'ML': 'Mali', 'MM': 'Myanmar', 'MN': 'Mongolei', 'MO': 'Macaud', 'MP': 'Nördliche Marianen', 'MQ': 'Martinique', 'MR': 'Mauretanien', 'MS': 'Montserrat', 'MT': 'Malta', 'MU': 'Mauritius', 'MV': 'Malediven', 'MW': 'Malawi', 'MX': 'Mexiko', 'MY': 'Malaysia', 'MZ': 'Mosambik', 'NA': 'Namibia', 'NC': 'Neukaledonien', 'NE': 'Niger', 'NF': 'Norfolkinsel', 'NG': 'Nigeria', 'NI': 'Nicaragua', 'NL': 'Niederlande', 'NO': 'Norwegen', 'NP': 'Nepal', 'NQ': 'Königin-Maud-Land', 'NR': 'Nauru', 'NT': 'Neutrale Zone', 'NU': 'Niue', 'NZ': 'Neuseeland', 'OM': 'Oman', 'PA': 'Panama', 'PC': 'Treuhandgebiet Pazifische Inseln', 'PE': 'Peru', 'PF': 'Französisch-Polynesien', 'PG': 'Papua-Neuguinea', 'PH': 'Philippinen', 'PK': 'Pakistan', 'PL': 'Polen', 'PM': 'St. Pierre und Miquelon', 'PN': 'Pitcairn', 'PR': 'Puerto Rico', 'PS': 'Palästinensische Autonomiegebiete', 'PT': 'Portugal', 'PU': 'U.S. Miscellaneous Pacific Islands', 'PW': 'Palau', 'PY': 'Paraguay', 'PZ': 'Panamakanalzone', 'QA': 'Katar', 'QO': 'Äußeres Ozeanien', 'RE': 'Réunion', 'RO': 'Rumänien', 'RS': 'Serbien', 'RU': 'Russische Föderation', 'RW': 'Ruanda', 'SA': 'Saudi-Arabien', 'SB': 'Salomonen', 'SC': 'Seychellen', 'SD': 'Sudan', 'SE': 'Schweden', 'SG': 'Singapur', 'SH': 'St. Helena', 'SI': 'Slowenien', 'SJ': 'Svalbard und Jan Mayen', 'SK': 'Slowakei', 'SL': 'Sierra Leone', 'SM': 'San Marino', 'SN': 'Senegal', 'SO': 'Somalia', 'SR': 'Suriname', 'ST': 'São Tomé und Príncipe', 'SU': 'Sowjetunion', 'SV': 'El Salvador', 'SY': 'Syrien', 'SZ': 'Swasiland', 'TA': 'Tristan da Cunha', 'TC': 'Turks- und Caicosinseln', 'TD': 'Tschad', 'TF': 'Französische Süd- und Antarktisgebiete', 'TG': 'Togo', 'TH': 'Thailand', 'TJ': 'Tadschikistan', 'TK': 'Tokelau', 'TL': 'Osttimor', 'TM': 'Turkmenistan', 'TN': 'Tunesien', 'TO': 'Tonga', 'TR': 'Türkei', 'TT': 'Trinidad und Tobago', 'TV': 'Tuvalu', 'TW': 'Taiwan', 'TZ': 'Tansania', 'UA': 'Ukraine', 'UG': 'Uganda', 'UM': 'United States Minor Outlying Islands', 'US': 'Vereinigte Staaten', 'UY': 'Uruguay', 'UZ': 'Usbekistan', 'VA': 'Vatikanstadt', 'VC': 'St. Vincent und die Grenadinen', 'VD': 'Nordvietnam', 'VE': 'Venezuela', 'VG': 'Britische Jungferninseln', 'VI': 'Amerikanische Jungferninseln', 'VN': 'Vietnam', 'VU': 'Vanuatu', 'WF': 'Wallis und Futuna', 'WK': 'Wake', 'WS': 'Samoa', 'YD': 'Volksdemokratische Republik Jemen', 'YE': 'Jemen', 'YT': 'Mayotte', 'ZA': 'Südafrika', 'ZM': 'Sambia', 'ZW': 'Simbabwe', 'ZZ': 'Unbekannte oder ungültige Region'}
  let distance = 0;
  for (let bestandteil of data["Bestandteile"]) {
    distance += calculateDistance(country_data[bestandteil["Herstellungsort"]], country_data[data["Herstellungsort"]]);
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
          <View style={styles.containerTop}>
              <TouchableOpacity style={styles.button} onPress={() => {
                  navigation.goBack();
                  setTimeout(() => {
                    switchScanned();
                  }, 1000);
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
            <Text style={styles.title}>{data["Name"]}</Text>
            {data["Herstellungsort"] !== "-" ? <Text>{data["Unternehmen"]["Name"]} &#x2022; {country_codes[data["Herstellungsort"]]} &#x2022; {data["Barcode"]}</Text> : null}
            <View style={styles.infobox}>
              <View style={styles.infoboxLeft}>
                <Text style={styles.title}>{data["Herstellungsort"] === "-" ? "-" : distance} km</Text>
                <Text>Gesamtstrecke</Text>
              </View>
              <View style={styles.divider}></View>
              <View style={styles.infoboxRight}>
                <Text style={styles.title}>{data["Herstellungsort"] === "-" ? "-" : (distance/40075).toFixed(3).toString().replace(".", ",")}</Text>
                <Text>Weltumrundungen</Text>
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Bestandteile</Text>
              <View style={styles.tablebox}>
                {data["Bestandteile"].map((value, index) => (<>
                  <TableRow key={index*2} left={value["Name"]} right={country_codes[value["Herstellungsort"]]} />
                  {index !== data["Bestandteile"].length - 1 && (
                    <HDivider key={index*2+1}></HDivider>
                  )}</>
                ))}
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Nährwerte</Text>
              <View style={styles.tablebox}>
                <TableRow key={1} left={"Brennwert"} right={data["Nährwerte"]["Brennwert"]}></TableRow>
                <HDivider key={2}></HDivider>
                <TableRow key={3} left={"Fettgehalt"} right={data["Nährwerte"]["Fettgehalt"]}></TableRow>
                <HDivider key={4}></HDivider>
                <TableRow key={5} left={"Gesättigte Fettsäuren"} right={data["Nährwerte"]["Gesättigte_Fettsäuren"]}></TableRow>
                <HDivider key={6}></HDivider>
                <TableRow key={7} left={"Kohlenhydrate"} right={data["Nährwerte"]["Kohlenhydrate"]}></TableRow>
                <HDivider key={8}></HDivider>
                <TableRow key={9} left={"Zuckergehalt"} right={data["Nährwerte"]["Zuckergehalt"]}></TableRow>
                <HDivider key={10}></HDivider>
                <TableRow key={11} left={"Eiweißgehalt"} right={data["Nährwerte"]["Eiweißgehalt"]}></TableRow>
                <HDivider key={12}></HDivider>
                <TableRow key={13} left={"Salzgehalt"} right={data["Nährwerte"]["Salzgehalt"]}></TableRow>
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Labels</Text>
              <View style={styles.tablebox}>
                {data["Labels"].map((value, index) => (<>
                  <Row key={2*index} value={value} />
                  {index !== data["Labels"].length - 1 && (
                    <HDivider key={2*index+1}></HDivider>
                  )}</>
                ))}
              </View>
            </View>
            <View style={styles.subContainer}>
              <Text style={styles.title}>Allergene</Text>
              <View style={styles.tablebox}>
                {data["Allergene"].map((value, index) => (<>
                  <Row key={index*2} value={value} />
                  {index !== data["Allergene"].length - 1 && (
                    <HDivider key={index*2+1}></HDivider>
                  )}</>
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
    paddingTop: 10,
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
    maxWidth: "80%",
  },
  tableRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  }
});