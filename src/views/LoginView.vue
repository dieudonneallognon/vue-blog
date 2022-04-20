<template>
    <form @submit.prevent="logUser">
        <div class="card">
            <h5 class="card-header">Se connecter</h5>
            <div class="card-body">
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
                <button type="submit" class="btn btn-primary">Connexion</button>
            </div>
        </div>
    </form>
</template>

<script>
import { useAuthenticatorLogger } from "../hooks/authenticator";

export default {
    setup(props, context) {
        const [user, userRef, logUser] = useAuthenticatorLogger(props, context);

        return {
            user,
            ...userRef,
            logUser,
        };
    },
};
</script>
