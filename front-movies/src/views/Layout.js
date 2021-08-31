import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MoviesView from './MoviesView';
import Header from '../components/Header';
import DrawerLogin from '../components/DrawerLogin'
import DrawerAdd from '../components/DrawerAdd';
import MovieTemplate from './MovieTemplate';



const Layout = () => {

    const [visible, setVisible] = useState(false);
    const [visibleAdding, setVisibleAdding] = useState(false);

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
                <Header setVisible={setVisible} setVisibleAdding={setVisibleAdding}/>
                <DrawerLogin visible={visible} onClose={onClose}/>
                <DrawerAdd visible={visibleAdding} onClose={onCloseAdding}/>
                <Switch>
                    <Route  path='/movies/:id/comments' component={MovieTemplate} exact />
                    <Route  path='/' component={MoviesView} exact />
                </Switch>
            </Router>
        </div>
    );
}

export default Layout;