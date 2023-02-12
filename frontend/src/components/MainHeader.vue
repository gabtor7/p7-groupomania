<template>
    <div class="topbar navbar shadow">
        <div class="logo ">
            <img alt="Vue logo" src="../assets/icon-left-font.png" height="60">
        </div>
        <div class="user-actions d-flex gap-5">
            <a href="/" class="single-action home">Accueil</a>
            <a v-if="isUserLogged" href="" class="single-action action-logout" @click="logoutUser">Se déconnecter</a>
            <!-- <a href="" class="login">Login</a>
            <a href="" class="signup">Signup</a> -->
        </div>
    </div>
</template>

<script>
export default{
   name: 'MainHeader',
   data(){
        return{
            isUserLogged: false
        }
   },
   methods:{
        logoutUser(){
            localStorage.clear();
            this.$router.push('/login')
        }
   },
   mounted() {
        if(localStorage.getItem('id')){
            console.log('salutsalute')
            this.isUserLogged = true;
        } else {
            this.isUserLogged = false;
        }
   }
}
</script>

<style>

    .topbar{
        background-image: linear-gradient(120deg,#fff 67%, var(--primary-color) 66%);
    }

    .user-actions{
        gap: 20px;
        font-size: 20px;
    }

    .single-action{
        padding: 5px 10px;
        color: #eaeaea;
    }

    .single-action:hover{
        color: #fff;
        text-decoration: none;
    }
</style>