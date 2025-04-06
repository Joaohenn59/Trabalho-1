// Função para obter a lista de usuários armazenados no localStorage
function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}

// Função para salvar a lista de usuários no localStorage
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Função para registrar um novo usuário
function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    // Verifica se todos os campos estão preenchidos
    if (!name || !email || !password) {
        alert("Preencha todos os campos!"); 
        return; 
    }

    // Obtém a lista atual de usuários
    let users = getUsers();

    // Verifica se o e-mail já está cadastrado
    if (users.some(user => user.email === email)) {
        alert("E-mail já cadastrado!"); 
        return; 
    }

    // Adiciona o novo usuário à lista
    users.push({ name, email, password });
    saveUsers(users);

    // Cadastro realizado com sucesso
    alert("Cadastro realizado com sucesso!");
    document.getElementById("registerName").value = "";
    document.getElementById("registerEmail").value = "";
    document.getElementById("registerPassword").value = "";
}

// Função para realizar o login do usuário
function login() {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
}
    // Verifica se todos os campos estão preenchidos
    if (!email || !password) {
        alert("Preencha todos os campos!"); 
        return; 
    }

    // Obtém a lista de usuários
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    // Se o usuário for encontrado, redireciona para a página inicial
    if (user) {
        alert(`Bem-vindo, ${user.name}!`);
        window.location.href = "inicial2.html"; 
    } else {
        alert("E-mail ou senha inválidos!");

// Função para baixar a lista de usuários como um arquivo JSON
function downloadUsers() {
    const users = getUsers();
    const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    // Cria um elemento <a> para iniciar o download
    const a = document.createElement("a");
    a.href = url; 
    a.download = "users.json"; 
    a.click(); 

    // Revoga o URL do Blob para liberar memória
    URL.revokeObjectURL(url);
}    }