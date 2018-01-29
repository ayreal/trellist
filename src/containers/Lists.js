import React, { Component } from "react";
import { connect } from "react-redux";
import withAuth from "../hocs/withAuth";
import * as actions from "../actions";
import Button from "material-ui/Button";

// import * as actions from "../actions";

class Lists extends Component {
  state = {
    selectedList: {}
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  handleSelect = list => {
    this.setState({
      selectedList: list
    });
  };

  renderLists = () => {
    return this.props.lists.map(list => (
      <li onClick={() => this.handleSelect(list)}>{list.name}</li>
    ));
  };

  renderItems = () => {
    const { selectedList } = this.state;
    return <ul>{selectedList.items.map(item => <li>{item.name}</li>)}</ul>;
  };

  renderSelectedList = () => {
    const { selectedList } = this.state;
    return (
      <div>
        <h3>{selectedList.name}</h3>
        {selectedList.items.length > 0 ? this.renderItems() : null}
      </div>
    );
  };

  render() {
    console.log("%c >> Inside Lists \n", "color: #bada55");
    // console.log("USER ID: ", this.props.userId);
    // console.log("LOGGED IN: ", this.props.loggedIn);
    console.log("PROPS: ", this.props);
    console.log("STATE: ", this.state);
    console.log("---------------------");

    return (
      <div className="lists">
        <h1>This is the lists page</h1>
        <Button onClick={this.handleLogout}>Logout</Button>
        <ul>{this.renderLists()}</ul>

        <h2>Selected List</h2>
        {this.state.selectedList.id
          ? this.renderSelectedList()
          : "No list selected"}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

export default withAuth(connect(mapStateToProps, actions)(Lists));

// export default withAuth(Lists);
// export default connect(null, actions)(Lists);
