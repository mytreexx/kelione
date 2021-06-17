import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';
import Spinner from '../components/Spinner';


const AddVacation = ({ currentUser }) => {
    const [description, setDescription] = useState();
    const [destination, setDestination] = useState();
    const [image, setImage] = useState();
    const [startingDate, setStartingDate] = useState();
    const [endingDate, setEndingDate] = useState();
    const [price, setPrice] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const history = useHistory();

    if (!currentUser) {
        history.push('/');
    } else if (currentUser !== 'admin') {
        history.push('/vacations');
    }

    const clearForm = () => {
        setDestination('');
        setDescription('');
        setImage('');
        setStartingDate('');
        setEndingDate('');
        setPrice('');
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        uploadImage(image);
        setIsLoading(true);
    };

    const uploadImage = async (base64EncodedImage) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                description,
                destination,
                image: base64EncodedImage,
                startingDate,
                endingDate,
                price,
            }),
        };

        try {
            fetch('/vacation', requestOptions).then(() =>
                history.push('/edit')
            );
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Container>
            <Header>Add a new vacation</Header>
            <form onSubmit={handleSubmit}>
                <Input
                    label='Destination'
                    type='text'
                    value={destination}
                    onChange={(e) => { setDestination(e.target.value) }}
                />

                <Input
                    height='90px'
                    textarea
                    rows='3'
                    label='Description'
                    type='text'
                    value={description}
                    onChange={(e) => { setDescription(e.target.value) }}
                />

                <Input
                    label='Add Image'
                    type='file'
                    onChange={handleFileInputChange}
                />

                <Input
                    label='Starting Date'
                    type='date'
                    value={startingDate}
                    onChange={(e) => { setStartingDate(e.target.value) }}
                />

                <Input
                    label='Ending Date'
                    type='date'
                    value={endingDate}
                    onChange={(e) => { setEndingDate(e.target.value) }}
                />

                <Input
                    label='Price'
                    type='number'
                    value={price}
                    onChange={(e) => { setPrice(e.target.value) }}
                />

                <Button type='button' medium light onClick={clearForm}>
                    cancel
                </Button>

                <Button type='submit' medium>
                    Add
                </Button>
            </form>
            {isLoading && <Spinner />}
            {image && !isLoading && <img src={image} alt='preview' />}
        </Container>
    );
};

export default AddVacation;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form > * {
        margin: 15px;
    }

    button {
        margin: 3px;
    }

    img {
        width: 300px;
    }
`;
