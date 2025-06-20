function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function isValidEmail(email) {
  // Verifica se o email contém "@" e "."
  return email.includes('@') && email.includes('.');
}

function navigateToNextScreen() {
  // Redireciona para a próxima página
  window.location.href = "http://127.0.0.1:5500/login.html";
}

function register() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (!name || !email || !password) {
      alert("Preencha todos os campos!");
      return;
  }

  if (!isValidEmail(email)) {
      alert("Por favor, insira um e-mail válido. Deve conter '@' e '.'");
      return;
  }

  if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
  }

  let users = getUsers();

  if (users.some(user => user.email === email)) {
      alert("E-mail já cadastrado!");
      // Redirecionar após o alerta
      setTimeout(() => {
          window.location.href = "http://127.0.0.1:5500/login.html";
      }, 2000); // 2000 milissegundos = 2 segundos
      return;
  }

  users.push({ name, email, password });
  saveUsers(users);

  alert("Cadastro realizado com sucesso!");
  window.location.href = "http://127.0.0.1:5500/login.html";

  // Limpar os campos (opcional, pois a página será redirecionada)
  document.getElementById("registerName").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";
}

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Verifica se os campos estão preenchidos
  if (!email || !password) {
      alert("Preencha todos os campos!");
      return; // Sai da função se algum campo estiver vazio
  }
  const users = getUsers(); // Obtém a lista de usuários armazenados
  const user = users.find(u => u.email === email && u.password === password); // Busca o usuário correspondente

  // Verifica se o usuário foi encontrado
  if (user) {
      localStorage.setItem('usuario', user.name);
      alert(`Bem-vindo, ${user.name}!`);
      window.location.href = 'inicial2.html'; // Redireciona para a página inicial se as credenciais estiverem corretas
  } else {
      alert("Email ou senha inválidos!"); // Mensagem de erro se as credenciais estiverem incorretas
  }
}

function displayWelcomeMessage() {
  const userName = localStorage.getItem('usuario');
  if (userName) {
      document.getElementById("username").innerText = userName; // Atualiza o elemento com o nome do usuário
      document.getElementById("botaoSair").style.display = "block"; // Exibe o botão "Sair"
  } else {
      document.getElementById("username").innerText = 'Visitante'; // Exibe 'Visitante' se não houver usuário logado
      document.getElementById("botaoSair").style.display = "none"; // Esconde o botão "Sair"
  }
}

function downloadUsers() {
  const users = getUsers();
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });// Utiliza JSON.stringify para converter o objeto de usuários em uma string JSON
  const url = URL.createObjectURL(blob);//Blob (Binary Large Object) um objeto que representa dados binários de forma imutável usado para não textos

  const a = document.createElement("a");
  a.href = url;
  a.download = "users.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Função para sair do usuário
function logout() {
  localStorage.removeItem('usuario'); // Remove o nome do usuário do localStorage
  alert("Você saiu com sucesso!");
  window.location.href = 'http://127.0.0.1:5500/inicial.html';
}

// Chama a função para exibir a mensagem de boas-vindas ao carregar a página inicial
window.onload = function() {
  if (window.location.pathname.includes('inicial2.html')) {
      displayWelcomeMessage();
  }

  // Adiciona o evento de clique ao botão "Sair"
  document.getElementById("botaoSair").addEventListener("click", logout);
};

function excluir() {
  const userName = localStorage.getItem('usuario'); // Obtém o nome do usuário logado
  if (!userName) {
      alert("Nenhum usuário logado.");
      return;
  }

  let users = getUsers(); // Obtém a lista de usuários armazenados
  const updatedUsers = users.filter(user => user.name !== userName); // Filtra a lista para remover o usuário logado

  if (users.length === updatedUsers.length) {
      alert("Usuário não encontrado.");
  } else {
      saveUsers(updatedUsers); // Salva a lista atualizada de usuários
      localStorage.removeItem('usuario');
      alert("Usuário excluído com sucesso!");
      window.location.href = 'http://127.0.0.1:5500/inicial.html';
  }
}