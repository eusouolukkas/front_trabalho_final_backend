const api = axios.create({
    baseURL: "http://localhost:3000",
});

async function login() {
    try {
        const formulario = document.getElementById("form-login");

        const user = {
            email: formulario.email.value,
            password: formulario.password.value,
        };

        const result = await api.post("/users/login", user);

        const id = result.data.data;
        console.log(id);
        console.log(result);
        alert("Login realizado com sucesso");

        localStorage.setItem("user-id", id);
        location.href = "home.html";
    } catch (error) {
        console.log(error);
        alert("Erro ao fazer o login!");
    }
}
