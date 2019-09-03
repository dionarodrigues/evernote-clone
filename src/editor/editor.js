import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class EditorComponent extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };
    this.updateBody = this.updateBody.bind(this);
    this.update = this.update.bind(this);
  }

  async updateBody( val ) {
    console.log('Typing');
    await this.setState({ text: val });
    this.update();
  }

  update = debounce(() => {
    console.log('Updatind Database')
    // Come back later
  }, 1500)

  getNote() {
    const { selectedNote } = this.props;
    this.setState({
      text: selectedNote.body,
      title: selectedNote.title,
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

  render() {

    const { classes } = this.props;

    return(
      <div className={classes.editorContainer}>
        <ReactQuill 
          value={this.state.text}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }
  
}

export default withStyles(styles)(EditorComponent);
