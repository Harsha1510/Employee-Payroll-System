import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const TakeLeave = () => {
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/leaves/add', {
                employee,
                date,
                reason
                // status is handled as "Pending" by default in backend
            });
            setSubmitted(true);
            setEmployee('');
            setDate('');
            setReason('');
        } catch (error) {
            console.error('Error submitting leave:', error);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col lg={8} md={10} sm={12}>
                    <Card className="shadow-sm border-0">
                        <Card.Header className="bg-primary text-white py-3">
                            <h3 className="mb-0 fw-bold">Apply for Leave</h3>
                        </Card.Header>
                        <Card.Body className="p-4">
                            {submitted && (
                                <Alert 
                                    variant="success" 
                                    className="d-flex align-items-center"
                                >
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                    <span>Leave request submitted successfully!</span>
                                </Alert>
                            )}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Employee Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={employee}
                                        onChange={(e) => setEmployee(e.target.value)}
                                        required
                                        placeholder="Enter your full name"
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Leave Date</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                        className="py-2"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-semibold">Reason</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={4}
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        required
                                        placeholder="Please explain your reason for leave"
                                        className="py-2"
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button 
                                        variant="primary" 
                                        type="submit" 
                                        size="lg"
                                        className="fw-semibold py-2"
                                    >
                                        Submit Leave Request
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                        <Card.Footer className="text-muted text-center bg-light py-3">
                            Your request will be reviewed by HR
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TakeLeave;