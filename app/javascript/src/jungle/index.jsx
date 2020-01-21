
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { PipelineDataSync as DataSync } from './utils/PipelineDataSync'
import Pipeline from './components/Pipeline'

export default class Jungle extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pipelines: [],
      currentPipeline: null,
    }
    
    this.dataSync = new DataSync(this)
    
  }

  componentDidMount(){
    this.dataSync.fetchAll()
  }

  render() {    
    return (
      <Router>
        <div>
          <Link to="/">Home</Link>
        </div>
        <Switch  onChange={this.yourHandler}>
          <Route onChange={this.yourHandler} exact path="/">
            <h2>Liste des Pipelines</h2>
            {this.state.pipelines.size == 0
              ? 'Chargement en cours'
              : this.state.pipelines.map( pipeline => (
                <Link key={`pipeline-${pipeline.id}`} to={`/pipelines/${pipeline.slug}`}>{pipeline.name}</Link>
              )
            )}
          </Route>
          <Route path={'/pipelines/:slug'}>{
            (routeProps) => {
              return (
                <Pipeline pipelineSlug={routeProps.match.params.slug} pipeline={this.state.currentPipeline} update={this.dataSync.update} fetch={this.dataSync.setupCable} />
              )
            }
          }
          
          </Route>
        </Switch>      
      </Router>);
  }
}
