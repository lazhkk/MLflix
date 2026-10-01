import { filmes, series } from "./filmes.js";

const parametros = new URLSearchParams(window.location.search);

const tipo = parametros.get("tipo");
const id = parametros.get("id");

console.log("Tipo:", tipo);
console.log("ID:", id);


// Escolher a lista correta

let lista;

if(tipo === "serie"){
    lista = series;
}else{
    lista = filmes;
}


// Procurar conteúdo

const item = lista.find(function(conteudo){
    return conteudo.id === id;
});

console.log("Conteúdo encontrado:", item);


// Mostrar conteúdo

if(item){

    document.getElementById("tituloPlayer").textContent =
        item.titulo;

    document.getElementById("descricaoPlayer").textContent =
        item.descricao;

    document.getElementById("playerYoutube").src =
        `https://www.youtube.com/embed/${item.trailer}?autoplay=1&rel=0`;

}else{

    document.getElementById("tituloPlayer").textContent =
        "Conteúdo não encontrado";

    document.getElementById("descricaoPlayer").textContent =
        "Não foi possível localizar esse filme ou série.";

}