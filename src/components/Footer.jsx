// src/components/Footer.jsx (Sử dụng Bootstrap)
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        // p-3 (padding), bg-light (nền xám nhạt), text-center (căn giữa)
        <footer className="p-3 bg-light mt-auto border-top">
            <Container>
                <p className="text-muted mb-0">
                    &copy; {year} Quản lý Học sinh Đơn giản | Phiên bản Bootstrap UI
                </p>
            </Container>
        </footer>
    );
};

export default Footer;