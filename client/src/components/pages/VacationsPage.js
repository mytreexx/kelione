import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { PlusCircleIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import VacationCard from '../UI-components/VacationCard';
import Spinner from '../UI-components/Spinner';
import Header from '../UI-components/Header';
import Search from '../UI-components/Search';
import { isAdmin } from '../../utils';


const VacationsPage = ({ currentUser }) => {
    const [vacations, setVacations] = useState([]);
    const [followedVacations, setFollowedVacations] = useState([]);
    const [isLoadingVacations, setIsLoadingVacations] = useState(true);

    const history = useHistory();

    if (isAdmin(currentUser)) {
        history.push('/edit');
    } else if (currentUser) {
        history.push('/vacations');
    } else {
        history.push('/');
    }

    const getVacations = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: currentUser,
            }),
        };

        fetch(`/vacations`, requestOptions)
            .then((result) => result.json())
            .then((result) => {
                setVacations(result.vacations);
                setFollowedVacations(
                    result.followedVacations.map(
                        (vacation) => vacation.vacation
                    )
                );
            })
            .then(() => setIsLoadingVacations(false))
            .catch((e) => console.error(e));
    };

    useEffect(() => {
        getVacations();
    }, []);

    const handleEdit = async (editedVacation) => {
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editedVacation),
        };

        fetch('/vacation', requestOptions);
    };

    const deleteVaction = (deletedVacation) => {
        setVacations(
            vacations.filter((vacation) => vacation.id !== deletedVacation.id)
        );

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                vacationId: deletedVacation.id,
            }),
        };

        fetch('/vacation', requestOptions);
    };

    const toggleFollow = (vacation) => {
        const isFollowed = followedVacations.includes(vacation.id);

        const requestOptions = {
            method: isFollowed ? 'DELETE' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: currentUser,
                vacationId: vacation.id,
            }),
        };

        fetch('/follow', requestOptions);

        if (isFollowed) {
            setFollowedVacations(
                followedVacations.filter(
                    (vacationId) => vacationId !== vacation.id
                )
            );
        } else {
            setFollowedVacations([...followedVacations, vacation.id]);
        }
    };

    const sortVacations = (vacations) => {
        const newVacations = vacations.sort((a, b) => {
            a = followedVacations.includes(a.id) ? 1 : 0;
            b = followedVacations.includes(b.id) ? 1 : 0;
            return b - a;
        });

        return [...newVacations];
    };

    useEffect(() => {
        setVacations(sortVacations(vacations));
    }, [followedVacations]);

    return (
        <Container>
            <Search
                setVacations={(newVacations) => setVacations(sortVacations(newVacations))}
                getVacations={getVacations}
            />

            {isLoadingVacations ? (
                <Spinner />
            ) : (
                vacations.map((vacation) => (
                    <VacationCard
                        key={vacation.id}
                        id={vacation.id}
                        currentUser={currentUser}
                        description={vacation.description}
                        destination={vacation.destination}
                        startingDate={vacation.starting_date}
                        endingDate={vacation.ending_date}
                        price={vacation.price}
                        image={vacation.image}
                        isFollowed={followedVacations.includes(vacation.id)}
                        onDeleted={() => deleteVaction(vacation)}
                        onFollowClicked={() => toggleFollow(vacation)}
                        onEditConfirmed={handleEdit}
                    />
                ))
            )}

            {!isLoadingVacations && vacations.length === 0 && (
                <>
                    <Header>No vacations to show :(</Header>
                </>
            )}

            {isAdmin(currentUser) && (
                <IconContainer>
                    <Link to="/new-vacation">
                        <PlusCircleIcon size={75} />
                    </Link>
                </IconContainer>
            )}
        </Container>
    );
};

export default VacationsPage;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding: 21px;
    height: 89%;
    overflow-y: scroll;

    ::-webkit-scrollbar {
        display: none;
    }
`;

const IconContainer = styled.div`
    position: absolute;
    display: inline-block;
    right: 50px;
    bottom: 50px;
    color: #1d7a8c;
    background-color: white;
    border-radius: 100%;
    padding: 0;

    a {
        color: inherit;
    }
`;
