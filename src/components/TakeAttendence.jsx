import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Table,
  Nav,
  Badge,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const TakeAttendance = () => {
  const [employees, setEmployees] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState("/take-attendance");
  const [leaveRequests] = useState([
    { id: 1, employee: "John Doe", date: "2025-04-15", status: "Pending" },
    { id: 2, employee: "Jane Smith", date: "2025-04-18", status: "Pending" },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleNavigation = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const markPresent = async (email, index) => {
    try {
      await axios.put('http://localhost:5000/api/employees/increment-working-days', { email });
      const updated = [...employees];
      updated[index].WorkingDays += 1;
      updated[index].attendanceStatus = 'Attendance Marked';
      setEmployees(updated);
      alert("Attendance Marked");
    } catch (err) {
      console.error('Error marking present:', err);
    }
  };

  const markAbsent = (index) => {
    const updated = [...employees];
    updated[index].attendanceStatus = 'Attendance Marked';
    setEmployees(updated);
    alert("Attendance Marked Absent");
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div
        className={`sidebar bg-white ${showSidebar ? "sidebar-expanded" : "sidebar-collapsed"}`}
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
          {showSidebar && <div className="fw-bold fs-5 text-dark">📊 XYZ ADMIN</div>}
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
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${activeLink === "/admin" ? "active-nav-link" : ""}`}
          >
            <span className="me-3">🏠</span>{showSidebar && <span>Home</span>}
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavigation("/view-employee")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${activeLink === "/view-employee" ? "active-nav-link" : ""}`}
          >
            <span className="me-3">👥</span>{showSidebar && <span>View Employees</span>}
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavigation("/add-employee")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${activeLink === "/add-employee" ? "active-nav-link" : ""}`}
          >
            <span className="me-3">➕</span>{showSidebar && <span>Add Employee</span>}
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavigation("/approve-leave")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${activeLink === "/approve-leave" ? "active-nav-link" : ""}`}
          >
            <span className="me-3">📅</span>
            {showSidebar && (
              <div className="d-flex align-items-center">
                <span>Leaves</span>
                {/* {leaveRequests.filter((req) => req.status === "Pending").length > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                    {leaveRequests.filter((req) => req.status === "Pending").length}
                  </Badge>
                )} */}
              </div>
            )}
          </Nav.Link>
          <Nav.Link
            onClick={() => handleNavigation("/take-attendance")}
            className={`py-3 px-3 d-flex align-items-center sidebar-nav-item ${activeLink === "/take-attendance" ? "active-nav-link" : ""}`}
          >
            <span className="me-3">✓</span>{showSidebar && <span>Attendance</span>}
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
        <Container fluid className="py-4 px-4">
          <h2 className="fw-bold text-primary text-center mb-4">Take Attendance</h2>
          <div className="bg-white rounded-3 shadow-sm p-4">
            <div className="table-responsive">
              <Table striped hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mark Attendance</th>
                    <th>Working Days</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, index) => (
                    <tr key={emp._id}>
                      <td>{index + 1}</td>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>
                        {emp.attendanceStatus === 'Attendance Marked' ? (
                          <span className="text-muted">Marked</span>
                        ) : (
                          <>
                            <Button
                              variant="success"
                              className="me-2"
                              onClick={() => markPresent(emp.email, index)}
                            >
                              Present
                            </Button>
                            <Button
                              variant="danger"
                              onClick={() => markAbsent(index)}
                            >
                              Absent
                            </Button>
                          </>
                        )}
                      </td>
                      <td>{emp.WorkingDays}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TakeAttendance;
