var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var lat = document.querySelector('.lat');
var long = document.querySelector('.long');
var aqi = document.querySelector('.aqi');
var hum = document.querySelector('.hum');
var feels = document.querySelector('.feels');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var tempValue=null;
var nameValue=null;
var latValue=null;
var latValue=null;
var longValue=null;
var aqiValue=null;

function a()
{
  fetch('https://api.openweathermap.org/data/2.5/weather?q='+input.value+'&appid=7031deafbb01e5bded284c1ab5dd580c')
.then(response => response.json())
.then(data => {
  var tempValue = data['main']['temp'];
  tempValue=parseInt(tempValue-273);
  var nameValue = data['name'];
  var descValue = data['weather'][0]['description'];
  var latValue = data['coord']['lat'];
  var longValue = data['coord']['lon'];
  var humValue = data['main']['humidity'];
  var feelsValue = data['main']['feels_like'];
  feelsValue=parseInt(feelsValue-273);
  main.innerHTML = nameValue;
  desc.innerHTML = "Desc - "+descValue;
  temp.innerHTML = "Temp - "+tempValue;
  feels.innerHTML = "Feels Like - "+feelsValue;
  hum.innerHTML = "Humidity - "+humValue+"%";
  lat.innerHTML = "Latitute - "+latValue;
  long.innerHTML = "Longitude - "+longValue;
  b(latValue,longValue);
})

}
function b(latValue,longValue)
{
  fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+latValue+'&lon='+longValue+'&appid=7031deafbb01e5bded284c1ab5dd580c')
  .then(responset => responset.json())
  .then(datat => {
    var aqiValue = datat['list'][0]['main']['aqi'];
    aqi.innerHTML = "AQI - "+aqiValue;
    exit(0);
  })
}

button.addEventListener('click', function(name){

try{
  a();
  main.innerHTML = "Place not Found!";
}


catch(err)
{
  main.innerHTML = err.message;
}
})

