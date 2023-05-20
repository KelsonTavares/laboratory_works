
let preloader = document.getElementById('preloader');
if(preloader){
  console.log('Done');
  window.addEventListener('load', ()=>{
    preloader.remove();
  })
}

// Inicializando o carousel
//const carousel = new bootstrap.Carousel('#carousel-jogos');

// Dropdown 
var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
  return new bootstrap.Dropdown(dropdownToggleEl)
})

//
const burger = document.getElementById("burger");
const ul = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  burger.classList.toggle("show-x");
  ul.classList.toggle("show");
});

// Animando o scroll

(function () {
  const smoothScroll = function (targetEl, duration) {    
      const headerElHeight =  document.querySelector('.menu').clientHeight;
      let target = document.querySelector(targetEl);
      let targetPosition = target.getBoundingClientRect().top - headerElHeight;
      let startPosition = window.pageYOffset;
      let startTime = null;
   
       const ease = function(t,b,c,d) {
           t /= d / 2;
           if (t < 1) return c / 2 * t * t + b;
           t--;
           return -c / 2 * (t * (t - 2) - 1) + b;
       };
   
       const animation = function(currentTime){
           if (startTime === null) startTime = currentTime;
           const timeElapsed = currentTime - startTime;
           const run = ease(timeElapsed, startPosition, targetPosition, duration);
           window.scrollTo(0,run);
           if (timeElapsed < duration) requestAnimationFrame(animation);
       };
       requestAnimationFrame(animation);
   };
   const scrollTo = function () {
       const links = document.querySelectorAll('.js-scroll');
       links.forEach(each => {
           each.addEventListener('click', function () {
               const currentTarget = this.getAttribute('href');
               smoothScroll(currentTarget, 700);
           });
       });
   };
   scrollTo();
  }());

// Form
var btn_enviar = document.querySelector('#btn-enviar');

btn_enviar.addEventListener('click', () =>{
  // Criando elementos
  var name = document.querySelector('#nome');
  var email = document.querySelector('#email');
  var message = document.querySelector('#message');


  var section_contacto = document.querySelector('#contacto');
  var comentario = document.createElement("div");
  var n_comentario = document.createElement("h5");
  var e_comentario = document.createElement("h6");
  var m_comentario = document.createElement("p");

  comentario.classList = "opinion bg-dark p-2 align-items-center text-light border";
  n_comentario.classList = "text-light";
  e_comentario.classList = "text-light";


  // Adicionar texto nas tags
  n_comentario.innerText = name.value;
  e_comentario.innerText = email.value;
  m_comentario.innerText = message.value;

  // Adicionar no arquivo json
  gravarDados(name.value, email.value, message.value);
  // Adicionar tag comentario
  comentario.appendChild(n_comentario);
  comentario.appendChild(e_comentario);
  comentario.appendChild(m_comentario);

  // Adicionar a tag section
  section_contacto.appendChild(comentario);

  name.value = "";
  email.value = "";
  message.value = "";
});

// Comentarios

fetch("/js/comentario.json").then((response)=>{
  response.json().then((dados)=>{
    dados.usuarios.map((usuario) => {

      var section_contacto = document.querySelector('#contacto');
      var comentario = document.createElement("div");
      var n_comentario = document.createElement("h5");
      var e_comentario = document.createElement("h6");
      var m_comentario = document.createElement("p");

      comentario.classList = "opinion bg-dark p-2 align-items-center text-light border";
      n_comentario.classList = "text-light";
      e_comentario.classList = "text-light";


      // Adicionar texto nas tags
      n_comentario.innerText = usuario.nome;
      e_comentario.innerText = usuario.email;
      m_comentario.innerText = usuario.comentario;

      // Adicionar tag comentario
      comentario.appendChild(n_comentario);
      comentario.appendChild(e_comentario);
      comentario.appendChild(m_comentario);

      // Adicionar a tag section
      section_contacto.appendChild(comentario);

    })
  })
})


function gravarDados(n, em, co){

  const fs = import('fs');
  // Lendo o arquivo comentario.json
  const DB = import('/js/comentario.json');
  const obj = {name: n, email: em, comentario: co};

  // adicionando novos dados ao comentario
  DB.pusher(obj);

  fs.writeFile('DB.json', JSON.stringify(DB), err => {
    //checando erros
    if (err) return err;
    
    console.log('Gravado');
  })

}

