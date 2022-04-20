import { ref, reactive, toRefs } from "vue";
import Joi from "joi";

export function usePostRecorder(props, context) {
    // const formation = ref([]);
    const post = {
        contenu: ref(""),
        img: ref(""),
    };

    const postData = reactive({
        contenu: post.contenu.value,
        img: post.img.value,
    });

    const postRef = toRefs(postData);

    function onSubmit(user) {
        if (isValidPost(postData)) {
            fetch("http://localhost:3004/articles", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({
                    ...postData,
                    like: 0,
                    date: Date.now(),
                    commentaires: [],
                    pseudo: user.pseudo,
                }),
            })
                .then((reponse) => reponse.json())
                .then((data) => {
                    alert("Your post have been created");
                    context.emit("refresh", user);
                    postData.contenu = "";
                    postData.img = "";
                });
        }
    }

    return [post, postRef, onSubmit];
}

export function useCommentRecorder(props, context) {
    // const formation = ref([]);
    const comment = {
        contenu: ref(""),
    };

    const commentData = reactive({
        contenu: comment.contenu.value,
    });

    const commentRef = toRefs(commentData);

    function onSubmit({ user, article }) {
        if (isValidComment(commentData)) {
            article.commentaires.push({
                id: article.commentaires.reduce((oldId, current) => {
                    return oldId < current.id ? current.id : oldId;
                }, 1),
                contenu: commentData.contenu,
                pseudo: user.pseudo,
                dt: Date.now(),
            });

            fetch(`http://localhost:3004/articles/${article.id}`, {
                method: "PUT",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(article),
            })
                .then((reponse) => reponse.json())
                .then((data) => {
                    alert("Your comment have been posted created");
                    context.emit("refresh", user);
                    commentData.contenu = "";
                });
        }
    }

    return [comment, commentRef, onSubmit];
}

const isValidPost = (postData) => {
    const { error, value } = Joi.object({
        contenu: Joi.string().min(3).required(),
        img: Joi.string().uri().required(),
    }).validate({ ...postData });

    if (error) {
        alert(error.message);
        return false;
    } else {
        return true;
    }
};

const isValidComment = (commentData) => {
    const { error, value } = Joi.object({
        contenu: Joi.string().min(3).required(),
    }).validate({ ...commentData });

    if (error) {
        alert(error.message);
        return false;
    } else {
        return true;
    }
};
