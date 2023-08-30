<template>
  <div class="custom-watchlist">
    <h1 class="custom-watchlist-title">My Series Watchlist</h1>
    <div class="custom-watchlist-content">
      <div v-if="series.length === 0" class="custom-watchlist-empty">
        <p>Your watchlist is currently empty.</p>
      </div>
      <div v-else>
        <div v-for="series in series" :key="series.id" class="custom-watchlist-series">
          <div class="custom-watchlist-series-info">
            <div class="custom-watchlist-series-thumbnail">
              <img :src="series.image" alt="Series Image">
            </div>
            <div class="custom-watchlist-series-details">
              <h2 class="custom-watchlist-series-title">{{ series.name }}</h2>
              <p class="custom-watchlist-series-description">{{ series.description }}</p>
            </div>
          </div>
          <button @click="removeFromWatchlist(series.id)" class="custom-watchlist-remove-button">
            Remove from Watchlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, showService, Service } from '@/service/index.js';
export default {
  name: 'Watchlist',
  data() {
    return {
      series: [],
      auth: Auth.state,
    };
  },
  methods: {
        async removeFromWatchlist(id){
            await showService.watchlist3(id);
            console.log("id",id)
            this.$router.go();
        }
    },
    async add(){
        this.series = await showService.watchlist2(this.auth.userEmail);
    }
  }
</script>

<style scoped>
.custom-watchlist {
  text-align: center;
  margin: 20px;
}

.custom-watchlist-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.custom-watchlist-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-watchlist-empty {
  font-size: 18px;
  margin: 30px;
}

.custom-watchlist-series {
  display: flex;
  align-items: center;
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.custom-watchlist-series-info {
  display: flex;
  align-items: center;
}

.custom-watchlist-series-thumbnail {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.custom-watchlist-series-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-watchlist-series-details {
  text-align: left;
}

.custom-watchlist-series-title {
  font-size: 20px;
  margin-bottom: 5px;
}

.custom-watchlist-series-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.custom-watchlist-remove-button {
  background-color: #ff6347;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.custom-watchlist-remove-button:hover {
  background-color: #e5563e;
}
</style>