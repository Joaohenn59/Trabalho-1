function getUsers() {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function isValidEmail(email) {    
  // Verifica se o email contém "@" e "."
  if (email.includes('@') && email.includes('.')) {
      return true; // Email válido
  } else {
      return false; // Email inválido
  }
}

function navigateToNextScreen() {
  // Redireciona para a próxima página
  window.location.href = "http://127.0.0.1:5500/login.html"; // Substitua pelo caminho da sua próxima tela
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
      return;
  }

  users.push({ name, email, password });
  saveUsers(users);

  alert("Cadastro realizado com sucesso!");
  document.getElementById("registerName").value = "";
  document.getElementById("registerEmail").value = "";
  document.getElementById("registerPassword").value = "";

  // Muda de tela apenas se tudo estiver correto
  navigateToNextScreen();
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
      alert(`Bem-vindo, ${user.name}!`);
      window.location.href = 'inicial2.html'; // Redireciona para a página inicial se as credenciais estiverem corretas
  } else {
      alert("Email ou senha inválidos!"); // Mensagem de erro se as credenciais estiverem incorretas
  }
}

function downloadUsers() {
  const users = getUsers();
  const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "users.json";
  a.click();

  URL.revokeObjectURL(url);
}