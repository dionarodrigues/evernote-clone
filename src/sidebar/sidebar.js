import React, { Component } from 'react';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebarItem/sidebarItem';
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

class SidebarComponent extends Component {
  constructor() {
    super();
    this.state = {
      addingNote: false,
      title: null
    };
    this.addNoteBtn = this.addNoteBtn.bind(this);
    this.uptadeTitle = this.uptadeTitle.bind(this);
    this.submitNewNote = this.submitNewNote.bind(this);
    this.handleSelectNote = this.handleSelectNote.bind(this);
    this.handleDeleteNote = this.handleDeleteNote.bind(this);
  }

  addNoteBtn() {
    this.setState({
      title: null,
      addingNote: !this.state.addingNote
    })
  }

  uptadeTitle(txt) {
    this.setState({
      title: txt
    })
  }

  submitNewNote() {
    this.props.newNote( this.state.title );
    this.setState({ addingNote: false, title: null })
  }

  handleSelectNote(note, index) {
    this.props.selectNote(note, index);
  }
  
  handleDeleteNote(note) {
    this.props.deleteNote(note);
  }

  render() {

    const { notes, classes, selectedNoteIndex } = this.props;

    return(
      <div className={classes.sidebarContainer}>
        <Button
          onClick={this.addNoteBtn}
          className={classes.newNoteBtn}>
            { this.state.addingNote ? 'Cancel' : 'Add Note' }
        </Button>

        {
          this.state.addingNote && 
          <div>
            <input type='text'
              className={classes.newNoteInput}
              placeholder='Enter note title'
              onKeyUp={(e) => this.uptadeTitle(e.target.value)} />
            <Button
              onClick={this.submitNewNote}
              className={classes.newNoteSubmitBtn}>
                Submit Note
            </Button>
          </div>
        }

        { notes ? 
          <List>
            {
              notes.map((_note, _index) => {
                return(
                  <div key={_index}>
                    <SidebarItemComponent  
                      _note={_note}
                      _index={_index}
                      selectedNoteIndex={selectedNoteIndex}
                      selectNote={this.handleSelectNote}
                      deleteNote={this.handleDeleteNote} />
                    <Divider />
                  </div>
                )
              })
            }
          </List>                  
        :
          <div>Add a note!</div>
        }
      </div>
    );
  }
  
}

export default withStyles(styles)(SidebarComponent);
