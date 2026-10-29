# LOVEFLIX — correção de imagens sem banco de dados

## O que foi corrigido
- Adicionado `poster-fallback.js`: se uma imagem local não existir ou o nome/capitalização não bater com GitHub/Vercel, o card mostra um pôster reserva em vez de ficar quebrado ou vazio.
- `catalogo.js` e `script.js` ativam o fallback no catálogo e na página inicial.
- Não usa banco de dados.

## Importante: para mostrar as fotos originais
O pôster reserva evita imagens quebradas, mas não recupera arquivos que não foram enviados ao GitHub. Confira se a pasta `Imagens` está no repositório e contém exatamente os nomes usados em `filmes.js`, por exemplo `Imagens/filme1.png`, `Imagens/imagemfilme2.jpeg`, `Imagens/filme3.jpeg` até `Imagens/filme12.jpeg`, além das imagens de perfil e banner.

No Vercel/Linux, letras maiúsculas/minúsculas, espaços e extensões contam. `Imagens` é diferente de `imagens`; `.jpg` é diferente de `.jpeg`.

## Publicar
1. Descompacte os arquivos corrigidos sobre os arquivos correspondentes do projeto.
2. Mantenha a pasta `Imagens` original dentro do projeto e versionada no GitHub.
3. No VS Code, abra Source Control, faça stage dos arquivos corrigidos, escreva `Corrige fallback de imagens do catálogo` e clique em Commit.
4. Faça Push para o GitHub. O Vercel normalmente inicia um novo deploy automaticamente.
5. Abra o site e atualize com `Ctrl + F5`.

O arquivo SQL não foi incluído porque a correção é de front-end.
