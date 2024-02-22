/*Käytetään Pörssisähko.net:n tarjoamaan tietoa*/
export const info = (
    <div>
      Taas käytetään Pörssisähko.net:n tarjoamaan tietoa
    </div>
);

export const toc = (
  <div>
    - Sivu 1: Pääsivu
    <br/>
    - Sivu 2: Tietoja sovelluksesta
    <br/>
    - Sivu 3: CV
    <br/>
    - Sivu 4: Robottitestaus video
  </div>
);

export const priceInfo = (lowestPrice, highestPrice) => (
  <div>
    Halvin hinta on {lowestPrice}
    <br/>
    Korkein hinta on {highestPrice}
    <br/>
  </div>
);

export const CalendarInfoContent = (
  <div>
    Valitse päivä, josta taaksepäin haluat 7 päivältä hinta tiedot.
    <br/>
    Vain max. 2 hakua viikossa
  </div>
);

export const APITestContent = (
  <div>
    API Fail simulaatiota ei vielä tehty!!
  </div>
);

export const PriceRequestFail = (
  <div>
    Pörssi rikki!!
    <br/>
    Ei oo sähköä kenellekkään!
    <br/>
    Teslat talliin parkkiin, hus!!
  </div>
);



