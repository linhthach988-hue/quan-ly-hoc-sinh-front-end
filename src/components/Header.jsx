// src/ggg/Header.jsx (Sử dụng Bootstrap)
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap"; // Import components từ react-bootstrap

const Header = () => {
  return (
    // bg="dark" (nền đen), variant="dark" (chữ trắng), expand="lg" (mở rộng trên màn hình lớn)
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#">🏫 Quản lý Học sinh</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* ms-auto đẩy menu sang phải */}
            <Nav.Link href="/">Trang Chủ</Nav.Link>
            <Nav.Link href="/students">Danh Sách</Nav.Link>
            <Nav.Link href="/about">Báo Cáo</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
