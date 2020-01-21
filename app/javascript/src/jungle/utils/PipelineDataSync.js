import { createConsumer } from "@rails/actioncable"

export class PipelineDataSync {
  constructor( component ){
    this.component = component
    this.cableSubscription = null

    this.update = this.update.bind(this)
    this.setupCable = this.setupCable.bind(this)
  }

  setupCable(pipelineSlug){
    if(this.cableSubscription)
      this.cableSubscription.unsubscribe()
    // Initialize cable remote descending updates. Subscription fires update as well so we get initial data.
    
    const cableMessageReceiveHandler = (data) => {
      if(data.message == 'update'){
        this.component.setState({currentPipeline: data.pipeline})
      }
    }

    this.cableSubscription = createConsumer().subscriptions.create({channel: 'PipelineChannel', id: pipelineSlug}, {
      received: cableMessageReceiveHandler
    })
  }

  fetchAll(){
    fetch('/api/pipelines')
    .then(data => data.json())
    .then(data => this.component.setState({pipelines: data}))
  }
  
  update(pipeline){
    const pipelineWas = this.component.state.currentPipeline
    this.component.setState({currentPipeline: pipeline})

    const params = {
      pipeline: {
        incoming_applications_ids: pipeline['incoming_applications'].map( application => application.id),
        to_meet_applications_ids: pipeline['to_meet_applications'].map( application => application.id)
      }
    }
    fetch(`/api/pipelines/${pipeline.slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then( response => { if(!response.ok) { alert('An error occured during the update, please try again.') ; this.component.setState({currentPipeline: pipelineWas}) }})
  }
}