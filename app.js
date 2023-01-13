var input = document.querySelector('.input_text');
var main = document.querySelector('#name');
var temp = document.querySelector('.temp');
var desc = document.querySelector('.desc');
var lat = document.querySelector('.lat');
var long = document.querySelector('.long');
var aqi = document.querySelector('.aqi');
var hum = document.querySelector('.hum');
var co = document.querySelector('.co');
var feels = document.querySelector('.feels');
var clouds = document.querySelector('.clouds');
var button= document.querySelector('.submit');
var tempValue=null;
var nameValue=null;
var latValue=null;
var latValue=null;
var longValue=null;
var aqiValue=null;
var coValue=null;
var o3=null;
var pm25=null;
var IHi = null;
var Ilo = null;
var BPHi = null;
var BPlo = null;
var Cp = null;
var o3Index = null;
var pm25Index = null;
var coIndex = null;
var oValue;
var cValue;
var pmValue;

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
  var ts = Math.round((new Date()).getTime() / 1000);
  fetch('http://api.openweathermap.org/data/2.5/air_pollution?lat='+latValue+'&lon='+longValue+'&appid=7031deafbb01e5bded284c1ab5dd580c')
  .then(responset => responset.json())
  .then(datat => {
    //var aqiValue = datat['list'][0]['main']['aqi'];
    var coValue = datat['list'][0]['components']['co']*0.00087;
    var o3Value = datat['list'][0]['components']['o3']*0.51;
    var pm25Value = datat['list'][0]['components']['pm2_5'];
    var cValue=coc(coValue);
    var oValue=ozone(o3Value);
    var pmValue=pm(pm25Value);
    //var aqiValue = calculateAQI(o3Value ,pm25Value, coValue);
    aqiValue = Math.max(aqiValue,cValue);
    aqiValue = Math.max(aqiValue,oValue);
    aqiValue = Math.max(aqiValue,pmValue);
    aqi.innerHTML = "AQI - "+aqiValue;
    co.innerHTML = "CO - "+coValue;
    exit(0);
  })
}

// function calculateAQI(o3, pm25, co) {
//   var aqiv = null;
//   var IHi = null;
//   var Ilo = null;
//   var BPHi = null;
//   var BPlo = null;
//   var Cp = null;
//   var o3Index = null;
//   var pm25Index = null;
//   var coIndex = null;
//   // Ozone (O3) calculation
  
//   if (o3>=0 && o3<=50)
//   {
//     IHi=50;
//     Ilo=0;
//     BPHi=50;
//     BPlo=0;
//     Cp=o3;
//     o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(o3>=51 && o3<=100)
//   {
//     IHi=100;
//     Ilo=51;
//     BPHi=100;
//     BPlo=51;
//     Cp=o3;
//     o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(o3>=101 && o3<=168)
//   {
//     IHi=200;
//     Ilo=101;
//     BPHi=168;
//     BPlo=101;
//     Cp=o3;
//     o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(o3>=169 && o3<=208)
//   {
//     IHi=300;
//     Ilo=201;
//     BPHi=208;
//     BPlo=169;
//     Cp=o3;
//     o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(o3>=209 && o3<=748)
//   {
//     IHi=400;
//     Ilo=301;
//     BPHi=748;
//     BPlo=209;
//     Cp=o3;
//     o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else
//   {
//     IHi=500;
//     Ilo=401;
//     BPHi=1000;
//     BPlo=748;
//     Cp=o3;
//     o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   aqiv = Math.max(aqiv, o3Index);

//   // Particulate matter (PM2.5) calculation
  
//   if(pm25>=0 && pm<=30)
//   {
//     IHi=50;
//     Ilo=0;
//     BPHi=30;
//     BPlo=0;
//     Cp=pm25;
//     pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(pm25>=31 && pm<=60)
//   {
//     IHi=100;
//     Ilo=51;
//     BPHi=60;
//     BPlo=31;
//     Cp=pm25;
//     pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(pm25>=61 && pm<=90)
//   {
//     IHi=200;
//     Ilo=101;
//     BPHi=90;
//     BPlo=61;
//     Cp=pm25;
//     pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(pm25>=91 && pm<=120)
//   {
//     IHi=300;
//     Ilo=201;
//     BPHi=120;
//     BPlo=91;
//     Cp=pm25;
//     pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(pm25>=121 && pm<=250)
//   {
//     IHi=400;
//     Ilo=301;
//     BPHi=250;
//     BPlo=121;
//     Cp=pm25;
//     pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else
//   {
//     IHi=500;
//     Ilo=401;
//     BPHi=379;
//     BPlo=250;
//     Cp=pm25;
//     pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   aqiv = Math.max(aqiv, pm25Index);

//   // Carbon monoxide (CO) calculation

//   if(co>=0 && co<=1)
//   {
//     IHi=50;
//     Ilo=0;
//     BPHi=1;
//     BPlo=0;
//     Cp=co;
//     coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(co>=1.1 && co<=2)
//   {
//     IHi=100;
//     Ilo=51;
//     BPHi=2;
//     BPlo=1.1;
//     Cp=co;
//     coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(co>=2.1 && co<=10)
//   {
//     IHi=200;
//     Ilo=101;
//     BPHi=10;
//     BPlo=2.1;
//     Cp=co;
//     coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(co>=10.1 && co<=17)
//   {
//     IHi=300;
//     Ilo=201;
//     BPHi=17;
//     BPlo=10.1;
//     Cp=co;
//     coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else if(co>=17.1 && co<=34)
//   {
//     IHi=400;
//     Ilo=301;
//     BPHi=34;
//     BPlo=17.1;
//     Cp=co;
//     coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   else
//   {
//     IHi=500;
//     Ilo=401;
//     BPHi=69;
//     BPlo=34.1;
//     Cp=co;
//     coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
//   }
//   aqiv = Math.max(aqiv, coIndex);

//   return aqiv;
// }
function ozone(o3)
{
  var IHi = null;
  var Ilo = null;
  var BPHi = null;
  var BPlo = null;
  var Cp = null;
  var o3Index = null;
  if (o3>=0 && o3<=50)
  {
    IHi=50;
    Ilo=0;
    BPHi=50;
    BPlo=0;
    Cp=o3;
    o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(o3>=51 && o3<=100)
  {
    IHi=100;
    Ilo=51;
    BPHi=100;
    BPlo=51;
    Cp=o3;
    o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(o3>=101 && o3<=168)
  {
    IHi=200;
    Ilo=101;
    BPHi=168;
    BPlo=101;
    Cp=o3;
    o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(o3>=169 && o3<=208)
  {
    IHi=300;
    Ilo=201;
    BPHi=208;
    BPlo=169;
    Cp=o3;
    o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(o3>=209 && o3<=748)
  {
    IHi=400;
    Ilo=301;
    BPHi=748;
    BPlo=209;
    Cp=o3;
    o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else
  {
    IHi=500;
    Ilo=401;
    BPHi=1000;
    BPlo=748;
    Cp=o3;
    o3Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  return o3Index;
}
function pm(pm25)
{
  var IHi = null;
  var Ilo = null;
  var BPHi = null;
  var BPlo = null;
  var Cp = null;
  var pm25Index = null;
  if(pm25>=0 && pm<=30)
  {
    IHi=50;
    Ilo=0;
    BPHi=30;
    BPlo=0;
    Cp=pm25;
    pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(pm25>=31 && pm<=60)
  {
    IHi=100;
    Ilo=51;
    BPHi=60;
    BPlo=31;
    Cp=pm25;
    pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(pm25>=61 && pm<=90)
  {
    IHi=200;
    Ilo=101;
    BPHi=90;
    BPlo=61;
    Cp=pm25;
    pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(pm25>=91 && pm<=120)
  {
    IHi=300;
    Ilo=201;
    BPHi=120;
    BPlo=91;
    Cp=pm25;
    pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(pm25>=121 && pm<=250)
  {
    IHi=400;
    Ilo=301;
    BPHi=250;
    BPlo=121;
    Cp=pm25;
    pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else
  {
    IHi=500;
    Ilo=401;
    BPHi=379;
    BPlo=250;
    Cp=pm25;
    pm25Index= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  return pm25Index;
}
function coc(co)
{
  var IHi = null;
  var Ilo = null;
  var BPHi = null;
  var BPlo = null;
  var Cp = null;
  var coIndex = null;
  if(co>=0 && co<=1)
  {
    IHi=50;
    Ilo=0;
    BPHi=1;
    BPlo=0;
    Cp=co;
    coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(co>=1.1 && co<=2)
  {
    IHi=100;
    Ilo=51;
    BPHi=2;
    BPlo=1.1;
    Cp=co;
    coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(co>=2.1 && co<=10)
  {
    IHi=200;
    Ilo=101;
    BPHi=10;
    BPlo=2.1;
    Cp=co;
    coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(co>=10.1 && co<=17)
  {
    IHi=300;
    Ilo=201;
    BPHi=17;
    BPlo=10.1;
    Cp=co;
    coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else if(co>=17.1 && co<=34)
  {
    IHi=400;
    Ilo=301;
    BPHi=34;
    BPlo=17.1;
    Cp=co;
    coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  else
  {
    IHi=500;
    Ilo=401;
    BPHi=69;
    BPlo=34.1;
    Cp=co;
    coIndex= ((IHi - Ilo) / (BPHi - BPlo))*(Cp - BPlo) + Ilo;
  }
  return coIndex;
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

