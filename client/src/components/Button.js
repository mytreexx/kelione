import styled from 'styled-components';

const Button = styled.button`
    background-color: ${(props) => (props.light ? 'white' : '#1d7a8c')};
    border-color: ${(props) => (props.light ? '#1d7a8c' : 'white')};
    border-style: solid;
    border-width: 1px;
    outline: none;
    padding: ${(props) => (props.small ? '10px 0' : '15px 0')};
    color: ${(props) => (props.light ? '#1d7a8c' : 'white')};
    border-radius: 50px;
    font-weight: 700;
    width: ${(props) =>
        props.medium ? '250px' : props.small ? '75px' : '360px'};
    font-size: 15px;
    cursor: pointer;

    :hover {
        background-color: ${(props) => (props.light ? '#d2e4e8' : '#69A7B2')};
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

export default Button;
