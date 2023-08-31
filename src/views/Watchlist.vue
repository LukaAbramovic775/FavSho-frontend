<template>
  <div class="custom-watchlist">
    <h1 class="custom-watchlist-title">My Series Watchlist</h1>
    <div class="custom-watchlist-content">
      <div v-if="series.length === 0" class="custom-watchlist-empty">
        <p>Your watchlist is currently empty.</p>
      </div>
      <div v-else>
        <div v-for="seriesItem in series" :key="seriesItem.id" class="custom-watchlist-series">
          <div class="custom-watchlist-series-info">
            <div class="custom-watchlist-series-thumbnail">
              <img :src="seriesItem.image" alt="Series Image">
            </div>
            <div class="custom-watchlist-series-details">
              <h2 class="custom-watchlist-series-title">{{ seriesItem.name }}</h2>
              <p class="custom-watchlist-series-description">{{ seriesItem.description }}</p>
            </div>
          </div>
          <button @click="removeFromWatchlist(seriesItem.id)" class="custom-watchlist-remove-button">
            Remove from Watchlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Auth, showService } from '@/service/index.js';

export default {
  name: 'Watchlist',
  data() {
    return {
      series: [],
      auth: Auth.state,
    };
  },
  methods: {
    async fetchWatchlistSeries() {
      try {
        this.series = await showService.watchlist2(this.auth.userEmail);
      } catch (error) {
        console.error('Error fetching watchlist series:', error);
      }
    },
    async removeFromWatchlist(id) {
      try {
        await showService.watchlist3(id);
        console.log('Removed series with id:', id);
        this.series = this.series.filter(series => series.id !== id);
      } catch (error) {
        console.error('Error removing series:', error);
      }
    },
  },
  async created() {
    this.fetchWatchlistSeries();
  },
};
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