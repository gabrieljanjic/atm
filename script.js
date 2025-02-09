'use strict';

const inputResult = document.querySelector('.input-result');
const buttons = document.querySelectorAll('.button-values');

const firstScreen = document.querySelector('.first-screen');
const secondScreen = document.querySelector('.second-screen');

const nameValue = document.querySelector('.name-value');
const surnameValue = document.querySelector('.surname-value');
const dateValue = document.querySelector('.date-value');
const moneyValue = document.querySelector('.money-value');
const enterPin = document.querySelector('.screen-paragraf-enter-pin');
const inputMoney = document.querySelector('.input-money');
const korisnici = [
  { name: 'Gabriel', surname: 'Janjić', money: 2000, pin: 1234 },
  { name: 'Ivan', surname: 'Peric', money: 120, pin: 4321 },
  { name: 'Nikola', surname: 'Andrić', money: 50, pin: 2222 },
  { name: 'Luka', surname: 'Kolić', money: 1200, pin: 1111 },
];

let inputValue = '';
let finalPin = '';
let isEnteringMoney = false;
let korisnik = null;
buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    if (button.value === 'Refuse') {
      inputValue = '';
      inputResult.value = '';
      inputMoney.value = '';
    } else if (button.value === 'Logout') {
      inputValue = '';
      inputResult.value = '';
      inputMoney.value = '';
      isEnteringMoney = false;
      firstScreen.classList.remove('hidden');
      secondScreen.classList.add('hidden');
    } else if (button.value === 'Delete') {
      inputValue = inputValue.slice(0, -1);
      inputResult.value = inputValue;
    } else if (button.value === 'Accept') {
      if (!isEnteringMoney) {
        finalPin = inputValue;
        inputValue = '';
        inputResult.value = '';
        korisnik = korisnici.find(kor => kor.pin === Number(finalPin));

        if (korisnik) {
          firstScreen.classList.add('hidden');
          secondScreen.classList.remove('hidden');
          nameValue.textContent = korisnik.name;
          surnameValue.textContent = korisnik.surname;
          moneyValue.textContent = korisnik.money;
          isEnteringMoney = true;
        } else {
          inputResult.value = 'Krivi Pin!';
          inputValue = '';
        }
      } else {
        let iznos = Number(inputMoney.value);
        if (!isNaN(iznos) && iznos > 0 && iznos <= korisnik.money) {
          korisnik.money = korisnik.money - iznos;
          moneyValue.textContent = korisnik.money;
        }
        inputMoney.value = '';
      }
    } else {
      inputValue = inputValue + button.value;
      inputResult.value = inputValue;
      if (isEnteringMoney) {
        inputMoney.value = inputMoney.value + button.value;
      }
    } /*add(****) */
  });
});
