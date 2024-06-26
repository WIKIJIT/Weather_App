var input = document.querySelector(".input_text");
var main = document.querySelector("#name");
var temp = document.querySelector(".temp");
var desc = document.querySelector(".desc");
var lat = document.querySelector(".lat");
var long = document.querySelector(".long");
var aqi = document.querySelector(".aqi");
var pmI = document.querySelector(".pmI");
var o3I = document.querySelector(".o3I");
var hum = document.querySelector(".hum");
var co = document.querySelector(".co");
var feels = document.querySelector(".feels");
var clouds = document.querySelector(".clouds");
var button = document.querySelector(".submit");

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
});

function getAQI(latValue, longValue) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
      latValue +
      "&lon=" +
      longValue +
      "&appid=7031deafbb01e5bded284c1ab5dd580c"
  )
    .then((responset) => responset.json())
    .then((datat) => {
      var coValue = datat["list"][0]["components"]["co"] * 0.001;
      var o3Value = datat["list"][0]["components"]["o3"];
      var pm10Value = datat["list"][0]["components"]["pm10"];

      // Calculate AQI
      var cValue = coc(coValue);
      var oValue = ozone(o3Value);
      var pmValue = pm(pm10Value);
      var aqiValue = Math.max(cValue, oValue, pmValue);

      // Return AQI and related data
      return {
        aqiValue: aqiValue,
        coValue: coValue,
        o3Value: o3Value,
        pm10Value: pm10Value,
      };
    });
}

function ozone(o3) {
  var IHi = null;
  var Ilo = null;
  var BPHi = null;
  var BPlo = null;
  var Cp = null;
  var o3Index = null;
  if (o3 >= 0 && o3 <= 50) {
    IHi = 50;
    Ilo = 0;
    BPHi = 50;
    BPlo = 0;
    Cp = o3;
    o3Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (o3 >= 51 && o3 <= 100) {
    IHi = 100;
    Ilo = 51;
    BPHi = 100;
    BPlo = 51;
    Cp = o3;
    o3Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (o3 >= 101 && o3 <= 168) {
    IHi = 200;
    Ilo = 101;
    BPHi = 168;
    BPlo = 101;
    Cp = o3;
    o3Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (o3 >= 169 && o3 <= 208) {
    IHi = 300;
    Ilo = 201;
    BPHi = 208;
    BPlo = 169;
    Cp = o3;
    o3Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (o3 >= 209 && o3 <= 748) {
    IHi = 400;
    Ilo = 301;
    BPHi = 748;
    BPlo = 209;
    Cp = o3;
    o3Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else {
    IHi = 500;
    Ilo = 401;
    BPHi = 1000;
    BPlo = 748;
    Cp = o3;
    o3Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  }
  return o3Index;
}
function pm(pm10) {
  var IHi = null;
  var Ilo = null;
  var BPHi = null;
  var BPlo = null;
  var Cp = null;
  var pm10Index = null;
  if (pm10 >= 0 && pm10 <= 50) {
    IHi = 50;
    Ilo = 0;
    BPHi = 50;
    BPlo = 0;
    Cp = pm10;
    pm10Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (pm10 >= 51 && pm10 <= 100) {
    IHi = 100;
    Ilo = 51;
    BPHi = 100;
    BPlo = 51;
    Cp = pm10;
    pm10Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (pm10 >= 101 && pm10 <= 250) {
    IHi = 200;
    Ilo = 101;
    BPHi = 250;
    BPlo = 101;
    Cp = pm10;
    pm10Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (pm10 >= 251 && pm10 <= 350) {
    IHi = 300;
    Ilo = 201;
    BPHi = 350;
    BPlo = 251;
    Cp = pm10;
    pm10Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (pm10 >= 351 && pm10 <= 430) {
    IHi = 400;
    Ilo = 301;
    BPHi = 430;
    BPlo = 351;
    Cp = pm10;
    pm10Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else {
    IHi = 500;
    Ilo = 401;
    BPHi = 510;
    BPlo = 431;
    Cp = pm10;
    pm10Index = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  }
  return pm10Index;
}
function coc(co) {
  var IHi = null;
  var Ilo = null;
  var BPHi = null;
  var BPlo = null;
  var Cp = null;
  var coIndex = null;
  if (co >= 0 && co <= 1) {
    IHi = 50;
    Ilo = 0;
    BPHi = 1;
    BPlo = 0;
    Cp = co;
    coIndex = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (co >= 1.1 && co <= 2) {
    IHi = 100;
    Ilo = 51;
    BPHi = 2;
    BPlo = 1.1;
    Cp = co;
    coIndex = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (co >= 2.1 && co <= 10) {
    IHi = 200;
    Ilo = 101;
    BPHi = 10;
    BPlo = 2.1;
    Cp = co;
    coIndex = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (co >= 10.1 && co <= 17) {
    IHi = 300;
    Ilo = 201;
    BPHi = 17;
    BPlo = 10.1;
    Cp = co;
    coIndex = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else if (co >= 17.1 && co <= 34) {
    IHi = 400;
    Ilo = 301;
    BPHi = 34;
    BPlo = 17.1;
    Cp = co;
    coIndex = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  } else {
    IHi = 500;
    Ilo = 401;
    BPHi = 69;
    BPlo = 34.1;
    Cp = co;
    coIndex = ((IHi - Ilo) / (BPHi - BPlo)) * (Cp - BPlo) + Ilo;
  }
  return coIndex;
}

button.addEventListener("click", function (name) {
  try {
    if (input.value === "") return;
    document.querySelector("#app-container").style.display = "block";
    main.innerHTML = "Loading...";
    desc.innerHTML = null;
    temp.innerHTML = null;
    feels.innerHTML = null;
    hum.innerHTML = null;
    lat.innerHTML = null;
    long.innerHTML = null;
    aqi.innerHTML = null;
    co.innerHTML = null;
    pmI.innerHTML = null;
    o3I.innerHTML = null;

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        input.value +
        "&appid=7031deafbb01e5bded284c1ab5dd580c"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        try {
          var tempValue = data["main"]["temp"];
          tempValue = parseInt(tempValue - 273);
          var nameValue = data["name"];
          var descValue = data["weather"][0]["description"];
          var latValue = data["coord"]["lat"];
          var longValue = data["coord"]["lon"];
          var humValue = data["main"]["humidity"];
          var feelsValue = data["main"]["feels_like"];
          feelsValue = parseInt(feelsValue - 273);

          main.innerHTML = nameValue;
          desc.innerHTML = "Desc - " + descValue;
          temp.innerHTML = "Temp - " + tempValue + "°C";
          feels.innerHTML = "Feels Like - " + feelsValue + "°C";
          hum.innerHTML = "Humidity - " + humValue + "%";
          lat.innerHTML = "Latitude - " + latValue + "°";
          long.innerHTML = "Longitude - " + longValue + "°";

          getAQI(latValue, longValue)
            .then((aqiData) => {
              // Display AQI and related data
              aqi.innerHTML = "AQI - " + parseInt(aqiData.aqiValue);
              co.innerHTML = "CO - " + aqiData.coValue + " mg/m3";
              pmI.innerHTML = "PM10 - " + aqiData.pm10Value + " µg/m3";
              o3I.innerHTML = "O3 - " + aqiData.o3Value + " µg/m3";
            })
            .catch((error) => {
              console.error("Error fetching AQI data:", error);
              aqi.innerHTML = "AQI - " + "API ERROR!";
              co.innerHTML = "CO - " + "API ERROR!";
              pmI.innerHTML = "PM10 - " + "API ERROR!";
              o3I.innerHTML = "O3 - " + "API ERROR!";
              // Handle error if fetching AQI data fails
            });
        } catch (error) {
          console.error("Error processing weather data:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        main.innerHTML = "Place Not Found!!";
      });
  } catch (err) {
    console.log(err);
    main.innerHTML = "Place Not Found!!";
  }
});
