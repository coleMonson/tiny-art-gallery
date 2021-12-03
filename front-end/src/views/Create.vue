<template>
<div class="create">

  <div class="label filler" v-if="artSubmitted">
    Your art was successfully submitted to the gallery.
  </div>

  <div class="create" v-else>
    <h1>Create an Art Piece</h1>

    <div class="palette">
      <div v-for="(color, index) in colors" :key="index">
        <div class="palette-color-border" v-bind:class="isActiveColor(color)">
          <div class="palette-color" v-bind:class="tileColor(color)" @click="setActiveColor(color)"></div>
        </div>
      </div>
    </div>

    <div class="art-grid">
      <div v-for="(color, index) in art" :key="index">
        <div class="tile" v-bind:class="tileColor(color)" @click="paintTile(index)"></div>
      </div>
    </div>

    <div class="art-info">
      <div class="label">Name Your Art</div>
      <input v-model="title" placeholder="My Masterpiece" />
      <div class="label">Your Name</div>
      <input v-model="artist" placeholder="Vincent Van Gogh" />
      <button class="submit" @click="submitArt()">Submit</button>
    </div>
  </div>

</div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Create',
  data() {
    return {
      title: "",
      artist: "",
      activeColor: 8,
      colors: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      art: [
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
      ],
      artSubmitted: false,
    }
  },
  methods: {
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
    isActiveColor(color) {
      return {
        'active-color': color === this.activeColor,
      }
    },
    setActiveColor(color) {
      this.activeColor = color;
    },
    paintTile(index) {
      this.art[index] = this.activeColor;
      this.$forceUpdate();
    },
    async submitArt() {
      try {
        await axios.post('/api/art', {
          title: this.title,
          artist: this.artist,
          art: this.art
        });
        this.artSubmitted = true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style scoped>
.create {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-family: 'Open Sans', sans-serif;
  background-color: #041F1E;
  color: #F7DBA7;
}

.palette {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 90px;

  padding: 8px;
  border-radius: 30px;

  background-color: #1E2D2F;
}

.palette-color-border {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 60px;
  height: 60px;
  margin: 6px;

  border-radius: 18px;
  background-color: #486C70;

  transition: 200ms;
}

.palette-color-border:hover {
  background-color: #C1D5D7;

  transition: 200ms;
}

.palette-color {
  width: 80%;
  height: 80%;

  border-radius: 12px;
}

.active-color {
  background-color: #E6EEEF;
  width: 80px;
  height: 80px;
}

.art-grid {
  display: grid;
  grid-template: auto / 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 2px;
  grid-row-gap: 2px;

  padding: 30px;
  margin: 20px;
  border-radius: 30px;

  background-color: #1E2D2F;
}

.tile {
  width: 50px;
  height: 50px;
  border-radius: 6px;
}

.art-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.art-info input {
  margin-bottom: 20px;
  color: #F7DBA7;
  background-color: #1E2D2F;
}

.label {
  font-size: 1.4em;
  margin-bottom: 10px;
}

.art-info input,
.submit {
  padding: 5px 20px;
  border: none;
  border-radius: 100px;

  font-family: inherit;
  font-size: 2em;
}

.submit {
  margin-top: 10px;
  margin-bottom: 50px;
  font-size: 2.4em;
  font-weight: 600;

  color: #F7DBA7;
  background-color: #5F8F95;
  transition: 200ms;
}

.submit:hover {
  color: #5F8F95;
  background-color: #F7DBA7;
  transition: 200ms;
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
}

.filler {
  display: flex;
  align-items: center;
  min-height: 650px;
}

/*** TILE COLORS ***/

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
  .palette {
    display: grid;
    grid-template: auto / 1fr 1fr 1fr;
    grid-column-gap: 2px;
    grid-row-gap: 2px;

    height: auto;
    width: auto;
  }

  .palette-color-border {
    width: 90px;
    height: 90px;
  }

  .art-grid {
    padding: 20px;
    margin: 20px 0;
  }

  .tile {
    width: 28px;
    height: 28px;
  }

  .art-info input {
    font-size: 1.6em;
  }

  .create h1 {
    font-size: 1.6em;
  }

  .submit {
    font-size: 1.8em;
  }

  .label {
    text-align: center;
    padding: 0 10px;
  }
}
</style>
