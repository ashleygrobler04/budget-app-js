let tabel = document.getElementById("expenseInfo");
let expenses = [];
let income = document.getElementById("income").value;
const btnCalculate = document.getElementById("Calculate");
let totalSpent = document.getElementById("total");

getTotalSpent = (arr) => {
    let amount = 0;
    for (let i = 0; i < arr.length; i++) {
        amount += Number(arr[i].price);
    }
    return amount;
};

addExpense = (expense, price, category) => {
    let rowCount = tabel.rows.length;
    let expenseObject = new Object();
    expenseObject.expense = expense;
    expenseObject.price = price;
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
        totalSpent.innerHTML = getTotalSpent(expenses);
    });
    r.insertCell(3).append(btnRemove);
};

isInRange = (value, arr) => {
    //value refers to a total of numbers added together. Arr is the array that gets checked (getTotalSpent returns the sum of all expense prices in the array.)
    return getTotalSpent(expenses) <= value;
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
    totalSpent.innerHTML = `${status} Spent ${getTotalSpent(expenses)}`;
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
