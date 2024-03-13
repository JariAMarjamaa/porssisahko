// Base class for apis
export class ApiBase {
    baseURL;

    constructor() {
        this.baseURL = getRestUrl();
    }
};

const getRestUrl = () => {
    // should contain port. example: localhost:3000
    let host;
    let httpScheme;

    if (window) {
      host = window.location.host
      httpScheme = window.location.protocol;
    } else {
      httpScheme = "http"
      host = "localhost:3000"
    }
    const url = `${httpScheme}//${host}/`;
    return url;
  }