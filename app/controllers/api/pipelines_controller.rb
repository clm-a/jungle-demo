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
    @pipeline.update(params.require(:pipeline).permit(incoming_applications_ids: [], to_meet_applications_ids: []))
  end
end