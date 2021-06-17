import React from 'react';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

import logo from '../../assets/logoIcon.jpg';
import Button from '../UI-components/Button';
import isAdmin from '../../utils';

const LandingPage = ({ currentUser }) => {
    const history = useHistory();

    if (isAdmin(currentUser)) {
        history.push('/edit');
    } else if (currentUser) {
        history.push('/vacations');
    }

    return (
        <Container>
            <H1>kelionė</H1>
            <img src={logo} alt="logo" />

            <Button light>
                <Link to="/register">Register</Link>
            </Button>

            <Button>
                <Link to="/login">Login</Link>
            </Button>
        </Container>
    );
};

export default LandingPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;

    img {
        margin-bottom: 30px;
        animation: logoIn 1.5s ease-in-out forwards;
    }

    Button {
        margin-bottom: 10px;
    }

    @keyframes logoIn {
        from {
            transform: translateY(-30px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
`;

const H1 = styled.h1`
    font-family: 'Bitter', serif;
    color: #ed8047;
    font-size: 60px;
    margin: 20px;
    animation: logoIn 1s ease-in-out forwards;
`;
