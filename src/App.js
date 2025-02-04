import React, { useState, useEffect } from "react";
import axios from "axios";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee";
import EditEmployee from "./components/EditEmployee";
import "./App.css";

const API_URL = "http://localhost:8084/api/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      const response = await axios.get(API_URL);
      setEmployees(response.data);
    } catch (error) {
      
    }
  };

  // Add a new employee
  const addEmployee = async (employee) => {
    try {
      const response = await axios.post(API_URL, employee);
      console.log("Employee added successfully:", response.data); // Log the response
      setEmployees([...employees, response.data]); // Update the state
    } catch (error) {
      
    }
  };

  // Update an existing employee
  const updateEmployee = async (id, updatedEmployee) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedEmployee);
      setEmployees(
        employees.map((employee) =>
          employee.id === id ? response.data : employee
        )
      );
      setEditingEmployee(null); // Exit edit mode
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setEmployees(employees.filter((employee) => employee.id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      <div className="container">
        {editingEmployee ? (
          <EditEmployee
            employee={editingEmployee}
            updateEmployee={updateEmployee}
            cancelEdit={() => setEditingEmployee(null)}
          />
        ) : (
          <AddEmployee addEmployee={addEmployee} />
        )}
        <EmployeeList
          employees={employees}
          deleteEmployee={deleteEmployee}
          editEmployee={setEditingEmployee}
        />
      </div>
    </div>
  );
}

export default App;