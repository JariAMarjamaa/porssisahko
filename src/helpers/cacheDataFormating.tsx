import { formatDate, formatTime } from "./stringFormating";

const CACHE_KEY = 'electricity_price_cache';

export function formatPriceCacheForExcel(): [any, string | null] {
    var cachedData = localStorage.getItem(CACHE_KEY);
    var errorMsg: string = "Virhe.";
    var data: any = []; 

    if (cachedData) {
        try {
            // Parse the cached data
            let cachedPrices = JSON.parse(cachedData);
    
            // Check if the parsed data is an array
            if (!Array.isArray(cachedPrices.data)) {
                errorMsg = "Virhe. Pörssi on hunningolla! \n Ei saatavilla selkeitä hintatietoja!";
                return [null, errorMsg];
            }
            
            cachedPrices.data.forEach((item: any, index: number) => {
                const dateData   = formatDate(item.aikaleima_suomi);
                const timeData   = formatTime(item.aikaleima_suomi);
                const priceaData = parseFloat(item.hinta);
                
                item = {
                    pvm: index % 4 === 0 ? dateData : "",
                    klo: timeData,
                    hinta: priceaData
                };
                data.push(item);
              });
            return [data, null];
        } catch (error) {
            errorMsg = "Virhe. Pörsistä epäselvä tulos!";
            return [null, errorMsg]
        }
   
    }
    else {
        errorMsg = "Virhe. Pörssi on tyhjä! \n Ei saatavilla hintatietoja!";
        return [null, errorMsg]
    }
}