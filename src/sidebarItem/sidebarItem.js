import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { removeHTMLTags } from '../helpers';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

class SidebarItemComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return(
      <div>
        sidebar item component
      </div>
    );
  }
}

export default withStyles(styles)(SidebarItemComponent);
