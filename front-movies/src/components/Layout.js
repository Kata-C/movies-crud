import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MoviesView from '../views/MoviesView';
import Login from '../views/Login';
import Header from './Header';
import LoginDrawer from '../components/DrawerLogin'
import MovieTemplate from '../views/MovieTemplate';


const Layout = () => {

    const [isLogged, setIsLogger] = useState(false);
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
    };


    return(
        <div>
            {/* <Header isLogged={isLogged} visible={visible} setVisible={setVisible}/> */}
            {/* <Drawer
                title="Basic Drawer"
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer> */}
            <Router>
                <Header isLogged={isLogged} visible={visible} setVisible={setVisible}/>
                <LoginDrawer visible={visible} onClose={onClose}/>
                <Switch>
                    <Route  path='/movies/comments' component={MovieTemplate} exact />
                    <Route  path='/' component={MoviesView} exact />
                    <Route  path='/login' component={Login} exact />
                </Switch>
            </Router>
            
        </div>
    );
}

export default Layout;