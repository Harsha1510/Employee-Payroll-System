import React, { useState, useEffect } from "react";
import { Nav, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the screen is mobile-sized
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Mobile Navigation (Top Bar)
  if (isMobile) {
    return (
      <div
        className="d-flex flex-row text-white w-100"
        style={{
          height: expanded ? "auto" : "60px",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1000,
          transition: "height 0.3s ease",
          backgroundColor: "#0d6efd", // Bootstrap primary blue
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          overflow: "hidden",
        }}
      >
        {/* Mobile Header */}
        <div className="d-flex justify-content-between align-items-center p-3 w-100 border-bottom border-light">
          <h5 className="m-0 fw-bold">Payroll System</h5>
          <Button
            variant="outline-light"
            size="sm"
            onClick={toggleSidebar}
          >
            <i
              className={`bi ${
                expanded ? "bi-chevron-up" : "bi-chevron-down"
              }`}
            ></i>
          </Button>
        </div>

        {/* Mobile Navigation Links (Shown when expanded) */}
        {expanded && (
          <Nav className="flex-column w-100">
            <Nav.Link
              as={Link}
              to="/"
              className="text-white d-flex align-items-center ps-3 py-2"
            >
              <i className="bi bi-house-door fs-5 me-3"></i>
              <span>Home</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/employee"
              className="text-white d-flex align-items-center ps-3 py-2"
            >
              <i className="bi bi-speedometer2 fs-5 me-3"></i>
              <span>Dashboard</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/take-leave"
              className="text-white d-flex align-items-center ps-3 py-2"
            >
              <i className="bi bi-calendar-check fs-5 me-3"></i>
              <span>Request Leave</span>
            </Nav.Link>

            <Nav.Link
              as={Link}
              to="/payslip-tax-report"
              className="text-white d-flex align-items-center ps-3 py-2"
            >
              <i className="bi bi-file-earmark-text fs-5 me-3"></i>
              <span>Payslip & Tax Report</span>
            </Nav.Link>

          
            {/* Logout Button in mobile nav */}
            <Nav.Link
              onClick={handleLogout}
              className="text-white d-flex align-items-center ps-3 py-2"
            >
              <i className="bi bi-box-arrow-right fs-5 me-3"></i>
              <span>Logout</span>
            </Nav.Link>
          </Nav>
        )}
      </div>
    );
  }

  // Desktop Navigation (Sidebar)
  return (
    <div
      className={`d-flex flex-column text-white ${
        expanded ? "sidebar-expanded" : "sidebar-collapsed"
      }`}
      style={{
        height: "100vh",
        width: expanded ? "250px" : "80px",
        position: "fixed",
        left: 0,
        top: 0,
        transition: "width 0.3s ease",
        backgroundColor: "#0d6efd", // Bootstrap primary blue
        boxShadow: "2px 0 10px rgba(0, 0, 0, 0.2)",
        zIndex: 1000,
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom border-light">
        {expanded && <h5 className="m-0 fw-bold">Payroll System</h5>}
        <Button
          variant="outline-light"
          size="sm"
          className={expanded ? "ms-auto" : "mx-auto"}
          onClick={toggleSidebar}
        >
          <i
            className={`bi ${
              expanded ? "bi-chevron-left" : "bi-chevron-right"
            }`}
          ></i>
        </Button>
      </div>

      {/* Navigation Links */}
      <Nav className="flex-column mt-3 w-100">
        <Nav.Link
          as={Link}
          to="/employee"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-house-door fs-5 me-3"></i>
          {expanded && <span>Home</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/employee"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-speedometer2 fs-5 me-3"></i>
          {expanded && <span>Dashboard</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/take-leave"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-calendar-check fs-5 me-3"></i>
          {expanded && <span>Request Leave</span>}
        </Nav.Link>

        <Nav.Link
          as={Link}
          to="/payslip-tax-report"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-file-earmark-text fs-5 me-3"></i>
          {expanded && <span>Payslip & Tax Report</span>}
        </Nav.Link>
        {/* <Nav.Link
          as={Link}
          to="/leave-avail"
          className="text-white d-flex align-items-center ps-3 py-2 nav-link-hover"
          style={{ transition: "all 0.2s ease" }}
        >
          <i className="bi bi-file-earmark-text fs-5 me-3"></i>
          {expanded && <span>Leave Avail</span>}
        </Nav.Link> */}
      </Nav>

      {/* Logout Button */}
      <div className="mt-auto p-3 border-top border-light">
        <Button
          variant="light"
          onClick={handleLogout}
          className="w-100 d-flex align-items-center justify-content-center"
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          {expanded && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default NavigationBar;