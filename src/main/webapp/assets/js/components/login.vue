<template>
    <div class="ux-login">
        <div class="back-drop login"></div>
        <div class="back-drop shadow"></div>
        <article class="text-center">
            <div class="row">
                <div class="col-md-12">
                    <form class="form-login" v-on:submit.prevent autocomplete="off">
                        <img class="mb-2" src="assets/img/movie-logo.png" alt="MovieChat logo">
                        <h1 class="h4 mb-4 font-weight-light pt-4">Sign In</h1>
                        <div class="inner-addon left-addon form-group"
                             v-bind:class="{ 'has-error': $v.credentials.username.$error, 'has-success': !$v.credentials.username.$invalid && $v.credentials.username.$dirty }"
                        >
                            <label for="inputUsername" class="sr-only">Username</label>
                            <i class="fa fa-user"></i>
                            <input type="text" name="username" id="inputUsername" class="form-control"
                                   v-model.trim="credentials.username"
                                   @input="$v.credentials.username.$touch()"
                                   @blur="$v.credentials.username.$touch()"
                                   placeholder="Username" required autofocus>
                        </div>
                        <div class="inner-addon left-addon form-group"
                             v-bind:class="{ 'has-error': $v.credentials.password.$error, 'has-success': !$v.credentials.password.$invalid && $v.credentials.password.$dirty }"
                        >
                            <label for="inputPassword" class="sr-only">Password</label>
                            <i class="fa fa-lock"></i>
                            <input type="password" name="password" id="inputPassword" class="form-control"
                                   v-model="credentials.password"
                                   @input="$v.credentials.password.$touch()"
                                   @blur="$v.credentials.password.$touch()"
                                   placeholder="Password" required>
                        </div>
                        <input type="text" name="grant_type" value="password" v-model.trim="credentials.grant_type" hidden required>
                        <button class="btn btn-lg btn-primary btn-block text-uppercase mt-5" @click="submit()">Sign in
                        </button>
                        <p class="mt-3 mb-0 text-muted">&copy; 2018</p>
                    </form>
                </div>
            </div>
        </article>
    </div>
</template>

<script>

    module.exports = {
        data () {
            return {
                credentials: {
                    username: '',
                    password: '',
                    grant_type: 'password'
                },
                pending: false,
                loginFailed: false
            }
        },
        methods: {
            async submit () {
                this.loginFailed = false;
                if (this.$v.$invalid) { this.$v.$touch(); return }

                this.pending = true;

                const credentials = {
                    username: this.credentials.username,
                    password: this.credentials.password,
                    grant_type: this.credentials.grant_type || 'password',
                };

                try {
                    await this.$store.dispatch('auth/userLogin', credentials)
                    this.credentials.username = '';
                    this.credentials.password = '';
                    this.$v.$reset();
                    this.$router.push({name: 'home'})
                } catch (error) {
                    this.loginFailed = true;
                    this.$toasted.error((error && error.response && error.response.data && error.response.data.error_description) || 'Invalid credentials.')
                } finally {
                    this.pending = false
                }
            }
        },
        validations: {
            credentials: {
                username: {
                    required: validators.required
                },
                password: {
                    required: validators.required,
                    loginFailed: function() { return !this.loginFailed; }
                }
            }
        },
        computed: {
            ...Vuex.mapState({
                user: state => state.auth.user
            })
        },
        mounted () {
        }
    }
</script>

<style>
</style>
