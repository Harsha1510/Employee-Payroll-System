import React, { useState, useEffect } from "react";
import { Container, Button, Table, Row, Col, Nav, Badge, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LeaveAvail = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    
    // Fetch employee data from the backend
useEffect(() => {
    fetch("http://localhost:5000/api/employees") // backend running on port 5000
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error("Error fetching employees:", err));
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={12}>
          <Card>
            <Card.Header className="bg-primary text-white">
              <h5>Leave Availability</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Name</th>
                    <th>Available Leaves</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee , index) => (
                    <tr key={index}>
                      <td>{index+1}</td>
                      <td>{employee.name}</td>
                      <td>{30 - employee.WorkingDays}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );}

  export default LeaveAvail;