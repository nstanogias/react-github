import React, {Component} from 'react';
import {connect} from 'react-redux';
import {clearState, fetchRepos} from "./store/reposActionCreator";

class User extends Component {

  constructor() {
    super();
    this.state = {
      username:'',
      sort: 'created: asc'
    };
  }

  componentWillMount() {
      const data = {
        user: this.props.match.params.username,
        count: this.props.repos.count,
        sort: this.state.sort
      };
      this.props.fetchRepos(data);
  }

  componentWillUnmount() {
    this.props.clearState();
  }

  onClick(count) {
    const data = {
      user: this.props.match.params.username,
      count: count,
      sort: this.state.sort
    };
    this.props.fetchRepos(data);
  }

  render() {

    const success = this.props.repos.success;
    let repoContent = null;
    let size = 0;
    if(success) {
      console.log(this.props.repos.repos);
      size = this.props.repos.repos[0].length;
      repoContent = this.props.repos.repos[0].map(repo => (
        <div key={repo.id} className="card card-body mb-2">
          <div className="row">
            <div className="col-md-6">
              <h4><a href={repo.html_url} className="text-info" >{repo.name}</a></h4>
              <p>{repo.description}</p>
            </div>
            <div className="col-md-6">
              <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
              <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
              <span className="badge badge-success">Forks: {repo.forks_count} </span>
            </div>
          </div>
        </div>
      ))
    }

    return (
      <div className="container">
        {this.props.repos.success &&
        <div>
          <h1 className="text-center mt-5 text-info">Latest Repositories of {this.props.repos.username}</h1>
          {repoContent}
        </div>
        }
        {this.props.repos.requestFailed  &&
        <div>
          <h1 className="text-center mt-5 text-danger">Something went wrong. Please insert a valid username.</h1>
        </div>
        }
        {size > 0 && size === this.props.repos.count ?
          <div className="mt-5">
            <button className="btn btn-outline-info" onClick={() => this.onClick(this.props.repos.count+20)}>Load More</button>
          </div>
          :null
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    repos: state.repos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchRepos: (data) => dispatch(fetchRepos(data)),
    clearState: () => dispatch(clearState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);

