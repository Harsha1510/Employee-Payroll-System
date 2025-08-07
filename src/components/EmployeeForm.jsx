import React, { useState } from "react";
import {
  Container,
  Button,
  Form,
  Nav,
  Badge,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState("/add-employee");

  const [employee, setEmployee] = useState({
    name: "",
    salary: "",
    email: "",
    PhoneNumber: "",
    password: "",
  });

  const [leaveRequests] = useState([
    { id: 1, employee: "John Doe", date: "2025-04-15", status: "Pending" },
    { id: 2, employee: "Jane Smith", date: "2025-04-18", status: "Pending" },
  ]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/employees/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Employee added successfully");
        navigate("/view-employee");
      } else {
        alert(data.error || "Failed to add employee");
      }
    } catch (err) {
      console.error("Error posting employee:", err);
      alert("Server error");
    }
  };

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
                {/* Badge removed here */}
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
          width: showSidebar ? "calc(100% - 250px)" : "calc(100% - 70px)",
          transition: "margin-left 0.3s, width 0.3s",
          minHeight: "100vh",
        }}
      >
        {/* Mobile Toggle */}
        <div className="d-lg-none p-2 bg-primary text-white">
          <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
            ☰ Menu
          </Button>
        </div>

        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <div className="bg-white rounded-3 shadow-sm p-4 border-start border-5 border-success">
                <h1 className="display-6 fw-bold text-success mb-1">
                  Add New Employee
                </h1>
                <p className="text-muted">
                  Enter employee details to add them to the system
                </p>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={8} className="mx-auto">
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">
                            Full Name
                          </Form.Label>
                          <Form.Control
                            name="name"
                            onChange={handleChange}
                            placeholder="Enter employee's full name"
                            className="py-2"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">Salary</Form.Label>
                          <Form.Control
                            name="salary"
                            type="number"
                            onChange={handleChange}
                            placeholder="Enter annual salary"
                            className="py-2"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">
                            Email Address
                          </Form.Label>
                          <Form.Control
                            name="email"
                            type="email"
                            onChange={handleChange}
                            placeholder="Enter work email"
                            className="py-2"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium">
                            Phone Number
                          </Form.Label>
                          <Form.Control
                            name="PhoneNumber"
                            type="tel"
                            onChange={handleChange}
                            placeholder="Enter phone number"
                            className="py-2"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium">Password</Form.Label>
                      <Form.Control
                        name="password"
                        type="password"
                        onChange={handleChange}
                        placeholder="Create a temporary password"
                        className="py-2"
                      />
                      <Form.Text className="text-muted">
                        Employee will be able to change this after first login
                      </Form.Text>
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-4">
                      <Button
                        variant="outline-secondary"
                        onClick={() => navigate("/view-employee")}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" variant="success" className="px-4">
                        Add Employee
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        <footer className="bg-dark text-white py-4 mt-5">
          <Container className="text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} XYZ Company - Admin Dashboard
            </p>
          </Container>
        </footer>
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

export default EmployeeForm;
