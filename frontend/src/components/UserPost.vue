<template>
    <div class="full-post p-3 my-2">
        <div class="user-info d-flex justify-content-start align-items-center row mx-0 pb-3">
            <img src="" alt="" class="user-profile-pic" height="50" width="50"><!-- lien vers le profil de l'utilisateur -->
            <a href="user-profile" class="username">Username</a><!-- cacher cette section si on consulte depuis le profil de l'utilisateur-->
        </div>
        <div class="post-content row mx-0 my-3">
            <p>Contenu du post à afficher ici</p>
            <img src="" alt="" class="post-media">
        </div>
        <div class="post-likes d-flex align-items-center">
            <input type="button" value="+1" id="post-like" class="btn btn-secondary like-btn my-1">
            <p class="my-1">123 likes</p>
        </div>
    </div>
</template>

<script>
export default{
    name: 'UserPost'
}
</script>

<style>

.full-post{
    box-shadow: 0 5px 10px var(--tertiary-color);
    font-size: 18px;
}

.user-info{
    gap: 12px;
    border-bottom: solid 1px #dedede;
    font-weight: 600;
}

.user-profile-pic{
    border-radius: 50%;
    background-color: var(--tertiary-color);
}

.post-likes{
    font-size: 16px;
    color: var(--primary-color);
    gap: 12px;
}

.like-btn{
    padding: 3px 8px;
}
</style>