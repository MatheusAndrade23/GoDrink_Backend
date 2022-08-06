<h1 align="center">🍹 Go Drink 🍸</h1>

<div align="center">
 <img src="https://img.freepik.com/fotos-gratis/aproxime-se-com-bebidas-deliciosas_23-2149132215.jpg?size=626&ext=jpg" width="400px" alt="FreePick Drinks Image"/>
</div>

<p align="center">
 <a href="#demo">Demonstração</a> •
 <a href="#tecnologias">Tecnologias</a> •
  <a href="#funcionalidades">Funcionalidades</a> •
 <a href="#detalhes">Detalhes</a> •
 <a href="#footer">Rodapé</a>
</p>

<h3 align="center">É um site que fornece mais de 600 receitas de coquetéis do mundo todo, utilizando <a href="https://www.thecocktaildb.com/api.php">The CocktailDB API</a>. Possui tema dark, todos os textos estáticos estão disponíveis em português e inglês e você ainda pode listar suas bebidas favoritas.</h3>

<p align="center">
  <a href="https://go-drink-next.vercel.app/">Clique para visitar o site!</a> -
  <a href="https://github.com/MatheusAndrade23/Go_Drink_Next">Clique para ver o Front-End!</a>
  <!-- <a href="https://github.com/MatheusAndrade23/Go_Drink_React">Clique para visitar a versão em React!</a> -->
</p>

---

<h2 id="demo">Demonstração 🎥</h2>

_<h3 id="tour">Um pequeno tour pelo Projeto! 🚀</h3>_

<img src="./github/tour.gif" alt="GIF Tour pelo projeto">

_<h3 id="trocando">Adicionando aos favoritos! ⭐</h3>_

<img src="./github/favoritos.gif" alt="GIF Adicionando aos favoritos">

<br>

---

<h2 id="tecnologias">Tecnologias Utilizadas 🛠</h2>

#### FrontEnd: `NextJS!`

- Next SEO
- Flag Icons
- React Icons
- Axios
- Styled Components
- React Elastic Carousel
- Context API
- React Hooks

#### BackEnd: `NodeJS!`

- Express
- Express-Handlebars
- JWT
- Bcrypt
- Mongoose
- Nodemon
- Nodemailer
- DotEnv
- Cors

#### Banco de Dados: `MongoDB-Atlas!`

<div style="display: inline_block"><br>
  <img align="center" alt="npm" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" />
  <img align="center" alt="Js" height="35" width="45" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-plain.svg">
  <img align="center" alt="Sass" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg">
  <img align="center" alt="NextJS" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg">
  <img align="center" alt="Jest" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg">
  <img align="center" alt="NodeJS" height="35" width="45" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-plain.svg">
  <img align="center" alt="Express" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg">
  <img align="center" alt="Handlebars" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/handlebars/handlebars-original.svg">
  <img align="center" alt="MongoDB" height="35" width="45" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain.svg">
 </div>

 <br>

---

<h2 id="funcionalidades">Funcionalidades ⚙️</h2>

- ✔️ Responsivo
- ✔️ Ferramenta de pesquisa
- ✔️ Mudança de Tema
- ✔️ Recuperação de Senha
- ✔️ Lista de favoritos
- ✔️ Ver detalhes da Bebida Escolhida
- ✔️ Listagem de tipos de Copos, Categorias e Ingredientes
- ✔️ Listagem de bebidas baseada em Categorias, Ingredientes e tipos de Copos

<br>

---

<h2 id="detalhes">Alguns Detalhes do Funcionamento do Projeto 🔎</h2>

_<h3>Autenticação 👤</h3>_

#### A autenticação do usuário é baseada em tokens, utilizando <a href="https://www.npmjs.com/package/jsonwebtoken">Json Web Token</a> para gerar e verificar a validade de um token através de um middleware no backend. Além disso, existe um provider dedicado à essa funcionalidade no frontend, que contém todos os métodos (Conectar, Registrar e Sair) e armazena o token e os dados do usuário no local storage.

##

_<h3>Mudança de Tema 🎨</h3>_

#### A aplicação conta com dois temas (claro e escuro), e um botão para a mudança fixo na tela. O tema escuro é renderizado por padrão, mas o tema escolhido pelo usuário fica salvo no local storage sem a necessidade de criar uma conta.

<!-- _<h3>Mudança de Língua 🌎</h3>_

#### A biblioteca <a href="https://www.npmjs.com/package/react-i18next">React I18Next</a> permite a utilização de diferentes línguas no projeto. Como a API <a href="https://www.thecocktaildb.com/api.php">The CocktailDB</a> responde em inglês, este idioma se torna praticamente obrigatório. Para o português, não encontrei uma maneira viável de traduzir os textos vindos da API, então essa funcionalidade ainda não está finalizada. A língua escolhida pelo usuário fica salva no local storage e independe de autenticação, assim como o tema. (Disponível apenas na versão em React)

<br> -->

---

<p align="center">🌟 Se você gostou, por favor considere dar uma estrela! 🌟</p>
<div id="footer" align="center"><a href="https://www.linkedin.com/in/matheus-andrade23/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
<a href = "mailto:matheusandrade.ma2003@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a></div>
