
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import PipelineApplicationsDragDropColumn from './PipelineApplicationsDragDropColumn'

export default class Pipeline extends React.Component {

  // rails undescored attribute names are accessed by key string : data['rails_attribute_name']

  constructor(props){
    super(props)
    this.onPipelineApplicationDragDrop = this.onPipelineApplicationDragDrop.bind(this)
  }

  onPipelineApplicationDragDrop(result){
    const {destination, source, draggableId} = result

    // pre-flight
    if(!destination)
      return // not dragged into droppable
    if(destination.droppableId == source.droppableId && destination.index == source.index)
      return // moved the same place

    let updatedPipeline = JSON.parse(JSON.stringify(this.props.pipeline))

    // what pipeline application are we moving ?
    // the reference is created in the PipelineApplicationsDragDropColumn component
    const allPipelineApplications = updatedPipeline['to_meet_applications'].concat(updatedPipeline['incoming_applications'])
    // we search through pipeline applications with a reverse reference creation
    const object = allPipelineApplications.filter( application => draggableId == `pipeline_application_${application.id}` )[0]
    if(!object)
      return // application not found in current pipeline


    // access either to pipeline['incoming_applications'] or to pipeline['to_meet_applications'] with droppableId
    // (both source & dest may refer to the same list)

    const sourceList = updatedPipeline[source.droppableId]
    const destList = updatedPipeline[destination.droppableId]
    
    // remove dragged object from its current list
    sourceList.splice( source.index, 1 )
    // add object to desired list & place
    destList.splice( destination.index, 0, object )

    this.props.update(updatedPipeline)
  }

  componentDidMount(){
    this.props.fetch(this.props.pipelineSlug)
  }

  render() {
    return (
      <div>
        { ! this.props.pipeline
        ? 'Chargement en cours...'
        : (
          <div>
          <h1>{this.props.pipeline.name}</h1>
          <DragDropContext onDragEnd={ this.onPipelineApplicationDragDrop }>
            <div>
              <h2>À rencontrer</h2>
              <PipelineApplicationsDragDropColumn columnKey="incoming_applications" pipelineApplications={this.props.pipeline['incoming_applications']}/>
            </div>
            <div>
              <h2>Entretien</h2>
              <PipelineApplicationsDragDropColumn columnKey="to_meet_applications" pipelineApplications={this.props.pipeline['to_meet_applications']}/>
            </div>  
          </DragDropContext>      
          </div>
        )}
      </div>
    )
  }
}

