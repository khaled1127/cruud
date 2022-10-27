let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
// console.log(title, price, taxes, ads, discount, total, count, category, submit);

function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

let datapro = [];

if (localStorage.product != null) {
  datapro = JSON.parse(localStorage.product);
} else {
  datapro = [];
}

submit.onclick = function () {
  let newArarry = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    total: total.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if (title.value != "" 
  && price.value != "" 
  && category.value != ""
  && newArarry.count<=1000){
    if (mood === "create") {
      if (newArarry.count > 1) {
        for (let i = 0; i < newArarry.count; i++) {
          datapro.push(newArarry);
        }
      } else {
        datapro.push(newArarry);
      }
    } else {
      datapro[tmp] = newArarry;
      mood = "create";
      submit.innerHTML = "create";
      count.style.display = "block";
    }
    cleardata();
  }

  // datapro.push(newArarry);

  localStorage.setItem("product", JSON.stringify(datapro));
  // console.log(datapro);

  showdata();
};

function cleardata() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
  discount.value = "";
}

// read
function showdata() {
  getTotal();
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    table += `
      <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].parse}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
    // console.log(table);
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");

  if (datapro.length > 0) {
    btnDelete.innerHTML = `<button onclick="deletelAll()">Delete All(${datapro.length})</button>`;
  } else {
    btnDelete.innerHTML = "";
  }
}
showdata();
// delete
function deleteData(i) {
  console.log(i);
  datapro.splice(i, 1);
  localStorage.product = JSON.stringify(datapro);
  showdata();
}
// deleteAll;
function deletelAll() {
  localStorage.clear();
  datapro.splice(0);
  showdata();
}

function updateData(i) {
  title.value = datapro[i].title;
  price.value = datapro[i].price;
  taxes.value = datapro[i].taxes;
  ads.value = datapro[i].ads;
  discount.value = datapro[i].discount;
  getTotal();
  count.style.display = "none";
  category.value = datapro[i].category;
  submit.innerHTML = "update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchModd = "title";
function getsearchMood(id) {
  let search = document.getElementById("search");
  if (id == "searchtitle") {
    searchModd = "title";
    // console.log(search);
  } else {
    searchModd = "category";

    // console.log(search);
  }
  search.placeholder = "Search By " + searchModd;
  search.focus();
  search.value = "";
  showdata();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < datapro.length; i++) {
    if (searchModd == "title") {
      if (datapro[i].title.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].parse}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    } else {
      if (datapro[i].category.includes(value.toLowerCase())) {
        table += `
      <tr>
        <td>${i}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].parse}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button onclick="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
      </tr>`;
      }
    }
  }

  document.getElementById("tbody").innerHTML = table;
}
