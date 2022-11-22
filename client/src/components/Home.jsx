import React from "react";
import { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom";
import { filterCountryByContinent, getCountries, orderByName, orderByPop, getActivities, filterActivity } from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import '../Estilos/Home.css'
import SearchBar from "./SearchBar";


export default function Home () {
    
    const dispatch = useDispatch();
    const allCountries = useSelector((state)=> state.countries)
    
    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    const activities = useSelector((state) => state.activities)

    useEffect(() => {
        dispatch(getActivities())
    }, [dispatch])
    
    //Paginado
    const [currentPage,setCurrentPage] = useState(1)
    const [countryPerPage,SetCountryPerPage] = useState(10)
    const indexLastPage = currentPage * countryPerPage
    const indexFirstPage = indexLastPage - countryPerPage
    const currentCountry = allCountries.slice(indexFirstPage, indexLastPage)
    const [orden, setOrden] = useState('')

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    //Filtrado por continente:
    function handleFilterContinent(g){
        dispatch(filterCountryByContinent(g.target.value))
    }
    
    //Filtrado por Orden A-Z:
    function handleSort (g){
        g.preventDefault();
        dispatch(orderByName(g.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${g.target.value}`)
    }
    //Filtrado por Orden Pop:
    function handlePop (g){
        g.preventDefault();
        dispatch(orderByPop(g.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${g.target.value}`)
    }
    //Filtrado por Actividad:
    function handleActivity (g){
        g.preventDefault();
        dispatch(filterActivity(g.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${g.target.value}`)
    }

    return (
        <div>
            <div className="Banner1">
                
                <Link className="PaginaPri" to='/'>Pagina Principal</Link>
                <SearchBar/>
                <Link className="Acti" to= "/Activities">Crear Actividad</Link>
            </div>
            <div className="fondo2">
            <div className="filtros">
                
                <select className="fil1" onChange={g => handleSort(g)}>
                    <option value= 'A-Z'>Nombre</option>
                    <option value= 'asc'>Nombre Ascendente</option>
                    <option value= 'desc'>Nombre Descendente</option>
                </select>
                
                <select className="fil1" onChange={g => handlePop(g)}>
                    <option>Poblacion</option>
                    <option value= 'pop asc'>Poblacion Asc</option>
                    <option value= 'pop desc'>Poblacion Desc</option>
                </select>
                
                <select className="fil1" onChange={g => handleFilterContinent(g)}>
                    <option value= 'All'>Continentes</option>
                    <option value= 'Africa'>Africa</option>
                    <option value= 'South America'>Sudamerica</option>
                    <option value= 'North America'>Norteamerica</option>
                    <option value= 'Asia'>Asia</option>
                    <option value= 'Europe'>Europa</option>
                    <option value= 'Oceania'>Oceania</option>
                </select>
                <select className="fil1" onChange={handleActivity}>
                    <option value = 'any'>Actividades</option>

                    {activities.map((g) => (
                        <option value= {g.name}>{g.name}</option>
                    ))}
                </select>
            </div>
            <Paginado
                countryPerPage={countryPerPage}
                allCountries={allCountries.length}
                paginado = {paginado}
            />
            <div className="gamesDiv">
                {
                    currentCountry && currentCountry.map((g) => {
                        return(
                        <Link className="link5" to = {'/countries/' + g.id}>
                            <Card name={g.name} img={g.img} continents={g.continents} key={g.id}/>
                        </Link>
                        )
                    })
                }
            </div>
            </div>
        </div>
    )
}