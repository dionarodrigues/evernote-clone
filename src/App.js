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
    this.newNote = this.newNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.noteUpdate = this.noteUpdate.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
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
        this.setState({ notes: notes })
        if(!this.state.selectedNote) this.setState({ selectedNote: notes[0], selectedNoteIndex: 0 })
      });
  }

  async newNote(title) {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await this.setState({ notes: [...this.state.notes, note] });
    const newNoteIndex = this.state.notes.findIndex(_note => _note.id === newID);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  selectNote = (note, index) => this.setState({ selectedNote: note, selectedNoteIndex: index });

  noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  deleteNote = async (note) => {
    if(window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      
      const noteIndex = this.state.notes.indexOf(note);
      await this.setState({ notes: this.state.notes.filter(_note => _note !== note) });
      
      if ((this.state.selectedNoteIndex === noteIndex && noteIndex === 0) || this.state.notes.length <= 1 ) {      
        this.setState({ selectedNoteIndex: null, selectedNote: null });    
      } 

      if(this.state.notes.length > 1 && this.state.selectedNoteIndex > noteIndex) {
        this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
      }

      firebase
        .firestore()
        .collection('notes')
        .doc(note.id)
        .delete();
      
    }     
  }

  render() {

    const {
      notes,
      selectedNoteIndex,
      selectedNote
    } = this.state;

    return (
      <div className="app-container">
        <SidebarComponent
          notes={notes}
          selectedNoteIndex={selectedNoteIndex}
          selectNote={this.selectNote}
          deleteNote={this.deleteNote}
          newNote={this.newNote}
        />

        {
          selectedNote &&
          <EditorComponent
            selectedNote={selectedNote}
            noteUpdate={this.noteUpdate}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
          />
        }

      </div>
    )
  }

}

export default App;
