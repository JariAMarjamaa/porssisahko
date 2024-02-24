import { asyncFetchPorssisahkoNet, /* asyncFetchPrice, Prices*/ } from "./api.jsx";
import { formatTime }  from './helpers/stringFormating';

let cachedPrices = null;
const CACHE_KEY = 'electricity_price_cache';

export async function ReadElectricityPriceData(fetchDate, userSelection) {
  return new Promise(async (resolve, reject) => {
    try {

      let state = "success";
      let message = "Data luettu";

      const currentDate = new Date().toDateString();
      var cachedData = localStorage.getItem(CACHE_KEY);

      if (userSelection !== "FALSE")
      {
        cachedData = null;
      }

      if (cachedData) {
        try {
          // Parse the cached data
          cachedPrices = JSON.parse(cachedData);
  
          // Check if the parsed data is an array
          if (!Array.isArray(cachedPrices.data)) {
            //throw new Error('Cached data is not an array.');
            console.error("ReadElectricityPriceData. Cache virhe! Data formaatti väärä!");
            resolve({ priceData: null, priceOptions: null, respState: "error", msg: "Cache virhe! Data formaatti väärä!" });
          }
  
          // Check if the date has changed since the last request
          if (currentDate !== cachedPrices.lastRequestDate && cachedPrices.userRequest === "FALSE") {
            // API request is needed
            state = "info";
            message = "Cachen oletustieto vanhentunut. Luettu uusi data";
            //const hinnat = await Prices.getPrices();
            const hinnat = await asyncFetchPorssisahkoNet(fetchDate, userSelection);
  
            // Update the cache and last request date
            cachedPrices = {
              data: hinnat,
              lastRequestDate: currentDate,
              userRequest: userSelection /*!== "PörssiFailSimulaatio"*/
            };
  
            // Save updated cache to localStorage
            localStorage.setItem(CACHE_KEY, JSON.stringify(cachedPrices));
          } else {
            // Use cached data
            state = "info";
            message = cachedPrices.userRequest === "TRUE" ? "Käyttäjän valitsema data luettu Cachesta" : "Oletustieto luettu Cachesta";
            //console.log("ReadElectricityPriceData. Cache validi, käytä sitä");
          }
        } catch (error) {
          // Handle errors related to parsing or cached data format
          //console.error('ReadElectricityPriceData. Error parsing cached data:', error);
  
          // Proceed with fetching data from the API
          //throw new Error('Fetch from API needed.');
          //console.error("ReadElectricityPriceData. Cache virhe! Data luku epäonnistui!");
          resolve({ priceData: null, priceOptions: null, respState: "error", msg: "Cache virhe! Data luku epäonnistui!" });
        }
      } else {
        // No cached data, API request is needed
        //const hinnat = await asyncFetchPrice();
        //const hinnat = await Prices.getPrices();
        //console.log("ReadElectricityPriceData. Cache tyhjä tai päivä vaihdettu. Hae hinnat. Date: ",fetchDate);

        const hinnat = await asyncFetchPorssisahkoNet(fetchDate, userSelection);

        // Update the cache and last request date
        cachedPrices = {
          data: hinnat,
          lastRequestDate: currentDate,
          userRequest: userSelection === "TRUE" ? "TRUE" : "FALSE" //reseting is also default action, not made by user 
        };
  
        // Save cache to localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedPrices));
      }

      // Use either cached or newly fetched data
      const hintaData = cachedPrices.data.map((item) => parseFloat(item.hinta));

      //const aikaleimat = cachedPrices.data.map((item) => formatTime(item.aikaleima_suomi));
      //console.log("window.innerWidth: ", window.innerWidth);
      const aikaleimat = cachedPrices.data.map((item, index) => {
        const formattedTime = formatTime(item.aikaleima_suomi);
        
        // Check if window width is less than 600 and index is odd
        if (window.innerWidth < 600 && index % 2 !== 0) {
          return ''; // Set label as empty string
        }
      
        return formattedTime;
      });

      const priceData= {
        datasets: [{
          label: 'Pohjoismaiden Sähköpörssin sähkön hinta',
          data: hintaData,
          fill: false,
          borderColor: 'blue',
          backgroundColor: "blue",
          tension: 0.1,
        },],
      };

      const priceOptions = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 2, // Adjust chart height/width ratio, to fit the x-axsis titles
        scales: {
          x: {
            type: 'category',
            labels: aikaleimat,
    
            //set 90-degree angle
            angleLines: {
              display: true,
              color: 'black', 
              lineWidth: 1,
            },
            ticks: {
              maxRotation: 90, // Set the angle of rotation
              minRotation: 90,
              autoSkip: false, // Disable automatic skipping of labels
              //fontSize: window.innerWidth < 600 ? 1 : 12, // Adjust the font size based on screen width
              //maxTicksLimit: window.innerWidth < 600 ? 20 : aikaleimat.length // Maximum number of visible ticks
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      };

      resolve({ priceData, priceOptions, respState: state, msg: message });
 
    } catch (error) {
      console.error("ReadElectricityPriceData. Error fetching price data:", error);
      // Handle error or return a default value
      resolve({ priceData: null, priceOptions: null, respState: "error", msg: "Pörssi virhe! Soita WallStreetille!" });
    }
  });
}
