import { ApiBase } from "./apiBase.js";

export class BackendApi extends ApiBase {
    //constructor() {
    //  super(); //taritaan vain jos extendedataaan
    //}

    async logIn(data) {
      console.log("API. LOGIN. this.baseURL: ",this.baseURL);

      let resp = {
        status: 0,
        userId: "",
        msg: ""
      };

      //const response = fetch("http://localhost:4000/LogIn", {
      const response = fetch("https://backend-nu-mauve.vercel.app/LogIn", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)})
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

    async logOut(userID) {
      console.log("API. LOGOUT. this.baseURL: ",this.baseURL);

      let resp = {
        status: 0,
        userId: "",
        msg: ""
      };

      //const response = fetch("http://localhost:4000/LogOut", {
      const response = fetch("https://backend-nu-mauve.vercel.app/LogOut", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userId: userID})})
        .then(response => {
          resp.status = response.status;
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

    async signIn(data) {
      console.log("API. SIGIN. this.baseURL: ",this.baseURL);

      let resp = {
        status: 0,
        userId: "",
        msg: ""
      };

      //Myös SignIn post-metodilla, muuten parametrit näkyy urlissa
      //const response = fetch("http://localhost:4000/SignIn", {
      const response = fetch("https://backend-nu-mauve.vercel.app/SignIn", { 
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)})
        .then(response => { 
          resp.status = response.status;
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
  