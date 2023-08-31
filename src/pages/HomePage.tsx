import React, { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { GameCard } from "../components/GameCard";
import { Filters } from "../components/Filters";
import { Sort } from "../components/Sort";
import { fetchGames } from "../store/actions/gameActions";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import ReactPaginate from "react-paginate";


const ITEMS_PER_PAGE = 50

 export function HomePage () {

  const dispatch = useAppDispatch()

  const [selectedTags, setSelectedTags] = useState<any>('pvp');
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>('release-date')

  

  const [currentPage, setCurrentPage] = useState(0);

  const {error, loading, games, count} = useAppSelector(state => state.game)

  const pageCount = Math.ceil(count / ITEMS_PER_PAGE)

  const pageChangeHandler = ({selected}: {selected: number}) => {
  setCurrentPage(selected)
  }

  useEffect(() => {
  dispatch(fetchGames(selectedPlatform, selectedTags, selectedSort))
  }, [dispatch, currentPage, selectedPlatform, selectedTags, selectedSort])

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedGames = games.slice(startIndex, endIndex);

  const handleTagChange = (newSelectedTags: any) => {
    setSelectedTags(newSelectedTags);
    setCurrentPage(0);
    dispatch(fetchGames(selectedPlatform, selectedTags, selectedSort));
  };

  const handlePlatformChange = (newSelectedPlatform: string) => {
    setSelectedPlatform(newSelectedPlatform);
    setCurrentPage(0);
    dispatch(fetchGames(selectedPlatform, selectedTags, selectedSort));
  };

  const handleSortChange = (newSelectedSort: string) => {
    setSelectedSort(newSelectedSort);
    setCurrentPage(0)
    dispatch(fetchGames(selectedPlatform, selectedTags, selectedSort));
  };


  return (
  <>
    <Header />
    <div className="container mx-auto">
        <Filters 
        onTagChange={handleTagChange}
        onPlatformChange={handlePlatformChange} />

        <Sort 
        onSortChange={handleSortChange}/>

        {loading && <p className="text-center text-lg">Загрузка...</p>}
        {error && <p className="text-center text-lg text-red-600">{error}</p>}

        <div 
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {displayedGames.map(game => 
            <GameCard key={game.id} game={game}/>)
            }
        </div>

        <ReactPaginate
            breakLabel="..."
            nextLabel="следующая >"
            onPageChange={pageChangeHandler}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="< предыдущая"
            forcePage={currentPage - 1}
            containerClassName="flex justify-center items-center my-8 space-x-2" 
            previousClassName="flex items-center px-3 py-1 border rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
            nextClassName="flex items-center px-3 py-1 border rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
            pageClassName="flex items-center px-3 py-1 border rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
            activeClassName="flex items-center px-3 py-1 border rounded-lg text-white bg-blue-500 shadow-md"
            breakClassName="px-3 py-1 border rounded-lg text-gray-700 bg-gray-200"
        />

    </div>
  </>
  )
  }