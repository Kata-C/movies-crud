import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MoviesView from './MoviesView';
import Login from './Login';
import Header from '../components/Header';
import DrawerLogin from '../components/DrawerLogin'
import DrawerAdd from '../components/DrawerAdd';
import MovieTemplate from './MovieTemplate';



const Layout = () => {

    const [isLogged, setIsLogger] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibleAdding, setVisibleAdding] = useState(false);
    const [session, setSession] = useState('');

    // useEffect(() => {
    //     window.localStorage.clear();
    // }, []);

    const onClose = () => {
        setVisible(false);
    };

    const onCloseAdding = () => {
        setVisibleAdding(false);
    };

    return(
        <div>
            <Router>
                <Header isLogged={isLogged} setVisible={setVisible} setVisibleAdding={setVisibleAdding}/>
                <DrawerLogin visible={visible} onClose={onClose}/>
                <DrawerAdd visible={visibleAdding} onClose={onCloseAdding}/>
                <Switch>
                    <Route  path='/movies/:id/comments' component={MovieTemplate} exact />
                    <Route  path='/' component={MoviesView} exact />
                    <Route  path='/login' component={Login} exact />
                </Switch>
            </Router>
        </div>
    );
}

export default Layout;