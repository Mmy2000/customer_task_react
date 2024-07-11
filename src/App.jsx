import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomerTable from "./components/CustomerTable";
import CustomerChart from "./components/CustomerChart";
import ErrorBoundary from "./components/ErrorBoundary"; // Import the ErrorBoundary component
import "./App.css";

function App() {
  const [customers, setCustomers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersRes = await axios.get("http://localhost:5000/customers");
        const transactionsRes = await axios.get(
          "http://localhost:5000/transactions"
        );
        setCustomers(customersRes.data);
        setTransactions(transactionsRes.data);
        console.log(customersRes.data);
        console.log(transactionsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
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
          />
        </ErrorBoundary>
      )}
    </div>
  );
}

export default App;
