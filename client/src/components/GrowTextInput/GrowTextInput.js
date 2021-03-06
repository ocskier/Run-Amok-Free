import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { MyContext } from "../MyContext/MyContext";

import Modal from "../Modal";

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  paper: {
    position: "relative",
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 1,
    outline: "none",
    marginTop: 0,
    paddingTop: 0,
    boxShadow: "none",
    borderRadius: "none"
  },
  button: {
    marginTop: "5px",
    left: "70%",
    bottom: "0"
  }
});

class GrowTextInput extends React.Component {
  state = {
    note: "",
    inputErr: false,
    modalOpen: false
  };

  componentWillMount() {
    this.setState({ modalOpen: false });
  }
  handleInputChange = e => {
    const { value } = e.target;
    this.setState({
      note: value,
      inputErr: false
    });
  };

  showErr = () => {
    this.setState({ inputErr: true });
  };

  render() {
    const { closeInput, classes, checked, bev } = this.props;
    return (
      <MyContext.Consumer>
        {context => {
          const handleClose = () => {
            this.setState({ open: false });
            closeInput();
          };
          const handleNoteInput = (e, beverageName) => {
            context.postNote(e, beverageName, this.state.note);
            this.setState({ modalOpen: true });
          };

          const myTextBox = (
            <Paper elevation={4} className={classes.paper}>
              <TextField
                autoFocus
                id="outlined-multiline-static"
                label="Note"
                multiline
                rows="8"
                style={{ width: "85%" }}
                defaultValue=""
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={this.handleInputChange}
                error={this.state.inputErr ? true : false}
              />
              <Button
                onClick={
                  this.state.note.trim()
                    ? e => handleNoteInput(e, bev.name)
                    : this.showErr
                }
                className={classes.button}
              >
                Submit
              </Button>
              <Modal
                open={this.state.modalOpen}
                close={handleClose}
                bev={bev}
                note={this.state.note}
              />
            </Paper>
          );

          return (
            /* Conditionally applies the timeout property to change the entry speed. */
            <Grow
              in={checked}
              style={{ transformOrigin: "0 0 0" }}
              {...(checked ? { timeout: 600 } : {})}
            >
              {myTextBox}
            </Grow>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

GrowTextInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(GrowTextInput);
