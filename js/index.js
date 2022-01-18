let musicList = [];
fetch('/data.json').then(res => res.json()).then(ret => {
    musicList = ret;
    setMusic();
    $playingBtn.classList.remove('icon-playing');
    $playingBtn.classList.add('icon-pause');
    audioObject.pause();
})

const $ = selector => document.querySelector(selector);

const $playingBtn = $('.player .icon-playing');
const $preBtn = $('.player .icon-play-left');
const $nextBtn = $('.player .icon-play-right');
const $title = $('.player .texts h3');
const $author = $('.player .texts p');
const $time = $('.player .time');
const $cover = $('.cover');
const $progress = $('.player .progress');

let index = 0;
let clock = null;
let audioObject = document.querySelector('#audio');
audioObject.volume = 0.1;

function setMusic() {
    let curMusic = musicList[index];
    audioObject.src = curMusic.src;
    $author.innerText = curMusic.author;
    $title.innerText = curMusic.title;
    audioObject.play();
}

function secondToText(second) {
    second = parseInt(second);
    let min = parseInt(second / 60);
    let sec = (second % 60).toString().padStart(2, '0');
    return min + ":" + sec;
}

$playingBtn.onclick = function () {
    if (this.classList.contains('icon-playing')) {
        this.classList.remove('icon-playing');
        this.classList.add('icon-pause');
        audioObject.pause();
        clearInterval(clock);
    } else {
        this.classList.remove('icon-pause');
        this.classList.add('icon-playing');
        setMusic();
        clock = setInterval(function () {
            let curTime = audioObject.currentTime;
            let totalTime = audioObject.duration;
            let percent = curTime / totalTime;
            $progress.style.width = percent * 100 + '%';
            $time.innerText = secondToText(curTime) + ' / ' + secondToText(totalTime);
        }, 1000);
    }
}

$nextBtn.onclick = function () {
    index = index === musicList.length - 1 ? 0 : index + 1;
    setMusic();
    if ($playingBtn.classList.contains('icon-pause')) {
        $playingBtn.classList.remove('icon-pause');
        $playingBtn.classList.add('icon-playing');
    }
}

$preBtn.onclick = function () {
    index = index === 0 ? musicList.length - 1 : index - 1;
    setMusic();
    if ($playingBtn.classList.contains('icon-pause')) {
        $playingBtn.classList.remove('icon-pause');
        $playingBtn.classList.add('icon-playing');
    }
}

new Wave().fromElement("audio","canvas1", {type:"fireworks"})
// new Wave().fromElement("audio","canvas2", {type:"shine rings"})
// new Wave().fromElement("audio","canvas3", {type:"shine rings"})
