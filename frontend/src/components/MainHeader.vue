<template>
    <div class="navbar shadow mb-4">
        <div class="logo ">
            <img alt="Vue logo" src="../assets/icon-left-font.png" height="60">
        </div>
        <div class="user-actions d-flex gap-5">
            <a href="" class="home">Home</a>
            <a href="" class="profile">My Profile</a>
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
    .user-actions{
        gap: 20px;
    }
</style>