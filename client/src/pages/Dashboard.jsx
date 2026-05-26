import { useEffect, useState } from "react";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  updateEmployee
} from "../services/employeeService";

function Dashboard() {

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: ""
  });

  const fetchEmployees = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    const loadEmployees = async () => {
      await fetchEmployees();
    };

    loadEmployees();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(editId) {

      await updateEmployee(editId, formData);

      alert("Employee Updated");

      setEditId(null);

    } else {

      await addEmployee(formData);

      alert("Employee Added");
    }

    setFormData({
      name: "",
      email: "",
      phone: "",
      department: "",
      salary: ""
    });

    fetchEmployees();
  };

  const handleDelete = async (id) => {

    if(window.confirm("Delete Employee?")) {

      await deleteEmployee(id);

      fetchEmployees();
    }
  };

  const handleEdit = (emp) => {

    setFormData({
      name: emp.name,
      email: emp.email,
      phone: emp.phone,
      department: emp.department,
      salary: emp.salary
    });

    setEditId(emp._id);
  };

  return (

    <div className="bg-light min-vh-100">

      <nav className="navbar navbar-dark bg-dark shadow-sm px-4 py-3">

        <h3 className="text-white fw-bold m-0">
          Employee Management System
        </h3>

        <button
          className="btn btn-danger"
          onClick={() => window.location.href = "/"}
        >
          Logout
        </button>

      </nav>

      <div className="container py-5">

        <h2 className="mb-4 fw-bold text-center text-primary">
          Employee Dashboard
        </h2>

        <div className="row justify-content-center mb-5">

          <div className="col-md-4">

            <div className="card shadow border-0 rounded-4 text-center bg-primary text-white p-4">

              <h4>Total Employees</h4>

              <h1 className="fw-bold">
                {employees.length}
              </h1>

            </div>

          </div>

        </div>

        <div className="card p-4 shadow-lg border-0 rounded-4 mb-5">

          <h4 className="mb-4">
            {editId ? "Edit Employee" : "Add Employee"}
          </h4>

          <form onSubmit={handleSubmit}>

            <div className="row">

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  title="Enter 10 digit phone number"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  name="department"
                  placeholder="Department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <input
                  type="number"
                  name="salary"
                  placeholder="Salary"
                  className="form-control"
                  value={formData.salary}
                  onChange={handleChange}
                  min="1000"
                  required
                />
              </div>

            </div>

            <button className="btn btn-primary px-4">
              {editId ? "Update Employee" : "Add Employee"}
            </button>

          </form>

        </div>

        <div className="card p-4 shadow-lg border-0 rounded-4">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h4 className="m-0">Employee List</h4>

            <input
              type="text"
              placeholder="Search Employee"
              className="form-control w-25"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <table className="table table-hover table-striped align-middle">

            <thead className="table-dark">

              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {employees.length === 0 ? (

                <tr>
                  <td colSpan="6" className="text-center">
                    No Employees Found
                  </td>
                </tr>

              ) : (

                employees
                  .filter((emp) =>
                    emp.name.toLowerCase().includes(search.toLowerCase()) ||
                    emp.department.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((emp) => (

                  <tr key={emp._id}>

                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.phone}</td>
                    <td>{emp.department}</td>
                    <td>₹ {emp.salary}</td>

                    <td>

                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(emp)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;