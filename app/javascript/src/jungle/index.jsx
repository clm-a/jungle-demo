
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Pipeline from './components/Pipeline'

export default class Jungle extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pipelines: []
    }
  }
  componentDidMount(){
    fetch('/api/pipelines')
    .then(data => data.json())
    .then(data => this.setState({pipelines: data}))
  }

  render() {    
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <h2>Liste des Pipelines</h2>
            {this.state.pipelines.size == 0
              ? 'Chargement en cours'
              : this.state.pipelines.map( pipeline => (
                <Link key={`pipeline-${pipeline.id}`} to={`/pipelines/${pipeline.slug}`}>{pipeline.name}</Link>
              )
            )}
          </Route>
          <Route path={'/pipelines/:slug'} component={Pipeline} />
        </Switch>      
      </Router>);
  }
}
