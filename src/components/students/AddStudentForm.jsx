import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import * as st from "../../services/studentsServices";

const AddStudentForm = ({ onSuccess, onAlert, editingStudent }) => {
  const [name, setName] = useState("");
  const [className, setClassName] = useState("");
  const [age, setAge] = useState("");

  // Khi editingStudent thay đổi, điền giá trị vào form
  React.useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setClassName(editingStudent.class_name);
      setAge(editingStudent.age);
    } else {
      setName("");
      setClassName("");
      setAge("");
    }
  }, [editingStudent]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAlert(null);
    try {
      if (editingStudent) {
        // Gọi API update
        await st.edit(editingStudent.id, name, className, age);
        onAlert({ type: "success", text: "Cập nhật học sinh thành công!" });
        onSuccess("Cập nhật học sinh thành công!");
      } else {
        // Gọi API thêm mới
        await st.add(name, className, age);
        onAlert({ type: "success", text: "Thêm học sinh thành công!" });
        onSuccess("Thêm học sinh thành công!");
      }
    } catch (err) {
      const errorText = err.response?.data?.error || err.message;
      onAlert({ type: "danger", text: "Lỗi khi lưu: " + errorText });
    }
  };

  return (
    <div className="mb-4 p-4 border rounded">
      <h3>{editingStudent ? "✏️ Cập nhật" : "➕ Thêm"} học sinh</h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>Tên học sinh</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nguyễn Văn A"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>Tên Lớp</Form.Label>
              <Form.Control
                type="text"
                placeholder="10A1"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>Tuổi</Form.Label>
              <Form.Control
                type="number"
                placeholder="16"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        {/* btn-primary là màu xanh dương */}
        <Button variant="primary" type="submit">
          {editingStudent ? "Cập nhật học sinh" : "Thêm Học sinh"}
        </Button>
      </Form>
    </div>
  );
};

export default AddStudentForm;
