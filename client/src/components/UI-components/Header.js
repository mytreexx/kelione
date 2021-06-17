import styled from 'styled-components';

const Header = styled.h1`
    display: table;
    white-space: nowrap;
    margin-bottom: 20px;

    &:before,
    &:after {
        border-top: 5px solid #d2e4e8;
        content: '';
        display: table-cell;
        position: relative;
        top: 0.5em;
        width: 70px;
    }

    &:before {
        right: 3%;
    }

    &:after {
        left: 3%;
    }
`;

export default Header;
