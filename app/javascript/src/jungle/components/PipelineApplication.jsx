
import React from 'react';

export default class PipelineApplication extends React.Component {

  render() {
    const candidate = this.props.pipelineApplication.candidate;
    return <div><h3>{candidate.display_name }</h3><p>{candidate.bio }</p></div>
  }
}

