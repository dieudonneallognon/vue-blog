import { ref, reactive, toRefs } from "vue";
import Joi from "joi";

export function useAuthenticatorLogger(props, context) {
    // const formation = ref([]);
    const user = {
        email: ref(""),
        password: ref(""),
    };

    const userData = reactive({
        email: user.email.value,
        password: user.password.value,
    });

    const userRef = toRefs(userData);

    function onSubmit() {
        if (isValidLogin(userData)) {
            fetch("http://localhost:3004/utilisateurs")
                .then((res) => res.json())
                .then((data) => {
                    const user = data.find(
                        (user) =>
                            user.email === userData.email &&
                            user.password === userData.password
                    );
                    if (user) {
                        context.emit("forward", "dashboard");
                        context.emit("update", Object.assign({}, user));
                        userData.email = "";
                        userData.password = "";
                    } else {
                        alert(
                            `The email or password provided does not match a user !`
                        );
                    }
                });
        }
    }

    return [user, userRef, onSubmit];
}

export function useAuthenticatorRecorder(props, context) {
    const user = {
        email: ref(""),
        password: ref(""),
        passwordConfirmation: ref(""),
        pseudo: ref(""),
        img: ref(""),
    };

    const userData = reactive({
        email: user.email.value,
        password: user.password.value,
        passwordConfirmation: user.passwordConfirmation.value,
        pseudo: user.pseudo.value,
        img: user.img.value,
    });

    const userRef = toRefs(userData);

    function onSubmit() {
        if (isValidRegister(userData)) {
            fetch("http://localhost:3004/utilisateurs")
                .then((res) => res.json())
                .then((data) => {
                    if (!data.find((user) => user.pseudo === userData.pseudo)) {
                        const { passwordConfirmation, ...validUserData } =
                            userData;
                        fetch("http://localhost:3004/utilisateurs", {
                            method: "POST",
                            headers: { "content-type": "application/json" },
                            body: JSON.stringify(validUserData),
                        })
                            .then((reponse) => reponse.json())
                            .then((data) => {
                                alert("Your account have been created");
                                userData.email = "";
                                userData.password = "";
                                userData.pseudo = "";
                                userData.img = "";
                                userData.passwordConfirmation = "";
                                context.emit("forward", "login");
                            });
                    } else {
                        alert(
                            `The pseudo ${userData.pseudo} is already taken !`
                        );
                    }
                });
        }
    }

    return [user, userRef, onSubmit];
}

const isValidLogin = (userData) => {
    const { error, value } = Joi.object({
        password: Joi.string().min(6).max(30).required(),

        email: Joi.string().email({ tlds: false }),
    }).validate({ ...userData });

    if (error) {
        alert(error.message);
        return false;
    } else {
        return true;
    }
};

const isValidRegister = (userData) => {
    const { error, value } = Joi.object({
        pseudo: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().email({ tlds: false }),
        password: Joi.string().min(6).max(30).required(),
        passwordConfirmation: Joi.string()
            .required()
            .valid(Joi.in("password"))
            .error(new Error("Please confirm your password")),
        img: Joi.string().uri().required(),
    }).validate({ ...userData });

    if (error) {
        alert(error.message);
        return false;
    } else {
        return true;
    }
};
