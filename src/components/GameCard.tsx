import React from 'react'
import { IGame } from '../models/models'
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
    game: IGame
}

export function GameCard({ game }: GameCardProps) {

    const dateParts = game.release_date.split('/'); 
    const releaseDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  
    const day = releaseDate.getDate();
    const month = releaseDate.getMonth() + 1; 
    const year = releaseDate.getFullYear();

    const navigate = useNavigate()
    
    const clickHandler = () => navigate(`/Game/${game.id}`)

    return (
      <div className="bg-[#FAFAF2] shadow-lg rounded-lg p-4 max-w-md mx-auto mb-4 cursor-pointer" onClick={clickHandler}>
        <div className="aspect-w-16 aspect-h-9 mb-2">
            <img src={game.thumbnail} alt={game.title} className="w-full h-40 object-cover mb-2 rounded" />
        </div>
        <h2 className="text-xl font-semibold">{game.title}</h2>
        <p className="text-gray-500">Дата релиза: {`${day}/${month}/${year}`}</p>
        <p className="text-gray-500">Издатель: {game.publisher}</p>
        <p className="text-gray-500">Жанр: {game.genre}</p>
    </div>
    )
}