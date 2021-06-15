import { useState, useEffect }       from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import LandingPage  from './pages/LandingPage';
import Login        from './pages/Login';
import Vacations    from './pages/Vacations';
import Graph        from './pages/Graph';
import AddVacation  from './pages/AddVacation';
import Register     from './pages/Register';
import NavBar       from './components/NavBar';


function App() {
    const history = useHistory();
    const [currentUser, setCurrentUser] = useState(
        localStorage.getItem('currentUser')
    );

    useEffect(() => {
        if (!currentUser) {
            localStorage.removeItem('currentUser');
        } else {
            localStorage.setItem('currentUser', currentUser);
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
                    <Register currentUser={currentUser} />
                </Route>

                <Route path="/login">
                    <Login
                        onUserChange={setCurrentUser}
                        currentUser={currentUser}
                    />
                </Route>

                <Route path="/vacations">
                    <Vacations currentUser={currentUser} />
                </Route>

                <Route path="/edit">
                    <Vacations currentUser={currentUser} />
                </Route>

                <Route path="/graph">
                    <Graph currentUser={currentUser} />
                </Route>

                <Route path="/new-vacation">
                    <AddVacation currentUser={currentUser} />
                </Route>
            </Switch>
        </>
    );
}

export default App;
