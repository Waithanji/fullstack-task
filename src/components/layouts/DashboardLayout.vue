<template>
  <div>
    <h1>Client Dashboard</h1>
    <div id="nav">
      <router-link exact to="/">Home</router-link> |
      <router-link exact to="/dashboard/transactions/add">Add Transaction</router-link> |
      <router-link exact to="/dashboard/transactions/history">Transaction History</router-link> |
      <router-link exact event="" to="/logout" @click.native.prevent="logout()">Logout</router-link>

      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: {}
      }
    },
    created() {
      this.checkAuth()
    },
    methods: {
      checkAuth() {
        let storedUser = JSON.parse(localStorage.getItem('user'))
          if (storedUser == null)
              this.$router.push('/home')
          else
              this.user = storedUser
      },
      logout() {
        localStorage.removeItem('user')
        this.$router.push('/')
      }
    }
  }
</script>

<style>

</style>