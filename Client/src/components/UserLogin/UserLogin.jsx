import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './UserLogin.css';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            // Lưu thông tin người dùng vào localStorage hoặc state quản lý phiên đăng nhập
            localStorage.setItem('user', JSON.stringify(response.data.user));
            // Chuyển hướng người dùng đến trang chính sau khi đăng nhập thành công
            history.push('/');
        } catch (err) {
            setError(err.response.data.error);
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2>Đăng Nhập</h2>
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
                <button type="submit" className="login-button">Đăng Nhập</button>
            </form>
        </div>
    );
};

export default UserLogin;