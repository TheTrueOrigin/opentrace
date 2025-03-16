# opentrace
OpenTrace ist React-Native App, die per Barcode oder Namen Informationen über die Herkunft/Nährwerte/Bestandteile von Produkten abruft. Die App bezieht ihre Daten direkt aus der OpenTrace-Datenbank, über der OpenTrace-Backend-API. 

## Anforderungen
1. [Node.js](https://nodejs.org)
2. Installiere alle Pakete in opentrace mit `npm install`

## Development Build
Um einen lokalen Build zu starten, für iOS, Android und Web:
1. Starten mit `npx expo start`
2. Entweder QR-Code scannen, oder Website aufrufen

## App-Build für Android
Um den Build zu vereinfachen, ist es vorgeschlagen Expo zu nutzen. Account erstellen bei [Expo](https://expo.dev/signup).
1. Installiere EAS mit `npm install -g eas-cli`
2. Mit EAS mit einem Expo-Konto einlogen: `eas login`
3. Initialisiere die EAS-Repo mit `eas build:configure`
4. Add the following profile in `eas.json`:
```
"preview": {
  "distribution": "internal"
},
```
6. Eine Preview-APK erstellen mit `eas build -p android --profile preview`
Die APK wird auf der Expo Website unter Projekte verfügbar sein.

## App-Build für iOS
Für einen Standalone-Build für ein iPhone-Gerät benötigst du ein MacBook mit XCode
1. Kreiere den ios-Ordner mit `npx expo prebuild`
2. Öffne das Projekt im Finder, öffne in ios die Datei Projektname.xcworkspace
3. Gehe auf Produkt > Scheme > Scheme bearbeiten
4. Wähle im Dropdown Release und schließe das Fenster
5. Verbinde ein iOS-Gerät und melde dich ggf. in XCode mit deiner Apple ID an
6. Run den Build
7. Die App wird auf deinem iPhone verfügbar sein (ggf. musst du dem Entwickler-Konto trauen, bevor die App installiert werden kann)

Die App nutzt den API-Endpoint: "live-chat.duckdns.org"
