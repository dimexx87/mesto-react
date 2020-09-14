// ПРИСВОЕНИЕ ИМЕН
const title = document.querySelector("#name");
const about = document.querySelector("#about");
const nameInput = document.querySelector(".profile__title");
const aboutInput = document.querySelector(".profile__subtitle");
const avatarInput = document.querySelector(".profile__photo");
const popUpEdit = document.querySelector("#edit");
const popUpAdd = document.querySelector("#add");
const popUpPhotoEdit = document.querySelector("#avatar");
const popUpDelete = document.querySelector("#deleteCard");
const formEditElement = document.querySelector("#formEditElement");
const formAddElement = document.querySelector("#formAddElement");
const gridContainer = document.querySelector(".photo-grid");
const cardTemplate = document.querySelector("#cardTemplate");
const place = document.querySelector("#place");
const link = document.querySelector("#link");
const saveBtnPrf = document.querySelector("#saveButtonProfile");
const saveBtnAvt = document.querySelector("#saveButtonAvatar");
// атрибуты формы валидации
const data = {
  formInput: ".popup__text", // поле ввода
  buttonElement: ".popup__btn-save", // кнопки сохранить/добавить
  inactiveButtonclassName: "popup__btn-save_disabled", // неактивная кнопка сохранить/добавить
  inputErrorclassName: "popup__text_type_error", //красное подчеркивание
  errorclassName: "popup__input-error", // красное оформление
};
// атрибуты API
const options = {
  url: "https://mesto.nomoreparties.co/v1/cohort-14",
  headers: {
    authorization: "42ce0924-10a6-4b78-98b5-287f3f244b55",
    "Content-Type": "application/json",
  },
};
const ownerID = "d8de4200ba05da81c45a276b";

// НАЗНАЧЕНИЕ КНОПОК
const editButton = document.querySelector(".profile__btn-edit");
const closeButtonEditForm = document.querySelector("#closeEditForm");
const closeButtonAddForm = document.querySelector("#closeAddForm");
const closeButtonPictureForm = document.querySelector("#cardPictureForm");
const addButton = document.querySelector(".profile__btn-add");
const editPhotoButton = document.querySelector(".profile__avatar");

const popUpView = document.querySelector("#view");
const zoomPicture = document.querySelector("#image");
const zoomTitle = document.querySelector("#pictureTitle");

export {
  title,
  about,
  nameInput,
  aboutInput,
  popUpEdit,
  popUpAdd,
  formEditElement,
  formAddElement,
  gridContainer,
  cardTemplate,
  place,
  link,
  data,
  editButton,
  closeButtonEditForm,
  closeButtonAddForm,
  closeButtonPictureForm,
  addButton,
  popUpView,
  zoomPicture,
  zoomTitle,
  options,
  avatarInput,
  editPhotoButton,
  popUpPhotoEdit,
  popUpDelete,
  saveBtnPrf,
  saveBtnAvt,
  ownerID,
};
