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
    this.newNoteBtnClick = this.newNoteBtnClick.bind(this);
    this.uptadeTitle = this.uptadeTitle.bind(this);
    this.newNote = this.newNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  newNoteBtnClick() {
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

  newNote() {
    console.log(this.state)
  }

  selectNote() {
    console.log('Select note')
  }

  deleteNote() {
    console.log('DELETED')     
  }

  render() {

    const { notes, classes, selectedNoteIndex } = this.props;

    return(
      <div className={classes.sidebarContainer}>
        <Button
          onClick={this.newNoteBtnClick}
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
              onClick={this.newNote}
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
                      selectNote={this.selectNote}
                      deleteNote={this.deleteNote} />
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
