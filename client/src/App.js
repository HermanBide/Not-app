import React, { useState, useEffect } from "react";
import "./App.css";
import NotesList from "./components/NotesList";
import { v4 as uuidv4 } from 'uuid';
import Search from './components/Search';
import Header from './components/Header';

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: uuidv4(),
      text: "This is my 1st note",
      date: "09/21/2022",
    },
    {
      id: uuidv4(),
      text: "This is my 2nd note",
      date: "09/21/2022",
    },
    {
      id: uuidv4(),
      text: "This is my 3rd note",
      date: "09/21/2022",
    },
  ]);

  const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);


	useEffect(() => {
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

  const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: uuidv4(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

  return (
    <div className={`${darkMode && 'dark-mode'}`} >

    <div className="container">
    <Header handleToggleDarkMode={setDarkMode} />
				<Search handleSearchNote={setSearchText} />
       <NotesList notes={notes.filter((note) => note.text.toLocaleLowerCase().includes(searchText))} handleAddNote={addNote} handleDeleteNote={deleteNote}/> 
    </div>
    </div>
  );
};

export default App;
