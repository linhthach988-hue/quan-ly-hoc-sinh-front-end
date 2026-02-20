import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Button, Modal } from "react-bootstrap";
import * as st from "../../services/studentsServices";

const StudentList = ({ onEdit, onSuccess, reload, setReload }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  // State lọc + tìm kiếm
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("");
  const [filterAge, setFilterAge] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (reload) {
      const timer = setTimeout(() => {
        fetchStudents();
        setReload(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [reload, setReload]);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await st.list();
      setStudents(res);
    } catch (err) {
      setError("Không thể tải dữ liệu: " + (err.message || "Lỗi kết nối API"));
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      await st.remove(id);
      onSuccess("Xóa học sinh thành công!");
    } catch (err) {
      console.error(err);
      onSuccess("Xóa thất bại!");
    }
    await fetchStudents();
  };

  // Danh sách lớp (dropdown)
  const classList = [...new Set(students.map((s) => s.class_name))];
  const ageList = [...new Set(students.map((s) => s.age))];

  // Lọc theo lớp + tìm kiếm theo tên
  const filteredStudents = students.filter((student) => {
    const matchClass = filterClass ? student.class_name === filterClass : true;
    const matchAge = filterAge ? student.age === Number(filterAge) : true;
    const matchSearch = student.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchClass && matchSearch && matchAge;
  });

  // Nhóm lại sau khi lọc
  const studentsByClass = filteredStudents.reduce((acc, student) => {
    const className = student.class_name;
    if (!acc[className]) acc[className] = [];
    acc[className].push(student);
    return acc;
  }, {});

  // Trạng thái Loading
  if (loading)
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status" className="me-2" />
        Đang tải dữ liệu...
      </div>
    );

  // Trạng thái Lỗi
  if (error)
    return (
      <Alert variant="danger" className="mt-4">
        {error}
      </Alert>
    );

  return (
    <div className="student-list-container mt-4">
      <Button variant="info" onClick={fetchStudents} className="mb-4">
        Tải lại dữ liệu ({students.length} học sinh)
      </Button>

      {/* Bộ lọc */}
      <div className="d-flex gap-3 mb-4 justify-content-end">
        {/* Tìm kiếm */}
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Tìm theo tên..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "250px" }}
        />

        {/* Lọc theo lớp */}
        <select
          className="form-select"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Tất cả các lớp</option>
          {classList.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>
        {/* Lọc theo tuổi */}
        <select
          className="form-select"
          value={filterAge}
          onChange={(e) => setFilterAge(e.target.value)}
          style={{ maxWidth: "200px" }}
        >
          <option value="">Tất cả các tuổi</option>
          {ageList.map((cls) => (
            <option key={cls} value={cls}>
              {cls}
            </option>
          ))}
        </select>

        {/* Nút reset */}
        <Button
          variant="secondary"
          onClick={() => {
            setSearch("");
            setFilterClass("");
            setFilterAge("");
          }}
        >
          Reset
        </Button>
      </div>

      {Object.keys(studentsByClass).length === 0 && (
        <Alert variant="warning">Không tìm thấy học sinh phù hợp.</Alert>
      )}

      {Object.keys(studentsByClass).map((className) => (
        <div key={className} className="class-group mb-5">
          <h3 className="border-bottom pb-2">Lớp: {className}</h3>

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
              {studentsByClass[className].map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="me-2"
                      onClick={() => {
                        setDeleteId(student.id);
                        setShowConfirm(true);
                      }}
                    >
                      Xóa
                    </Button>

                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(student)}
                    >
                      Sửa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có chắc chắn muốn xóa học sinh này không?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Hủy
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await remove(deleteId);
              setShowConfirm(false);
            }}
          >
            Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentList;
