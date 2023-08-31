import React from "react";

export const Sort: React.FC<{
    onSortChange: (newSelectedSort: string) => void;
}> = ({ onSortChange }) => { 
    
    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSelectedSort = event.target.value;
        onSortChange(newSelectedSort); 
      }

    return (
        <div className="container mx-auto mb-4 px-4 max-w-[760px]  rounded-lg p-2">
          <div className="w-full ">
            <label htmlFor="sort" className="block text-lg font-semibold mb-2 mt-1">
              Сортировка:
            </label>
            <select 
              id="sort"
              className="w-full p-2 border rounded bg-[#FAFAF2]"
              onChange={handleSortChange}
            >
              <option value="release-date">По дате релиза</option>
              <option value="alphabetical">По алфавиту</option>
              <option value="popularity">По популярности</option>
            </select>
          </div>
        </div>
      );
}