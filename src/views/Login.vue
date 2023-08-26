<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 class="text-center mb-5">This is a login page</h1>
            </div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col">
                <form @submit.prevent="login">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" class="form-text text-muted">
                            <br>
                            We'll never share your email with anyone else.
                            <br>
                            <br>
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Password"
                        />
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary mt-5">Submit</button>
                </form>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script>
import { Auth } from '@/service/index.js';
import store from '@/store.js';

export default {
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods:{
    async login(){
		let success = await Auth.login(this.email, this.password);
        if(success == true){
            store.authenticated = true;
            store.email=this.email;
            this.$router.push({path:'/'})
            .then(() => {
              this.$router.go();
            });
        console.log('Login result', success);

        }
        console.log("Authenticated: ",store.authenticated)
      },
  }
};
</script>