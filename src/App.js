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
        console.log(notes)
        this.setState({ notes: notes })
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
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }

  selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note });

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
