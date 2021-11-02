import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';
const feedbackFormRef = document.querySelector('.feedback-form');

console.log(feedbackFormRef.elements);

initForm();

feedbackFormRef.addEventListener(
  'input',
  throttle(evt => {
    let localSavedfeedback = localStorage.getItem(LOCALSTORAGE_KEY);
    localSavedfeedback = localSavedfeedback ? JSON.parse(localSavedfeedback) : {};
    localSavedfeedback[evt.target.name] = evt.target.value;
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(localSavedfeedback));
  }, 500),
);

feedbackFormRef.addEventListener('submit', evt => {
  evt.preventDefault();
  const email = feedbackFormRef.elements.email.value;
  const message = feedbackFormRef.elements.message.value;
  const formData = new FormData(feedbackFormRef);
  if (!email || !message) {
    alert('Для відправки повідомлення потрібно заповнити усі поля!');
  }
  formData.forEach((value, name) => console.log(value, name));
  localStorage.removeItem(LOCALSTORAGE_KEY);
  feedbackFormRef.reset();
});

function initForm() {
  let localSavedfeedback = localStorage.getItem(LOCALSTORAGE_KEY);
  if (localSavedfeedback) {
    localSavedfeedback = JSON.parse(localSavedfeedback);
    Object.entries(localSavedfeedback).forEach(
      ([nameEL, text]) => (feedbackFormRef.elements[nameEL].value = text),
    );
  }
}
