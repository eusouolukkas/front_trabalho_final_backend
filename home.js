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

async function listarTasks(id) {
    try {
        const id = localStorage.getItem("user-id");
        const result = await api.get(`/users/${id}/tasks`);
        console.log(id);
        console.log(result);


        const tabela = document.getElementById("table-body");
        if (!tabela) {
            return;
        }

        tabela.innerHTML = "";

        for (let item of result.data.data) {
            // garantir que o item.id exista

            const oncl = `editarTask('${item.id}')`;

            tabela.innerHTML += `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.description}</td>
                    <td>
                        <button onclick="${oncl}">Editar</button>
                        <button>Deletar</button>
                    </td>
                </tr>
            `;
        }
    } catch (error) {
        console.log(error);
    }
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

async function editarTask(transactionId) {
    alert(transactionId);
}
