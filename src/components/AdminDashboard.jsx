import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Nav,
  Card,
  Row,
  Col,
  Badge,
  Offcanvas
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Leave from "./LeaveRequests"; // Import the new component

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAction = (id, action) => {
    setLeaveRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: action } : req))
    );
  };

  const handleLogout = () => {
    navigate("/");
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div 
className={`sidebar bg-primary text-white ${showSidebar ? 'sidebar-expanded' : 'sidebar-collapsed'}`}
        style={{ 
          width: showSidebar ? '250px' : '70px', 
          minHeight: '100vh',
          transition: 'width 0.3s',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 100,
          boxShadow: '2px 0 10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-primary">
          {showSidebar && (
            <div className="fw-bold fs-5">📊 XYZ ADMIN</div>
          )}
          <Button 
            variant="link" 
            className="text-white p-0" 
            onClick={toggleSidebar}
            style={{ marginLeft: showSidebar ? '0' : 'auto', marginRight: showSidebar ? '0' : 'auto' }}
          >
            {showSidebar ? '◀' : '▶'}
          </Button>
        </div>
        
        <Nav className="flex-column mt-3">
          <Nav.Link 
            onClick={() => navigate("/admin")} 
            className="text-white py-3 px-3 d-flex align-items-center"
          >
            <span className="me-3">🏠</span>
            {showSidebar && <span>Home</span>}
          </Nav.Link>
          
          <Nav.Link 
            onClick={() => navigate("/view-employee")} 
            className="text-white py-3 px-3 d-flex align-items-center"
          >
            <span className="me-3">👥</span>
            {showSidebar && <span>View Employees</span>}
          </Nav.Link>
          
          <Nav.Link 
            onClick={() => navigate("/add-employee")} 
            className="text-white py-3 px-3 d-flex align-items-center"
          >
            <span className="me-3">➕</span>
            {showSidebar && <span>Add Employee</span>}
          </Nav.Link>
          
          <Nav.Link 
            onClick={() => navigate("/approve-leave")} 
            className="text-white py-3 px-3 d-flex align-items-center"
          >
            <span className="me-3">📅</span>
            {showSidebar && (
              <div className="d-flex align-items-center">
                <span>Leaves</span>
                {/* Badge removed here */}
              </div>
            )}
            {/* Badge removed here */}
          </Nav.Link>
          
          <Nav.Link 
            onClick={() => navigate("/take-attendance")} 
            className="text-white py-3 px-3 d-flex align-items-center"
          >
            <span className="me-3">✓</span>
            {showSidebar && <span>Attendance</span>}
          </Nav.Link>
        </Nav>
        
        <div className="mt-auto p-3">
          <Button 
            variant="outline-light" 
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
          marginLeft: showSidebar ? '250px' : '70px',
          width: `calc(100% - ${showSidebar ? '250px' : '70px'})`,
          transition: 'margin-left 0.3s, width 0.3s',
          minHeight: '100vh'
        }}
      >
        {/* Mobile Toggle Button (visible only on small screens) */}
        <div className="d-lg-none p-2 bg-primary text-white">
          <Button
            variant="outline-light"
            size="sm"
            onClick={toggleSidebar}
          >
            ☰ Menu
          </Button>
        </div>

        <Container className="py-5">
          <Row className="mb-4">
            <Col>
              <div className="bg-white rounded-3 shadow-sm p-4 text-center border-start border-5 border-primary">
                <h1 className="display-6 fw-bold text-primary mb-2">
                  Welcome to XYZ Company Admin Panel
                </h1>
                <p className="lead text-muted mb-0">
                  Manage employees, attendance, and leave requests all in one
                  place
                </p>
              </div>
            </Col>
          </Row>

          <Row className="mb-4 g-4">
            <Col md={6} lg={3}>
              <Card className="shadow-sm h-100 border-0 hover-effect">
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="bg-primary bg-opacity-10 p-3 rounded-circle mb-3">
                    <span className="fs-3">👥</span>
                  </div>
                  <Card.Title>Employees</Card.Title>
                  <Card.Text>
                    View and manage all employee information and details
                  </Card.Text>
                  <Button
                    variant="outline-primary"
                    className="mt-auto"
                    onClick={() => navigate("/view-employee")}
                  >
                    View Employees
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="shadow-sm h-100 border-0 hover-effect">
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="bg-success bg-opacity-10 p-3 rounded-circle mb-3">
                    <span className="fs-3">➕</span>
                  </div>
                  <Card.Title>Add Employee</Card.Title>
                  <Card.Text>Register new employees to the system</Card.Text>
                  <Button
                    variant="outline-success"
                    className="mt-auto"
                    onClick={() => navigate("/add-employee")}
                  >
                    Add New
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="shadow-sm h-100 border-0 hover-effect">
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="bg-warning bg-opacity-10 p-3 rounded-circle mb-3">
                    <span className="fs-3">📅</span>
                  </div>
                  <Card.Title>Leave Requests</Card.Title>
                  <Card.Text>
                    Manage employee leave requests and approvals
                  </Card.Text>
                  <Button
                    variant="outline-warning"
                    className="mt-auto"
                    onClick={() => navigate("/approve-leave")}
                  >
                    Manage Leaves
                    {/* Badge removed here */}
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={3}>
              <Card className="shadow-sm h-100 border-0 hover-effect">
                <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                  <div className="bg-info bg-opacity-10 p-3 rounded-circle mb-3">
                    <span className="fs-3">✓</span>
                  </div>
                  <Card.Title>Attendance</Card.Title>
                  <Card.Text>
                    Record and manage daily employee attendance
                  </Card.Text>
                  <Button
                    variant="outline-info"
                    className="mt-auto"
                    onClick={() => navigate("/take-attendance")}
                  >
                    Take Attendance
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Card className="border-0 shadow-sm">
                <Card.Header className="bg-white border-bottom py-3">
                  <h4 className="mb-0">Company Overview</h4>
                </Card.Header>
                <Card.Body className="p-4">
                  <p className="lead">
                    XYZ Company is committed to providing a streamlined and
                    efficient payroll and attendance system for all employees.
                  </p>
                  <p>
                    Use the cards above or the navigation bar to access features
                    like viewing and adding employees, managing payslips, handling
                    tax reports, and processing leave requests. This admin panel
                    gives you all the tools needed to manage your workforce
                    effectively.
                  </p>
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

      {/* Mobile Sidebar as Offcanvas (visible only when toggled on small screens) */}
      <Offcanvas 
        show={showSidebar && windowWidth < 992} 
        onHide={() => setShowSidebar(false)}
        className="d-lg-none"
      >
        <Offcanvas.Header closeButton className="bg-primary text-white">
          <Offcanvas.Title>XYZ Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 bg-primary">
          <Nav className="flex-column">
            <Nav.Link 
              onClick={() => {
                navigate("/admin");
                setShowSidebar(false);
              }} 
              className="text-white py-3 px-3"
            >
              <span className="me-2">🏠</span> Home
            </Nav.Link>
            
            <Nav.Link 
              onClick={() => {
                navigate("/view-employee");
                setShowSidebar(false);
              }} 
              className="text-white py-3 px-3"
            >
              <span className="me-2">👥</span> View Employees
            </Nav.Link>
            
            <Nav.Link 
              onClick={() => {
                navigate("/add-employee");
                setShowSidebar(false);
              }} 
              className="text-white py-3 px-3"
            >
              <span className="me-2">➕</span> Add Employee
            </Nav.Link>
            
            <Nav.Link 
              onClick={() => {
                navigate("/approve-leave");
                setShowSidebar(false);
              }} 
              className="text-white py-3 px-3 d-flex align-items-center"
            >
              <span className="me-2">📅</span> Leaves
              {/* Badge removed here */}
            </Nav.Link>
            
            <Nav.Link 
              onClick={() => {
                navigate("/take-attendance");
                setShowSidebar(false);
              }} 
              className="text-white py-3 px-3"
            >
              <span className="me-2">✓</span> Attendance
            </Nav.Link>
          </Nav>
          
          <div className="p-3 mt-4">
            <Button 
              variant="outline-light" 
              onClick={handleLogout} 
              className="w-100"
            >
              Logout
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <style jsx>{`
        .hover-effect {
          transition: transform 0.3s;
        }
        .hover-effect:hover {
          transform: translateY(-5px);
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

export default AdminDashboard;    