<template>
    <div>
      <div class="content">
        <h2>Add a TV Show</h2>
        <form @submit.prevent="addShow">
          <div class="input-group">
            <label for="showName">Show Name:</label>
            <input v-model="showData.name" type="text" id="showName">
          </div>
          <div class="input-group">
            <label for="showImage">Show Image URL:</label>
            <input v-model="showData.image" type="text" id="showImage">
          </div>
          <div class="input-group">
            <label for="showDescription">Show Description:</label>
            <textarea v-model="showData.description" id="showDescription" rows="4"></textarea>
          </div>
          <div class="input-group">
            <label for="platform">Platform:</label>
            <select v-model="showData.platform">
              <option v-for="platform in platforms" :key="platform">{{ platform }}</option>
            </select>
          </div>
          <div class="input-group">
            <button type="submit">Add Show</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { showService } from "@/services/index.js";
  
  export default {
    data() {
      return {
        showData: {
          name: "",
          image: "",
          description: "",
          platform: "Netflix",
        },
        platforms: ["Netflix", "HBO", "Disney", "Amazon Prime Video"],
      };
    },
    methods: {
      async addShow() {
        if (
          this.showData.name === "" ||
          this.showData.image === "" ||
          this.showData.description === ""
        ) {
        } else {
          await showService.addShow(this.showData);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .content {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .input-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="text"],
  textarea,
  select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  </style>











