/*Käytetään Pörssisähko.net:n tarjoamaan tietoa*/
export const info = (
    <div>
      Käytetään Pörssisähko.net:n tarjoamaan tietoa
    </div>
);

//Joko <Fragment> tai tyhjä elementti <> niin ei tule warningia, että div ei olla p elementi sisässä
//Koska MUI komponentit käyttää sitä
export const toc = (
  <>
    - Sivu 1: Pääsivu
    <br/>
    - Sivu 2: Tietoja sovelluksesta
    <br/>
    - Sivu 3: CV + Robottitestaus video
    <br/>
    - Sivu 4: Palautteen anto
    <br/>
    - Sivu 5: ToDo - lista
  </>
);

export const priceInfo = (lowestPrice, highestPrice) => (
  <>
    Halvin hinta on {lowestPrice}
    <br/>
    Korkein hinta on {highestPrice}
    <br/>
  </>
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

export const maxRequestMadeUpdate = (
  <>
    Haku kerrat on rajoitettu 2 viikossa!
    <br/>
    Haluatko päivittää käppyrän viimeisimmällä tiedolla?
  </>
);

export const maxRequestMade = (
  <>
    Haku kerrat on rajoitettu 2 viikossa!
  </>
);



