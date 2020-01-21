
import React from 'react';

export default class PipelineApplication extends React.Component {

  render() {
    const candidate = this.props.pipelineApplication.candidate;
    return (
      <div className="p-2 bg-white rounded-sm border border-gray-300">
        <h3>{ candidate['display_name'] }</h3>
        <p className="mt-1 text-gray-600 leading-none">{ candidate['bio'] }</p>
      </div>
    )
  }
}

