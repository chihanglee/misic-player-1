let musicList = []
fetch('./data.json').then(res => res.json()).then(ret => {
  musicList = ret
  setMusic()
})


const $ = selector => document.querySelector(selector)

const $playingBtn = $('.player .icon-playing')
const $preBtn = $('.player .icon-play-left')
const $nextBtn = $('.player .icon-play-right')
const $title = $('.player .texts h3')
const $auther = $('.player .texts p')
const $time = $('.player .time')
const $progress = $('.player .progress')

let index = 0
let clock = null
let audioObject = document.querySelector('#audio')
audioObject.volumn = 0.1

function setMusic() {
  let curMusic = musicList[index]
  console.log(curMusic)
  audioObject.src = curMusic.src
  $auther.innerText = curMusic.auther
  $title.innerText = curMusic.title
} 

function secondToText(second) {
  second = parseInt(second)
  let min = parseInt(second/60)
  let sec = second%60
  sec = sec < 10 ? '0' + sec : '' + sec
  return min + ':' + sec
}

$playingBtn.onclick = function() {
  if(this.classList.contains('icon-playing')) {
    this.classList.remove('icon-playing')
    this.classList.add('icon-pause')
    audioObject.play()
    console.log(audioObject.duration)
    console.log(audioObject.currentTime)
    clock = setInterval(function() {
      let curTime = audioObject.currentTime
      let totalTime = audioObject.duration
      let percent = curTime/totalTime
      $progress.style.width = percent*100 + '%'
      $time.innerText = secondToText(curTime) + ' / ' + secondToText(totalTime)
    }, 1000)
  } else {
    this.classList.remove('icon-pause')
    this.classList.add('icon-playing')
    audioObject.pause()
    clearInterval(clock)
  }  
}

$nextBtn.onclick = function() {
  index++
  index = index % musicList.length
  console.log(index)
  setMusic()
}

$preBtn.onclick = function() {
  index--
  index = (index+musicList.length) % musicList.length
  setMusic()
}

new Wave().fromElement("audio","canvas1", {type:"fireworks"})
// new Wave().fromElement("audio","canvas2", {type:"shine rings"})
// new Wave().fromElement("audio","canvas3", {type:"shine rings"})
