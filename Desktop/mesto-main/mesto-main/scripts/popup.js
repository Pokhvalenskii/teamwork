let popup = document.querySelector('.popup');
let editBtn = document.querySelector('.profile__edit-btn');
let popupProfileCloseBtn = document.querySelector('.popup__close-btn_place_profile');
let popupGalleryCloseBtn = document.querySelector('.popup__close-btn_place_gallery');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');
let form = document.querySelector('.form');
let titleField = document.querySelector('.form__item_type_title');
let subtitleField = document.querySelector('.form__item_type_subtitle');
let formSaveBtn = document.querySelector('.form__save-btn');
let popupCard = document.querySelector('.popup-card');
let addCardBtn = document.querySelector('.profile__add-btn');
let gallerySaveBtn = document.querySelector('.form__save-btn_place_gallery');


function createCard() {
  popupCard.classList.add('popup-card_active');
  titleField.value = ' ';
  subtitleField.value = ' ';
}

//Открытие поп-апа
function showPopup() {
  popup.classList.add('popup_active');
  titleField.value = profileName.textContent;
  subtitleField.value = profileCaption.textContent;
}

//Закрытие поп-апа
function closePopup() {
  popup.classList.remove('popup_active');
}

function closePopupGallery() {
  popupCard.classList.remove('popup-card_active');
}

//Сохранение изменений, введённых в popup-profile
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = titleField.value;
  profileCaption.textContent = subtitleField.value;
  formSaveBtn.addEventListener('click', closePopup);
}

//Слушатели
editBtn.addEventListener('click', showPopup);
popupProfileCloseBtn.addEventListener('click', closePopup);
popupGalleryCloseBtn.addEventListener('click', closePopupGallery);
form.addEventListener('submit', formSubmitHandler);
addCardBtn.addEventListener('click', createCard);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const galleryContainer = document.querySelector('#gallery').content;
const galleryCards = document.querySelector('.gallery');
const cardForm = document.querySelector('.form_place_card');
const cardName = cardForm.querySelector('[name=name]');
const cardLink = cardForm.querySelector('[name=link]');
const cardImgItems = galleryContainer.querySelector('.gallery__card-image');

const popupImageClose = document.querySelector('.popup__close-btn_place_image');
const popupImage = document.querySelector('.popup-image');

function initCards(a) {
  const galleryElement = galleryContainer.querySelector('.gallery__card-item').cloneNode(true);
  galleryElement.querySelector('.gallery__card-image').src = a.link;
  galleryElement.querySelector('.gallery__card-image').alt = a.name;
  galleryElement.querySelector('.gallery__card-name').textContent = a.name;
  galleryElement.querySelector('.gallery__remove-btn').addEventListener('click', removeCard);
  galleryCards.appendChild(galleryElement);
  galleryCards.prepend(galleryElement);
  galleryElement.querySelector('.gallery__card-image').addEventListener('click', () => {
    popupImage.classList.add('popup-image_is-opened');
    const popupImageObj = document.querySelector('.popup-image__img');
    const imageTitle = popupImage.querySelector('.form__heading_place_card');
    popupImageObj.src = a.link;
    popupImageObj.alt = a.name;
    imageTitle.textContent = a.name;
  });

  popupImageClose.addEventListener('click', () => {
    popupImage.classList.remove('popup-image_is-opened');
  });

  function cardLikeIcon(a) {
    a.target.classList.toggle('gallery__like-btn_active');
  }

  galleryElement.querySelector('.gallery__like-btn').addEventListener('click', cardLikeIcon);
};

//удаление карточки
function removeCard(e) {
  e.target.closest('.gallery__card-item').remove();
};



//Сохранение изменений, введённых в popup-gallery
cardForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = {
    name: cardName.value,
    link: cardLink.value
  };
  initCards(data);
  cardName.value = '';
  cardLink.value = '';
  galleryCards.prepend()
  gallerySaveBtn.addEventListener('click', closePopupGallery);
});

initialCards.forEach(initCards);