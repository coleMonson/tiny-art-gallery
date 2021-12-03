<template>
<div class="gallery">

  <div class="art" v-for="currentArt in art" :key="currentArt.id">
    <h2>{{currentArt.title}}</h2>

    <div class="art-grid">
      <div v-for="(color, index) in currentArt.art" :key="index">
        <div class="tile" v-bind:class="tileColor(color)"></div>
      </div>
    </div>

    <p>by {{currentArt.artist}}</p>
  </div>

</div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      art: [],
    }
  },
  created() {
    this.getArt();
  },
  methods: {
    async getArt() {
      try {
        let response = await axios.get("/api/art");
        this.art = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    tileColor(color) {
      return {
        'tile-red': color === 0,
        'tile-orange': color === 1,
        'tile-yellow': color === 2,
        'tile-green': color === 3,
        'tile-blue': color === 4,
        'tile-purple': color === 5,
        'tile-pink': color === 6,
        'tile-black': color === 7,
        'tile-white': color === 8,
      }
    },
  }
}
</script>


<style scoped>
.gallery {
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr;
  grid-column-gap: 50px;
  grid-row-gap: 50px;

  padding: 50px;

  font-family: 'Open Sans', sans-serif;
  background-color: #041F1E;
  color: #F7DBA7;
}

.art {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border-radius: 30px;

  color: #CDDDDF;
  background-color: #1E2D2F;
}

.art h2 {
  font-style: italic;
}

.art-grid {
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  border-radius: 30px;

  background-color: #1E2D2F;
}

.tile {
  width: 20px;
  height: 20px;
}

.tile-red {
  background-color: #d91e18;
}

.tile-orange {
  background-color: #e67e22;
}

.tile-yellow {
  background-color: #f9bf3b;
}

.tile-green {
  background-color: #2ecc71;
}

.tile-blue {
  background-color: #19b5fe;
}

.tile-purple {
  background-color: #9a12b3;
}

.tile-pink {
  background-color: #f62496;
}

.tile-black {
  background-color: black;
}

.tile-white {
  background-color: white;
}

@media only screen and (max-width: 500px) {
  .gallery {
    grid-template: auto / 1fr;
  }
}
</style>
