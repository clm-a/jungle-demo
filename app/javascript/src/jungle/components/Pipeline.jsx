
import React from 'react';
import PipelineApplication from './PipelineApplication'

export default class Pipeline extends React.Component {

  render() {

    const incomingApplications = []
    for(let application of this.props.pipeline.incoming_applications){
      incomingApplications.push(<li key={application.id}><PipelineApplication pipelineApplication={application} /></li>)
    }    
    const toMeetApplications = []
    for(let application of this.props.pipeline.to_meet_applications){
      toMeetApplications.push(<li key={application.id}><PipelineApplication pipelineApplication={application} /></li>)
    }


    return (
      <div>
        <h1>{this.props.pipeline.name}</h1>
        <div>
            <h2>À rencontrer</h2>
            <ul>{ incomingApplications }</ul>

          </div>
          <div>
            <h2>Entretien</h2>
            <ul>{ toMeetApplications }</ul>

          </div>
      
      
      </div>
    )
  }
}

