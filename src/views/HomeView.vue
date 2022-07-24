<template>
    <PostForm :user="user" :users="users" @refresh="refreshHome" />
    <div
        :key="article.id"
        v-for="article in articles"
        class="card text-center my-3"
    >
        <div class="card-header d-flex justify-content-between">
            <h3>
                {{ article.pseudo }}
                <img
                    :src="users.find((u) => u.pseudo === article.pseudo).img"
                    class="rounded-circle"
                    :alt="article.title"
                    height="50"
                    width="50"
                />
            </h3>
            <p>{{ new Date(article.date).toDateString() }}</p>
        </div>
        <img :src="article.img" class="card-img-top" alt="" />
        <div class="card-body">
            <p class="card-text">
                {{ article.contenu }}
            </p>
        </div>
        <div class="card-footer text-muted d-flex justify-content-start">
            <span id="comment-span"
                ><i class="bi bi-chat-left-dots"></i>
                <button class="ml-2 btn btn-sm btn-success">
                    {{ article?.commentaires.length }}
                </button>
            </span>
            <span id="like-span" class="pl-5">
                <i class="bi bi-hand-thumbs-up"></i>
                <button
                    class="ml-2 btn btn-sm btn-primary"
                    @click="like(article)"
                >
                    {{ article.like }}
                </button>
            </span>
        </div>
        <ul class="list-group list-group-flush text-start">
            <li v-if="article.commentaires.length > 0" class="list-group-item">
                <h2>Commentaire:</h2>
            </li>
            <li
                v-for="commentaire in article.commentaires"
                :key="commentaire.id"
                class="list-group-item"
            >
                <p class="d-flex justify-content-between">
                    <b>{{ commentaire.pseudo }}</b>
                    <span>{{ new Date(commentaire.dt).toDateString() }}</span>
                </p>
                <p>{{ commentaire.contenu }}</p>
            </li>
            <CommentForm :user="user" :article="article" />
        </ul>
    </div>
</template>

<script>
import PostForm from "../components/PostForm.vue";
import CommentForm from "../components/CommentForm.vue";
export default {
    components: {
        PostForm,
        CommentForm,
    },
    setup(props, context) {
        function refreshHome(data) {
            context.emit("update", data);
        }
        function like(article) {
            fetch(`http://localhost:3004/articles/${article.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...article, like: article.like + 1 }),
            })
                .then((res) => res.json())
                .then(() => {
                    context.emit("update");
                });
        }

        return {
            refreshHome,
            like,
        };
    },
    props: ["articles", "users", "user"],
};
</script>
<style scoped>
span {
    margin-right: 5px;
}

span i {
    margin-right: 5px;
}
</style>
