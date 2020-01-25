
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
    
    // we search through all pipeline applications
    const allPipelineApplications = [].concat(...this.props.columns.map((column)=> updatedPipeline[column.key] ))
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
    // On composant mount, subscribe to cable and fetch pipeline based on slug (given by router)
    this.props.fetch(this.props.pipelineSlug)
  }

  render() {
    return (
      <div style={ {height: '100vh', maxHeight: '500px' } }>
        { ! this.props.pipeline
        ? 'Chargement en cours...'
        : (
          <div className="h-full flex flex-col">
          <h1 className="py-2 bg-welcome-dark-blue text-white font-extrabold">
            {this.props.pipeline.name}
          </h1>
          <DragDropContext onDragEnd={ this.onPipelineApplicationDragDrop }>
            <div className="flex-1 flex flex-row flex-no-wrap w-full bg-light-gray">
              { this.props.columns.map( column => {
                  return (
                  <div key={`column-${column.key}`} className="flex flex-col bg-near-white rounded-sm border-2 border-gray-300 m-2" style={{width: '350px'}}>
                    <h2 className="p-2 flex items-center uppercase font-extrabold border-b border-gray-300">
                      {column.label}
                      <span className="ml-2 rounded-full w-5 h-5 text-sm text-center text-gray-700 bg-gray-300">
                      <span>{this.props.pipeline[column.key].length}</span>
                      </span>
                    </h2>
                    <PipelineApplicationsDragDropColumn columnKey={column.key} pipelineApplications={this.props.pipeline[column.key]}/>
                  </div>
                )})
              }
            </div>
          </DragDropContext>      
          </div>
        )}
      </div>
    )
  }
}

