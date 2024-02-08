import { mockPrices } from './mockData/ElectricityPrice.mock-data.jsx';

export const asyncFetchPrice = async () => {
    
    // for github page implementation 
    // https://www.sahkohinta-api.fi/api/halpa?tunnit=24&tulos=sarja&aikaraja=";

    // for localhostia varten
    var baseUrl = "http://localhost:5000/api/halpa?tunnit=24&tulos=sarja&aikaraja=";
    let finalResp = []; // Initialize the final array

    for (var i=1; i <= 7; i++) // Start from yesterday
    {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);

        const formattedDate = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"

        console.log("i:", i, "formattedDate:", formattedDate);

        const one_resp = await fetch(baseUrl + formattedDate).then(response => response.json());
        // Use the spread operator to concatenate the arrays
        finalResp.push(...one_resp);
    }
    
    //testi saitti, ettei tule request määrän rajoitus vastaan
    //const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    //.then(response => response.json());
    //.then(json => console.log(json));
    
    //const data = await resp.json();
    console.log("API. Resp:", finalResp);

    return finalResp;
}

export const asyncFetchPorssisahkoNet = async () => {
    
    // for github page implementation 
    var baseUrl = "https://api.porssisahko.net/v1/price.json?date"; // =2024-02-05&hour=0";
    
    // for localhostia varten
    //var baseUrl = "http://localhost:5000/v1/price.json?date="; // 2024-02-05&hour=0
    let finalResp = []; // Initialize the final array

    for (var i=1; i <= 7; i++) // Start from yesterday
    {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - i);

        const formattedDate = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
     
        for (var z=0; z<25; z=z+6)
        {
            var suffixUrl = formattedDate + "&hour=" +z;
            
            const one_resp = await fetch(baseUrl + suffixUrl).then(response => response.json());
            const part_resp = { aikaleima_suomi: formattedDate + "T00:00", hinta: one_resp.price };
            
            // Use push to concatenate the arrays
            finalResp.push(part_resp);
        }
    }
    
    // Sort the array in ascending order based on the date and hour
    finalResp.sort((a, b) => a.aikaleima_suomi.localeCompare(b.aikaleima_suomi));

    console.log("API. Resp:", finalResp);

    return finalResp;
}

class PriceApi {
    constructor(prices = mockPrices){
        this.prices = prices; //prices;
    }

    getPrices() {
        // Simulate a 5-second delay
        console.log("'API' call");
        return new Promise((resolve) => {
            setTimeout(() => {
                //console.log(`API call. Hinnat: ${this.prices}`);    //hox `` täytyy käyttä ko merkkejä, kun interpoloidaan dollarilla
                resolve(this.prices);
            }, 10000); // 5000 milliseconds = 5 seconds
        });
    }
}

export const Prices = new PriceApi();
