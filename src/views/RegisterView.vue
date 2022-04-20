<template>
    <form @submit.prevent="registerUser">
        <div class="card">
            <h5 class="card-header">
                Créer un nouveau profil <i class="bi bi-person-plus-fill"></i>
            </h5>
            <div class="card-body">
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                        >Pseudo</label
                    >
                    <input
                        type="text"
                        class="form-control"
                        id="pseudo"
                        placeholder="pseudo"
                        v-model="pseudo"
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                        >Email</label
                    >
                    <input
                        type="email"
                        class="form-control"
                        id="email"
                        placeholder="name@example.com"
                        v-model="email"
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label"
                        >Mot de passe</label
                    >
                    <input
                        type="password"
                        class="form-control"
                        v-model="password"
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label"
                        >Mot de passe</label
                    >
                    <input
                        type="password"
                        class="form-control"
                        v-model="passwordConfirmation"
                    />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label"
                        >Image</label
                    >
                    <input
                        type="text"
                        class="form-control"
                        id="img"
                        placeholder="url image"
                        v-model="img"
                    />
                </div>
                <button type="submit" class="btn btn-primary">
                    Créer mon profil
                </button>
            </div>
        </div>
    </form>
</template>

<script>
import { useAuthenticatorRecorder } from "../hooks/authenticator";

export default {
    setup(props, context) {
        const [user, userRef, registerUser] = useAuthenticatorRecorder(
            props,
            context
        );

        return {
            user,
            ...userRef,
            registerUser,
        };
    },
};
</script>
