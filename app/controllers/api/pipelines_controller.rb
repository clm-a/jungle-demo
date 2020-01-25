class Api::PipelinesController < Api::ApiController
  def index
    @pipelines = Pipeline.all
    render json: @pipelines
  end
  def show
    @pipeline = Pipeline.find_by(slug: params[:id])
    render json: @pipeline.as_api_json
  end
  def update
    @pipeline = Pipeline.find_by(slug: params[:id])
    @pipeline.update(pipeline_params)
    head :no_content
  end

  def pipeline_params
    # Permit all pipeline application status columns rearranging,
    # same as .permit(incoming_applications_ids: [], to_meet_applications_ids: [], ....)
    
    permitted_hash = PipelineApplication::STATUSES.reduce({}, &->(m, status){  m["#{status}_applications_ids"] = [] ; m })
    params.require(:pipeline).permit( permitted_hash )
  end
end