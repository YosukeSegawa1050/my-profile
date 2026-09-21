import './style.css';

const STORAGE_KEY = 'week13-counter-value';
const savedValue = Number(localStorage.getItem(STORAGE_KEY));
let count = Number.isFinite(savedValue) && savedValue > 0 ? savedValue : 1;

document.querySelector('#app').innerHTML = `
  <main class="counter-card" aria-labelledby="counter-title">
    <p class="eyebrow">POWER OF TWO</p>
    <h1 id="counter-title">2倍カウンター</h1>
    <p class="description">ボタンを押して、数字を2倍・半分にできます。</p>
    <output id="result" class="result" aria-live="polite" aria-atomic="true">1</output>
    <div class="controls" aria-label="カウンター操作">
      <button id="divide" class="button button--divide" type="button">÷2</button>
      <button id="multiply" class="button button--multiply" type="button">×2</button>
    </div>
    <button id="reset" class="reset-button" type="button">リセット</button>
  </main>
`;

const result = document.querySelector('#result');

const render = (isReset = false) => {
  result.textContent = Number.isInteger(count)
    ? count.toString()
    : count.toLocaleString('ja-JP', { maximumFractionDigits: 12 });
  result.classList.toggle('result--fraction', count < 1);
  result.classList.toggle('result--reset', isReset);
  localStorage.setItem(STORAGE_KEY, count.toString());
};

document.querySelector('#multiply').addEventListener('click', () => {
  count *= 2;
  render();
});

document.querySelector('#divide').addEventListener('click', () => {
  count /= 2;
  render();
});

document.querySelector('#reset').addEventListener('click', () => {
  count = 1;
  render(true);
});

render();
