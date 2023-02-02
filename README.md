# Casino_website
## Features
Dieses GitHub Repository ist eine Website für den [Smart-Contract von einem Casino](https://github.com/Gwackli/dezentrales_casino_)

Es lassen sich über eine grafische Oberfläche Wetten erstellen

## Installation

Klonen des gitHub repository
```
git clone https://github.com/Gwackli/Casino_website/
```

#### Wenn es nicht direkt funktioniert:
Braucht es, dass man ethers importieren kann via const require:
```
yarn add browserify
yarn add ethers
```

### Installation von Metamask
[Metamask](https://metamask.io/) Downloaden und installieren

Der Smart-Contract ist auf dem Polygon-Testnetzwerk Mumbai. Dies muss Metamask hinzugefügt werden.
[Anleitung Mumbai hinzuzufügen](https://docs.unstoppabledomains.com/manage-domains/guides/add-polygon-to-metamask/)

Testmatic können [hier](https://faucet.polygon.technology/) beantragt werden.

## editieren der website
### wenn index.js geändert wird, muss dies ausgeführt werden
```
yarn browserify index.js --standalone bundle -o ./dist/bundle.js
```


## Wichtige Dateien
#### index.js
Alle Funktionen, welche mit der Blockchain interagieren müssen
#### program.js
Alle Funktionen, welche nicht mit der Blockchain interagieren müssen
#### data.js
Alle Daten wie momentan nur die ABI des Smart-Contracts
#### index.html
Das komplette HTML der Website
#### index.css
Das CSS der Website
