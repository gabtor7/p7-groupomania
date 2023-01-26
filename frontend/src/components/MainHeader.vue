<template>
    <div class="topbar navbar shadow mb-4">
        <div class="logo ">
            <img alt="Vue logo" src="../assets/icon-left-font.png" height="60">
        </div>
        <div class="user-actions d-flex gap-5">
            <a href="" class="single-action home">Home</a>
            <a href="" class="single-action profile">My Profile</a>
            <!-- <a href="" class="login">Login</a>
            <a href="" class="signup">Signup</a> -->
        </div>
    </div>
</template>

<script>
export default{
   name: 'MainHeader',
    
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
        animation: underslide 0.3s sease-in-out;
        color: #fff;
    }

    @keyframes underslide{

        100%{
            text-decoration: underline;
        }
    }
</style>