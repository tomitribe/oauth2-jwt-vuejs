<template>
    <div>
        <h4>Loging out</h4>
    </div>
</template>

<script>
    module.exports = {
        data: function() {
            return {
            }
        },
        methods: {
            async logout () {
                await this.$store.dispatch('auth/userLogout');
                this.$router.push({name: 'login'});
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
