const listUrl =
  'https://gist.githubusercontent.com/niceaji/d34fcd2d593bef75c277fe1f4a0ee519/raw/6698dab524040e1f0d48d4f8282476a5e5b53640/sentences.json';
const translateUrl = 'https://translate.google.com/?sl=en&tl=ko&text=';

const sentenceEl = document.querySelector('.sentence');

let timeLimit = 3000; // 문제당 제한시간 3초
let sentences = []; // API에서 가져온 전체 문장
let currentIndex = 0; // 현재 문장의 인덱스

const getSentences = async () => {
    fetch(listUrl)
    .then((response) => response.json())
    .then((data) => {
        sentences = data;
        totalSentences = sentences.length;
        // console.log(sentences);
        showSentence();
    })
    .catch((error) => {
        console.error(error);
      });
};

const showSentence = () => {
    const sentence = sentences[currentIndex];
    sentenceEl.querySelector('h2').textContent = sentence.ko;
    sentenceEl.querySelector('h1').textContent = sentence.en; 
};

getSentences();