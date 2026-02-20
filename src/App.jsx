// App.jsx (Đã tối giản với Container của Bootstrap)
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toast, ToastContainer, Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Students from "./pages/Students";

// Để đảm bảo Footer luôn ở dưới cùng, hãy chỉnh sửa CSS trong file App.css (hoặc index.css)
// Ví dụ: body, #root { min-height: 100vh; margin: 0; }
//        #root > div { display: flex; flex-direction: column; min-height: 100vh; }

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const showToastMessage = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
  };

  return (
    <Router>
      <Header />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<h2>📊 Dashboard</h2>} />
          {/* <Route
            path="/students"
            element={
              <>
                <AddStudentForm
                  onStudentAdded={handleStudentAdded}
                  editingStudent={editingStudent}
                  onSuccess={(msg) => showToastMessage(msg)}
                />
                <StudentList
                  key={reloadKey}
                  onEdit={setEditingStudent}
                  onSuccess={(msg) => showToastMessage(msg)}
                />
              </>
            }
          /> */}
          <Route
            path="/students"
            element={
              <Students
                onShowToast={(msg) => {
                  showToastMessage(msg);
                }}
              />
            }
          />
        </Routes>
      </Container>
      <Footer />

      <ToastContainer position="top-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2500}
          autohide
        >
          <Toast.Header closeButton>
            <strong className="me-auto">Thông báo</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Router>
  );
}

export default App;
