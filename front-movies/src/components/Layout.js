import React, {useState} from 'react';

import MoviesView from '../views/MoviesView';
import Header from './Header';

const Layout = () => {

    const [isLogged, setIsLogger] = useState(false);
    return(
        <div>
            <Header isLogged={isLogged}/>
            <MoviesView />
        </div>
    );
}

export default Layout;