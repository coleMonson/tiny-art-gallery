<template>
<div id="app">

  <div class="header">

    <div class="title">
      <h1>Tiny Art Gallery</h1>
    </div>

    <div class="links">
      <router-link class="link" style="text-decoration: none;" to="/">
        <i class="fas fa-images"></i>
        <div class="link-label">Gallery</div>
      </router-link>
      <router-link class="link" style="text-decoration: none;" to="/create">
        <i class="fas fa-palette"></i>
        <div class="link-label">Create</div>
      </router-link>
      <router-link class="link" style="text-decoration: none;" to="/edit">
        <i class="fas fa-pen-square"></i>
        <div class="link-label">Edit</div>
      </router-link>
    </div>

  </div>

  <div class="content">
    <router-view />
  </div>

  <div class="footer">
    <a href="https://github.com/coleMonson/tiny-art-gallery"><i class="github fab fa-github"></i></a>
  </div>

</div>
</template>

<style>
body {
  padding: 0px;
  margin: 0px;
}

.header {
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0 200px;

  background-color: #1E2D2F;
  color: #F1AB86;
}

.title h1 {
  font-size: 4.2em;
  font-family: 'Abril Fatface', cursive;
  letter-spacing: 3px;
}

.link {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px;

  color: #F7DBA7;
  transition: 300ms;
}

.link:hover,
.footer i:hover {
  color: #C57B57;
  transition: 300ms;
}

.link i {
  margin-bottom: 5px;
  font-size: 2.8em;
}

.link-label {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  font-weight: 700;
}

.links {
  display: flex;
  margin-left: auto;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  font-size: 6em;
  background-color: #1E2D2F;
}

.footer i {
  color: #F7DBA7;
  transition: 300ms;
}

@media only screen and (max-width: 500px) {
  .header {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }

  .title h1 {
    font-size: 2.2em;
  }

  .links {
    margin-left: 0;
    margin-bottom: 30px;
  }
}
</style>
