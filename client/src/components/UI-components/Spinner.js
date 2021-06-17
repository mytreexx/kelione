import styled from 'styled-components';

import logo from '../../assets/transparentLogo.png';

const Spinner = styled.div`
    width: 100px;
    height: 100px;
    background-image: url(${logo});
    background-size: contain;
    animation: rotation 2s infinite linear;
    align-self: center;
    margin-top: 200px;

    @keyframes rotation {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(359deg);
        }
    }
`;

export default Spinner;
