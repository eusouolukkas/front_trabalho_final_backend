const api = axios.create({
  baseURL: "http://localhost:3000"
});

async function listarUsers() {
  try{
  
  const tabela = document.getElementById("tabelabody");
  
  if(!tabela){
      console.error("Tabela não existe");
      return;
  }

  tabela.innerHTML = "";
  
      const result = await api.get("/users");
      console.log(result.data.data);

      for(let item of result.data.data) {
          tabela.innerHTML += `<tr> <td>${item._name}</td> <td>${item._email}</td> </td>`
      }

  }catch (error) {
      console.log("Deu ruim");
      console.log(error);
  }
}

async function cadastrarUser() {

  const formulario = document.getElementById("cadastro-user");

  if(!formulario) {
      console.error("Não tem formulário!");
      return;
  }

  const user = {
      name: formulario.name.value,
      email: formulario.email.value,
      password: formulario.password.value,
  }

  try{
      const result = await api.post("/users", user);

      //axios retorna status e data
      if(result.status != 201) {
          alert("Erro ao criar usuário");
          console.log(result.response.data.message);
          return;
      }

      alert("Usuário criado com sucesso!");
      listarUsers();
  } catch (error){
      console.log(error.response.data.message);
  }
}

window.addEventListener("load", () => {
  listarUsers();

  const botao = document.getElementById('button-cadastrar');

  if(botao) {
      botao.addEventListener("click", cadastrarUser);
  }
});