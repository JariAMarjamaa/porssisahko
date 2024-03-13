import { ApiBase } from "./apiBase.js";

export class BackendApi extends ApiBase {
    //constructor() {
    //  super(); //taritaan vain jos extendedataaan
    //}

    async logIn(data) {
      console.log("BACKEND API. logIn. this.baseURL: ",this.baseURL);

      let resp = {
        status: 0,
        userId: "",
        msg: ""
      };

      const response = fetch("http://localhost:4000/LogIn", {
      //const response = fetch("https://backend-nu-mauve.vercel.app/LogIn", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data/*userData*/)})
        .then(response => {             //promise response
          //MySQL if (!response.ok) {
          // Handle non-success status codes here
          resp.status = response.status;
          // }
          return response.json(response);
        })
        .then(data => { 
          resp.userId = data.userId;
          resp.msg    = data.errorMsg;
          return resp;
        })
        .catch(error => {
          return error;
        });
      return response;
    }
}
  