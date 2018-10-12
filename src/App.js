import React, { Component } from 'react';
import {connect} from 'react-redux';

class App extends Component {

  constructor() {
    super();
    this.state = {
      username:'',
      sort: 'created: asc'
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({username:e.target.value, savedUser:e.target.value})
  }

  onClick() {
    this.props.history.push(`/user/${this.state.username}`)
  }

  render() {

    return (
        <div className="container">
          <h1 className="text-center text-secondary">Please enter a Github username</h1>
          <div className="row">
            <div className="col-md-6 m-auto">
              <div className="input-group mb-3">
                <input
                  type="text"
                  value={this.state.username}
                  className="form-control"
                  placeholder="Github Profile Username"
                  name="username"
                  onChange={this.onChange}
                  onKeyPress={event => {
                    if (event.key === 'Enter') {
                      this.onClick(this.props.repos.count)
                    }
                  }}
                />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-info"
                      type="button"
                      id="button-addon2"
                      onClick={() => this.onClick(this.props.repos.count)}
                    >
                      Search
                    </button>
                  </div>
              </div>
            </div>
          </div>
          </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    repos: state.repos
  };
};

export default connect(mapStateToProps, null)(App);