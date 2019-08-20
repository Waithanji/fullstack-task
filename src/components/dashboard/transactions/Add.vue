<template>
  <DashBoardLayout>
      <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Add a Transaction</div>

                    <div class="card-body">
                        <form @submit.prevent="addTransaction()">
                            <input type="hidden" name="user_id" v-model="user.id">
                            <div class="form-group row">
                                <label for="account_type" class="col-md-4 col-form-label text-md-right">Account Type</label>
                                <div class="col-md-6">
                                    <select :class="{'is-invalid': error.account_type}" @change="validator()" name="account_type" class="form-control" id="account_type" v-model="transaction.account_type">
                                        <option value="1">Savings Account</option>
                                        <option value="2">Current Account</option>
                                    </select>
                                    <span v-if="error.account_type" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.account_type }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="transaction_type" class="col-md-4 col-form-label text-md-right">Transaction Type</label>
                                <div class="col-md-6">
                                    <select :class="{'is-invalid': error.transaction_type}" @change="validator()" name="transaction_type" class="form-control" id="transaction_type" v-model="transaction.transaction_type">
                                        <option value="1">Credit</option>
                                        <option value="2">Debit</option>
                                    </select>
                                    <span v-if="error.transaction_type" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.transaction_type }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="access" class="col-md-4 col-form-label text-md-right">Access</label>
                                <div class="col-md-6">
                                    <select :class="{'is-invalid': error.access}" @change="validator()" name="access" class="form-control" id="access" v-model="transaction.access">
                                        <option value="1">M-PESA</option>
                                        <option value="2">Online</option>
                                        <option value="3">ATM</option>
                                        <option value="4">Agent</option>
                                    </select>
                                    <span v-if="error.access" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.access }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="description" class="col-md-4 col-form-label text-md-right">Description</label>
                                <div class="col-md-6">
                                    <textarea rows="5" v-model="transaction.description" id="description" @keyup="validator()" class="form-control" :class="{'is-invalid': error.description}" name="description" required></textarea>
                                    <span v-if="error.description" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.description }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="amount" class="col-md-4 col-form-label text-md-right">Amount</label>
                                <div class="col-md-6">
                                    <input v-model="transaction.amount" id="amount" @keyup="validator()" type="number" step=".01" min="0" class="form-control" :class="{'is-invalid': error.amount}" name="amount" required>
                                    <span v-if="error.amount" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.amount }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="button" @click="addTransaction()" class="btn btn-primary" >Add Transaction</button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
      </div>
  </DashBoardLayout>
</template>

<script>
import instance from '../../../axiosHelper'
import DashBoardLayout from '../../layouts/DashboardLayout'

export default {
    data() {
        return {
            user: {},
            userInfo: {},
            transaction: {
                user_id: '',
                account_type: '',
                transaction_type: '',
                access: '',
                description: '',
                amount: ''
            },
            error: {
                account_type: false,
                transaction_type: false,
                access: false,
                description: false,
                amount: false
            },
            errorMessages: {
                account_type: 'The Account Type is invalid. Please try again.',
                transaction_type: 'The Transaction Type is invalid. Please try again.',
                access: 'The Access is invalid. Please try again.',
                description: 'The Description is invalid. Please try again.',
                amount: 'The Amount is invalid. Please try again.',
                netFailure: 'Problem occured. Please review your network settings'
            }
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
        addTransaction() {
            if (this.validator()) {
              return
            }

            this.transaction.user_id = this.user.id

            instance.post("transactions/add", this.transaction)
            .then(response => {
                let data = response.data
                if (data.success) {
                    this.user = data.data
                    localStorage.setItem('user', null)
                    localStorage.setItem('user', JSON.stringify(data.data))

                    alert(data.message)

                } else {
                  alert(data.message)
                }

            })
            .catch(() => {
                alert(this.errorMessages.netFailure)
            });
        },
        validator() {
            let hasError = false

            if (this.transaction.account_type == "") {
                this.error.account_type = true
                hasError = true
            } else
                this.error.account_type = false
            
            if (this.transaction.transaction_type == "") {
                this.error.transaction_type = true
                hasError = true
            } else
                this.error.transaction_type = false
            
            if (this.transaction.access == "") {
                this.error.access = true
                hasError = true
            } else
                this.error.access = false
            
            if (this.transaction.description.length > 2000) {
                this.error.description = true
                hasError = true
            } else
                this.error.description = false
            
            if (this.transaction.amount < 0 || this.transaction.amount == "") {
                this.error.amount = true
                hasError = true
            } else
                this.error.amount = false
            
            return hasError;
        }
    },
    components: {
        DashBoardLayout
    }
}
</script>

<style>

</style>