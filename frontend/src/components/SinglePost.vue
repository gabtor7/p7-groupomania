<template>
    <div class="full-post p-3 my-3 rounded">
        <div class="post-content d-flex flex-column align-items-start row mx-0 my-3">
            <p>{{content}}</p>
            <img :src="this.imageUrl" :alt="this.imageUrl" class="post-media">
        </div>
        <div class="like-section d-flex ">
            <input type="button" :value="(hasLiked.includes(currentUser)) ? '-1' : '+1'" id="post-like" class="btn btn-secondary like-btn my-1 mr-2" @click="userLikes">
            <!-- <input v-if="!(hasLiked.includes(currentUser))" type="button" :value="+1" id="post-like" class="btn btn-secondary like-btn my-1" @click="userLikes"> -->
            <p class="my-1">{{likes}} likes</p>    
        </div>
        <div v-if="userOwns" class="post-actions">
            <button class="post-actions__edit" title="Modifier ce post" @click="editPost">Modifier</button>
            <button class="post-actions__delete" title="Supprimer ce post" @click="open = !open">{{ confirmCancelDeleteTxt }}</button>
        </div>
        <div v-show="open" class="deletion-component">
            <PostDeletion :postId="this._id"  @cancel-delete="open = false"></PostDeletion>
        </div>
    </div>
</template>

<script>
import PostDeletion from './PostDeletion.vue';
export default{
    name: 'SinglePost',
    emits: ['reloadPost'],

    components: {
        PostDeletion
    },

    data(){
        return {
            userOwns: false,
            currentUser: localStorage.getItem('id'),
            open: false
        }
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
        },
        user:{
            type: String,
            required: true
        },
        _id: {
            type: String,
            required: true
        }

    },
    methods: {
        userLikes(){
            fetch(`http://localhost:3000/post/${this._id}/like`, {
                method: 'PUT',
                headers:{
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                res.json();
                this.$emit('reloadPost');
            })
            .catch(err => console.log(err));
        },
        editPost(){
            this.$router.push('/post/' + this._id);
        }
    },
    computed: {
        confirmCancelDeleteTxt(){
            return this.open ? 'Annuler' : 'Supprimer';
        }
    },
    mounted(){
        this.userOwns = (this.currentUser === this.user || localStorage.getItem('admin') == 'true');
        console.log(localStorage.getItem('admin'))
    }
}
</script>

<style>

.full-post{
    box-shadow: 0px 5px 5px var(--tertiary-color);
    font-size: 18px;
    position: relative;
}

.post-media{
    object-fit: contain;
    max-height: 360px;
    border-radius: 12px;
    box-shadow: 2px 2px 3px
}

.post-likes{
    font-size: 16px;
    color: var(--primary-color);
    gap: 12px;
}

.like-btn{
    padding: 3px 8px;
}

.post-actions{
    position: absolute;
    top: 10px;
    right: 10px;
}

.post-actions:hover{
    cursor: pointer;
}

.post-actions__delete, .post-actions__edit{
    border: 0;
    background-color: transparent;
    font-size: 12px;
    color: var(--primary-color);
}

.post-actions__edit{  
    color: #1133aa
}

.post-actions__delete:hover, .post-actions__edit:hover{
    cursor: pointer;
    text-decoration: underline;
}

.deletion-component{
    position: absolute;
    top: 36px;
    margin-top: 10px;
    right: 10px;
    padding: 6px;
    border: solid 1px #aaaaaa
}
</style>