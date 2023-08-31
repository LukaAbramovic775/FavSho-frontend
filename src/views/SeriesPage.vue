<template>
  <div class="series-page">
    <div class="series-header">
      <h1>Explore Series</h1>
    </div>
    <div class="series-filter">
      <label for="platform-filter">Filter by Platform:</label>
      <select @change="FilterByPlatform($event.target.value)" id="platform-filter" class="select-platform">
        <option value="all" selected>All Platforms</option>
        <option v-for="series in uniqueSeries" :key="series.id" :value="series.platform">{{ series.platform }}</option>
      </select>
    </div>
    <div class="series-list">
      <ul class="series-items">
        <li v-for="series in filteredSeries" :key="series.id" class="series-item">
          <div class="series-card">
            <div class="series-thumbnail">
              <img :src="series.image" alt="Series Image">
            </div>
            <div class="series-info">
              <h2 class="series-title">{{ series.name }}</h2>
              <p class="series-description">{{ series.description }}</p>
              <div class="series-actions">
                <button @click="addToWatchlist(series.name, series.image, series.description)" class="heart-button">
                  <i class="fas fa-heart"></i> Add to Watchlist
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { Auth, showService } from '@/service/index.js';

export default {
  name: 'SeriesPage',
  data() {
    return {
      series: [],
      uniqueSeries: [],
      filteredSeries: [],
      auth: Auth,
    };
  },
  methods: {
    async FilterByPlatform(platform) {
      if (platform === "all") {
        this.filteredSeries = await showService.getData();
      } else {
        this.filteredSeries = await showService.filterByPlatform(platform);
      }
    },
    async addToWatchlist(name, image, description) {
      let series_watchlist={
        name: name,
        image: image,
        description: description,
        user: this.auth.userEmail,
      };
      await showService.watchlist1(series_watchlist);
    },
  },
  watch: {
    series: {
      handler: function(newSeries) {
        if (Array.isArray(newSeries)) {
          const uniquePlatforms = [...new Set(newSeries.map(series => series.platform))];
          this.uniqueSeries = uniquePlatforms.map(platform => {
            return newSeries.find(series => series.platform === platform);
          });
        }
      },
      immediate: true,
    },
  },
  async created() {
    this.series = await showService.getData();
    this.filteredSeries = this.series;
  },
};
</script>

<style scoped>
.series-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.series-header {
  text-align: center;
  margin-bottom: 20px;
}

.series-filter {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.select-platform {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.series-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.series-item {
  margin-bottom: 20px;
}

.series-card {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.series-thumbnail img {
  max-width: 120px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

.series-info {
  margin-left: 10px;
}

.series-title {
  font-size: 1.4rem;
  margin: 0 0 10px;
}

.series-description {
  color: #555;
  margin: 0;
}

.heart-button {
  border: none;
  background-color: #ff5050;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.heart-button:hover {
  background-color: #ff3333;
}

</style>