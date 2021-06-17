import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../UI-components/Button';
import Input from '../UI-components/Input';
import Header from '../UI-components/Header';
import logo from '../../assets/logoIcon.jpg';
import { isAdmin } from '../../utils';


const LoginPage = ({ onUserChange, currentUser }) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const history = useHistory();

    if (isAdmin(currentUser)) {
        history.push('/edit');
    } else if (currentUser) {
        history.push('/vacations');
    }

    const handleLogin = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                username,
                password,
            }),
        };

        fetch(`/login`, requestOptions).then((response) => {
            if (response.ok === false) {
                response
                    .text()
                    .then((message) => toast.error('oops! ' + message));
            } else if (response.ok) {
                response.text().then((userNameFromServer) => {
                    onUserChange(userNameFromServer);
                    history.push('/vacations');
                });
            }
        });
    };

    return (
        <Container>
            <img src={logo} alt="logo" />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <form onSubmit={handleLogin}>
                <Header>Log in to kelionė</Header>

                <Input
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <Button type="submit" medium>
                    Log in
                </Button>
            </form>
        </Container>
    );
};

export default LoginPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    font-size: 13px;
    height: 100%;
    box-sizing: border-box;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    img {
        margin-bottom: 30px;
    }

    .Toastify__toast {
        background-color: #ed8047;
        margin-top: 100%;
    }

    form > * {
        margin: 10px;
    }

    @media (max-width: 375px) {
        img {
            width: 100px;
        }
    }
`;
