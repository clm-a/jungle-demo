class Api::PipelinesController < Api::ApiController

  def show
    @pipeline = Pipeline.find_by(slug: params[:id])
    render json: @pipeline.as_json(include: [incoming_applications: {include: :candidate}, to_meet_applications: {include: :candidate}] )
  end
  def update
    @pipeline = Pipeline.find_by(slug: params[:id])
    @pipeline.update(params.require(:pipeline).permit(incoming_applications_ids: [], to_meet_applications_ids: []))
  end
end