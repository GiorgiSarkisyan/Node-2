// import fetch from "node-fetch";

// const apiUrl = "https://api.weatherapi.com/v1/current.json";
// const apiKey = "6d210d800ff040bc960184527242301";

// let city = "Tbilisi";

// fetch(`${apiUrl}?key=${apiKey}&q=${city}`)
//   .then((response) => response.json())
//   .then((data) => {
//     const temperature = data.current.temp_c;
//     const condition = data.current.condition.text;
//     console.log(`${temperature}, ${condition}, ${city}`);
//   })
//   .catch((error) => console.log("error", error));

import fs from "fs";
import readlineSync from "readline-sync";
const expensesFile = "budget.json";

const loadExpenses = () => {
  try {
    const data = fs.readFileSync(expensesFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};

const saveExpenses = (data) => {
  fs.writeFileSync(expensesFile, JSON.stringify(data, null, 2), "utf8");
};

const addExpense = (category, amount) => {
  const expensesData = loadExpenses();
  expensesData[category] = (expensesData[category] || 0) + amount;
  saveExpenses(expensesData);
  console.log(`Expense "${category}" added: ${amount}`);
};

const deleteExpense = (category) => {
  const expensesData = loadExpenses();
  const amount = expensesData[category];
  delete expensesData[category];
  saveExpenses(expensesData);
  console.log(
    amount
      ? `Expense "${category}" deleted: ${amount}`
      : `Category "${category}" not found`
  );
};

const main = () => {
  console.log("1) Add Expense");
  console.log("2) Delete Expense");
  console.log("3) End Process");

  const choice = readlineSync.question("Your choice: ");
  switch (choice) {
    case "1":
      const category = readlineSync.question("Enter category: ");
      const amount = parseFloat(readlineSync.question("Enter amount: "));
      addExpense(category, amount);
      break;
    case "2":
      const categoryToDelete = readlineSync.question(
        "Enter category to delete: "
      );
      deleteExpense(categoryToDelete);
      break;
    case "3":
      console.log("Process ended.");
      process.exit();
      break;
    default:
      console.log("Invalid choice");
  }

  main();
};

main();
