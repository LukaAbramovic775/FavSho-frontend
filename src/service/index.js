import axios from 'axios';

// instanca axios-a za potrebe FavShO backenda
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
});



let Auth = {
    async login(username, password) {
        let response = await Service.post("/prijava", {
            username: username,
            password: password
        });
        console.log(response)
        let user = await response.data;
        localStorage.setItem("user", JSON.stringify(user));
        return true;
    },
    logout() {
        localStorage.removeItem("user");
    },
    getUser() {
        return JSON.parse(localStorage.getItem("user"))
    },
    
};

export { Auth, Service}