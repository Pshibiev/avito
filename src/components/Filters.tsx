import React from "react";

export const genreOptions = [
  "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social", "sandbox",
  "open-world", "survival", "pvp", "pve", "pixel", "voxel", "zombie", "turn-based",
  "first-person", "third-Person", "top-down", "tank", "space", "sailing", "side-scroller",
  "superhero", "permadeath", "card", "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d",
  "anime", "fantasy", "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts",
  "flight", "low-spec", "tower-defense", "horror", "mmorts"
];

export const Filters: React.FC<{ 
  onTagChange: (newSelectedTags: any) => void;
  onPlatformChange: (newSelectedPlatform: string) => void;
 }> = ({ onTagChange, onPlatformChange }) => {

  const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedTags = event.target.value;
    onTagChange(newSelectedTags); 
  };

  const handlePlatformChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedPlatform = event.target.value;
    onPlatformChange(newSelectedPlatform); 
  };

  return (
    <div className="container mx-auto mb-4 px-4 max-w-[760px]">
      <div className="flex space-x-4 items-center">
        <div className="w-1/2">
          <label htmlFor="platform" className="block text-lg font-semibold mb-2 mt-1">
            Платформа:
          </label>
          <select id="platform" onChange={handlePlatformChange} className="w-full p-2 border rounded bg-[#FAFAF2]">
            <option value="all">Все</option>
            <option value='pc'>PC</option>
            <option value='browser'>Браузер</option>
          </select>
        </div>

        <div className="w-1/2">
          <label htmlFor="genre" className="block text-lg font-semibold  mb-2 mt-1">
            Жанр:
          </label>
          <select id="genre" onChange={handleTagChange} 
          className="w-full p-2 border rounded bg-[#FAFAF2]">
            <option value="pvp" defaultValue='pvp'>pvp</option>
            {genreOptions.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};