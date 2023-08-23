<template>
    <div>
        <div class="row">
            <div class="col">
                <h1 class="text-center mb-5">Sign up for tracking your favorite series</h1>
            </div>
        </div>
        <div class="row">
            <div class="col"></div>
            <div class="col">
                <form @submit.prevent="signup">
                    <div v-if="errorMessage" class="alert alert-danger">
                        <strong>Ups!</strong>
                        {{ errorMessage }}
                    </div>
                    <div class="form-group">
                        <label for="emailField">Email address</label>
                        <input
                            v-model="email"
                            type="email"
                            class="form-control"
                            id="emailField"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                        />
                        <small id="emailHelp" class="form-text text-muted">
                            We'll never share your email with anyone else.
                        </small>
                    </div>
                    <div class="form-group">
                        <label for="passwordField">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            class="form-control"
                            id="passwordField"
                            placeholder="Password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="confirmPasswordField">Confirm Password</label>
                        <input
                            v-model="password2"
                            type="password"
                            class="form-control"
                            id="confirmPasswordField"
                            placeholder="Confirm password"
                        />
                    </div>
                    <div class="form-group">
                        <label for="tipProfila">Tip profila</label>
                        <select v-model="odabraniTipProfila" id="tipProfila" class="form-control form-control-lg">
                            <option v-for="k in tipProfila">{{ k }}</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary mt-5">Submit</button>
                </form>
            </div>
            <div class="col"></div>
        </div>
    </div>
</template>

<script>
import store from '@/store.js'
import { Auth } from '@/service/index.js';
export default {
    data:function(){
        return{
            store,
            emptyStuff:null,
            email:'',
            password:''
        }
    },
    methods: {
        async registerUser(){
            if (this.email=='' || this.password==''){
                this.emptyStuff=true
            }
        else{
            let userData = {
                email:this.email, 
                password:this.password,
            }
            await Auth.signUp(userData).then(() => {
                this.$router.push({ path: '/login' });
                store.authenticated=true;
                store.currentUserEmail=this.email;
            });
            }
        },
    },
    
}
</script>