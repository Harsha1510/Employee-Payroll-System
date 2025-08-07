import React, { useState, useEffect } from "react";
import { Container, Button, Table, Row, Col, Nav, Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState("/view-employee"); // Set active link to current page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term

  // Mock leave requests for the sidebar badge
  const [leaveRequests] = useState([
    { id: 1, employee: "John Doe", date: "2025-04-15", status: "Pending" },
    { id: 2, employee: "Jane Smith", date: "2025-04-18", status: "Pending" },
  ]);

  useEffect(() => {
    fetch("http://localhost:5000/api/employees") // backend running on port 5000
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNavigation = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); // Update search term on input change
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-white ${
          showSidebar ? "sidebar-expanded" : "sidebar-collapsed"
        }`}
        style={{
          width: showSidebar ? "250px" : "70px",
          minHeight: "100vh",
          transition: "width 0.3s",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
          {showSidebar && (
            <div className="fw-bold fs-5 text-dark">📊 XYZ ADMIN</div>
          )}
          <Button
            variant="link"
            className="text-dark p-0"
            onClick={toggleSidebar}
            style={{
              marginLeft: showSidebar ? "0" : "auto",
              marginRight: showSidebar ? "0" : "auto",
            }}
          >
            {showSidebar ? "◀" : "▶"}
          </Button>
        </div>

        <Nav className="flex-column mt-3">
          <Nav.Link
            onClick={() => handleNavigation("/admin")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/admin" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">🏠</span>
            {showSidebar && <span>Home</span>}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/view-employee")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/view-employee" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">👥</span>
            {showSidebar && <span>View Employees</span>}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/add-employee")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/add-employee" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">➕</span>
            {showSidebar && <span>Add Employee</span>}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/approve-leave")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/approve-leave" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">📅</span>
            {showSidebar && (
              <div className="d-flex align-items-center">
                <span>Leaves</span>
                {/* {leaveRequests.filter((req) => req.status === "Pending")
                  .length > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                    {
                      leaveRequests.filter((req) => req.status === "Pending")
                        .length
                    }
                  </Badge>
                )} */}
              </div>
            )}
            {!showSidebar &&
              leaveRequests.filter((req) => req.status === "Pending").length >
                0 && (
                <Badge
                  bg="danger"
                  pill
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  {
                    leaveRequests.filter((req) => req.status === "Pending")
                      .length
                  }
                </Badge>
              )}
          </Nav.Link>

          <Nav.Link
            onClick={() => handleNavigation("/take-attendance")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${
              activeLink === "/take-attendance" ? "active-nav-link" : ""
            }`}
          >
            <span className="me-3">✓</span>
            {showSidebar && <span>Attendance</span>}
          </Nav.Link>
        </Nav>

        <div className="mt-auto p-3">
          <Button
            variant="outline-primary"
            onClick={handleLogout}
            className={showSidebar ? "w-100" : "w-100 p-1"}
          >
            {showSidebar ? "Logout" : "🚪"}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="content-wrapper bg-light"
        style={{
          marginLeft: showSidebar ? "250px" : "70px",
          width: `calc(100% - ${showSidebar ? "250px" : "70px"})`,
          transition: "margin-left 0.3s, width 0.3s",
          minHeight: "100vh",
        }}
      >
        {/* Mobile Toggle Button (visible only on small screens) */}
        <div className="d-lg-none p-2 bg-primary text-white">
          <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
            ☰ Menu
          </Button>
        </div>

        <Container fluid className="py-4 px-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold text-primary mb-1">Employee List</h2>
              <p className="text-muted">
                Manage all employees in your organization
              </p>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <Button
                variant="primary"
                className="d-flex align-items-center"
                onClick={() => navigate("/add-employee")}
              >
                <span className="me-1">➕</span> Add New Employee
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-3 shadow-sm p-4">
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-5">
                <div className="mb-3 text-muted fs-1">👥</div>
                <h4>No employees found.</h4>
                <p className="text-muted">No employees match your search criteria.</p>
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/add-employee")}
                >
                  Add Your First Employee
                </Button>
              </div>
            ) : (
              <div className="table-responsive">
                <Table hover className="align-middle">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="fw-semibold">
                        #
                      </th>
                      <th scope="col" className="fw-semibold">
                        Name
                      </th>
                      <th scope="col" className="fw-semibold">
                        Email
                      </th>
                      <th scope="col" className="fw-semibold">
                        Phone Number
                      </th>
                      <th scope="col" className="fw-semibold">
                        Salary (₹)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((emp, i) => (
                      <tr key={i} className="border-bottom">
                        <td>{i + 1}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="bg-light rounded-circle p-2 me-2 text-primary fw-bold">
                              {emp.name.charAt(0)}
                            </div>
                            {emp.name}
                          </div>
                        </td>
                        <td>{emp.email}</td>
                        <td>{emp.PhoneNumber}</td>
                        <td>₹{emp.salary.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>

          <footer className="mt-5 text-center text-muted">
            <p>
              &copy; {new Date().getFullYear()} XYZ Company - All Rights
              Reserved
            </p>
          </footer>
        </Container>
      </div>

      <style jsx>{`
        .sidebar-nav-item {
          color: #333;
          transition: all 0.2s ease;
          border-left: 4px solid transparent;
        }

        .sidebar-nav-item:hover {
          background-color: #f0f8ff;
          color: #0d6efd;
          border-left: 4px solid #0d6efd;
        }

        .active-nav-link {
          background-color: #f0f8ff;
          color: #0d6efd !important;
          border-left: 4px solid #0d6efd;
          font-weight: 500;
        }

        @media (max-width: 991.98px) {
          .sidebar {
            display: none;
          }
          .content-wrapper {
            margin-left: 0 !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EmployeeList;
