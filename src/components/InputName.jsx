import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeName } from '../store/slices/name.slice';
import images from '../images.js'

const InputName = () => {
    //console.log(imgPoke);
    const [userName, setUserName] = useState("")
    const navigate = useNavigate()
    const dispath = useDispatch()

    const enterName = () => {
        //alert(userName)
        dispath(changeName(userName))
        navigate('/pokedex')
    }

    return (
        <div className='inputName'>
            <img className='imgLogo' src={images['logo-From']} alt="" />
            <marquee
                className="textMove"
                behavior="scroll"
                direction="left"
                scrolldelay="75">
                It's time for you to become a pokemon Master, find your favorite pokemon.
            </marquee>
            <input type="text" className='nameText' placeholder='Enter your name Pokemon Master' onChange={e => setUserName(e.target.value)} value={userName} />
            <button className='buttonEnter' onClick={enterName} >Enter</button>
            <img className='imgPoke' src={images.pokeCard} alt="" />
        </div>
    );
};

export default InputName;