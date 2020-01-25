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
    // Store reference to pipeline before update, in order to revert if something go wrong
    const pipelineWas = this.component.state.currentPipeline
    this.component.setState({currentPipeline: pipeline})

    // Build update request params giving pipeline applications ids for each column
    const params = { pipeline: {} }
    this.component.columns.forEach( column => {
      params.pipeline[`${column.key}_ids`] = pipeline[column.key].map( application => application.id )
    })

    // Update request
    fetch(`/api/pipelines/${pipeline.slug}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    }).then( response => {
      if(!response.ok) {
        // If something went wrong, notify & revert to data previous state
        alert('An error occured during the update, please try again.') ;
        this.component.setState({currentPipeline: pipelineWas}) 
      }
    })
  }
}