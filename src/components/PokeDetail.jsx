import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import colorType from '../colorType';
import Progress_bar from './ProgressBar';


const PokeDetail = () => {

    // const navigate = useNavigate()
    // const userName = useSelector(state => state.name)
    //const userName = useSelector(state => state.name)
    const navigate = useNavigate()
    const userName = useSelector(state => state.name)

    const [pokemonDetail, setPokemonDetail] = useState([])
    const { id } = useParams()

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => {
                console.log('si responde el axios');
                setPokemonDetail(res.data)
            })
    }, [])

    const colorCardType = colorType.find(type => type.type === pokemonDetail.types?.[0].type.name)
    // const typeFirst = pokemonDetail.types?.[0].type.name
    // const typeSecond = pokemonDetail.types?.[1]?.type.name
    console.log(colorCardType);
    console.log(pokemonDetail);
    // console.log(colorType.find(type => type.type === pokemonDetail.types?.[0].type.name));
    return (
        <div className='pokeDetail'>
            <div>
                <div className='backgroundPokeDetail' style={{ background: colorCardType?.color[0] }} ></div>
                <img className='imgPokeDetail' src={pokemonDetail.sprites?.other.dream_world.front_default} alt="" />
                <h2 className='titlePokeDetail'>Pokemon Detail</h2>
                <div>
                    <h3># {pokemonDetail.id}</h3>
                    <h3 className='namePokeDetail'>
                        <span style={{ color: colorCardType?.color[1] }} >{pokemonDetail.name?.toUpperCase()}</span>
                    </h3>

                    <div className='contDimenPoke'>
                        <h3 className='weiTitle'>Weight</h3>
                        <h3 className='wei'>{pokemonDetail.weight}</h3>
                        <h3 className='heiTitle'>Height</h3>
                        <h3 className='hei'>{pokemonDetail.height}</h3>
                    </div>
                    <div className='featuresPoke'>
                        <h3 className='typeTitle'>Type</h3>
                        <div className='contTypeDate'>
                            {
                                pokemonDetail.types?.map(type =>
                                (
                                    <h4 className='typeDate caj'
                                        style={{ background: (colorType.find(ty => ty.type === type.type.name).color[0]) }}>
                                        {type.type.name}
                                    </h4>
                                ))
                            }
                        </div>
                        <h3 className='skillsTitle'>habilidades</h3>
                        <div className='contSkillsDate'>
                            {
                                pokemonDetail.abilities?.map(hab => (
                                    <h4 className='skillsDate caj'>
                                        {hab.ability.name}
                                    </h4>
                                ))
                            }
                        </div>
                    </div>
                    <div className='contStatsPoke'>
                        <h3>STATS</h3>
                        <div className="contBarStat">
                            {
                                pokemonDetail.stats?.map(stats => (
                                    <Progress_bar nameStat={stats.stat.name} bgcolor={colorCardType?.color[1]} progress={`${stats.base_stat}`} height={20} />

                                ))
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <h3>MOVES</h3>
                    <div className='contListMove'>
                        {
                            pokemonDetail.moves?.map(moves => (
                                <h4 style={{borderColor: colorCardType?.color[1] }} className='listMovePoke'>{moves.move.name}</h4>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div >
    );
};

export default PokeDetail;