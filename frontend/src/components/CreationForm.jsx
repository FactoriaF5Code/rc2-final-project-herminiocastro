import { useState } from 'react';

 export const CreationForm = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const options = [ { value: 'POPS', label: 'POPS' }, { value: 'VARIOS', label: 'VARIOS' } ];
  const [categoryValue , setCategoryValue] = useState ('POPS')

  


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Image:", image);
    console.log("Title:", title);
    console.log("Description:", description);
    const formData = {
      image,
      categoryValue,
      title,
      description
    };
    console.log("Form Data:", formData);
  };

  const handleSelectedChange = async (event) => {
    event.preventDefault();
    setCategoryValue(event.target.value);
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="file"
        onChange={(e) => setImage(e.target.files[0])} 
      />
      <select id="select" value={categoryValue} onChange={handleSelectedChange}>
        {options.map(option => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
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
 

