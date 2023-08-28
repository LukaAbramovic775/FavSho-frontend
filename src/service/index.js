import axios from 'axios';

// instanca axios-a za potrebe FavShO backenda
let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
});

Service.interceptors.response.use(
    (response) => {
        console.log('Interceptor', response);
        return response;
    },
    (error) => {
        if (error.response == 401) {
            console.error('Interceptor', error.response)
        }
    }
);


let Auth = {
    async signUp(userData) {
        let post = await Service.post('/user', userData);
        return post
    },
    async login(email, password) {
        let response = await Service.post("/login", {
            email: email,
            password: password
        });
        console.log(response)
        let user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        return true;
    },
    logout() {
        localStorage.removeItem("user");
    },
    getUser() {
        return JSON.parse(localStorage.getItem("user"))
    },
    getToken() {
        let user = Auth.getUser();
        if (user && user.token) {
            return user.token
        }
        else {
            return false;
        }
    },
    state: {
        state: {
            get authenticated() {
              return Auth.authenticated();
            },
        },
        get userEmail() {
            let user = Auth.getUser()
            if (user) {
                return user.email;
            }
        }
    }
};
let showService = {
    async sendData(showService) {
        let postData = await Service.post('/series', showService);
        return postData;
    },
    async addShow(showData) {
        return this.sendData(showData);
      },
    async getData() {
        let response = await Service.get('/series');
        console.log("Backend: ", response);
        let data = response.data;

        data = data.map((doc) => {
            return {
                id: doc._id,
                name: doc.name,
                image: doc.image,
                description: doc.description,
                platform: doc.platform
            }
        });
        console.log("Data: ", data);
        return data;
    },
    async watchlist1(series_watchlist) {
        let watchlist2 = await Service.post('/favourite_series', series_watchlist);
        return watchlist2;
    },
    async filterByPlatform(platform) {

        let response = await Service.get(`/series/${platform}`);
        let doc = response.data;
        doc = doc.map((doc) => {
            console.log(doc);
            return {
                name: doc.name,
                image: doc.image,
                description: doc.description,
                platform: doc.platform
            }
        });
        return doc;
    },
}
export { Auth, Service, showService}
