import { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import Header from '../UI-components/Header';
import { isAdmin } from '../../utils';
import { getGraphData } from '../../services';


const GraphPage = ({ currentUser }) => {
    const history = useHistory();

    if (!currentUser) {
        history.push('/');
    } else if (!isAdmin(currentUser)) {
        history.push('/vacations');
    }

    const [vacationFollowers, setVacationFollowers] = useState([]);

    useEffect(() => {
        getGraphData()
        .then(
                (result) => {
                    setVacationFollowers(
                        result.map((vacation) => ({
                            location: vacation.vacationDestination,
                            followers: vacation.numberOfFollowers,
                            followersColor: 'hsl(62, 70%, 50%)',
                        }))
                    );
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);

    return (
        <Container>
            <Header>Followed vacations</Header>
            <ResponsiveBar
                data={vacationFollowers}
                keys={['followers']}
                indexBy="location"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'vacation',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'followers',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemOpacity: 0.85,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </Container>
    );
};

export default GraphPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 85%;
`;
