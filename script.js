let tabel = document.getElementById("expenseInfo");
let expenses = [];
let income = document.getElementById("income").value;
const btnCalculate = document.getElementById("Calculate");
let totalSpent = document.getElementById("total");
let total;

addExpense = (expense, price, category) => {
  let rowCount = tabel.rows.length;
  let expenseObject = new Object();
  expenseObject.expense = expense;
  expenseObject.price = Number(price);
  expenseObject.category = category;
  expenses.push(expenseObject);
  //add the expense and price fields to the tabel and add a 'remove' button with id 'remove'
  let r = tabel.insertRow(rowCount);
  r.insertCell(0).textContent = expenses[rowCount].expense;
  r.insertCell(1).textContent = expenses[rowCount].price;
  r.insertCell(2).textContent = expenses[rowCount].category;
  const btnRemove = document.createElement("button");
  btnRemove.setAttribute("id", "remove");
  btnRemove.innerHTML = "Remove";
  btnRemove.addEventListener("click", () => {
    let selectedRow = r.rowIndex - 1;
    expenses.splice(selectedRow, 1);
    tabel.deleteRow(selectedRow);
    totalSpent.innerHTML = `${total}`;
    document.getElementById("remaining").innerHTML = `Remaining: ${
      document.getElementById("income").value - total
    }`;
    total = expenses.reduce((prev, cur) => prev + cur.price, 0);
  });
  r.insertCell(3).append(btnRemove);
  const btnEdit = document.createElement("button");
  btnEdit.id = "btn-edit";
  btnEdit.innerHTML = "Edit";
  btnEdit.addEventListener("click", () => {
    document.getElementById("form").style.display = "none";
    document.getElementById("edit").style.display = "block";
  });
  r.insertCell(4).append(btnEdit);
  document.getElementById("btnUpdateExpense").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("edit").style.display = "none";
    document.getElementById("form").style.display = "block";
    expenses[r.rowIndex - 1].expense =
      document.getElementById("expense-item").value;
    expenses[r.rowIndex - 1].price =
      document.getElementById("expense-price").value;
    expenses[r.rowIndex - 1].category =
      document.getElementById("category-update").value;
    tabel.rows[r.rowIndex - 1].cells[0].innerHTML =
      expenses[r.rowIndex - 1].expense;
    tabel.rows[r.rowIndex - 1].cells[1].innerHTML =
      expenses[r.rowIndex - 1].price;
    tabel.rows[r.rowIndex - 1].cells[2].innerHTML =
      expenses[r.rowIndex - 1].category;
  });
};

isInRange = (value, arr) => {
  //value refers to a total of numbers added together. Arr is the array that gets checked (getTotalSpent returns the sum of all expense prices in the array.)
  return total <= value;
};

btnCalculate.addEventListener("click", () => {
  const cat = document.getElementById("category").value;
  addExpense(
    document.getElementById("expense").value,
    document.getElementById("price").value,
    cat
  );
  document.getElementById("totals").innerHTML = "";
  for (let i of [
    "Savings",
    "Housing",
    "Transportation",
    "Food",
    "Utilities",
    "Insurance",
    "Medical",
    "Personal spending",
    "Recreation",
    "Miscellaneous",
  ]) {
    document.getElementById(
      "totals"
    ).innerHTML += `<li>${i}: ${addTotalByCategory(i)}</li>`;
  }
  let status = isInRange(document.getElementById("income").value, expenses)
    ? "in Range"
    : "Out of range";
  totalSpent.innerHTML = `${status} Spent ${total}`;
  document.getElementById("remaining").innerHTML = `Remaining: ${
    document.getElementById("income").value - total
  }`;
  total = expenses.reduce((prev, cur) => prev + cur.price, 0);
});

addTotalByCategory = (category) => {
  var total = 0;
  for (let i of expenses) {
    if (i.category === category) {
      total += Number(i.price);
    }
  }
  return total;
};
