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
  }

  newNoteBtnClick() {
    this.setState({
      title: null,
      addingNote: !this.state.addingNote
    })
  }

  uptadeTitle(txt) {
    console.log(txt)
    this.setState({
      title: txt
    })
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
              onKeyUp={(e) => this.uptadeTitle(e.target.value)}
            />
          </div>
        }

        {/* <SidebarItemComponent /> */}
      </div>
    );
  }
}

export default withStyles(styles)(SidebarComponent);
