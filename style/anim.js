
// Fonction qui permet de revenir au menu via un boutton "scrollBtn"
window.addEventListener("scroll", function () {
  let scrollButton = document.getElementById("scrollBtn");
  let scrollLink = document.querySelector(".link_nav")
  if (window.scrollY > 300) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Fonction qui permet de descendre dans les différents choix du menu 
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const targetPosition = document.querySelector(targetId).offsetTop;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// Fonction qui permet de plier/déplier les cartes
document.addEventListener('DOMContentLoaded', function () {

  // Sélectionne tous les éléments avec la classe '.project_card'
  let cards = document.querySelectorAll(".project_card");

  // Parcourt chaque carte et applique la fonction toggleProjectDetails à chacune
  cards.forEach(function (card) {
    console.log("carte")
    console.log(card)
    toggleProjectDetails(card);
  });
});

function toggleProjectDetails(card) {
  let details = card.querySelector('.project-details');
  let arrow = card.querySelector('.open-close img')
  console.log("----")
  console.log(card)
  console.log(details)
  console.log(arrow)

  if (details.style.height === '0px') {
    details.style.height = 'auto';
    details.style.opacity = '1';
    card.style.height = 'auto';
    arrow.style.rotate = '90deg'

  } else {
    details.style.height = '0';
    details.style.opacity = '0';
    card.style.height = '100px';
    arrow.style.rotate = '-90deg'
  }
}


// Fonction qui permet de changer progressivement de background color entre les sections
document.addEventListener("DOMContentLoaded", function () {
  const controller = new ScrollMagic.Controller();

  const tween1 = gsap.to("body", { backgroundColor: "#f5efe6", duration: 0.00001 });
  const tween2 = gsap.to("body", { backgroundColor: "#425b8a", duration: 10 });
  const tween3 = gsap.to("body", { backgroundColor: "#f5efe6", duration: 0.11 });

  // Background pour les différentes sections
  new ScrollMagic.Scene({
    triggerElement: "#section1",
    duration: "100%"
  })
    .setTween(tween1)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#section2",
    duration: "100%"
  })
    .setTween(tween2)
    .addTo(controller);

  new ScrollMagic.Scene({
    triggerElement: "#footer",
    duration: "100%"
  })
    .setTween(tween3)
    .addTo(controller);
});


// Fonction qui permet de demander à l'utilisateur si il souhaite écouter de la musique pendant la navigation
let modal = document.getElementById("myModal");

// Ouvrir la fenêtre lors du chargement de la page
window.onload = function() {
  modal.style.display = "block";
  modal.style.background = "#BEBCB9";
  
}

// Récupérer les boutons
let yesBtn = document.getElementById("yesBtn");
let noBtn = document.getElementById("noBtn");
let sound = document.querySelector("#myAudio")

// Fermer la fenêtre modale en fonction du bouton cliqué
noBtn.onclick = function() {
  modal.style.display = "none";
  modal.style.transition = "2s";
  sound.pause();
}

yesBtn.onclick = function() {
  modal.style.display = "none";
  // Commencer la lecture de la musique
  sound.play();
}

// Sélectionner l'élément audio
const audio = document.getElementById('myAudio');

// Fonction pour arrêter la musique
function stopMusic() {
    audio.pause(); // Pause la musique
    audio.currentTime = 0; // Remet le temps de lecture au début
}

// Fonction pour changer de musique
function changeMusic(direction) {
    stopMusic(); // Arrête la musique actuelle
    
    // Remplacer les URLs des musiques par les vôtres
    const musicUrls = [
        'media/audio/polaroit vraiment.mp3',
        'media/audio/lydsten.mp3',
        'media/audio/portfoliomusic.mp3'
    ];

    // Calculer le nouvel indice de la musique
    let newIndex = audio.dataset.index ? parseInt(audio.dataset.index) + direction : 0;
    newIndex = (newIndex + musicUrls.length) % musicUrls.length;

    // Mettre à jour l'URL de la musique et jouer
    audio.src = musicUrls[newIndex];
    audio.dataset.index = newIndex;
    audio.play();
}

// Écouteur d'événement pour les touches du clavier
document.addEventListener('keydown', function(event) {
    switch (event.code) {
        case 'ArrowLeft':
            changeMusic(-1); // Changer de musique vers la précédente
            break;
        case 'ArrowRight':
            changeMusic(1); // Changer de musique vers la suivante
            break;
        case 'Backquote':
            stopMusic(); // Arrêter la musique si la touche "²" est pressée
            break;
        default:
            break;
    }
});
