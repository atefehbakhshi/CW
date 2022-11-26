"use script";

const addBtn = document.getElementById("add");
const deleteBtn = document.getElementById("delete");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const tabelContainer = document.getElementById("tabelcontainer");

let localstorageobject = [];

let localStrg = JSON.parse(localStorage.getItem("user"));
localStrg === null
  ? (localstorageobject = [])
  : (localstorageobject = localStrg);

const toggle = (e) => {
  e.target.checked = true;
};

resultTable(localstorageobject);

// add items to table
addBtn.addEventListener("click", () => {
  let userobj = {};
  userobj.firstname = firstname.value;
  userobj.lastname = lastname.value;
  userobj.checked = false;
  userobj.id = new Date().getMilliseconds();

  localstorageobject.push(userobj);

  localStorage.setItem("user", JSON.stringify(localstorageobject));

  tabelContainer.innerHTML = "";
  resultTable(localstorageobject);
});

// delete checked items
deleteBtn.addEventListener("click", () => {
  let deleteItems = localstorageobject.filter((item) => item.checked == true);

  deleteItems.forEach((elem) => {
    let deleteItemIndex = localstorageobject.findIndex(
      (item) => item.id == elem.id
    );
    localstorageobject.splice(deleteItemIndex, 1);
  });

  localStorage.setItem("user", JSON.stringify(localstorageobject));

  tabelContainer.innerHTML = "";
  resultTable(localstorageobject);
});

// delete and edite table
tabelContainer.addEventListener("click", (e) => {
  let deleteItemIndex = localstorageobject.findIndex(
    (item) => item.id == e.composedPath()[1].id
  );

  //   delete an item in table
  if (e.target.classList.contains("delete")) {
    localstorageobject.splice(deleteItemIndex, 1);
    localStorage.setItem("user", JSON.stringify(localstorageobject));
  }

  // checked item
  let checked = e.target.getAttribute("type");
  if (checked === "checkbox") {
    let checkedItem = localstorageobject.find(
      (item) => item.id == e.composedPath()[2].id
    );

    if (checkedItem.checked === true) {
      checkedItem.checked = false;
    } else {
      checkedItem.checked = true;
    }
  }

  localStorage.setItem("user", JSON.stringify(localstorageobject));
  tabelContainer.innerHTML = "";
  resultTable(localstorageobject);
});

// display result in html
function resultTable(obj) {
  const table = document.createElement("table");

  // the header of result table
  const tableHeaderItems = [
    "checkbox",
    "First Name",
    "Last Name",
    "Delete",
    "Edite",
  ];
  let headerRow = table.insertRow();
  tableHeaderItems.forEach((item) => {
    let headerCell = document.createElement("th");
    headerCell.innerHTML = item;
    headerRow.appendChild(headerCell);
  });

  // the body of result table
  for (let i = 0; i < obj.length; i++) {
    const row = table.insertRow();
    const checkbox = row.insertCell(0);
    const firstname = row.insertCell(1);
    const lastname = row.insertCell(2);
    const delete1 = row.insertCell(3);
    const edit = row.insertCell(4);

    let input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.checked = obj[Object.keys(obj)[i]].checked;
    checkbox.append(input);

    firstname.innerHTML = obj[Object.keys(obj)[i]].firstname;
    lastname.innerHTML = obj[Object.keys(obj)[i]].lastname;
    delete1.innerHTML = "delete";
    delete1.classList.add("delete");
    edit.innerHTML = "edit";
    edit.classList.add("edit");
    row.id = obj[Object.keys(obj)[i]].id;

    tabelContainer.appendChild(table);
  }
}

