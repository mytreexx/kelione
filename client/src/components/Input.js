import styled from 'styled-components';

const Input = ({ label, height, textarea, ...props }) => {
    return (
        <Container height={height}>
            <label>{label}</label>
            {textarea ? <TextArea {...props} /> : <input {...props} />}
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px gray solid;
    width: 250px;
    height: ${(props) =>
        props.height === undefined ? '50px' : `${props.height}`};
    border-radius: 5px;
    justify-content: space-between;
    padding: 2px;

    label {
        color: #1d7a8c;
        font-size: 14px;
    }

    input {
        border: none;
        outline: none;
        font-size: 16px;
    }
`;

const TextArea = styled.textarea`
    resize: none;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    border: none;
    outline: none;
`;

export default Input;
