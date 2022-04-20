<template>
    <form @submit.prevent="savePost(user)" v-if="user.email">
        <div class="card mb-3">
            <div class="card-header">
                <h1>Quoi de neuf ? <i class="bi bi-house-door-fill"></i></h1>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <textarea
                        type="text"
                        class="form-control"
                        rows="3"
                        placeholder="Contenu du post"
                        v-model="contenu"
                    ></textarea>
                </div>
                <div class="mb-3">
                    <input
                        name="img"
                        type="text"
                        class="form-control"
                        placeholder="url de l'image du post"
                        v-model="img"
                    />
                </div>
            </div>
            <div class="card-footer text-muted">
                <button type="submit" class="btn btn-primary">Publier</button>
            </div>
        </div>
    </form>
</template>

<script>
import { usePostRecorder } from "../hooks/postManager";

export default {
    setup(props, context) {
        const [post, postRef, savePost] = usePostRecorder(props, context);

        return {
            post,
            ...postRef,
            savePost,
        };
    },
    props: ["user"],
};
</script>
