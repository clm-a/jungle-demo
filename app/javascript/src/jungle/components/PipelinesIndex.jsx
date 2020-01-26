import React from 'react'
import {
  Link
} from "react-router-dom";
export default class PipelinesIndex extends React.Component {
  render() {    
    return (

      <div className="p-2">
      <h2 className="font-extrabold">Liste des Pipelines</h2>
      <ul className="list-inside list-disc">
        {this.props.pipelines.length == 0
          ? 'Chargement en cours...'
          : this.props.pipelines.map( pipeline => (
            <li key={`pipeline-${pipeline.id}`} ><Link to={`/pipelines/${pipeline.slug}`}>{pipeline.name}</Link></li>
          )
        )}
      </ul>      

      </div>
       
    )
  }
}
