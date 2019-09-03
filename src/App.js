import React, { Component } from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar'
import EditorComponent from './editor/editor'

const firebase = require('firebase');

class App extends Component {
  constructor() {
    super()
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null
    };
    this.selectNote = this.selectNote.bind(this);
    this.newNote = this.newNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  newNote() {
    console.log(this.state)
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

  deleteNote() {
    console.log('DELETED')
  }

  render() {

    const { 
      notes, 
      selectedNoteIndex,
      selectedNote,
      newNote 
    } = this.state;

    return (
      <div className="app-container">
        <SidebarComponent
          notes={notes}
          selectedNoteIndex={selectedNoteIndex}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={newNote}
        />

        {
          selectedNote &&
          <EditorComponent 
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
          />
        }
        
      </div>
    )
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection('notes')
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data()
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes)
        this.setState({ notes: notes })
      });
  }

}

export default App;
