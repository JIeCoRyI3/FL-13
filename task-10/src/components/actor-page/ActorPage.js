import React from 'react';
import styles from './ActorPage.module.css';
import {useParams, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

function ActorPage( { actors } ) {
    const { id } = useParams();
    if(!actors[id]) return (<Redirect to='/homepage'/>);
    return (
        <div className={styles.info}>
            <div>
                <div>Name: {actors[id].name}</div>
            </div>
            <div>
                <img className={styles.actor} alt="actor" src={actors[id].imgUrl}/>
                <h5>Biography: {actors[id].biography}</h5>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        actors: state.actors,
    };
};

export default connect(mapStateToProps)(ActorPage);
