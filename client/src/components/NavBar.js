import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../assets/logoIcon.jpg';
import Button from './Button';


const NavBar = ({ currentUser, logout }) => {
    return (
        <Container>
            <div>
                <img src={logo} alt='logo' />
                <strong>kelionė</strong>

                {currentUser === 'admin' && (
                    <>
                        <Link to='/edit'>Edit vacations</Link>

                        <Link to='/graph'>Follower graph</Link>
                    </>
                )}
            </div>

            <div>
                <span>Sveiki {currentUser}!</span>
                <Button small light onClick={logout}>
                    Logout
                </Button>
            </div>
        </Container>
    );
};

export default NavBar;

const Container = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap-reverse;

    img {
        height: 50px;
    }

    a {
        margin-left: 20px;
        border-bottom: 4px solid #d2e4e8;
        color: inherit;
        text-decoration: none;

        :hover {
            border-bottom: 4px solid #1d7a8c;
        }
    }

    strong {
        font-family: 'Bitter', serif;
        color: #ed8047;
        font-size: 50px;
        padding-left: 8px;
    }

    span {
        margin-right: 20px;
    }

    div {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 10px;
    }

    @media (max-width: 750px) {
        strong {
            display: none;
        }

        span {
            margin: 0px 5px;
        }
    }
`;
