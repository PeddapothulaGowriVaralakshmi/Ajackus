import React, { useState, useEffect } from "react";
import "./css/styles.css"; // Import your CSS file

function App() {
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  // State for users
  const [users, setUsers] = useState([]);

  // State to track if we are editing a user
  const [editingUserIndex, setEditingUserIndex] = useState(null);

  // Load users from local storage on initial load
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    if (savedUsers) {
      setUsers(savedUsers); // Set users to the saved data if available
    }
  }, []);

  // Save users to local storage whenever they are updated
  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  // Handle opening the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormData({ firstName: "", lastName: "", email: "", department: "" }); // Reset form
    setEditingUserIndex(null); // Reset editing index
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingUserIndex !== null) {
      // Update existing user
      const updatedUsers = [...users];
      updatedUsers[editingUserIndex] = formData;
      setUsers(updatedUsers);
    } else {
      // Add new user
      setUsers((prevUsers) => [...prevUsers, formData]);
    }
    handleCloseModal();
  };

  // Handle editing a user
  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditingUserIndex(index);
    setIsModalOpen(true);
  };

  // Handle deleting a user
  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <div className="container">
      <h1>User Management</h1>

      {/* Add New User Button */}
      <button onClick={handleOpenModal}>Add New User</button>

      {/* User List Table */}
      <table id="userTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No users added yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Users */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{editingUserIndex !== null ? "Edit User" : "Add User"}</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="department">Department:</label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
              />

              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
