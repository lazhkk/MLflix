// ==============================================
// ALTERAÇÃO 21/08 - LOGIN E CADASTRO SIMULADOS
// ==============================================


const botaoEntrar =
    document.getElementById("botaoEntrar");


const botaoCadastro =
    document.getElementById("botaoCadastro");


const formLogin =
    document.getElementById("formLogin");


const formCadastro =
    document.getElementById("formCadastro");



// ========================================
// ALTERAÇÃO 21/08 - MOSTRAR LOGIN
// ========================================

botaoEntrar.addEventListener(
    "click",
    function(){

        formLogin.style.display = "block";

        formCadastro.style.display = "none";


        botaoEntrar.classList.add(
            "opcaoAtiva"
        );


        botaoCadastro.classList.remove(
            "opcaoAtiva"
        );

    }
);



// ========================================
// ALTERAÇÃO 21/08 - MOSTRAR CADASTRO
// ========================================

botaoCadastro.addEventListener(
    "click",
    function(){

        formLogin.style.display = "none";

        formCadastro.style.display = "block";


        botaoCadastro.classList.add(
            "opcaoAtiva"
        );


        botaoEntrar.classList.remove(
            "opcaoAtiva"
        );

    }
);



// ========================================
// ALTERAÇÃO 21/08 - LOGIN SIMULADO
// ========================================

formLogin.addEventListener(
    "submit",
    function(event){

        event.preventDefault();


        window.location.href =
            "catalogo.html";

    }
);



// ========================================
// ALTERAÇÃO 21/08 - CADASTRO SIMULADO
// ========================================

formCadastro.addEventListener(
    "submit",
    function(event){

        event.preventDefault();


        window.location.href =
            "catalogo.html";

    }
);