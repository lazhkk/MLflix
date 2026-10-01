// ==============================================
// ALTERAÇÃO 21/08 - CATÁLOGO PRINCIPAL CINEFIX
// ==============================================


import {
    filmes,
    series
} from "./filmes.js";



// ==============================================
// ALTERAÇÃO 21/08 - ELEMENTOS DA PÁGINA
// ==============================================

const gradeCatalogo =
    document.getElementById("gradeCatalogo");


const campoPesquisa =
    document.getElementById("campoPesquisa");


const tituloCatalogo =
    document.getElementById("tituloCatalogo");



let tipoAtual = "todos";


let exibindoFavoritos = false;



// ==============================================
// ALTERAÇÃO 21/08 - PEGAR FAVORITOS
// ==============================================

function pegarFavoritos(){


    const dados =
        localStorage.getItem(
            "cinefixFavoritos"
        );


    if(dados){

        return JSON.parse(dados);

    }


    return [];

}



// ==============================================
// ALTERAÇÃO 21/08 - SALVAR FAVORITOS
// ==============================================

function salvarFavoritos(lista){


    localStorage.setItem(

        "cinefixFavoritos",

        JSON.stringify(lista)

    );

}



// ==============================================
// ALTERAÇÃO 21/08 - VERIFICAR FAVORITO
// ==============================================

function estaFavoritado(chave){


    const favoritos =
        pegarFavoritos();


    return favoritos.includes(chave);

}



// ==============================================
// ALTERAÇÃO 21/08 - ADICIONAR/REMOVER FAVORITO
// ==============================================

function alterarFavorito(chave){


    let favoritos =
        pegarFavoritos();



    if(favoritos.includes(chave)){


        favoritos =
            favoritos.filter(
                function(item){

                    return item !== chave;

                }
            );


    }else{


        favoritos.push(chave);


    }



    salvarFavoritos(favoritos);


    mostrarConteudos();

}



// ==============================================
// ALTERAÇÃO 21/08 - CRIAR CARD
// ==============================================

function criarCard(item, tipo){


    const chave =
        tipo + "-" + item.id;



    let coracao = "♡";


    let classeFavorito = "";



    if(estaFavoritado(chave)){


        coracao = "♥";


        classeFavorito = "ativo";


    }



    return `

        <div class="cardCatalogo">


            <img
                src="${item.imagem}"
                alt="${item.titulo}"
            >



            <div class="infoCard">


                <h3>

                    ${item.titulo}

                </h3>



                <!-- ALTERAÇÃO 21/08 - DADOS DO FILME -->

                <p class="detalhes">

                    ${item.duracao}

                    •

                    ${item.genero}

                    •

                    ${item.classificacao}

                </p>



                <p class="descricao">

                    ${item.descricao}

                </p>



                <div class="acoesCard">


                    <a
                        href="player.html?tipo=${tipo}&id=${item.id}"
                        class="assistirCatalogo"
                    >

                        ▶ Assistir

                    </a>



                    <!-- ALTERAÇÃO 21/08 - FAVORITO -->

                    <button

                        class="botaoFavorito ${classeFavorito}"

                        data-chave="${chave}"

                        title="Adicionar aos favoritos"

                    >

                        ${coracao}

                    </button>


                </div>


            </div>


        </div>

    `;

}



// ==============================================
// ALTERAÇÃO 21/08 - MOSTRAR CONTEÚDOS
// ==============================================

function mostrarConteudos(){


    gradeCatalogo.innerHTML = "";



    let conteudos = [];



    // ALTERAÇÃO 21/08 - FILMES

    if(
        tipoAtual === "todos" ||
        tipoAtual === "filme"
    ){


        filmes.forEach(
            function(item){


                conteudos.push({

                    dados:item,

                    tipo:"filme"

                });


            }
        );


    }



    // ALTERAÇÃO 21/08 - SÉRIES

    if(
        tipoAtual === "todos" ||
        tipoAtual === "serie"
    ){


        series.forEach(
            function(item){


                conteudos.push({

                    dados:item,

                    tipo:"serie"

                });


            }
        );


    }



    // ==========================================
    // ALTERAÇÃO 21/08 - PESQUISA
    // ==========================================

    const pesquisa =
        campoPesquisa.value
        .toLowerCase()
        .trim();



    conteudos =
        conteudos.filter(
            function(item){


                return item.dados.titulo
                    .toLowerCase()
                    .includes(pesquisa);


            }
        );



    // ==========================================
    // ALTERAÇÃO 21/08 - FILTRAR FAVORITOS
    // ==========================================

    if(exibindoFavoritos){


        const favoritos =
            pegarFavoritos();



        conteudos =
            conteudos.filter(
                function(item){


                    const chave =
                        item.tipo +
                        "-" +
                        item.dados.id;


                    return favoritos.includes(
                        chave
                    );


                }
            );


    }



    // ==========================================
    // ALTERAÇÃO 21/08 - SEM RESULTADO
    // ==========================================

    if(conteudos.length === 0){


        gradeCatalogo.innerHTML = `

            <p class="mensagemVazia">

                Nenhum conteúdo encontrado.

            </p>

        `;


        return;


    }



    // ==========================================
    // ALTERAÇÃO 21/08 - CRIAR TODOS OS CARDS
    // ==========================================

    conteudos.forEach(
        function(item){


            gradeCatalogo.innerHTML +=

                criarCard(

                    item.dados,

                    item.tipo

                );


        }
    );



    ativarBotoesFavorito();

}



// ==============================================
// ALTERAÇÃO 21/08 - BOTÕES DE FAVORITOS
// ==============================================

function ativarBotoesFavorito(){


    document
        .querySelectorAll(
            ".botaoFavorito"
        )
        .forEach(
            function(botao){


                botao.addEventListener(
                    "click",
                    function(){


                        alterarFavorito(
                            botao.dataset.chave
                        );


                    }
                );


            }
        );

}



// ==============================================
// ALTERAÇÃO 21/08 - PESQUISA AUTOMÁTICA
// ==============================================

campoPesquisa.addEventListener(
    "input",
    function(){


        exibindoFavoritos = false;


        mostrarConteudos();


    }
);



// ==============================================
// ALTERAÇÃO 21/08 - FILMES / SÉRIES
// ==============================================

document
    .querySelectorAll(
        ".menuCatalogo button"
    )
    .forEach(
        function(botao){


            botao.addEventListener(
                "click",
                function(){


                    exibindoFavoritos = false;


                    tipoAtual =
                        botao.dataset.tipo;



                    document
                        .querySelectorAll(
                            ".menuCatalogo button"
                        )
                        .forEach(
                            function(item){


                                item.classList.remove(
                                    "menuAtivo"
                                );


                            }
                        );



                    botao.classList.add(
                        "menuAtivo"
                    );



                    if(tipoAtual === "filme"){


                        tituloCatalogo.textContent =
                            "Filmes";


                    }

                    else if(tipoAtual === "serie"){


                        tituloCatalogo.textContent =
                            "Séries";


                    }

                    else{


                        tituloCatalogo.textContent =
                            "Filmes e Séries";


                    }



                    mostrarConteudos();


                }
            );


        }
    );



// ==============================================
// ALTERAÇÃO 21/08 - MENU DO PERFIL
// ==============================================

const fotoUsuario =
    document.getElementById(
        "fotoUsuario"
    );


const menuPerfil =
    document.getElementById(
        "menuPerfil"
    );



fotoUsuario.addEventListener(
    "click",
    function(){


        menuPerfil.classList.toggle(
            "aberto"
        );


    }
);



// ==============================================
// ALTERAÇÃO 21/08 - MOSTRAR FAVORITOS
// ==============================================

document
    .getElementById(
        "mostrarFavoritos"
    )
    .addEventListener(
        "click",
        function(){


            exibindoFavoritos = true;


            tipoAtual = "todos";


            tituloCatalogo.textContent =
                "Meus Favoritos";


            menuPerfil.classList.remove(
                "aberto"
            );


            mostrarConteudos();


        }
    );



// ==============================================
// ALTERAÇÃO 21/08 - INICIAR CATÁLOGO
// ==============================================

mostrarConteudos();