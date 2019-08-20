<template>
    <HomeLayout>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Create Your Account</div>

                    <div class="card-body">
                        <form @submit.prevent="register()">

                            <div class="form-group row">
                                <label for="first_name" class="col-md-4 col-form-label text-md-right">First Name</label>
                                <div class="col-md-6">
                                    <input v-model="user.first_name" id="first_name" @keyup="validator()" type="text" class="form-control" :class="{'is-invalid': error.first_name}" name="first_name" required autofocus>
                                    <span v-if="error.first_name" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.first_name }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label for="last_name" class="col-md-4 col-form-label text-md-right">Last Name</label>
                                <div class="col-md-6">
                                    <input v-model="user.last_name" id="last_name" @keyup="validator()" type="text" class="form-control" :class="{'is-invalid': error.last_name}" name="last_name" required>
                                    <span v-if="error.last_name" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.last_name }}</strong>
                                    </span>
                                </div>
                            </div>

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
                                <label for="confirm_password" class="col-md-4 col-form-label text-md-right">Confirm Password</label>
                                <div class="col-md-6">
                                    <input v-model="user.confirm_password" id="confirm_password" @keyup="validator()" type="password" class="form-control" :class="{'is-invalid': error.confirm_password}" name="confirm_password" required>
                                    <span v-if="error.confirm_password" class="invalid-feedback" role="alert">
                                        <strong>{{ errorMessages.confirm_password }}</strong>
                                    </span>
                                </div>
                            </div>

                            <div class="form-group row">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="button" @click="register()" class="btn btn-primary" >Register</button>
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
                first_name: '',
                last_name: '',
                email_address: '',
                password: '',
                confirm_password: ''
            },
            error: {
                first_name: false,
                last_name: false,
                email_address: false,
                password: false,
                confirm_password: false
            },
            errorMessages: {
                first_name: 'The First Name is invalid. Please try again',
                last_name: 'The Last Name is invalid. Please try again',
                email_address: 'The Email Address is invalid. Please try again',
                password: 'The Password is invalid. Please try again',
                confirm_password: 'The Passwords do not match. Please try again',
                netFailure: 'Problem occured. Please review your network settings'
            }
        }
    },
    created() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            let storedUser = JSON.parse(localStorage.getItem('user'))
            if (storedUser != null)
                this.$router.push('/dashboard')
        },
        register() {
            if (this.validator()) {
              return
            }

            instance.post("users/register", this.user)
            .then(response => {
                let data = response.data
                if (data.success) {
                    this.user = {
                        first_name: data.data.first_name,
                        last_name: data.data.last_name,
                        email_address: data.data.email_address
                    }
                    localStorage.setItem('user', null)
                    localStorage.setItem('user', JSON.stringify(data.data))
                    // redirect the user to dashboard
                    this.$router.push('/dashboard')

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

            if (this.user.first_name == "") {
                this.error.first_name = true
                hasError = true
            } else
                this.error.first_name = false
            
            if (this.user.last_name == "") {
                this.error.last_name = true
                hasError = true
            } else
                this.error.last_name = false
            
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
            
            if (this.user.password != this.user.confirm_password) {
                this.error.confirm_password = true
                hasError = true
            } else
                this.error.confirm_password = false
            
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
