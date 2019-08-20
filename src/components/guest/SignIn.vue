<template>
    <HomeLayout>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Log in to your account</div>

                    <div class="card-body">
                        <form @submit.prevent="login()">

                            <div class="form-group row">
                                <label for="email_address" class="col-md-4 col-form-label text-md-right">Email Address</label>
                                <div class="col-md-6">
                                    <input v-model="user.email_address" id="email_address" @keyup="validator()" type="email" class="form-control" :class="{'is-invalid': error.email_address}" name="email_address" required>
                                    <span v-if="error.email_address" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.email_address }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                                <div class="col-md-6">
                                    <input v-model="user.password" id="password" @keyup="validator()" type="password" class="form-control" :class="{'is-invalid': error.password}" name="password" required>
                                    <span v-if="error.password" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.password }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="button" @click="login()" class="btn btn-primary">Login</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </HomeLayout>
</template>

<script>
import instance from '../../axiosHelper'
import HomeLayout from '../layouts/HomeLayout'

export default {
    data () {
        return {
            user: {
                email_address: '',
                password: '',
            },
            error: {
                email_address: false,
                password: false,
            },
            errorMessages: {
                email_address: 'The Email Address is invalid. Please try again',
                password: 'The Password is invalid. Please try again',
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
            if (storedUser != null)
                this.$router.push('/dashboard')
        },
        login() {
            if (this.validator()) {
              return
            }

            instance.post("users/login", this.user)
            .then(response => {
                let data = response.data
                if (data.success) {
                    this.user = {
                        first_name: data.first_name,
                        last_name: data.last_name,
                        email_address: data.email_address
                    }
                    localStorage.setItem('user', null)
                    localStorage.setItem('user', JSON.stringify(data.data))
                    // redirect the user to dashboard
                    this.$router.push('/dashboard')

                } else {
                  alert("Login failed. Your details are incorrect")
                }

            })
            .catch(() => {
                alert(this.errorMessages.netFailure)
            });
        },
        validator() {
            let hasError = false

            if (this.user.email_address == "") {
                this.error.email_address = true
                hasError = true
            } else
                this.error.email_address = false
            
            if (this.user.password == "") {
                this.error.password = true
                hasError = true
            } else
                this.error.password = false
            
            return hasError;
        }
    },
    components: {
        HomeLayout
    }

}
</script>

<style>

</style>
