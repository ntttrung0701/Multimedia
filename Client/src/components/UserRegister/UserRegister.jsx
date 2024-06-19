import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './UserRegister.css';

const UserRegister = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Mật khẩu không khớp');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { email, password });
            // Lưu thông tin người dùng vào localStorage hoặc state quản lý phiên đăng nhập
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Chuyển hướng người dùng đến trang chính sau khi đăng ký thành công
            history.push('/');
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleRegister}>
                <h2>Đăng Ký</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mật Khẩu:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Xác Nhận Mật Khẩu:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Đăng Ký</button>
            </form>
        </div>
    );
};

export default UserRegister;