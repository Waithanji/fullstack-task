<template>
  <DashBoardLayout>
      <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Transaction History</div>

                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                        <tr>
                                        <th>Transaction Date</th>
                                        <th>Account Type</th>
                                        <th>Transaction Type</th>
                                        <th>Access</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(transaction, index) in transactions" :key="index">
                                        <td>{{ formatTime(transaction.created_at) }}</td>
                                        <td>{{ accountTypes[transaction.account_type] }}</td>
                                        <td>{{ transactionTypes[transaction.transaction_type] }}</td>
                                        <td>{{ accessTypes[transaction.access] }}</td>
                                        <td>{{ formatCurrency(transaction.amount) }}</td>
                                        <td :title="transaction.description">
                                            {{ showDescription(transaction.description) }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Transaction Date</th>
                                        <th>Account Type</th>
                                        <th>Transaction Type</th>
                                        <th>Access</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  </DashBoardLayout>
</template>

<script>
import instance from '../../../axiosHelper'
import toastr from 'toastr'
import DashBoardLayout from '../../layouts/DashboardLayout'

export default {
    data() {
        return {
            user: {},
            transactions: {},
            accountTypes: {
                1: 'Savings Account',
                2: 'Current Account'
            },
            transactionTypes: {
                1: 'Debit',
                2: 'Credit'
            },
            accessTypes: {
                1: 'M-PESA',
                2: 'Online',
                3: 'ATM',
                4: 'Agent'
            },
            errorMessages: {
                netFailure: 'Problem occured. Please review your network settings'
            }
        }
    },
    created() {
        this.checkAuth()
        this.getTransactions()
    },
    methods: {
        checkAuth() {
            let storedUser = JSON.parse(localStorage.getItem('user'))
            if (storedUser == null)
                this.$router.push('/home')
            else
                this.user = storedUser
        },
        getTransactions() {
            
            instance.get("transactions/history/" + this.user.id)
            .then(response => {
                let data = response.data
                if (data.success) {
                    this.transactions = data.data
                } else {
                  toastr.info(data.message);
                }

            })
            .catch(() => {
                toastr.info(this.errorMessages.netFailure)
            });
        },
        showDescription(description) {
            return description.substring(0, 20)
        },
        formatCurrency(amount) {
            return parseFloat(amount).toFixed(2)
        },
        formatTime(time) {
            return time.replace(" ", " at ")
        }
    },
    components: {
        DashBoardLayout
    }
}
</script>

<style>

</style>