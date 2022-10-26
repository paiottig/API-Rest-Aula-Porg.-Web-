const express = require("express");
const server = express();
server.use(express.json());

//simulação de DB com as credenciais de acesso
const ids = ["gabriel","joao","carlos"];
const senhas = ["gab123","jo123","ca123"];

server.post("/login", (req, res)=>{
    const {userId , userSenha} = req.body;
    let verificaId = false;
    let verificaSenha= false;

    for(i = 0; i < ids.length; i++){
        if (userId == ids[i]) {
            verificaId = true;
        }
        if (userSenha == senhas[i]){
            verificaSenha = true;
        }
    }

    if(userId == ""){
        console.log("Usuário não informado");
        return res.json("Usuário não informado");
    } else if (userId != "" && !verificaId){
        console.log("Usuário não encontrado");
        return res.json("Usuário não encontrado");
    } else if (userId != "" && verificaId && userSenha == "") {
        console.log("Senha não informada");
        return res.json("Senha não informada");
    } else if (userId != "" && verificaId && userSenha != "" && !verificaSenha){
        console.log("Senha incorreta");
        return res.json("Senha incorreta");
    } else {
        console.log("Login efetuado");
        return res.json("Login efetuado");
    }
})

server.delete("/deleteUser/:index", (req, res) => {
    const { index } = req.params;
    ids.splice(index, 1); 
    senhas.splice(index, 1);
    return res.json("User deletado com sucesso!");
})

server.put("/alterUser/:index", (req, res) => {
    const { index } = req.params;
    const { novoNome } = req.body;
    
    if (novoNome != "") {
        ids[index] = novoNome;
    } else {
        return res.json("Novo id não identificado");
    }

    return res.json("Novo nome de usuário: " + novoNome);
})

server.post("/insertUser", (req, res) => {
    const { newUser , newSenha } = req.body;
    
    if (newUser != "" && newSenha != "") {
        ids.push(newUser);
        senhas.push(newSenha);
    } else {
        return res.json("Informe os parametros")
    }
    
    return res.json({newUser, newSenha});
})

server.get("/allUsers", (req, res) => {
    return res.json(ids);
})

server.get("/user/:index", (req, res) => {
    const { index } = req.params;
    return res.json(ids[index]);
})

server.listen(3000, ()=>{
    console.log("Server is running!");
});