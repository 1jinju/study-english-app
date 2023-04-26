const listUrl =
  'https://gist.githubusercontent.com/niceaji/d34fcd2d593bef75c277fe1f4a0ee519/raw/6698dab524040e1f0d48d4f8282476a5e5b53640/sentences.json';
const translateUrl = 'https://translate.google.com/?sl=en&tl=ko&text=';

const sentenceEl = document.querySelector('.sentence');
const loading = document.querySelector('#loading');
const box = document.querySelector('#box');

let timeLimit = 3000; // 문제당 제한시간 3초
let sentences = []; // API에서 가져온 전체 문장
let totalSentences = 0; // 전체 문장 수
let currentIndex = 0; // 현재 문장의 인덱스
let currentSentence = ''; // 현재 문장
let timerIntervalId; 

function showLoading() {
    loading.style.display = "block";
    box.style.display = "none";
}

function showBox() {
    loading.style.display = "none";
    box.style.display = "block";
}

const getSentences = async () => {
    fetch(listUrl)
    .then((response) => response.json())
    .then((data) => {
        // API를 가져온 후에는 box 노출
        showBox();

        sentences = data;
        totalSentences = sentences.length;
        // console.log(sentences);
        showSentence();
    })
    .catch((error) => {
        console.error(error);
      });
};

// 랜덤으로 문장을 가져옴
const getRandomSentence = (sentences) => {
    const randomIndex = Math.floor(Math.random() * totalSentences);
    return sentences[randomIndex];
};

// 문장 출력
const showSentence = () => {
    currentSentence = getRandomSentence(sentences);
    sentenceEl.querySelector('h2').textContent = currentSentence.ko;
    sentenceEl.querySelector('h1').textContent = '';
    startTimer();
};

// 타이머를 시작하는 함수
const startTimer = () => {
    let timeLeft = timeLimit / 1000;
    timerIntervalId = setInterval(() => {
        timeLeft--;
        if (timeLeft <= 0) {
            clearInterval(timerIntervalId);
            showEnglish();
        }
    }, 1000);
};

// 영어 문장을 보여주는 함수
const showEnglish = () => {
    sentenceEl.querySelector('h1').textContent = currentSentence.en;
};

showLoading();
getSentences();