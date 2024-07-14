import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import CustomerChart from "./components/CustomerChart";
import ErrorBoundary from "./components/ErrorBoundary";
import ClipLoader from "react-spinners/ClipLoader"; // Importing a spinner from react-spinners
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [darkModeLoading, setDarkModeLoading] = useState(false); // State variable for dark mode loading

  const toggleDarkMode = () => {
    setDarkModeLoading(true);
    setTimeout(() => {
      setDarkMode((prevMode) => !prevMode);
      setDarkModeLoading(false);
    }, 500); // Simulate a loading delay for dark mode toggle
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersRes = await axios.get(
          // "https://reacttask.pythonanywhere.com/api/customers/"
          "https://mmy2000.github.io/json_server/customers.json" // this is for json server
        );
        const transactionsRes = await axios.get(
          // "https://reacttask.pythonanywhere.com/api/transactions/"
          "https://mmy2000.github.io/json_server/transactions.json" // this is for json server
        );
        // setCustomers(customersRes.data.customers);
        setCustomers(customersRes.data.customers); // this is for json server
        // setTransactions(transactionsRes.data.transactions);
        setTransactions(transactionsRes.data.transactions);  //this is for json server
        console.log(customersRes.data);
        console.log(transactionsRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
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
          className={`px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 ${
            darkMode ? "text-black" : "text-black"
          }`}
          onClick={toggleDarkMode}
        >
          {darkModeLoading ? (
            <ClipLoader size={20} color="#000" />
          ) : darkMode ? (
            "Light Mode"
          ) : (
            "Dark Mode"
          )}
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Customer Transactions</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color={darkMode ? "#fff" : "#000"} />
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default App;
