import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { PipelineDataSync as DataSync } from './utils/PipelineDataSync'
import Pipeline from './components/Pipeline'
import PipelinesIndex from './components/PipelinesIndex'

export default class Jungle extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pipelines: [],
      currentPipeline: null,
    }
    this.columns = [{key: 'incoming_applications', label: 'À rencontrer'}, {key: 'to_meet_applications', label: 'Entretien'},
                    {key: 'accepted_applications', label: 'Accepté'}, {key: 'rejected_applications', label: 'Refusé'}]
    
    this.dataSync = new DataSync(this)
    
  }

  componentDidMount(){
    this.dataSync.fetchAll()
  }

  render() {    
    return (

      <Router>
        <div className="bg-welcome-green text-white p-2">
          <Link to="/">Home</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <PipelinesIndex pipelines={this.state.pipelines}/>
          </Route>
          <Route path={'/pipelines/:slug'}>
            { (routeProps) => {
              return (
                <Pipeline columns={this.columns}
                  pipelineSlug={routeProps.match.params.slug} pipeline={this.state.currentPipeline} update={this.dataSync.update} fetch={this.dataSync.setupCable} />
              
              )
            } }          
          </Route>
        </Switch>      
      </Router>
    )
  }
}
