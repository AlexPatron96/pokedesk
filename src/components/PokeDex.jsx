import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import { useNavigate , useParams } from 'react-router-dom';
import Loading from './Loading';
import Pagination from './Pagination';
import images from '../images.js'

const PokeDex = ({ apiPokemons, apiTypePoke, loading }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const userName = useSelector(state => state.name)
    const [pokemons, setPokemons] = useState(apiPokemons)
    const [inputNamePoke, setInputNamePoke] = useState('')

    /*=================================*/
    const pageNumberLimit = 5;
    const [newData, setNewData] = useState([...pokemons].splice(0, 10));
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageLimit, setMaxPageLimit] = useState(5);
    const [minPageLimit, setMinPageLimit] = useState(0);

    //console.log(newData);

    const onPageChange = (pageNumber) => {

        setCurrentPage(pageNumber);
        const firstIndex = pageNumber * 10
        console.log("boton actual" + pageNumber);
        setNewData([...pokemons].splice((firstIndex - 10), 10))
    }
    const onPrevClick = () => {
        const prev = currentPage - 1
        const LastIndex = (prev - 1) * 10
        console.log("anterior");
        setNewData([...pokemons].splice(LastIndex, 10))
        if ((currentPage - 1) % pageNumberLimit === 0) {
            setMaxPageLimit(maxPageLimit - pageNumberLimit);
            setMinPageLimit(minPageLimit - pageNumberLimit);
        }
        setCurrentPage(prev => prev - 1);
    }

    const onNextClick = () => {
        const next = currentPage + 1
        const firstIndex = next * 10
        console.log("siguiente");
        setNewData([...pokemons].splice((firstIndex - 10), 10))
        if (currentPage + 1 > maxPageLimit) {
            setMaxPageLimit(maxPageLimit + pageNumberLimit);
            setMinPageLimit(minPageLimit + pageNumberLimit);
        }
        setCurrentPage(prev => prev + 1);
    }

    const paginationAttributes = {
        currentPage,
        maxPageLimit,
        minPageLimit,
        totalPages: Math.ceil(pokemons.length / 10),
    };
    /*=================================*/



    const selectTypePokelist = (e) => {
        const url = (e.target.value)
        axios.get(url).then(res => {
            setPokemons(res.data.pokemon)
            setNewData([...res.data.pokemon].splice(0, 10))
        })
        setCurrentPage(1)
        setMaxPageLimit(5)
        setMinPageLimit(0)
        //console.log('a seleccionado : '+e.target.value)
    }

    const searchPokemon = () => {
        // alert('esta buscando:' + inputNamePoke)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .catch(err => {
                console.log(err.response.data)
                if (err.response.data === "Not Found") {
                    alert(inputNamePoke+'. No existe este Pokemon!!')
                    setInputNamePoke('')
                } else {
                    navigate(`/pokedex/${inputNamePoke.toLowerCase()}`)
                }
            })
    }

    return (
        <div>
            <nav className='navPoke'>
                <img className='imgLogo' src={images['logo-From']} alt="" />
                <div className='contNav'>
                    <h2> Welcome {userName} !</h2>
                    <h3>Search for your favorite pokemon and enter the Pokemon universe </h3>
                    <input
                        className='inputSearchPoke'
                        type="text"
                        placeholder='search pokemon'
                        onChange={e => setInputNamePoke(e.target.value)}
                        value={inputNamePoke}
                    />
                    <button className='buttSearchPoke' onClick={searchPokemon}>Search</button>

                    <select
                        className='listTypePoke'
                        onChange={selectTypePokelist}
                        name="" id="">
                        <option>
                            Select type Pokemons
                        </option>
                        {
                            apiTypePoke.map(type => (
                                <option
                                    key={type.name}
                                    value={type.url}
                                >
                                    {type.name}
                                </option>

                            ))
                        }
                    </select>
                </div>
            </nav>

            <div className='main'>

                <ul className='list-pkm'>
                    {
                        newData.map(pok => (
                            <PokemonCard newData={newData} pokemons={pokemons}
                                key={pok.url ? pok.url : pok.pokemon.name}
                                url={pok.url ? pok.url : pok.pokemon.url}
                            />)
                        )
                    }
                </ul>

                {!loading ? <Pagination
                    paginationAttributes={paginationAttributes}
                    onPrevClick={onPrevClick}
                    onNextClick={onNextClick}
                    onPageChange={onPageChange} />
                    : <Loading />
                }
            </div>
        </div>
    );
};

export default PokeDex;