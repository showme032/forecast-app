# ForecastApp

Web-app for displaying current, today's and extended weather forecast for a searched or current location.
Dynamically updated components change depending on current forecast using custom graphical representation.
Data is
retrieved via
Geocodify's
[Geocoding](https://geocodify.com/)
and Open-Meteo's
[Weather Forecast](https://open-meteo.com/en/docs) and
[Air Quality](https://open-meteo.com/en/docs/air-quality-api) APIs.<br/>

The app was made using Angular v18 and styled/animated without any frameworks, using plain CSS.

# Live demo
Live demo of the current version can be viewed **[here](https://forecast-demo.netlify.app/)**.

[//]: # (# Screenshot)

[//]: # (<img src="/public/screenshot.png" width="352">)

# Usage
Type the desired location into the search field and press enter 🤷‍♂️

# Local Usage
After cloning the repository to you local machine, if ```npm``` and ```ng``` are
installed, app can be run in development mode via executing: <br/>
```
npm i
ng serve
```
Note: For personal deployment, free [Geocodify](https://geocodify.com/register) API key must be placed in
*environment.ts* as
'geoApiKey: [API key]'.

# Credits
Weather icons edited from
[Roman Davydko](https://www.figma.com/community/file/1103283843506060922/icons-for-weather-api), and icons used in
other elements from [Huge Icons](https://hugeicons.com/icons?style=Stroke&type=Rounded).