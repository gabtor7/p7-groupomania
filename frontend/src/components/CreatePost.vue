<template>
    <form class="create-post d-flex justify-content-between border mx-0 row">
        <div class="text-input col-9 pl-0">
            <textarea name="Post content" id="content-input" placeholder="Créer un post"></textarea>
        </div>
        <a class="media-upload text-center mr-3" href="#">
            <i class="fa fa-light fa-image"></i>
            <div class="add-media">Ajouter une image</div>
        </a>
        <div class="post-submission">
            <input type="button" value="Poster" class="btn btn-primary h-100">
        </div>
    </form>
</template>

<script>
export default{
    name: 'CreatePost'
}
</script>

<style>

.text-input textarea{
    width: 100%;
    height: 100%;
}

.media-upload{
    margin-top: auto;
}

.media-upload i:before{
    font-size: 32px;
}
</style>