import { useState } from 'react';
import styled from 'styled-components';
import {
    HeartIcon,
    HeartFillIcon,
    TrashIcon,
    PencilIcon,
    CheckCircleIcon,
    XCircleIcon,
} from '@primer/octicons-react';


const VacationCard = ({
    id,
    currentUser,
    isFollowed,
    destination,
    description,
    startingDate,
    endingDate,
    price,
    image,
    onDeleted,
    onFollowClicked,
    onEditConfirmed,
}) => {
    const [editMode, setEditMode] = useState(false);

    const [destinationInput, setDestinationInput] = useState(destination);
    const [descriptionInput, setDescriptionInput] = useState(description);
    const [startingDateInput, setStartingDateInput] = useState(startingDate);
    const [endingDateInput, setEndingDateInput] = useState(endingDate);
    const [priceInput, setPriceInput] = useState(price);
    const [imageInput, setImageInput] = useState(image);

    const dateFormat = (dateString) => {
        return dateString.split('-').reverse().join('/');
    };

    const confirmEdit = () => {
        setEditMode(false);

        const editedVacation = {
            vacationId: id,
            description: descriptionInput,
            destination: destinationInput,
            image: imageInput,
            startingDate: startingDateInput,
            endingDate: endingDateInput,
            price: priceInput,
        };
        onEditConfirmed(editedVacation);
    };

    const enterEditMode = () => {
        setEditMode(true);
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = function () {
            setImageInput(reader.result);
        };
    };

    const cancelEditMode = () => {
        setEditMode(false);
        setDestinationInput(destination);
        setDescriptionInput(description);
        setStartingDateInput(startingDate);
        setEndingDateInput(endingDate);
        setPriceInput(price);
        setImageInput(image);
    };

    return (
        <Container>
            {editMode ? (
                <EditingImageContainer
                    style={{ backgroundImage: `url(${image})` }}
                >
                    <input onChange={handleFileInputChange} type='file' />
                </EditingImageContainer>
            ) : (
                <img src={imageInput} alt={destination} />
            )}

            <ContentContainer>
                <div className='space-between'>
                    {editMode ? (
                        <input
                            type='text'
                            onChange={(e) => {
                                setDestinationInput(e.target.value);
                            }}
                            value={destinationInput}
                        />
                    ) : (
                        <strong>{destinationInput}</strong>
                    )}

                    {currentUser === 'admin' ? (
                        <span>
                            {editMode ? (
                                <>
                                    <button onClick={() => cancelEditMode()}>
                                        <XCircleIcon size={24} fill='#ED8047' />
                                    </button>

                                    <button onClick={() => confirmEdit()}>
                                        <CheckCircleIcon size={24} fill='#1D7A8C' />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={enterEditMode}>
                                        <PencilIcon size={24} fill='#1D7A8C' />
                                    </button>

                                    <button onClick={() => { onDeleted(id) }} >
                                        <TrashIcon size={24} fill="#ED8047" />
                                    </button>
                                </>
                            )}
                        </span>
                    ) : (
                        <button
                            className='pulseAnimation'
                            onClick={onFollowClicked}
                        >
                            {isFollowed ? (
                                <HeartFillIcon size={24} fill='#ED8047' />
                            ) : (
                                <HeartIcon size={24} fill='#ED8047' />
                            )}
                        </button>
                    )}
                </div>

                {editMode ? (
                    <textarea
                        rows='3'
                        value={descriptionInput}
                        onChange={(e) => { setDescriptionInput(e.target.value) }}
                    />
                ) : (
                    <div>{descriptionInput}</div>
                )}

                <div className='space-between'>
                    {editMode ? (
                        <span>
                            <input
                                type='date'
                                value={startingDateInput}
                                onChange={(e) => { setStartingDateInput(e.target.value) }}
                            />

                            <input
                                type='date'
                                value={endingDateInput}
                                onChange={(e) => { setEndingDateInput(e.target.value) }}
                            />
                        </span>
                    ) : (
                        <span>
                            {dateFormat(startingDateInput)} - {dateFormat(endingDateInput)}
                        </span>
                    )}

                    {editMode ? (
                        <input
                            type='number'
                            value={priceInput}
                            onChange={(e) => { setPriceInput(e.target.value) }}
                        />
                    ) : (
                        <span>€{priceInput}</span>
                    )}
                </div>
            </ContentContainer>
        </Container>
    );
};

export default VacationCard;

const Container = styled.div`
    border: 1px #1d7a8c solid;
    background-color: white;
    border-radius: 20px;
    width: 400px;
    height: 450px;
    margin: 25px;
    box-shadow: rgba(29, 122, 140, 0.4) 5px 5px,
        rgba(29, 122, 140, 0.3) 10px 10px, rgba(29, 122, 140, 0.2) 15px 15px,
        rgba(29, 122, 140, 0.1) 20px 20px, rgba(29, 122, 140, 0.05) 25px 25px;

    @media (max-width: 500px) {
        width: 300px;
    }

    img {
        width: 400px;
        height: 260px;
        border-radius: 20px 20px 0 0;

        @media (max-width: 500px) {
            width: 300px;
        }
    }

    strong {
        font-size: 1.2em;
        font-weight: 500;
    }

    .pulseAnimation svg {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.85);
        }

        70% {
            transform: scale(1);
        }

        100% {
            transform: scale(0.85);
        }
    }
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: 10px;
    height: 40%;

    div {
        padding: 10px;
    }

    .space-between {
        display: flex;
        justify-content: space-between;
    }

    .space-between span:first-child {
        font-size: 0.95em;
    }

    .space-between span:last-child {
        font-weight: bold;
        color: #1d7a8c;
    }

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        padding: 0;
    }
`;

const EditingImageContainer = styled.div`
    height: 260px;
    border-radius: 20px 20px 0 0;
    display: flex;
    flex-direction: column-reverse;
    padding: 10px;
    box-sizing: border-box;
    background-size: 100% 100%;

    input {
        background-color: rgba(255, 255, 255, 0.5);
        padding: 10px;
    }
`;
