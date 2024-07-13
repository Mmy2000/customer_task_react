import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function CustomerTable({ customers, transactions, setSelectedCustomer }) {
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (filter === "") {
      setLoading(false);
    }
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500); // Simulate a loading delay of 500ms
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(filter.toLowerCase())
  );

  const getCustomerTransactions = (customerId) => {
    return transactions.filter(
      (transaction) => transaction.customer_id === customerId
    );
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Filter by name"
        value={filter}
        onChange={handleFilterChange}
        className="border p-2 mb-4 w-full"
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <ClipLoader size={50} color="#000" />
        </div>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">Name</th>
              <th className="border border-gray-200 p-2">Transactions Date</th>
              <th className="border border-gray-200 p-2">
                Transactions Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr
                key={customer.id}
                onClick={() => setSelectedCustomer(customer)}
                className="cursor-pointer hover:bg-gray-100 hover:text-black"
              >
                <td className="border border-gray-200 p-2">{customer.name}</td>
                <td className="border border-gray-200 p-2">
                  {getCustomerTransactions(customer.id).map((transaction) => (
                    <div key={transaction.id}>{transaction.date}</div>
                  ))}
                </td>
                <td className="border border-gray-200 p-2">
                  {getCustomerTransactions(customer.id).map((transaction) => (
                    <div key={transaction.id}>${transaction.amount}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerTable;
