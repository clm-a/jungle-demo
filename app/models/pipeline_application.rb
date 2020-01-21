class PipelineApplication < ApplicationRecord
  belongs_to :candidate
  belongs_to :pipeline
  enum status: ["incoming", "to_meet", "refused", "accepted"]
  after_create do
    PipelineChannel.broadcast_to pipeline, message: "update", pipeline: pipeline.as_api_json
  end
end
