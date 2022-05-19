// Elements Variable
const formEl = document.querySelector(".grocery-form");
const inputEl = document.querySelector("#grocery");
const groceryContainerEl = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");

const submitBtn = document.querySelector(".submit-btn");
const clearItemsBtn = document.querySelector(".clear-btn");

// 처음에는 null ( editBtn이 만들이지지 않았기 때문. )

// ****** SETUP ITEMS **********
// [Variable]

// item 들을 담고 있는 배열.
let itemList = [];

// item : id(key), value(vlaue) 로 이루어진 객체.

// ****** EVENT LISTENERS **********

// click Submit Button
formEl.addEventListener("submit", createElement);

// click ClearItems Button
clearItemsBtn.addEventListener("click", clearList);

// click Delete Button

// ****** FUNCTIONS **********
// add item
function createElement(e) {
  e.preventDefault();

  if (document.querySelector(".submit-btn").textContent === "submit") {
    let item = {
      id: Date.now(),
      value: inputEl.value,
    };

    // Creating Elements
    const articleEl = document.createElement("article");
    const pEl = document.createElement("p");
    const containerBtnEl = document.createElement("div");
    const editBtnEl = document.createElement("button");
    const delBtnEl = document.createElement("button");
    const editIconEl = document.createElement("i");
    const delIconEl = document.createElement("i");

    // Appending Elements
    groceryList.appendChild(articleEl);
    articleEl.appendChild(pEl);
    articleEl.appendChild(containerBtnEl);
    containerBtnEl.appendChild(editBtnEl);
    containerBtnEl.appendChild(delBtnEl);
    editBtnEl.appendChild(editIconEl);
    delBtnEl.appendChild(delIconEl);

    // Adding ClassName
    groceryContainerEl.classList.add("show-container");
    articleEl.classList.add("grocery-item");
    pEl.classList.add("title");
    containerBtnEl.classList.add("btn-container");
    editBtnEl.classList.add("edit-btn");
    delBtnEl.classList.add("delete-btn");
    editIconEl.classList.add("fas", "fa-edit");
    delIconEl.classList.add("fas", "fa-trash");

    // id 넣어주기
    articleEl.setAttribute("data-id", item.id);

    // value 넣어주기 및 inputEl.value 초기화
    pEl.textContent = inputEl.value;
    inputEl.value = "";

    // itemList 배열에 item 넣어주기
    itemList.push(item);

    displayAlert("item added to the list", "success");

    // editBtn addEventListener

    // deleteBtn addEventListenner
    delBtnEl.addEventListener("click", () => {
      deleteButton(articleEl, item.id, item.value);
    });
  } else if (document.querySelector(".submit-btn").textContent === "edit") {
    editBtnEl.addEventListener("click", () => {
      editButton(pEl, item.id, item.value);
      displayAlert("value changed", "success");
    });
  } else {
    displayAlert("please enter value", "danger");
  }
}

function clearList() {
  // 하위 Element 모두 삭제
  while (groceryList.hasChildNodes()) {
    groceryList.removeChild(groceryList.firstChild);
  }
  // remove show-container ClassName
  groceryContainerEl.classList.remove("show-container");
  inputEl.textContent = "";
}

function editButton(el, id, value) {
  // submit 버튼 텍스트 값 변경.
  submitBtn.textContent = "Edit";
  el.textContent = inputEl.value;

  // 새로운 내용 받아오기.
  const newItem = inputEl.value;

  // 배열에서 받아온 값으로 변경 : 1. 배열에서 받아온 id를 기준으로 탐색 -> 2. 탐색한 value 값 변경.
  itemList.filter((el) => {
    if (el.id === id) {
      el.value = newItem;
    }
  });

  // 화면 내용 변경
  el.textContent = newItem;
}

function deleteButton(el, id, value) {
  // 배열 안에서 값을 삭제
  itemList.filter((el, idx) => {
    if (el.id === id) {
      itemList.splice(idx, 1);
    }
  });

  // 화면에서 삭제.
  el.remove();
  displayAlert("item removed", "danger");
}

// display alert
function displayAlert(text, action) {
  alert.textContent = text;
  alert.classList.add(`alert-${action}`);
  // remove alert
  setTimeout(function () {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

// function giveAttrIdValue(id, value) {}

// ****** LOCAL STORAGE **********
