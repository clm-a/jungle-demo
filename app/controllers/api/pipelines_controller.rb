class Api::PipelinesController < Api::ApiController

  def show
    @pipeline = Pipeline.find(params[:id])
    render json: @pipeline.as_json(include: [:incoming_applications, :to_meet_applications] )
  end
  def update
    @pipeline = Pipeline.find(params[:id])
    @pipeline.update(params.require(:pipeline).permit(incoming_applications_ids: [], to_meet_applications_ids: []))
  end
end