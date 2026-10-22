import React, { useState } from 'react';
import bulbasur from './assets/bulbasur.png';
import charmander from './assets/charmander.png';
import Squirtle from './assets/squirtle.png';

export default function App() {
  const [pokemons, setPokemons] = useState([
    { id: 1, name: 'Bulbasaur', type: 'asian', avatar: bulbasur },
    { id: 2, name: 'Charmander', type: 'mexican', avatar: charmander },
    { id: 3, name: 'Squirtle', type: 'white', avatar: Squirtle }
  ]);

  const [nameInput, setNameInput] = useState('');
  const [typeInput, setTypeInput] = useState('Asian'); 
  const [avatarInput, setAvatarInput] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const localImageURL = URL.createObjectURL(file);
      setAvatarInput(localImageURL);
    }
  };

  const handleAddPokemon = (e) => {
    e.preventDefault();

    const nextId = pokemons.length + 1;

    const newPokemon = {
      id: nextId,
      name: nameInput,
      type: typeInput,
      avatar: avatarInput
    };

    const updatedList = [...pokemons, newPokemon];
    setPokemons(updatedList);

    setNameInput('');
    setAvatarInput('');
    setTypeInput('asian');
    
    document.getElementById('file-picker').value = '';
  };

  return (
    <div className="min-h-screen bg-blue-900">
      
      <div className="bg-blue-400 p-4 border">
        <h2 className="text-center font-bold text-black">ADD NEW POKEMON</h2>
        
        <form onSubmit={handleAddPokemon} className="space-y-4">
          <div>
            <label className="block text-black">NAME:</label>
            <input 
              type="text" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="w-full text-black p-1 bg-white"
            /> 
          </div>

          <div>
            <label className="block text-black">TYPE:</label>
            <select 
              value={typeInput}
              onChange={(e) => setTypeInput(e.target.value)}
              className="w-full p-1 bg-white"
            >
              <option value="asian">Asian</option>
              <option value="mexican">Mexican</option>
              <option value="white">White</option>
              <option value="black">Black</option>
              <option value="pink">Pink</option>
              <option value="african">African</option>
              <option value="wasian">Wasian</option>
              <option value="caucasian">Caucasian</option>
            </select>
          </div>

          <div>
            <label className="block text-black">IMAGE:</label>
            <input 
              id="file-picker"
              type="file" 
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-1 bg-white"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-900 text-white"
          >
            SUBMIT
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap gap-4">
          {pokemons.map((pokemon) => (
            <div 
              key={pokemon.id} 
              className="bg-white p-2 w-40   text-center"
            >
              <div className="text-left text-black">ID: {pokemon.id}</div>
              
              <img 
                src={pokemon.avatar} 
                alt={pokemon.name} 
                className="w-20 h-20"
              />
              
              <div className="font-bold  uppercase">{pokemon.name}</div>
              <div className="uppercase border border-black mt-1  ">
                {pokemon.type}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
