import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import imgNone from "../img/pokebola-animada-movimiento-corto.gif"
import colorType from '../colorType';



const PokemonCard = ({ url, newData, pokemons }) => {

    const [pok, setPok] = useState([])

    useEffect(() => {
        axios.get(url)
            .then(res => setPok(res.data))
    }, [])


    // (pok.types?.[0].type.name === "fire" ? "red" : "grey")
    const colorCardType = colorType.find(type => type.type === pok.types?.[0].type.name)
    const typeFirst = pok.types?.[0].type.name
    const typeSecond = pok.types?.[1]?.type.name
    return (
        <Link to={`/pokedex/${pok.id}`} className="poke-item">
            <div className='poke-card'>

                <div className='front-card' style={{ borderColor: colorCardType?.color[1] }}>

                    {/* <div className='backPokeImg' style={{ background: "linear-gradient(178.92deg, #7EC6C5 0.92%, #ABDAC6 47.96%, #CAE099 99.08%)" }}></div> */}
                    <div className='backgroundPokeImg' style={{ background: colorCardType?.color[0] }}></div>

                    <img src={pok.sprites?.other.dream_world.front_default ?
                        pok.sprites?.other.dream_world.front_default :
                        imgNone} alt=""
                    />

                    <h2 className='pokeNameFront' style={{ color: colorCardType?.color[1] }} >{pok.name?.toUpperCase()}</h2>
                    <div className='contTypePoke'>
                        <h3>
                            {typeFirst?.charAt(0).toUpperCase() + typeFirst?.slice(1)}
                        </h3>
                        <h3>
                            {typeSecond != undefined
                                ? "/" + typeSecond.charAt(0).toUpperCase() + typeSecond?.slice(1)
                                : ""}
                        </h3>
                    </div>
                    <h3>Type</h3>
                </div>

                <div className='back-card'>
                    <img src={pok.sprites?.other.dream_world.front_default} alt="" />
                    <h2 className='poke-name-back'>{pok.name}</h2>
                    <h3 className='poke-typ-back'>{pok.types?.[0].type.name}</h3>
                    <div className='cont-poke-stats'>
                        <div>
                            <h3>{pok.stats?.[0].stat.name}</h3>
                            <h4>{pok.stats?.[0].base_stat}</h4>
                        </div>
                        <div>
                            <h3>{pok.stats?.[1].stat.name}</h3>
                            <h4>{pok.stats?.[1].base_stat}</h4>
                        </div>
                        <div>
                            <h3>{pok.stats?.[2].stat.name}</h3>
                            <h4>{pok.stats?.[2].base_stat}</h4>
                        </div>
                        <div>
                            <h3>{pok.stats?.[3].stat.name}</h3>
                            <h4>{pok.stats?.[3].base_stat}</h4>
                        </div>
                    </div>
                </div>
            </div>

        </Link>
    );
};

export default PokemonCard;