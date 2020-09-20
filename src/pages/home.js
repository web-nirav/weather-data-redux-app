import React from 'react';

const Home = ({name, changeName}) => {
    return ( <div>
        My name {name}
        <button onClick={changeName}>Change Name</button>
        </div> );
}
 
export default Home;