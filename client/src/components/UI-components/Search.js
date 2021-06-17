import { useState } from 'react';
import styled from 'styled-components';

import Button from '../UI-components/Button';
import Input from '../UI-components/Input';

const Search = ({ setVacations, getVacations }) => {
    const [description, setDescription] = useState();
    const [startingDate, setStartingDate] = useState();
    const [endingDate, setEndingDate] = useState();

    const clearInputs = () => {
        setDescription('');
        setStartingDate('');
        setEndingDate('');
        getVacations('');
    };

    const searchVacations = () => {
        fetch(
            `/?searchTerm=${description}&startingDate=${startingDate}&endingDate=${endingDate}`
        )
            .then((res) => res.json())
            .then(
                (result) => setVacations(result),
                (error) => console.error(error)
            );
    };

    return (
        <Container>
            <Input
                label="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <Input
                label="Starting Date"
                type="date"
                value={startingDate}
                onChange={(e) => setStartingDate(e.target.value)}
            />

            <Input
                label="Ending date"
                type="date"
                value={endingDate}
                onChange={(e) => setEndingDate(e.target.value)}
            />

            <div className="buttonsDiv">
                <Button onClick={clearInputs} small light>
                    Clear
                </Button>

                <Button onClick={searchVacations} small>
                    Search
                </Button>
            </div>
        </Container>
    );
};

export default Search;

const Container = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    line-height: inherit;
    align-self: flex-start;

    > * {
        margin: 5px;
    }

    @media (max-width: 880px) {
        justify-content: space-between;
        width: 550px;

        .buttonsDiv {
            width: 250px;
            display: flex;
            justify-content: center;
        }
    }

    @media (max-width: 615px) {
        width: 270px;
        justify-content: center;
    }

    button {
        margin: 0 5px;
    }
`;
