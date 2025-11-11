// src/components/StudentList.jsx (Sử dụng Bootstrap)
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Alert,Button } from 'react-bootstrap'; // Import components

const API_BASE_URL = 'https://student-api-nw8b.onrender.com/api/students';
//http://localhost:5000/api/students

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(API_BASE_URL);
            setStudents(response.data.data);
        } catch (err) {
            setError('Không thể tải dữ liệu: ' + (err.message || 'Lỗi kết nối API'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const studentsByClass = students.reduce((acc, student) => {
        const className = student.class_name;
        if (!acc[className]) {
            acc[className] = [];
        }
        acc[className].push(student);
        return acc;
    }, {});
    
    // Trạng thái Loading
    if (loading) return (
        <div className="text-center my-5">
            <Spinner animation="border" role="status" className="me-2"/>
            Đang tải dữ liệu...
        </div>
    );
    
    // Trạng thái Lỗi
    if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

    return (
        <div className="student-list-container mt-4">
            <h2 className="mb-3">📚 Danh sách Học sinh Theo Lớp</h2>
            {/* btn-info là màu xanh lam */}
            <Button variant="info" onClick={fetchStudents} className="mb-4">
                Tải lại dữ liệu ({students.length} học sinh)
            </Button>
            
            {Object.keys(studentsByClass).length === 0 && (
                 <Alert variant="warning">Chưa có học sinh nào trong hệ thống.</Alert>
            )}

            {Object.keys(studentsByClass).map(className => (
                <div key={className} className="class-group mb-5">
                    <h3 className="border-bottom pb-2">Lớp: {className}</h3>
                    {/* table-striped tạo dòng xen kẽ, table-hover làm nổi bật khi rê chuột */}
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Tên Học sinh</th>
                                <th>Tuổi</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsByClass[className].map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <Button variant="outline-danger" size="sm">Xóa</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            ))}
        </div>
    );
};

export default StudentList;