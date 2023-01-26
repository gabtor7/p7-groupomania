<template>
    <div class="profile-container profile-content text-center my-4 px-3">
        <div class="profile-pic py-5">
            <img src="src/assets/logo.png" alt="" class="rounded-circle" width="200" height="200">
        </div>
        <div class="user-meta pb-2 mb-3">
            <h3 class="user-name">User Name</h3>
        </div>
        <div class="user-bio text-left pb-3 mb-4">
            <h4>Bio</h4>
            <div class="bio-content">
                Ici, la bio de l'utilisateur concerné. Il pourra la modifier si il le souhaite>
            </div>
        </div>
        <div class="user-posts text-left">
            <h4>Posts published</h4>
            <UserPost />
        </div>
    </div>
</template>

<script>
import UserPost from './UserPost.vue';

export default{
    name:'UserProfile',
    components: {
        UserPost
    }
}
</script>

<style>
.profile-pic img{
    background-color: var(--tertiary-color);
}

.user-meta, .user-bio{
    border-bottom: solid 1px var(--tertiary-color);
}

.profile-content h4{
    color: var(--primary-color);
    font-weight: 600;
}
</style>