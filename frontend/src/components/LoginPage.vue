<template>
    <router-link to="/signup">Signup</router-link>
    <div class="signup-component">
        <form class="signup-form">
            <label for="email">Email</label>
            <input type="email" id="email" name="email"><br /><br />
            <label for="password">Mot de passe</label>
            <input type="password" id="password" name="password"><br /><br />
            <button type="button" @click="userSignUp">Sign up</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginPage',

    methods: {
        userSignUp(){
            fetch('192.168.1.49:3000/signup', {
                method: 'POST'
            }).then(response => {
                response.json().then(res => console.log(res))
            }).catch(err => {
                console.error(err);
            });
        }
    }
}
</script>


<style>

</style>