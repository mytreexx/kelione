import styled from 'styled-components';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from '../components/Button';
import logo from '../assets/logoIcon.jpg';
import Input from '../components/Input';
import Header from '../components/Header';


const Register = ({ currentUser }) => {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const history = useHistory();

    if (currentUser === 'admin') {
        history.push('/edit');
    } else if (currentUser) {
        history.push('/vacations');
    }

    const handleRegister = (event) => {
        event.preventDefault();

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({
                firstName,
                lastName,
                username,
                password,
                confirmPassword,
            }),
        };

        fetch(`http://localhost:5000/register`, requestOptions).then(
            (response) => {
                if (response.ok === false) {
                    response
                        .text()
                        .then((message) => toast.error('oops! ' + message));
                } else if (response.ok) {
                    history.push('/login');
                }
            }
        );
    };

    return (
        <Container>
            <img src={logo} alt='logo' />
            <ToastContainer
                position='top-center'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <form onSubmit={(event) => handleRegister(event)}>
                <Header>Create your account</Header>

                <Input
                    label='First name'
                    type='text'
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value) }}
                />

                <Input
                    label='Last name'
                    type='text'
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value) }}
                />

                <Input
                    label='Username'
                    type='text'
                    value={username}
                    onChange={(e) => { setUsername(e.target.value) }}
                />

                <Input
                    label='Password'
                    type='password'
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <Input
                    label='Confirm password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}
                />

                <Button type='submit' medium>
                    Register
                </Button>
            </form>
        </Container>
    );
};

export default Register;

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