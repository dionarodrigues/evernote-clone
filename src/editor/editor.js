import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
  constructor() {
    super();
    this.state = {      
      title: '',
      body: '',
      id: ''
    };
    this.updateBody = this.updateBody.bind(this);
    this.update = this.update.bind(this);
  }

  getNote() {
    const { selectedNote } = this.props;
    this.setState({      
      title: selectedNote.title,
      body: selectedNote.body,
      id: selectedNote.id
    })
  }

  componentDidMount = () => {
    this.getNote();
  }

  componentDidUpdate = () => {
    if( this.props.selectedNote.id !== this.state.id ) {
      this.getNote();
    }
  }

  async updateBody( val ) {
    await this.setState({ body: val });
    this.update();
  }

  update = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.body
    })
  }, 1500)

  render() {

    const { classes } = this.props;

    return(
      <div className={classes.editorContainer}>
        <ReactQuill 
          value={this.state.body}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }
  
}

export default withStyles(styles)(EditorComponent);
