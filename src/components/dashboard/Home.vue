<template>
  <DashBoardLayout>
      <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">My Account</div>

                    <div class="card-body">
                        <h3>Savings Account Balance</h3>
                        <p>Ksh {{ userInfo.savings_account != null ? formatCurrency(userInfo.savings_account.balance) : 0.00 }}</p>
                        <h3>Current Account Balance</h3>
                        <p>Ksh {{ userInfo.current_account != null ? formatCurrency(userInfo.current_account.balance) : 0.00 }}</p>
                    </div>
                </div>
            </div>
      </div>
  </DashBoardLayout>
</template>

<script>
import instance from '../../axiosHelper'
import DashBoardLayout from '../layouts/DashboardLayout'

export default {
    data() {
        return {
            user: {},
            userInfo: {}
        }
    },
    created() {
        this.checkAuth()
        this.getSummary()
    },
    methods: {
        checkAuth() {
            let storedUser = JSON.parse(localStorage.getItem('user'))
            if (!storedUser.api_token)
                this.$router.push('/home')
            else
                this.user = storedUser
        },
        formatCurrency(amount) {
            return parseFloat(amount).toFixed(2)
        },
        getSummary() {
            instance.get("/users/account/" + this.user.id)
            .then(response => {
                let data = response.data
                if(data.success) {
                    this.userInfo = data.data
                }

            })
        }
    },
    components: {
        DashBoardLayout
    }
}
</script>

<style>

</style>