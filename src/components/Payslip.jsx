import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Badge, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import axios from 'axios';

const Payslip = () => {
  const email = localStorage.getItem('email');
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employees');
        const emp = res.data.find(emp => emp.email === email);
        setEmployee(emp);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employee data:', err);
        setError('Unable to fetch employee data. Please try again later.');
        setLoading(false);
      }
    };

    if (email) fetchEmployee();
  }, [email]);

  const getTaxRate = (annualSalary) => {
    if (annualSalary <= 700000) return 3.25;
    else if (annualSalary <= 100000) return 5;
    else if (annualSalary <= 2000000) return 10;
    else return 15;
  };

  const calculateSalary = () => {
    const { salary, WorkingDays } = employee || {}; // monthly salary & days present
    const totalWorkingDays = 30;
    const dailySalary = salary / totalWorkingDays;
    const salaryForPresentDays = dailySalary * WorkingDays;

    const annualSalary = salary * 12;
    const taxRate = getTaxRate(annualSalary);
    const taxAmount = (salaryForPresentDays * taxRate) / 100;
    const netSalary = salaryForPresentDays - taxAmount;

    return {
      monthlySalary: salary,
      annualSalary,
      salaryForPresentDays,
      taxRate,
      taxAmount,
      netSalary
    };
  };

  const handleDownloadPayslip = () => {
    const salary = calculateSalary();
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Payslip & Tax Report', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.text(`Name: ${employee.name}`, 20, 40);
    doc.text(`Designation: ${employee.designation}`, 20, 50);
    doc.text(`Monthly Salary: ₹${salary.monthlySalary}`, 20, 60);
    doc.text(`Annual Salary: ₹${salary.annualSalary}`, 20, 70);
    doc.text(`Days Present: ${employee.workingDays} / 30`, 20, 80);
    doc.text(`Salary for Present Days: ₹${salary.salaryForPresentDays.toFixed(2)}`, 20, 90);
    doc.text(`Tax Rate: ${salary.taxRate}%`, 20, 100);
    doc.text(`Tax Amount: ₹${salary.taxAmount.toFixed(2)}`, 20, 110);
    doc.text(`Net Salary: ₹${salary.netSalary.toFixed(2)}`, 20, 120);

    doc.save('payslip.pdf');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5 className="mt-3">Loading payslip...</h5>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!employee) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">No employee data found. Please log in again.</Alert>
      </Container>
    );
  }

  const salary = calculateSalary();

  return (
    <Container className="py-5">
      <div className="text-center mb-4">
        <h2 className="display-5 fw-bold">Payslip & Tax Report</h2>
        <div className="d-inline-block border-bottom border-primary pb-2">
          <p className="text-muted">Monthly statement for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
        </div>
      </div>
      
      <Card className="shadow border-0 rounded-3 mb-4">
        <Card.Header className="bg-primary text-white p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">Employee Payslip</h4>
            <Badge bg="light" text="primary" pill>
              {employee.designation}
            </Badge>
          </div>
        </Card.Header>
        
        <Card.Body className="p-4">
          <Row className="mb-4">
            <Col md={6} className="mb-3 mb-md-0">
              <Card className="h-100 border-0 bg-light">
                <Card.Body>
                  <h5 className="border-bottom pb-2 mb-3">Personal Details</h5>
                  <p className="mb-2">
                    <i className="bi bi-person-fill me-2"></i>
                    <strong>Name:</strong> {employee.name}
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    <strong>Designation:</strong> {employee.designation || 'Software Engineer'}
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-calendar-check me-2"></i>
                    <strong>Attendance:</strong> 
                    <span className={`ms-2 ${employee.WorkingDays < 20 ? 'text-danger' : 'text-success'}`}>
                      {employee.WorkingDays} / 30 days
                    </span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="h-100 border-0 bg-light">
                <Card.Body>
                  <h5 className="border-bottom pb-2 mb-3">Salary Details</h5>
                  <p className="mb-2">
                    <i className="bi bi-currency-rupee me-2"></i>
                    <strong>Monthly Salary:</strong> 
                    <span className="float-end">₹{salary.monthlySalary}</span>
                  </p>
                  <p className="mb-2">
                    <i className="bi bi-calendar-range me-2"></i>
                    <strong>Annual Salary:</strong> 
                    <span className="float-end">₹{salary.annualSalary}</span>
                  </p>
                  <p className="mb-0">
                    <i className="bi bi-calculator me-2"></i>
                    <strong>Daily Rate:</strong> 
                    <span className="float-end">₹{(salary.monthlySalary / 30).toFixed(2)}</span>
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Card className="bg-light border-0 mb-4">
            <Card.Body>
              <h5 className="border-bottom pb-2 mb-3">This Month's Breakdown</h5>
              <Row>
                <Col md={6}>
                  <div className="d-flex justify-content-between mb-2">
                    <span><strong>Salary for Present Days:</strong></span>
                    <span>₹{salary.salaryForPresentDays.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span><strong>Tax Rate:</strong></span>
                    <span>{salary.taxRate}%</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="d-flex justify-content-between mb-2">
                    <span><strong>Tax Amount:</strong></span>
                    <span className="text-danger">- ₹{salary.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span><strong>Net Salary:</strong></span>
                    <span className="fw-bold text-success">₹{salary.netSalary.toFixed(2)}</span>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <div className="text-center">
            <Button 
              variant="primary" 
              size="lg" 
              className="px-5 py-2" 
              onClick={handleDownloadPayslip}
            >
              <i className="bi bi-download me-2"></i>
              Download Payslip PDF
            </Button>
          </div>
        </Card.Body>
        
        <Card.Footer className="bg-white text-center text-muted p-3">
          <small>
            This is an electronic payslip and does not require a signature.
            Generated on {new Date().toLocaleDateString()}
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Payslip;