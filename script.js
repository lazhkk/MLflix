import { filmes, series } from "./filmes.js";    
    
    // =========================
    // FUNÇÃO CRIAR CARD
    // =========================
    
    function criarCard(item, tipo){

        return `
            <div class="card">
    
                <img src="${item.imagem}" alt="${item.titulo}">
    
                <h3>${item.titulo}</h3>
    
                <p>${item.descricao}</p>
    
                <div class="botoes">
    
                    <a
                        href="player.html?tipo=${tipo}&id=${item.id}"
                        class="btnPlay"
                    >
                        ▶ Assistir
                    </a>
    
                    <button onclick="favoritar('${item.titulo}')">
                        + Minha Lista
                    </button>
    
                </div>
    
            </div>
        `;
    }
    
    
    // =========================
    // MOSTRAR FILMES E SÉRIES
    // =========================
    
    function mostrar(){
    
        let listaFilmes = document.getElementById("listaFilmes");
        let listaSeries = document.getElementById("listaSeries");
    
        
        listaFilmes.innerHTML = "";
        listaSeries.innerHTML = "";
    
    
        filmes.forEach(function(f){
            listaFilmes.innerHTML += criarCard(f, "filme");
        });
        
        series.forEach(function(s){
            listaSeries.innerHTML += criarCard(s, "serie");
        });
    
    }
    
    
    // =========================
    // BOTÃO ASSISTIR
    // =========================
    
    function assistir(nome){
    
        alert("▶ Reproduzindo: " + nome);
    
    }
    
    
    // =========================
    // FAVORITOS
    // =========================
    
    function favoritar(nome){
    
        alert("⭐ Adicionado à sua lista: " + nome);
    
    }

    window.favoritar = favoritar;
    
    
    // INICIAR
    
    mostrar();

    // ==============================================
// ALTERAÇÃO 21/08 - REDIRECIONAR PARA O LOGIN
// ==============================================

function abrirLogin(){

    window.location.href = "login.html";

}


// ALTERAÇÃO 21/08
// BOTÕES ASSISTIR DOS FILMES E SÉRIES EM ALTA

document.querySelectorAll(".btnPlay").forEach(function(botao){

    botao.addEventListener("click", function(event){

        event.preventDefault();

        abrirLogin();

    });

});


// ALTERAÇÃO 21/08
// BOTÃO PRINCIPAL "ASSISTIR AGORA"

const botaoAssistirAgora =
    document.querySelector(".btnAssistir");


if(botaoAssistirAgora){

    botaoAssistirAgora.addEventListener(
        "click",
        function(){

            abrirLogin();

        }
    );

}


// ALTERAÇÃO 21/08
// FOTO DE PERFIL DA PÁGINA INICIAL

const fotoPerfilInicio =
    document.querySelector(".fotoPerfil");


if(fotoPerfilInicio){

    fotoPerfilInicio.style.cursor = "pointer";


    fotoPerfilInicio.addEventListener(
        "click",
        function(){

            abrirLogin();

        }
    );

}