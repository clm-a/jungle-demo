
import React from 'react'
import PipelineApplication from './PipelineApplication'
import { Draggable, Droppable } from 'react-beautiful-dnd'

export default class PipelineApplicationsDragDropColumn extends React.Component {
  render() {
    return (
      <Droppable droppableId={ this.props.columnKey }>
        { provided => (
          <ul ref={ provided.innerRef } {...provided.droppableProps}
            className="p-2" style={{minHeight: '500px'}}>
            { this.props.pipelineApplications.map( (application, index) => {
                const identifier = `pipeline_application_${application.id.toString()}`
                return (
                  <Draggable key={ identifier } draggableId={ identifier } index={ index }>
                    { provided => (
                      <li ref={ provided.innerRef } {...provided.dragHandleProps} {...provided.draggableProps}
                        className="mb-2" >
                        <PipelineApplication pipelineApplication={application}></PipelineApplication>
                      </li>
                    )}
                  </Draggable>
                )
              })              
            }
            {provided.placeholder}
          </ul>
          )
        }
      </Droppable>
    )
  }
}