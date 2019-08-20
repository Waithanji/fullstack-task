<template>
  <div>
    <h1>Welcome: Register or Sign In</h1>
        <div id="nav">
            <router-link exact to="/">Home</router-link> |
            <router-link exact to="/register">Create Account</router-link> |
            <router-link exact to="/login">Log In</router-link>

            <slot/>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>