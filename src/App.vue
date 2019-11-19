<template>
  <div id="app">
    <!-- <nav>
      <a class="navbar-item" href="https://www.thevalley.nl/">
        <img id="logonavbar" src="./assets/images/logo.svg" width="92" height="28">
        <img id="logonavbar" src="./assets/images/poolauto.svg" width="75" height="28">
      </a>
      <router-link :to="{ name: 'Home' }">Home</router-link>
      <router-link to="/information">Information</router-link>
      
    </nav>
    <router-view></router-view> -->
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://www.thevalley.nl/">
          <img id="logonavbar" src="./assets/images/logo.svg" width="92" height="28">
          <img id="logonavbar" src="./assets/images/poolauto.svg" width="75" height="28">
        </a>

        <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hiddenvue="true"></span>
        </a>
      </div>

      <div id="navbarBasic" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item navitem">
            <router-link :to="{ name: 'Home' }">Home</router-link>
            <router-link to="/information">Information</router-link>
            
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>