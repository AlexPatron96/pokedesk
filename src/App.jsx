import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';
import { HashRouter, Route, Routes } from 'react-router-dom'
import InputName from './components/InputName'
import PokeDex from './components/PokeDex'
import PokeDetail from './components/PokeDetail'
import ProtectedRoutes from './components/ProtectedRoustes'

function App() {

    const [apiPokemons, setApiPokemons] = useState([])
    const [apiTypePoke, setApiTypePoke] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154
        axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100')
            .then(res => {
                setApiPokemons(res.data.results)
                //setNewData([...res.data.results].splice(0, 10))
                setLoading(false)
            })
        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => setApiTypePoke(res.data.results))
    }, [])

    return (

        <HashRouter>
            <Routes>
                <Route path='/' element={<InputName />} />
                <Route element={<ProtectedRoutes />}>
                    <Route path='/pokedex' element={<PokeDex apiPokemons={apiPokemons} apiTypePoke={apiTypePoke} loading={loading} />} />
                    <Route path='/pokedex/:id' element={<PokeDetail />} />
                </Route>
            </Routes>
        </HashRouter>
        
    )
}

export default App
