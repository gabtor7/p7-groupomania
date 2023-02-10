<template>
    <div class="confirmation-window">
        <div class="confirmation-window__message">
            Souhaitez-vous vraiment supprimer ce post ?
        </div>
        <div class="confirmation-window_buttons">
            <input type="button" class="btn btn-primary" value="Oui" @click="deletePost">
            <input type="button" class="btn" value="Non" @click="cancelDelete">
        </div>
    </div>
</template>

<script>
export default{
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
        deletePost(){
            fetch(`https://localhost:3000/${this.postId}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Authorization': 'Bearer: ' + localStorage.getItem('token')
                },
                body:{}
            })
            .then((res) => {
                console.log(res.user);
            })
        }
    }
}
</script>

<style>

</style>