# ForecastApp

Web-app for displaying current, today's and extended weather forecast for a searched location. Data is retrieved via
Geocodify's 
[Geocoding](https://geocodify.com/)
and Open-Meteo's
[Weather Forecast](https://open-meteo.com/en/docs) and
[Air Quality](https://open-meteo.com/en/docs/air-quality-api) APIs.<br/>

The app was made using Angular v18.

# Live demo
Live demo of current version can be viewed **[here](https://forecast-page.netlify.app/)**.

# Usage
Type the desired location into the search field and press enter 🤷‍♂️

# Local Usage
After cloning the repository to you local machine, if ```npm``` and ```ng``` are 
installed, app can be run in developement mode via executing: <br/>
```
npm i
ng serve
```
Note: For local deployment, free [Geocodify](https://geocodify.com/register) API key must be placed in 
*environment.ts* as 
'geoApiKey: [API key]'.

# Credits
Base weather icons come from
[Neelesh Chaudhary](https://www.figma.com/community/file/971051749541378755/weather-icons-community), and icons used in
other elements from [Huge Icons](https://hugeicons.com/icons?style=Stroke&type=Rounded).