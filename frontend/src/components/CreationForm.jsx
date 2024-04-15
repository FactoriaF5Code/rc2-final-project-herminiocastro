import { useState } from 'react';

 export const CreationForm = () => {
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file" 
        accept="image/*" 
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Selecciona una categoría</option>
        {}
      </select>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Título" 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Descripción" 
      />
      <button type="submit">Guardar</button>
    </form>
  );
};
 

