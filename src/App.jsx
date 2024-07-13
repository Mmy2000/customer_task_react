import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import CustomerChart from "./components/CustomerChart";
import ErrorBoundary from "./components/ErrorBoundary"; 
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [darkMode, setDarkMode] = useState(false); // State variable for dark mode

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // localStorage.setItem('darkMode', !darkMode);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersRes = await axios.get(
          // "http://localhost:5000/customers" this is for json server
          "https://reacttask.pythonanywhere.com/api/customers/" // this is api i created  it using django framework
        );
        const transactionsRes = await axios.get(
          // "http://localhost:5000/transactions" this is for json server
          "https://reacttask.pythonanywhere.com/api/transactions/" // this is api i created  it using django framework
        );
        setCustomers(customersRes.data.customers);
        setTransactions(transactionsRes.data.transactions);
        console.log(customersRes.data.customers);
        console.log(transactionsRes.data.transactions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Apply dark mode class to body element
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-end mb-2">
        <button
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Customer Transactions</h1>
      <CustomerTable
        customers={customers}
        transactions={transactions}
        setSelectedCustomer={setSelectedCustomer}
      />
      {selectedCustomer && transactions.length > 0 && (
        <ErrorBoundary>
          <CustomerChart
            transactions={transactions.filter(
              (t) => t.customer_id === selectedCustomer.id
            )}
            darkMode={darkMode} 
          />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
