
import React from 'react'
import Pipeline from './components/Pipeline'
import { checkPropTypes } from 'prop-types'


export default class Jungle extends React.Component {

  // rails undescored attribute names are accessed by key string : data['rails_attribute_name']

  constructor(props){
    super(props)
  
    this.state = {
      pipeline: null    
    }
  
    this.onItemChangeFromDragDrop = this.onItemChangeFromDragDrop.bind(this)
    this.remoteUpdate = this.remoteUpdate.bind(this)
  }

  onItemChangeFromDragDrop(result){
    const {destination, source, draggableId} = result

    // pre-flight
    if(!destination)
      return // not dragged into droppable
    if(destination.droppableId == source.droppableId && destination.index == source.index)
      return // moved the same place
    
    // what pipeline application are we moving ?
    // the reference is created in the PipelineApplicationsDragDropColumn component
    const allPipelineApplications = this.state.pipeline['to_meet_applications'].concat(this.state.pipeline['incoming_applications'])
    // we search through pipeline applications with a reverse reference creation
    const object = allPipelineApplications.filter( application => draggableId == `pipeline_application_${application.id}` )[0]
    if(!object)
      return // application not found in current pipeline

    // access either to this.state.pipeline['incoming_applications'] or to this.state.pipeline['to_meet_applications']
    // (both source & dest may refer to the same list)
    const sourceList = this.state.pipeline[source.droppableId]
    const destList = this.state.pipeline[destination.droppableId]
    
    // remove dragged object from its current list
    sourceList.splice( source.index, 1 )
    // add object to desired list & place
    destList.splice( destination.index, 0, object )
    this.remoteUpdate()
  }

  remoteUpdate(){
    let params = { pipeline: {
        incoming_applications_ids: this.state.pipeline['incoming_applications'].map( application => application.id ),
        to_meet_applications_ids: this.state.pipeline['to_meet_applications'].map( application => application.id )
      }
    }
    fetch('/api/pipelines/stage-account-manager', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then( response => { if(!response.ok) alert('error') })
  }

  componentDidMount(){
    fetch('/api/pipelines/stage-account-manager')
      .then(response => response.json())
      .then(data => { this.setState({ pipeline: data }) });
  }

  render() {
    let firstLoad = this.state.pipeline
      ? <Pipeline pipeline={this.state.pipeline} onItemChangeFromDragDrop={this.onItemChangeFromDragDrop}/> 
      : 'Chargement en cours'

    return <div>{ firstLoad }</div>;
  }
}
