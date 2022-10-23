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

        if(user.email == '') {
            alert('Preencha o campo EMAIL!');
            return;
        }

        if(user.password == '') {
            alert('Preencha o campo SENHA!')
        }

        const result = await api.post("/users/login", user);

        localStorage.setItem('user-id', JSON.stringify(result.data.data))


        const id = result.data.data;
        console.log(id);
        console.log(result);
        alert("Login realizado com sucesso");

        location.href = "home.html";
    } catch (error) {
        console.log(error);
        alert("Erro ao fazer o login!");
    }
}
