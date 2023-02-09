<template>
    <!-- <router-link to="/signup"></router-link> -->
    <div class="signup-component d-inline-block mb-4">
        <form class="signup-form">
            <div class="email-input text-left">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" class="form-control" name="email" placeholder="example@mail.com">
                <span class="error-msg" v-if="errors.email">{{ errors.email }}</span><br /><br />
            </div>
            <div class="password-input text-left">
                <label for="password">Mot de passe</label>
                <input v-model="password" type="password" id="password" class="form-control" name="password"><br />
                <div class="error-msg" v-if="loginStatus">{{ wrongCredentials }}</div><br />
            </div>
            <div class="buttons d-flex justify-content-center flex-column">
                <button type="button" class="btn btn-signup rounded" @click="userSignUp">Sign up</button>
                <button type="button" class="btn btn-primary" @click="userSignIn">Sign in</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'LoginModule',
    data() {
        return {
            email: '',
            password: '',
            loginStatus: '',
            errors: {}
        }
    },

    methods: {
        userSignIn(){
            fetch('http://192.168.1.50:3000/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.status==201){
                    response.json().then(data => {
                        localStorage.setItem('id', data.userId)
                        localStorage.setItem('token', data.token)
                        this.$router.push('/');
                    });
                } else {
                    response.json().then(data => {
                        this.loginStatus = data.message;
                        console.log(data);
                    })
                }
            }).catch(err => {
                console.log(err);
            });
        },
        userSignUp(){
            fetch('http://192.168.1.50:3000/auth/signup', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.email,
                    password: this.password
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then(res => console.log(res))
            }).catch(err => {
                console.log(err);
            });
        }
    },
    computed:{
        wrongCredentials(){
            return this.loginStatus;
        },              
    },
    watch:{
        email(newValue) {
            if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(newValue)) {
                this.errors['email'] = ''
            } else {
                this.errors['email'] = 'Mauvais format d\'adresse'
            }
        },
    }
}
</script>


<style>
.signup-component{
    width: 250px;
    text-align: center;
}

.buttons{
    gap: 12px;
}

.btn-signup{
    border: solid 1px var(--primary-color);
    color: var(--primary-color); 
}

.btn-signup:hover{
    background-color: var(--primary-color);
    color: #fff;
}

.error-msg{
    color: var(--primary-color);
}

</style>