import React, { useState } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import StudentList from "../components/students/StudentList";
import AddStudentForm from "../components/students/AddStudentForm";

const Students = ({ onShowToast }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState(null);
  const [reload, setReload] = useState(false);

  const handleAddClick = () => {
    setEditingStudent(null); // thêm mới
    setShowAddForm(true);
  };

  const handleAddSuccess = () => {
    // Trigger reload when a student is successfully added
    setReload(true);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">📚 Danh sách Học sinh Theo Lớp</h2>
        <Button variant="primary" onClick={handleAddClick}>
          ➕ Thêm
        </Button>
      </div>
      {/* Hiển thị thông báo (Alert) */}
      {message && (
        <Alert variant={message.type} className="mt-3">
          {message.text}
        </Alert>
      )}
      <StudentList
        reload={reload}
        setReload={setReload}
        onEdit={(student) => {
          setEditingStudent(student);
          setShowAddForm(true); // mở form sửa
        }}
        onSuccess={onShowToast}
      />
      <Modal
        show={showAddForm}
        onHide={() => setShowAddForm(false)}
        size="lg" // lg = large, sm = small, xl = extra large
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingStudent ? "✏️ Cập nhật học sinh" : "➕ Thêm học sinh"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddStudentForm
            editingStudent={editingStudent}
            onAlert={(msg) => {
              setMessage(msg);
            }}
            onSuccess={(msg) => {
              onShowToast(msg);
              setShowAddForm(false);
              handleAddSuccess();
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Students;
