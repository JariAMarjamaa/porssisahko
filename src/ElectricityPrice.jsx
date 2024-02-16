import { asyncFetchPrice, asyncFetchPorssisahkoNet, Prices } from "./api.jsx";

let cachedPrices = null;
const CACHE_KEY = 'electricity_price_cache';

let testi = 1;

export async function ReadElectricityPriceData() {
  return new Promise(async (resolve, reject) => {
    try {

      let state = "success";
      let message = "Cache tyhjä. Data luettu";

      const currentDate = new Date().toDateString();
      const cachedData = localStorage.getItem(CACHE_KEY);

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
          if (currentDate !== cachedPrices.lastRequestDate) {
            // API request is needed
            console.log("ReadElectricityPriceData. Päiväys vanhentunut. Hae uusi data");
            state = "info";
            message = "Cache vanhentunut. Luettu uusi data";
            //const hinnat = await Prices.getPrices();
            const hinnat = await asyncFetchPorssisahkoNet();
  
            // Update the cache and last request date
            cachedPrices = {
              data: hinnat,
              lastRequestDate: currentDate,
            };
  
            // Save updated cache to localStorage
            localStorage.setItem(CACHE_KEY, JSON.stringify(cachedPrices));
          } else {
            // Use cached data
            state = "info";
            message = "Data luettu Cachen muistista";
            console.log("ReadElectricityPriceData. Cache validi, käytä sitä");
          }
        } catch (error) {
          // Handle errors related to parsing or cached data format
          //console.error('ReadElectricityPriceData. Error parsing cached data:', error);
  
          // Proceed with fetching data from the API
          //throw new Error('Fetch from API needed.');
          console.error("ReadElectricityPriceData. Cache virhe! Data luku epäonnistui!");
          resolve({ priceData: null, priceOptions: null, respState: "error", msg: "Cache virhe! Data luku epäonnistui!" });
        }
      } else {
        // No cached data, API request is needed
        //const hinnat = await asyncFetchPrice();
        //const hinnat = await Prices.getPrices();
        const hinnat = await asyncFetchPorssisahkoNet();

        console.log("ReadElectricityPriceData. Cache tyhjä. Hae hinnat");

        // Update the cache and last request date
        cachedPrices = {
          data: hinnat,
          lastRequestDate: currentDate,
        };
  
        // Save cache to localStorage
        localStorage.setItem(CACHE_KEY, JSON.stringify(cachedPrices));
      }

      //const hintaData = hinnat.map((item) => parseFloat(item.hinta));
      //const aikaleimat = hinnat.map((item) => formatTime(item.aikaleima_suomi)); // Format time as desired
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

// Helper function to format time
function formatTime(timeString) {
  const date = new Date(timeString);
  const formattedDate = `${padWithZero(date.getDate())}.${padWithZero(date.getMonth() + 1)}.${date.getFullYear()}`;
  //const formattedTime = `${padWithZero(date.getHours())}.${padWithZero(date.getMinutes())}`;
  const formattedTime = `${padWithZero(date.getHours())}` === "23" ? "Klo: 24" : "Klo: " +`${padWithZero(date.getHours())}`;
  
  return `${formattedDate} - ${formattedTime}`;
}

// Helper function to pad a number with a leading zero if needed
function padWithZero(number) {
  return number.toString().padStart(2, '0');
}

// for unit testing
export { formatTime, padWithZero };
