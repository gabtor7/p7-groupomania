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
                <input v-model="password" type="password" id="password" class="form-control" name="password"><br /><br />
                <div class="error-msg" v-if="loginError&&(loginError!='OK')">{{ wrongCredentials }}</div><br />
            </div>
            <div class="buttons d-flex justify-content-center">
                <button type="button" class="btn btn-primary" @click="userSignUp">Sign up</button>
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
            loginError: '',
            errors: {}
        }
    },

    methods: {
        userSignIn(){
            fetch('http://192.168.1.49:3000/auth/login', {
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
                console.log(response)
                if(response.status==201){
                    response.json().then(data => {
                        localStorage.setItem('id', data.userId)
                        localStorage.setItem('token', data.token)
                        this.$router.push('/');
                        this.loginError = 'OK';
                    });
                }
            }).catch(err => {
                console.log(err);
            });
            if(this.loginError !== 'OK'){
                this.loginError = "Email ou mot de passe incorrect";
            }
        },
        userSignUp(){
            fetch('http://192.168.1.49:3000/auth/signup', {
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
            return this.loginError;
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
    max-width: 1280px;
    text-align: center;
}

.buttons{
    gap: 12px;
}

.error-msg{
    color: var(--primary-color);
}

</style>