import React, {useState, useEffect} from 'react';
import {Button} from 'antd';
import '../styles/ratingbox.css';

const Rate = ({setRate, clear, setClear}) => {

    const [first, setFirst] = useState(false);
    const [second, setSecond] = useState(false);
    const [third, setThird] = useState(false);
    const [fourth, setFourth] = useState(false);
    const [fifth, setFifth] = useState(false);

    useEffect(() => {
        if(clear)
            anyStar();
        
    },[clear]);

    const firstStar = () => {
        setFirst(true);
        setSecond(false);
        setThird(false);
        setFourth(false);
        setFifth(false);
        setRate(1);
        setClear(false);
    }

    const secondStar = () => {
        setFirst(true);
        setSecond(true);
        setThird(false);
        setFourth(false);
        setFifth(false);
        setRate(2);
        setClear(false);
    }

    const thirdStar = () => {
        setFirst(true);
        setSecond(true);
        setThird(true);
        setFourth(false);
        setFifth(false);
        setRate(3);
        setClear(false);
    }

    const fourthStar = () => {
        setFirst(true);
        setSecond(true);
        setThird(true);
        setFourth(true);
        setFifth(false);
        setRate(4);
        setClear(false);
    }

    const fifthStar = () => {
        setFirst(true);
        setSecond(true);
        setThird(true);
        setFourth(true);
        setFifth(true);
        setRate(5);
        setClear(false);
    }

    const anyStar = () => {
        setFirst(false);
        setSecond(false);
        setThird(false);
        setFourth(false);
        setFifth(false);
        setRate(0);
    }

    return (<div className='stars'>
        <Button size='small' type="text" onClick={firstStar}>{first ? <img src='/icons/star-rate.png'/> : <img src='/icons/white-star.png'/>}</Button>
        <Button size='small' type="text" onClick={secondStar}>{second ? <img src='/icons/star-rate.png'/> : <img src='/icons/white-star.png'/>}</Button>
        <Button size='small' type="text" onClick={thirdStar}>{third ? <img src='/icons/star-rate.png'/> : <img src='/icons/white-star.png'/>}</Button>
        <Button size='small' type="text" onClick={fourthStar}>{fourth ? <img src='/icons/star-rate.png'/> : <img src='/icons/white-star.png'/>}</Button>
        <Button size='small' type="text" onClick={fifthStar}>{fifth ? <img src='/icons/star-rate.png'/> : <img src='/icons/white-star.png'/>}</Button>
    </div>);
}

export default Rate;