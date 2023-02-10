<template>   
    <div class="confirmation-window">
        <div class="confirmation-window__message">
            Souhaitez-vous vraiment supprimer ce post ?
        </div>
        <div class="confirmation-window_buttons">
            <input type="button" class="btn btn-primary" value="Oui" @click="deletePost">
            <input type="button" class="btn" value="Non" @click="closePopup">
        </div>
    </div>
</template>

<script>

export default{
    emits: ['cancelDelete'],
    data(){
        return{
        }
    },
    props:{
        postId: {
            type: String,
            required: true
        } 
    },
    methods: {
        deletePost(e){
            if(e.target.type !== 'button'){
                return;
            }
            fetch(`http://localhost:3000/post/${this.postId}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                }
            })
            .then((res) => {
                this.$parent.$emit('reloadPost')
                console.log(res.user);
            })
            .catch(err => console.log(err));
        },
        closePopup(){
            this.$emit('cancelDelete')
        }
    }
}
</script>

<style>
.confirmation-window{
    background-color: #ffffff;
}

.close-popup{
    text-align: right;
    font-size: 14px;
}

.close-btn{
    border: 0;
    font-size: 14px;
}
</style>