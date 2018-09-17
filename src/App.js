import React, { Component } from 'react';

class App extends Component {

  constructor() {
    super();
    this.state = {
      username:'',
      savedUser:'',
      clientId: '847877e968e6b2425b32',
      clientSecret: '32d637706cb51313a99adeee981c8b6f54c381b0',
      count: 20,
      sort: 'created: asc',
      repos: [],
      requestFailed: false,
      success: false,
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({username:e.target.value, savedUser:e.target.value})
  }

  onClick(count) {
    const { sort, clientId, clientSecret } = this.state;
    fetch(
      `https://api.github.com/users/${this.state.savedUser}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then((response) => {
        if(response.status === 200) {
         console.log("SUCCESS");
          return response.json()
        }
        else if(!response.ok){
          console.log("SOMETHING WENT WRONG");
          throw new Error(response.status);
        }
      })
      .then(data => {
          this.setState({ repos: data, username:'', success:true, requestFailed: false, count:count});
      })
      .catch(err => {
        console.log(err);
        this.setState({ requestFailed: true, username:'', savedUser:'', success:false, count:20})
      });
  }

  render() {

    const{success} = this.state;
    let repoContent = null;
    let size = 0;
    if(success) {
      size = this.state.repos.length;
      repoContent = this.state.repos.map(repo => (
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
                />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-info"
                      type="button"
                      id="button-addon2"
                      onClick={() => this.onClick(this.state.count)}
                    >
                      Search
                    </button>
                  </div>
              </div>
            </div>
          </div>
            {this.state.success &&
              <div>
                <h1 className="text-center mt-5 text-info">Latest Repositories</h1>
                {repoContent}
                </div>
            }
            {this.state.requestFailed  &&
            <div>
              <h1 className="text-center mt-5 text-danger">Something went wrong. Please insert a valid username.</h1>
            </div>
            }
            {size > 0 && size === this.state.count ?
              <div className="mt-5">
                <button className="btn btn-outline-info" onClick={() => this.onClick(this.state.count+20)}>Load More</button>
              </div>
              :null
            }
          </div>
    );
  }
}

export default App;