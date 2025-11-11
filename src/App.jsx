// App.jsx (Đã tối giản với Container của Bootstrap)
import React, { useState } from 'react';
import { Container } from 'react-bootstrap'; // Import Container để căn giữa nội dung
import Header from './components/Header'; 
import Footer from './components/Footer'; 
import StudentList from './components/StudentList'; 
import AddStudentForm from './components/AddStudentForm'; 

// Để đảm bảo Footer luôn ở dưới cùng, hãy chỉnh sửa CSS trong file App.css (hoặc index.css)
// Ví dụ: body, #root { min-height: 100vh; margin: 0; }
//        #root > div { display: flex; flex-direction: column; min-height: 100vh; }

function App() {
    const [reloadKey, setReloadKey] = useState(0); 
    
    const handleStudentAdded = () => {
        setReloadKey(prevKey => prevKey + 1);
    };

    return (
        // Loại bỏ style inline, Bootstrap sẽ lo phần giao diện
        <>
            <Header /> 

            {/* Container căn giữa nội dung và thêm padding */}
            <Container className="my-4">
                <h1 className="mb-4 border-bottom pb-2">📊 Dashboard Quản lý</h1>
                
                <AddStudentForm onStudentAdded={handleStudentAdded} />

                <StudentList key={reloadKey} />
            </Container>

            <Footer />
        </>
    );
}

export default App;