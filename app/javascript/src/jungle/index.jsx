
import React from 'react'
import Pipeline from './components/Pipeline'


export default class Jungle extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      pipeline: null    
    }

  }
  componentDidMount(){
    fetch('/api/pipelines/stage-account-manager')
      .then(response => response.json())
      .then(data => { console.log(data); this.setState({ pipeline: data })});
  }
  render() {
    let pipeline = this.state.pipeline ? <Pipeline pipeline={this.state.pipeline} /> : 'Chargement en cours'
    return <div>{pipeline}</div>;
  }
}
