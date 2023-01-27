<template>
    <router-link to="/signup"></router-link>
    <div class="signup-component d-inline-block mb-4">
        <form class="signup-form">
            <div class="email-input text-left">
                <label for="email">Email</label>
                <input type="email" id="email" class="form-control" name="email"><br /><br />
            </div>
            <div class="password-input text-left">
                <label for="password">Mot de passe</label>
                <input type="password" id="password" class="form-control" name="password"><br /><br />
            </div>
            <button type="button" class="btn btn-primary" @click="userSignUp">Sign up</button>
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
.signup-component{
    max-width: 1280px;
    text-align: center;
}

</style>