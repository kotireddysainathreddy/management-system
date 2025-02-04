import React from "react";

const EmployeeList = ({ employees, deleteEmployee, editEmployee }) => {
  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
             <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees && employees.length > 0 ? (
            employees.map((employee) => (
              <tr >
                
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>
                  <button onClick={() => editEmployee(employee)}>Edit</button>
                  <button onClick={() => deleteEmployee(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;