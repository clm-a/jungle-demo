class PipelineChannel < ApplicationCable::Channel
  def subscribed
    @pipeline = Pipeline.find_by(slug: params[:id])
    stream_for @pipeline
    transmit message: 'update', pipeline: @pipeline.as_api_json
  end
end
