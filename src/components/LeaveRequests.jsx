import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Container,
  Nav,
  Badge,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveRequests = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeLink, setActiveLink] = useState("/approve-leave"); // Set active link to current page

  const fetchLeaves = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/leaves");
      setLeaveRequests(res.data);
    } catch (error) {
      console.error("Error fetching leaves:", error);
    }
  };

  const handleAction = async (id, action) => {
    try {
        await axios.patch(`http://localhost:5000/api/leaves/${id}`, {
            status: action,
          });
          
      if (action === "Rejected") {
        // Remove the rejected request from the list
        setLeaveRequests((prev) => prev.filter((req) => req._id !== id));
      } else {
        // Re-fetch for other status updates
        fetchLeaves();
      }
    } catch (error) {
      console.error("Failed to update leave:", error);
    }
  };

  const handleLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleNavigation = (path) => {
    setActiveLink(path);
    navigate(path);
  };

  const pendingCount = leaveRequests.filter(
    (req) => req.status === "Pending"
  ).length;

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
                {pendingCount > 0 && (
                  <Badge bg="danger" pill className="ms-2">
                    {pendingCount}
                  </Badge>
                )}
              </div>
            )}
            {!showSidebar && pendingCount > 0 && (
              <Badge
                bg="danger"
                pill
                style={{ position: "absolute", top: "5px", right: "5px" }}
              >
                {pendingCount}
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
          <Row className="mb-4">
            <Col>
              <div className="bg-white rounded-3 shadow-sm p-4 border-start border-5 border-primary">
                <h2 className="fw-bold text-primary mb-1">Leave Requests</h2>
                <p className="text-muted">
                  Manage and respond to employee leave requests
                </p>
              </div>
            </Col>
          </Row>

          <Card className="border-0 shadow-sm">
            <Card.Body className="p-0">
              {leaveRequests.filter((req) => req.status === "Pending")
                .length === 0 ? (
                <div className="text-center py-5">
                  <div className="mb-3 text-muted fs-1">📅</div>
                  <h4>No pending leave requests</h4>
                  <p className="text-muted">
                    All leave requests have been processed.
                  </p>
                </div>
              ) : (
                <Table hover responsive className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="fw-semibold">#</th>
                      <th className="fw-semibold">Employee</th>
                      <th className="fw-semibold">Date</th>
                      <th className="fw-semibold">Reason</th>
                      <th className="fw-semibold">Status</th>
                      <th className="fw-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaveRequests
                      .filter((req) => req.status === "Pending")
                      .map((req, index) => (
                        <tr key={req._id}>
                          <td>{index + 1}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="bg-light rounded-circle p-2 me-2 text-primary fw-bold">
                                {req.employee.charAt(0)}
                              </div>
                              {req.employee}
                            </div>
                          </td>
                          <td>{req.date}</td>
                          <td>{req.reason}</td>
                          <td>
                            <Badge
                              bg={
                                req.status === "Approved"
                                  ? "success"
                                  : req.status === "Rejected"
                                  ? "danger"
                                  : "warning"
                              }
                              pill
                            >
                              {req.status || "Pending"}
                            </Badge>
                          </td>
                          <td>
                            {req.status === "Pending" ? (
                              <>
                                <Button
                                  variant="success"
                                  size="sm"
                                  onClick={() =>
                                    handleAction(req._id, "Approved")
                                  }
                                  className="me-2"
                                >
                                  <i className="me-1">✓</i> Approve
                                </Button>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() =>
                                    handleAction(req._id, "Rejected")
                                  }
                                >
                                  <i className="me-1">✗  </i> Decline
                                </Button>
                              </>
                            ) : (
                              <span>—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>

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

export default LeaveRequests;