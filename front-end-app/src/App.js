import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");

  const loadEmployees = async () => {
    const response = await axios.get("/api/employees");
    setEmployees(response.data);
  };

  const addEmployee = async () => {
    await axios.post("/api/employees", {
      name: name
    });

    setName("");
    loadEmployees();
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Management System</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Employee Name"
      />

      <button onClick={addEmployee}>Add</button>

      <ul>
        {employees.map(emp => (
          <li key={emp.id}>{emp.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;