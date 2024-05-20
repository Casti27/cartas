import React, { useState } from 'react';
import './App.css';

const CardComponent = ({ cards, toggleShowMore, handleDelete }) => {
  return (
    <div className="Card-container">
      {cards.map((card) => (
        <div key={card.id} className={`Card ${card.className}`} style={{ backgroundColor: card.color }}>
          <h2 className='TitleCard'>{card.title}</h2>
          <p className='ContentCard'>{card.content}</p>
          <div className={`MoreContentCard ${card.showMore ? 'show' : ''}`}>
            {card.moreContent}
          </div>
          {card.image && <img className='img' src={URL.createObjectURL(card.image)} alt="Imagen de la tarjeta" />}
          <button onClick={() => toggleShowMore(card.id)} className='TitleButton1'>
            {card.showMore ? "Ver menos" : "Ver más"}
          </button>
          <button className='TitleButton2' onClick={() => handleDelete(card.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Card 1",
      content: "This is the content of card 1.",
      moreContent: "More content of card 1.",
      image: null,
      showMore: false,
      className: 'Card1',
      color: '#0079FA'
    },
    {
      id: 2,
      title: "Card 2",
      content: "This is the content of card 2.",
      moreContent: "More content of card 2.",
      image: null,
      showMore: false,
      className: 'Card2',
      color: '#282c34'
    },
    {
      id: 3,
      title: "Card 3",
      content: "This is the content of card 3.",
      moreContent: "More content of card 3.",
      image: null,
      showMore: false,
      className: 'Card3',
      color: 'purple'
    },
  ]);

  const [newCard, setNewCard] = useState({ title: '', content: '', moreContent: '', image: null, color: '#61dafb' });

  const handleDelete = (id) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const toggleShowMore = (id) => {
    setCards(cards.map(card => card.id === id ? { ...card, showMore: !card.showMore } : card));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewCard(prevState => ({
        ...prevState,
        [name]: files[0]
      }));
    } else {
      setNewCard(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = () => {
    if (newCard.title && newCard.content && newCard.moreContent && newCard.image) {
      const newId = Math.max(...cards.map(card => card.id), 0) + 1;
      setCards([...cards, { id: newId, ...newCard, showMore: false, className: 'Card1' }]);
      setNewCard({ title: '', content: '', moreContent: '', image: null, color:'' });
    } else {
      alert('Todos los campos son obligatorios');
    }
  };

  return (
    <div className='App'>
      <h1 className='Title'>TARGETS</h1>
      <CardComponent cards={cards} toggleShowMore={toggleShowMore} handleDelete={handleDelete} />
      <div className="add-card-form">
        <h2 className='TitleAgg'>Añadir tarjeta</h2>
        <input className='Input' type="text" name="title" placeholder='Título' value={newCard.title} onChange={handleInputChange} />
        <textarea className='Input' name="content" placeholder='Contenido breve' value={newCard.content} onChange={handleInputChange}></textarea>
        <textarea className='Input' name="moreContent" placeholder='Contenido adicional' value={newCard.moreContent} onChange={handleInputChange}></textarea>  
        <input className='ButtonFile' type="file" name="image" onChange={handleInputChange}></input>
        <input className='InputColor' type="color" name="color" value={newCard.color} onChange={handleInputChange} />
        <button className='ButtonAgg' onClick={handleSubmit}>Añadir</button>
      </div>
    </div>
  );
};

export default App;
