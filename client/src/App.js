import { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import LandingPage from './components/pages/LandingPage';
import LoginPage from './components/pages/LoginPage';
import VacationsPage from './components/pages/VacationsPage';
import GraphPage from './components/pages/GraphPage';
import AddVacationPage from './components/pages/AddVacationPage';
import RegisterPage from './components/pages/RegisterPage';
import NavBar from './components/UI-components/NavBar';

function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('currentUser')
    );

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', currentUser);
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    const logout = () => {
        setCurrentUser(undefined);
        history.push('/');
    };

    return (
        <>
            {currentUser && (
                <NavBar currentUser={currentUser} logout={logout} />
            )}

            <Switch>
                <Route exact path="/">
                    <LandingPage currentUser={currentUser} />
                </Route>

                <Route path="/register">
                    <RegisterPage currentUser={currentUser} />
                </Route>

                <Route path="/login">
                    <LoginPage
                        onUserChange={setCurrentUser}
                        currentUser={currentUser}
                    />
                </Route>

                <Route path="/vacations">
                    <VacationsPage currentUser={currentUser} />
                </Route>

                <Route path="/edit">
                    <VacationsPage currentUser={currentUser} />
                </Route>

                <Route path="/graph">
                    <GraphPage currentUser={currentUser} />
                </Route>

                <Route path="/new-vacation">
                    <AddVacationPage currentUser={currentUser} />
                </Route>
            </Switch>
        </>
    );
}

export default App;
