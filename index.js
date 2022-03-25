let musica = document.querySelector('audio');
let indexMusica = 0;

let btnPlay = document.querySelector('.btn-play');
let btnPause = document.querySelector('.btn-pause');
let duracaoMusica = document.querySelector('.fim');
let imagem = document.querySelector('img');
let nomeMusica = document.querySelector('.description h2');
let nomeArtista = document.querySelector('.description i');

renderizarMusica(indexMusica);

// Eventos
document.querySelector('.btn-play').addEventListener('click', tocarMusica);
document.querySelector('.btn-pause').addEventListener('click', pausarMusica);

document.querySelector('.btn-volume').addEventListener('click', mutarMusica);
document.querySelector('.btn-volume-off').addEventListener('click', ligarMusica);

musica.addEventListener('timeupdate', atualizarBarra);

document.querySelector('.arrow-left').addEventListener('click', () => {
    indexMusica--;
    if (indexMusica < 0) {
        indexMusica = 2;
    }
    renderizarMusica(indexMusica);
});

document.querySelector('.arrow-right').addEventListener('click', () => {
    indexMusica++;
    if (indexMusica > 2) {
        indexMusica = 0;
    }
    renderizarMusica(indexMusica);
});

// Funções
function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].file);
    musica.addEventListener('loadeddata', () => {
        nomeMusica.textContent = musicas[index].title;
        nomeArtista.textContent = musicas[index].artist;
        imagem.src = musicas[index].img;
        duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
        atualizarBarra()
        pausarMusica();
    });
}

function tocarMusica() {
    musica.play();
    document.querySelector('.btn-pause').style.display = 'block';
    document.querySelector('.btn-play').style.display = 'none';
}

function pausarMusica() {
    musica.pause();
    document.querySelector('.btn-pause').style.display = 'none';
    document.querySelector('.btn-play').style.display = 'block';
}

function atualizarBarra() {
    let barra = document.querySelector('progress');
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
    let tempoDecorrido = document.querySelector('.inicio');
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
}

function segundosParaMinutos(segundos) {
    let campoMinutos = Math.floor(segundos / 60);
    let campoSegundos = segundos % 60;
    if (campoSegundos < 10) {
        campoSegundos = '0' + campoSegundos;
    }
    return `${campoMinutos}:${campoSegundos}`
}

function mutarMusica() {
    musica.volume = 0;
    document.querySelector('.btn-volume').style.display = 'none';
    document.querySelector('.btn-volume-off').style.display = 'block';
}

function ligarMusica() {
    musica.volume = 1;
    document.querySelector('.btn-volume').style.display = 'block';
    document.querySelector('.btn-volume-off').style.display = 'none';
}

document.querySelector('.btn-repeat-on').addEventListener('click', repetirMusicaON);
document.querySelector('.btn-repeat-off').addEventListener('click', repetirMusicaOFF);

function repetirMusicaON() {
    musica.loop = true;
    document.querySelector('.btn-repeat-on').style.display = 'none';
    document.querySelector('.btn-repeat-off').style.display = 'block';

}

function repetirMusicaOFF() {
    musica.loop = false;
    document.querySelector('.btn-repeat-on').style.display = 'block';
    document.querySelector('.btn-repeat-off').style.display = 'none';
}




