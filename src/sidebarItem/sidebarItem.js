import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import { removeHTMLTags } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class SidebarItemComponent extends Component {
  constructor() {
    super();
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleSelect() {
    this.props.selectNote(this.props_note, this.props_index)
  }

  handleDelete() {
    if(window.confirm(`Are you sure you want to delete: ${this.props._note.title}`)) {
      this.props.deleteNote(this.props._note)
    }  
  }

  render() {

    const { classes, _note, _index, selectedNoteIndex, selectNote, deleteNote } = this.props;

    return (
      <div key={_index}>
        <ListItem
          className={classes.listItem}
          selected={ selectedNoteIndex === _index }
          alignItems='flex-start'>
          <div 
            className={classes.textSection}
            onClick={this.handleSelect}>
              <ListItemText
                primary={_note.title}
                secondary={removeHTMLTags(_note.body.substring(0, 30)) + '...'} />
          </div>
          <Button onClick={this.handleDelete}
            className={classes.deleteIcon}>Delete</Button>
        </ListItem>
      </div>
    );
  }
}

export default withStyles(styles)(SidebarItemComponent);
