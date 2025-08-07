import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Card, Row, Col, Badge } from "react-bootstrap";
import {
  FaUserTie,
  FaBuilding,
  FaFileInvoiceDollar,
  FaSpinner,
  FaEnvelope,
  FaPhone,
  FaUserCog,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarMinus,
  FaExclamationCircle,
  FaCalendarPlus,
  FaMapMarkerAlt,
  FaIndustry,
  FaHistory,
  FaUsers,
} from "react-icons/fa";
import axios from "axios";
import "./Dashboard.css";

const Dashboard = ({ sidebarCollapsed = false }) => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allEmployees, setallEmployees] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => {
        setallEmployees(data);
        setCompany((prev) => ({
          ...prev,
          employees: data.length,
        }));
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  const email = localStorage.getItem("email");
  useEffect(() => {
    // Add or remove the sidebar-collapsed class on the body based on the prop
    if (sidebarCollapsed) {
      document.body.classList.add('sidebar-collapsed');
    } else {
      document.body.classList.remove('sidebar-collapsed');
    }
    
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/employees");
        const emp = res.data.find((emp) => emp.email === email);
        setEmployee(emp);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching employee:", error);
        setLoading(false);
      }
    };

    if (email) {
      fetchEmployee();
    } else {
      console.log("No email found in Storage");
      setLoading(false);
    }
    
    // Cleanup function to remove the class when component unmounts
    return () => {
      document.body.classList.remove('sidebar-collapsed');
    };
  }, [email, sidebarCollapsed]);
  
  const [company, setCompany] = useState({
    name: "Tech Innovations Ltd.",
    industry: "Software",
    location: "San Francisco",
    founded: 2005,
    employees: allEmployees.length
  });

  const getAttendanceStatus = () => {
    if (!employee) return null;

    const presentDays = employee.WorkingDays;
    const approvedLeaves = employee.ApprovedLeaves || 0;
    const remainingDays = 30 - (presentDays + approvedLeaves);

    if (presentDays > 25) return { status: "Excellent", variant: "success" };
    if (presentDays > 20) return { status: "Good", variant: "primary" };
    if (presentDays > 15) return { status: "Average", variant: "warning" };
    return { status: "Poor", variant: "danger" };
  };
  

  if (loading) {
    return (
      <Container className="dashboard-container text-center mt-5">
        <FaSpinner className="spinner-icon fa-spin" />
        <h4 className="mt-3">Loading employee details...</h4>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="dashboard-container text-center mt-5">
        <FaExclamationCircle
          className="text-danger mb-3"
          style={{ fontSize: "3rem" }}
        />
        <h4>Employee details not found. Please login again.</h4>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => navigate("/login")}
        >
          Go to Login
        </Button>
      </Container>
    );
  }

  const attendanceStatus = getAttendanceStatus();

  return (
    <Container className="dashboard-container py-5" fluid>
      <div className="text-center mb-5">
        <h1 className="display-5 fw-bold">
          <FaBuilding className="me-2" />
          Employee Payroll Dashboard
        </h1>
        <p className="lead text-muted">Welcome back, {employee.name}!</p>
      </div>

      {/* Main Content */}
      <Row className="g-4">
        {/* Employee Details Card */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100 employee-card">
            <Card.Header className="bg-primary text-white py-3">
              <h4 className="mb-0">
                <FaUserTie className="me-2" />
                Employee Profile
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Row className="align-items-center mb-4">
                <Col xs={12} md={4} className="text-center mb-3 mb-md-0">
                  <div className="profile-image-placeholder bg-light rounded-circle mx-auto d-flex align-items-center justify-content-center">
                    <span className="display-4 text-primary">
                      {employee.name.charAt(0)}
                    </span>
                  </div>
                </Col>
                <Col xs={12} md={8}>
                  <h3 className="text-primary mb-1">{employee.name}</h3>
                  <p className="text-muted mb-2">
                    <FaUserCog className="me-2" />
                    Software Engineer
                  </p>
                  <p className="mb-2">
                    <FaEnvelope className="me-2 text-muted" />
                    {employee.email}
                  </p>
                  <p className="mb-0">
                    <FaPhone className="me-2 text-muted" />
                    {employee.PhoneNumber || "Not provided"}
                  </p>
                </Col>
              </Row>
              <hr />
              <h5 className="mb-3">
                <FaCalendarAlt className="me-2 text-primary" />
                Attendance Overview
              </h5>
              <Row className="g-3">
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <div className="icon-wrapper bg-light rounded-circle me-2">
                      <FaCalendarCheck className="text-success" />
                    </div>
                    <div>
                      <div className="text-muted small">Days Present</div>
                      <div className="fw-bold">{employee.WorkingDays}</div>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <div className="icon-wrapper bg-light rounded-circle me-2">
                      <FaCalendarMinus className="text-warning" />
                    </div>
                    <div>
                      <div className="text-muted small">Approved Leaves</div>
                      <div className="fw-bold">
                        {employee.ApprovedLeaves || 0}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <div className="icon-wrapper bg-light rounded-circle me-2">
                      <FaExclamationCircle className="text-danger" />
                    </div>
                    <div>
                      <div className="text-muted small">Leave Requests</div>
                      <div className="fw-bold">
                        {employee.LeaveRequests?.length || 0}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="d-flex align-items-center">
                    <div className="icon-wrapper bg-light rounded-circle me-2">
                      <FaCalendarPlus className="text-info" />
                    </div>
                    <div>
                      <div className="text-muted small">Remaining Days</div>
                      <div className="fw-bold">
                        {30 -
                          (employee.WorkingDays +
                            (employee.ApprovedLeaves || 0))}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="mt-4 text-center">
                <h6>Attendance Status</h6>
                <Badge bg={attendanceStatus.variant} className="py-2 px-3 fs-6">
                  {attendanceStatus.status}
                </Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Company Details Card */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm h-100 company-card">
            <Card.Header className="bg-info text-white py-3">
              <h4 className="mb-0">
                <FaBuilding className="me-2" />
                Company Information
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h3 className="company-name">{company.name}</h3>
                <p className="text-muted mb-0">
                  Driving Innovation Since {company.founded}
                </p>
              </div>
              <Row className="g-3 mb-4">
                <Col md={6}>
                  <div className="company-info-item">
                    <FaIndustry className="text-info me-2" />
                    <div>
                      <div className="text-muted small">Industry</div>
                      <div className="fw-bold">{company.industry}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="company-info-item">
                    <FaMapMarkerAlt className="text-info me-2" />
                    <div>
                      <div className="text-muted small">Location</div>
                      <div className="fw-bold">{company.location}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="company-info-item">
                    <FaHistory className="text-info me-2" />
                    <div>
                      <div className="text-muted small">Founded</div>
                      <div className="fw-bold">{company.founded}</div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="company-info-item">
                    <FaUsers className="text-info me-2" />
                    <div>
                      <div className="text-muted small">Employees</div>
                      <div className="fw-bold">{company.employees}</div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Card className="company-highlights bg-light border-0 mt-3">
                <Card.Body>
                  <h5 className="card-title">Company Highlights</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Leader in software innovation
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Remote-friendly workplace
                    </li>
                    <li>
                      <i className="bi bi-check-circle-fill text-success me-2"></i>
                      Comprehensive employee benefits
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions Card */}
      <Card className="border-0 shadow-sm mt-4">
      <Card.Header className="bg-primary text-white py-3">
          <h4 className="mb-0">Quick Actions</h4>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="text-center g-3">
            <Col md={4}>
              <Button
                variant="outline-primary"
                size="lg"
                className="w-100 py-3"
                onClick={() => navigate("/attendance")}
              >
                <FaCalendarAlt className="mb-2 d-block mx-auto" />
                View Attendance
              </Button>
            </Col>
            <Col md={4}>
              <Button
                variant="outline-success"
                size="lg"
                className="w-100 py-3"
                onClick={() =>
                  navigate("/payslip-tax-report", { state: { email } })
                }
              >
                <FaFileInvoiceDollar className="mb-2 d-block mx-auto" />
                Payslip & Tax Report
              </Button>
            </Col>
            <Col md={4}>
              <Button 
                variant="outline-info"
                size="lg"
                className="w-100 py-3"
                onClick={() => navigate("/request-leave")}
              >
                <FaCalendarPlus className="mb-2 d-block mx-auto" />
                Request Leave
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Dashboard;