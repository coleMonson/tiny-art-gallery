<template>
<div class="create">

  <div class="label filler" v-if="artDeleted">
    Your art was successfully deleted.
  </div>
  <div class="label filler" v-else-if="artEdited">
    Your art was successfully edited.
  </div>

  <div class="create" v-else>
    <h1>Edit an Existing Art Piece</h1>

    <input v-model="findTitle" placeholder="Search">
    <div class="suggestions" v-if="suggestions.length > 0 && findTitle.length > 0">
      <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectArt(s)">
        <i>{{s.title}}</i>, by {{s.artist}}
      </div>
    </div>
    <div class="filler" v-if="selectedArt === null"></div>

    <div class="create" v-if="selectedArt != null">
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
        <div class="label">Edit Title</div>
        <input v-model="title" placeholder="My Masterpiece" />
        <div class="label">Edit Artist's Name</div>
        <input v-model="artist" placeholder="Vincent Van Gogh" />
        <div class="options">
          <button class="submit" @click="saveChanges()">Save Changes</button>
          <button class="submit delete" @click="deleteArt()">Delete Art</button>
        </div>
      </div>
    </div>
  </div>

</div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'Edit',
  data() {
    return {
      gallery: [],
      title: "",
      artist: "",
      activeColor: 8,
      colors: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      art: [],
      artEdited: false,
      artDeleted: false,
      findTitle: "",
      selectedArt: null,
    }
  },
  created() {
    this.getArt();
  },
  computed: {
    suggestions() {
      let matchingArt = this.gallery.filter(a => a.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return matchingArt.sort((a, b) => a.title > b.title);
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
    async getArt() {
      try {
        let response = await axios.get("/api/art");
        this.gallery = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectArt(art) {
      this.title = art.title;
      this.artist = art.artist;
      this.art = art.art;
      this.selectedArt = art;
    },
    async saveChanges() {
      try {
        await axios.put('api/art/' + this.selectedArt._id, {
          title: this.title,
          artist: this.artist,
          art: this.art
        });
        this.artEdited = true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteArt() {
      try {
        await axios.delete('api/art/' + this.selectedArt._id);
        this.artDeleted = true;
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

input {
  margin-bottom: 20px;
  color: #F7DBA7;
  background-color: #1E2D2F;
}

.label {
  font-size: 1.4em;
  margin-bottom: 10px;
}

input,
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
  margin-left: 10px;
  margin-right: 10px;
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

.delete {
  background-color: #C13346;
}

.delete:hover {
  color: #C13346;
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

.suggestions {
  margin-bottom: 20px;
}

.suggestion {
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 1.4em;
  transition: 200ms;
}

.suggestion:hover {
  color: #041F1E;
  background-color: #C1D5D7;
  transition: 200ms;
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

  input {
    font-size: 1.6em;
  }

  .create h1 {
    font-size: 1.6em;
  }

  .options {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }

  .submit {
    margin: 10px 0;
    font-size: 1.8em;
  }

  .label {
    text-align: center;
    padding: 0 10px;
  }
}
</style>
