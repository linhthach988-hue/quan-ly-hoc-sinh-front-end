// src/components/AddStudentForm.jsx (Sử dụng Bootstrap)
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const API_BASE_URL = 'https://student-api-nw8b.onrender.com/api/students';
//http://localhost:5000/api/students

const AddStudentForm = ({ onStudentAdded }) => {
    const [name, setName] = useState('');
    const [className, setClassName] = useState('');
    const [age, setAge] = useState('');
    const [message, setMessage] = useState(null); // Sử dụng null để không hiển thị Alert

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        try {
            await axios.post(API_BASE_URL, { 
                name, 
                class_name: className,
                age: parseInt(age) 
            });
            setMessage({ type: 'success', text: 'Thêm học sinh thành công!' });
            setName('');
            setClassName('');
            setAge('');
            onStudentAdded(); 
        } catch (err) {
            const errorText = err.response?.data?.error || err.message;
            setMessage({ type: 'danger', text: 'Lỗi khi thêm: ' + errorText });
        }
    };

    return (
        <div className="mb-4 p-4 border rounded">
            <h3>➕ Thêm Học sinh Mới</h3>
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label>Tên học sinh</Form.Label>
                            <Form.Control type="text" placeholder="Nguyễn Văn A" value={name} onChange={(e) => setName(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Tên Lớp</Form.Label>
                            <Form.Control type="text" placeholder="10A1" value={className} onChange={(e) => setClassName(e.target.value)} required />
                        </Form.Group>
                    </Col>
                    <Col xs={4}>
                        <Form.Group>
                            <Form.Label>Tuổi</Form.Label>
                            <Form.Control type="number" placeholder="16" value={age} onChange={(e) => setAge(e.target.value)} required />
                        </Form.Group>
                    </Col>
                </Row>
                
                {/* btn-primary là màu xanh dương */}
                <Button variant="primary" type="submit">Thêm Học sinh</Button>
            </Form>
            
            {/* Hiển thị thông báo (Alert) */}
            {message && <Alert variant={message.type} className="mt-3">{message.text}</Alert>}
        </div>
    );
};

export default AddStudentForm;