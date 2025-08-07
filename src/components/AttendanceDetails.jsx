import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Card,
  Row,
  Col,
  Badge,
  ProgressBar,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import "./AttendanceDetails.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const AttendanceDetails = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeName, setEmployeeName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/employees");
        const emp = res.data.find((emp) => emp.email === email);

        if (emp) {
          setEmployeeName(emp.name || "Employee");
          const presentDays = emp.WorkingDays || 0;
          const totalDays = 30;
          const absentDays = totalDays - presentDays;

          const data = [];

          for (let i = 1; i <= presentDays; i++) {
            data.push({
              date: `2025-04-${String(i).padStart(2, "0")}`,
              status: "Present",
            });
          }

          for (let i = presentDays + 1; i <= totalDays; i++) {
            data.push({
              date: `2025-04-${String(i).padStart(2, "0")}`,
              status: "Absent",
            });
          }

          setAttendanceData(data);
        }
      } catch (error) {
        console.error("Error fetching attendance:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [email]);

  const totalPresent = attendanceData.filter((att) => att.status === "Present").length;
  const totalAbsent = attendanceData.filter((att) => att.status === "Absent").length;
  const attendancePercentage = Math.round((totalPresent / 30) * 100);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <Container>
        {isLoading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading attendance data...</p>
          </div>
        ) : (
          <>
            <Row className="mb-4">
              <Col>
                <div className="d-flex justify-content-between align-items-center">
                  <h2 className="mb-0">
                    <i className="bi bi-calendar-check me-2 text-primary"></i>
                    Attendance Dashboard
                  </h2>
                  <Button
                    variant="outline-primary"
                    onClick={() => navigate("/employee")}
                  >
                    <i className="bi bi-arrow-left me-2"></i>
                    Back to Dashboard
                  </Button>
                </div>
                <hr />
              </Col>
            </Row>

            {/* Stats Cards */}
            <Row className="mb-4">
              <Col md={4}>
                <Card className="shadow-sm border-0 mb-3">
                  <Card.Body className="text-center">
                    <div
                      className="rounded-circle bg-success bg-opacity-10 p-3 mx-auto mb-3"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i className="bi bi-calendar-check text-success" style={{ fontSize: "28px" }}></i>
                    </div>
                    <h3>{totalPresent}</h3>
                    <p className="text-muted mb-0">Present Days</p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="shadow-sm border-0 mb-3">
                  <Card.Body className="text-center">
                    <div
                      className="rounded-circle bg-danger bg-opacity-10 p-3 mx-auto mb-3"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i className="bi bi-calendar-x text-danger" style={{ fontSize: "28px" }}></i>
                    </div>
                    <h3>{totalAbsent}</h3>
                    <p className="text-muted mb-0">Absent Days</p>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="shadow-sm border-0 mb-3">
                  <Card.Body className="text-center">
                    <div
                      className="rounded-circle bg-primary bg-opacity-10 p-3 mx-auto mb-3"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i className="bi bi-graph-up text-primary" style={{ fontSize: "28px" }}></i>
                    </div>
                    <h3>{attendancePercentage}%</h3>
                    <p className="text-muted mb-0">Attendance Rate</p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Progress Section */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body>
                <h5>
                  <i className="bi bi-bar-chart-line me-2 text-primary"></i>
                  Attendance Progress
                </h5>
                <div className="mt-3">
                  <div className="d-flex justify-content-between mb-1">
                    <span>Monthly Attendance</span>
                    <span>{attendancePercentage}%</span>
                  </div>
                  <ProgressBar
                    variant={
                      attendancePercentage > 75
                        ? "success"
                        : attendancePercentage > 50
                        ? "warning"
                        : "danger"
                    }
                    now={attendancePercentage}
                    style={{ height: "10px" }}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* Attendance Table */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Header className="bg-white py-3">
                <h5 className="mb-0">
                  <i className="bi bi-table me-2 text-primary"></i>
                  Attendance Records
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th>Date</th>
                        <th className="text-center">Day</th>
                        <th className="text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendanceData.map((att, index) => (
                        <tr key={index}>
                          <td>{att.date}</td>
                          <td className="text-center">{getDayOfWeek(att.date)}</td>
                          <td className="text-center">
                            {att.status === "Present" ? (
                              <Badge bg="success" pill className="px-3 py-2">
                                <i className="bi bi-check-circle me-1"></i> Present
                              </Badge>
                            ) : (
                              <Badge bg="danger" pill className="px-3 py-2">
                                <i className="bi bi-x-circle me-1"></i> Absent
                              </Badge>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <Button
                variant="primary"
                size="lg"
                className="px-4"
                onClick={() =>
                  navigate("/payslip-tax-report", { state: { email } })
                }
              >
                <i className="bi bi-file-earmark-text me-2"></i>
                Request Payslip & Tax Report
              </Button>
              <Button
                variant="outline-secondary"
                size="lg"
                onClick={() => navigate("/employee")}
              >
                <i className="bi bi-house me-2"></i>
                Back to Dashboard
              </Button>
            </div>
          </>
        )}
      </Container>
    </div>
  );
};

export default AttendanceDetails;
