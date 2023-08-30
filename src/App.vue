<template>
  <nav>
  <li v-if="authenticated">
    <router-link to="/">SeriesPage</router-link> |
  </li>
  <li v-if="authenticated">
    <router-link to="/watchlist">Watchlist</router-link> |
  </li>
    <li v-if="authenticated">
    <router-link to="/show">Show</router-link> |
  </li>
    <li v-if="!authenticated">
    <router-link to="/login">Login</router-link> |
  </li>
    <li v-if="!authenticated">
    <router-link to="/signup">Signup</router-link> |
  </li>
   <span v-if="authenticated">
                                    <a @click="logout" class="btn btn-info my-2 my-sm-0 mr-2" href="#">Logout</a>
                                </span>
  </nav>
  <router-view/>
</template>
<script>
import store from '@/store.js';
import { Auth } from '@/service/index.js';

export default {
  data() {
    return {
      moja_varijabla: 1,
      authenticated: Auth.state.authenticated, 
      userEmail: Auth.state.userEmail,
    };
  },
  methods: {
    logout() {
      Auth.logout();
      this.$router.go();
    },
  },
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
