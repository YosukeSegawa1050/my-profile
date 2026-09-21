import './style.css';

const STORAGE_KEY = 'week13-counter-exponent';
const savedExponent = Number(localStorage.getItem(STORAGE_KEY));
const legacyValue = Number(localStorage.getItem('week13-counter-value'));
let exponent = Number.isSafeInteger(savedExponent)
  ? savedExponent
  : Number.isFinite(legacyValue) && legacyValue > 0
    ? Math.round(Math.log2(legacyValue))
    : 0;

document.querySelector('#app').innerHTML = `
  <main class="counter-card" aria-labelledby="counter-title">
    <h1 id="counter-title">カウンター</h1>
    <output id="result" class="result" aria-live="polite" aria-atomic="true">1</output>
    <div class="controls" aria-label="カウンター操作">
      <button id="divide" class="button button--divide" type="button">÷2</button>
      <button id="multiply" class="button button--multiply" type="button">×2</button>
    </div>
    <button id="reset" class="reset-button" type="button">リセット</button>
  </main>
`;

const result = document.querySelector('#result');

const formatPowerOfTwo = (power) => {
  if (power >= -39 && power <= 39) {
    return (2 ** power).toLocaleString('ja-JP', {
      maximumSignificantDigits: 15,
    });
  }

  const decimalExponent = power * Math.log10(2);
  const exponentPart = Math.floor(decimalExponent);
  const coefficient = 10 ** (decimalExponent - exponentPart);
  const coefficientText = coefficient.toFixed(10).replace(/\.?0+$/, '');

  return `${coefficientText}e${exponentPart}`;
};

const render = (isReset = false) => {
  result.textContent = formatPowerOfTwo(exponent);
  result.classList.toggle('result--fraction', exponent < 0);
  result.classList.toggle('result--reset', isReset);
  localStorage.setItem(STORAGE_KEY, exponent.toString());
};

document.querySelector('#multiply').addEventListener('click', () => {
  exponent += 1;
  render();
});

document.querySelector('#divide').addEventListener('click', () => {
  exponent -= 1;
  render();
});

document.querySelector('#reset').addEventListener('click', () => {
  exponent = 0;
  render(true);
});

render();
