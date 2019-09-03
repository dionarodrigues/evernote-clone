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
    
    this.updateNote = this.updateNote.bind(this);
    this.updateBody = this.updateBody.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
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
    if (this.props.selectedNote.id !== this.state.id) {
      this.getNote();
    }
  }

  async updateBody(content) {
    await this.setState({ body: content });
    this.updateNote();
  }  

  async updateTitle(title) {
    await this.setState({ title: title });
    this.updateNote();
  }

  updateNote = debounce(() => {
    this.props.noteUpdate(this.state.id, {
      title: this.state.title,
      body: this.state.body
    })
  }, 1500);

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.editorContainer}>
        <input
          className={classes.titleInput}
          placeholder='Note title...'
          value={this.state.title ? this.state.title : ''}
          onChange={(e) => this.updateTitle(e.target.value)}>
        </input>
        <ReactQuill
          value={this.state.body}
          onChange={this.updateBody}
        ></ReactQuill>
      </div>
    );
  }

}

export default withStyles(styles)(EditorComponent);
