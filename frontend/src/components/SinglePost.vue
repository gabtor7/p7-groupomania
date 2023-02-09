<template>
    <div class="full-post p-3 my-3 rounded">
        <div class="post-content d-flex flex-column align-items-start row mx-0 my-3">
            <p>{{content}}</p>
            <img :src="this.imageUrl" :alt="this.imageUrl" class="post-media">
        </div>
        <div class="post-likes d-flex align-items-center">
            <input type="button" value="+1" id="post-like" class="btn btn-secondary like-btn my-1">
            <p class="my-1">{{likes}} likes</p>
        </div>
    </div>
</template>

<script>
export default{
    name: 'SinglePost',
    data(){
        return {}
    },
    props:{
        content: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: false
        },
        likes: {
            type: Number,
            required: false,
            default: 0
        },
        hasLiked: {
            type: Array,
            required: false,
            default(){
                return []
            }
        }

    },
}
</script>

<style>

.full-post{
    box-shadow: 0px 5px 5px var(--tertiary-color);
    font-size: 18px;
}

.post-media{
    object-fit: contain;
    max-height: 360px;
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