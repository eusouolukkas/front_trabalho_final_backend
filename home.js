const api = axios.create({
    baseURL: "http://localhost:3000",
});

window.addEventListener("load", () => {
    const id = localStorage.getItem("user-id");

    if (!id) {
        alert("Você não está logado");
        location.href = "login.html";
    }

    // ...
    listarTasks(id);
});

async function listarTasks(userId) {
    try {

        const user = JSON.parse(localStorage.getItem("user-id"));
        userId = user.id

        const tabelTasks = document.getElementById("tabelabody");

        if(!tabelTasks){
            console.error("Tabela não existe");
            return;
        }
    
        tabelTasks.innerHTML = "";
        
        const result = await api.get(`/users/${userId}`);
        console.log(result.data.data);
    
            for(let item of result.data.data) {
                tabela.innerHTML += `<tr> <td>${item.title}</td> <td>${item.description}</td>`
            }

        let cont = 1

            cont++     
       
    } catch (error) {
        console.log(error);
    }

async function criarTask() {
        const formulario = document.getElementById("titulo");
        const formularioTwo = document.getElementById("descricao");
    
        if(!formulario) {
            console.error("Não tem formulário!");
            return;
        }

        if(!formularioTwo) {
            console.error("Não tem formulário!");
            return;
        }
    
        const task = {
            title: formulario.value,
            description: formularioTwo.value,
        }
    
        try{
            const userId = localStorage.getItem("user-id");
            const result = await api.post(`/users/${userId}/tasks`, task);
    
            //axios retorna status e data
            if(result.status != 201) {
                alert("Erro ao criar Task");
                console.log(result.response.data.message);
                return;
            }
    
            alert("Task criada com sucesso!");
            listarTasks();
        } catch (error){
            console.log(error.response.data.message);
        }
    }
    
    window.addEventListener("load", () => {
        listarTasks();
    
        const botao = document.getElementById('button-cadastrar');
    
        if(botao) {
            botao.addEventListener("click", criarTask);
        }
    });

async function createTasks() {

    const user = document.getElementById("user-id");
    const userId = user.id

    const inputTitle = document.getElementById("title");
    const inputDescription = document.getElementById("description");

    const formRegisterTask = document.getElementById('cadastro-task');

    const buttonCadastrar = document.getElementById("button-cadastrar");


    if(inputTitle.value == '')  {
        alert('Preencha o campo TITULO!');
        return;
    }

    if(inputDescription.value == '') {
        alert('Preencha o campo DESCRIÇÃO!')
    }

    if(!formRegisterTask) {
        console.error("Não tem formulário!");
        return;
    }

    if(!userId) {
        alert('Usuário não encontrado!')
        return;
    }

    const task = {
        title: formRegisterTask.title.value,
        description: formRegisterTask.description.value,
    }

    try{
        const result = await api.post(`/users/${userId}`, user);

        inputTitle.value = "";
        inputDescription.value = "";

        //axios retorna status e data
        if(result.status != 201) {
            alert("Erro ao criar Tarefa");
            console.log(result.response.data.message);
            return;
        }

        alert("Tarefa criada com sucesso!");
        listarTasks();
    } catch (error){
        console.log(error);
    }

    buttonCadastrar.addEventListener('click', createTasks)
}


}