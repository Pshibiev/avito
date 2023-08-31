import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useParams, Link } from "react-router-dom";
import axios from "../axios";
import { IGameDetails, Screenshot } from "../models/models";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";

export function Game () {
    const params = useParams<'id'>()
    const [game, setGame] = useState<IGameDetails>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    

    async function fetchGameDetails() {
      
        const options = {
          method: 'GET',
          url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
          params: {id: `${params.id}`},
          headers: {  
            'X-RapidAPI-Key': 'f088d0585amsh62322a3d47fe286p1ec193jsn1c7e268ea8e7',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(options);
          setGame(response.data)
          setLoading(false)
        } catch (error) {
          console.error(error);
          setError('Не удалось загрузить данные об игре.')
          setLoading(false);
        }
    }

    useEffect (()=> {
      fetchGameDetails()
    }, [params.id])  

   return (
    <>
    <Header />
    <div className="container mx-auto">
      
      {loading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>{error}</p>
      ) : game ? (
        <div className=" container flex flex-col justify-center">
          <div className=" flex flex-col justify-center mx-auto sm:flex-row">
            <div className="ml-2 text-center sm:text-left">
              <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
              <p className="text-gray-600 mb-2">Дата релиза: {new Date(game.release_date).toLocaleDateString()}</p>
              <p className="text-gray-600 mb-2">Издатель: {game.publisher}</p>
              <p className="text-gray-600 mb-2">Разработчик: {game.developer}</p>
              <p className="text-gray-600 mb-2">Жанр: {game.genre}</p>
            </div>
              <img 
              className='object-fit rounded px-10' src={game.thumbnail} alt={game.title}  />
          </div>
          <div>
          <Carousel 
          className="container mx-auto max-w-2xl text-center px-10 mt-10" showStatus={false} >
           {game.screenshots.map((screenshot: Screenshot) => (
            <div key={screenshot.id} className="w-128 mx-auto">
              <img src={screenshot.image} alt={`Screenshot ${screenshot.id}`} className="rounded-lg" />
            </div>
          ))}
        </Carousel>
          </div>
          <div className="ml-10">
            <h2>Системные требования</h2>
            <p>ОС: {game.minimum_system_requirements.os}</p>
            <p>Процессор: {game.minimum_system_requirements.processor}</p>
            <p>Память: {game.minimum_system_requirements.memory}</p>
            <p>Графика: {game.minimum_system_requirements.graphics}</p>
            <p>Место на диске: {game.minimum_system_requirements.storage}</p>
          </div>

            <div className="flex justify-center items-center ">
              <Link to='/' className="max-w-xs text-center my-3 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 hover:underline">
              Вернуться к списку игр
            </Link>
          </div>
        </div>
      ) : null}
    </div>
    </>
   )
}