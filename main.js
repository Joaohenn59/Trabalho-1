function getUsers() {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
}
function saveUsers(users) {
    localStorage.setItem("users", JSON.stringify(users));
}
 function register() {
    const name = document.getElementById("registerName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    if (!name || !email || !password) {
        alert("Preencha todos os campos!")
        return;
    }

    let users = getUsers();

     if (users.some(user => user.email === email)){
        alert("E-mail já cadastrado!")
        return;
     }

     users.push({ name, email, password});
     saveUsers(users);

     alert("Cadastro realizado com sucesso!");
     document.getElementById("registerName").value = "";
     document.getElementById("registerEmail").value = "";
     document.getElementById("registerPassword").value = "";
 }
 function login(){
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Prencha todos os campos!");
        return;
    }

    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert(`Bem-vindo, ${user.name}!`);
    } else {
        alert("email ou senha inválidos!");
    }

    function dowloadUsers() {
        const users = getUsers();
        const blob = new Blob([JSON.stringify(users, null, 2)],{ type:"application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.dowload = "users.json";
        a.click();

        URL.revokeObjectURL(url);
    }
 }