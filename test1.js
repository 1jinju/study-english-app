const listUrl =
  'https://gist.githubusercontent.com/niceaji/d34fcd2d593bef75c277fe1f4a0ee519/raw/6698dab524040e1f0d48d4f8282476a5e5b53640/sentences.json';
const translateUrl = 'https://translate.google.com/?sl=en&tl=ko&text=';

const sentenceEl = document.querySelector('.sentence');
const timerEl = document.querySelector('.timer');
const countEl = document.querySelector('.count');
const loading = document.querySelector('#loading');
const box = document.querySelector('#box');
const nextBtn = document.querySelector('.next');
const translateBtn = document.querySelector('.translate');

let timeLimit = 3000; // 문제당 제한시간 3초
let sentences = []; // API에서 가져온 전체 문장
let totalSentences = 0; // 전체 문장 수
let currentIndex = 0; // 현재 문장의 인덱스
let currentSentence = ''; // 현재 문장
let timerRequestId = null;
const usedIndexes = []; // 이미 가져온 인덱스

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
    let randomIndex = Math.floor(Math.random() * totalSentences);

    // 이미 사용한 인덱스인 경우, 새로운 인덱스를 뽑을 때까지 반복
    while (usedIndexes.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * totalSentences);
    }
    usedIndexes.push(randomIndex);

    if (usedIndexes.length === totalSentences) {
        // console.log(usedIndexes);
        usedIndexes.length = 0;
    }
    return sentences[randomIndex];
};

// 문장 출력
const showSentence = () => {
    currentSentence = getRandomSentence(sentences);
    sentenceEl.querySelector('h2').textContent = currentSentence.ko;
    sentenceEl.querySelector('h1').textContent = '';
    sentenceEl.querySelector('h1').style = "opacity: 0";
    translateBtn.disabled = true;
    countEl.textContent = `${currentIndex + 1}/${totalSentences}`;
    startTimer();
};

// 타이머를 시작하는 함수
const startTimer = () => {
    let startTime = null;
    let progress = 0;

    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsedTime = timestamp - startTime;
        progress = (elapsedTime / timeLimit) * 100;
        timerEl.style.width = `${progress}%`;

        if (progress >= 100) {
            timerEl.style.width = '0%';
            showEnglish();
            return;
        }
        timerRequestId = requestAnimationFrame(animate);
    };

    // 이전 애니메이션 프레임 요청 취소
    if (timerRequestId) {
        cancelAnimationFrame(timerRequestId);
        timerRequestId = null;
    }
    timerRequestId = requestAnimationFrame(animate);
};

// 영어 문장을 보여주는 함수
const showEnglish = () => {
    sentenceEl.querySelector('h1').textContent = currentSentence.en;
    sentenceEl.querySelector('h1').style = "opacity: 1";
    translateBtn.disabled = false;
};

// Next 버튼을 클릭하면 다음 문장을 출력
const clickNext = () => {
    currentIndex = (currentIndex + 1) % totalSentences;
    showSentence();
};

// Translate 버튼을 클릭했을 때 구글 번역 페이지로 이동하는 함수
const clickTranslate = () => {
    const en = encodeURIComponent(currentSentence.en);
    const url = translateUrl +`${en}&op=translate&hl=en`;
    window.open(url, '_blank');
};

const init = () => {
    showLoading();
    getSentences();
  
    nextBtn.addEventListener('click', clickNext);
    translateBtn.addEventListener('click', clickTranslate);
};

init();