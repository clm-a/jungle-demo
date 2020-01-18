
import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import PipelineApplicationsDragDropColumn from './PipelineApplicationsDragDropColumn'

export default class Pipeline extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <h1>{this.props.pipeline.name}</h1>
        <DragDropContext onDragEnd={this.props.onItemChangeFromDragDrop}>
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
    )
  }
}

