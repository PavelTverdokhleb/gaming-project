import React, {Fragment} from 'react';
import '../style/main.scss';

const App = (props) => {
    return (
        <Fragment>
            {props.children}
        </Fragment>
    );
};

export default App;
