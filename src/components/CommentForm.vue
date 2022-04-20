<template>
    <form @submit.prevent="saveComment({ user, article })" v-if="user.email">
        <div class="card mb-3">
            <div class="card-header">
                <h5>Commenter</h5>
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
            </div>
            <div class="card-footer text-muted">
                <button type="submit" class="btn btn-primary">Publier</button>
            </div>
        </div>
    </form>
</template>

<script>
import { useCommentRecorder } from "../hooks/postManager";

export default {
    setup(props, context) {
        const [comment, commentRef, saveComment] = useCommentRecorder(
            props,
            context
        );

        return {
            comment,
            ...commentRef,
            saveComment,
        };
    },
    props: ["user", "article"],
};
</script>
