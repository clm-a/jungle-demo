class PipelineApplication < ApplicationRecord
  belongs_to :candidate
  belongs_to :pipeline

  STATUSES = ["incoming", "to_meet", "rejected", "accepted"]
  enum status: STATUSES

  after_create do
    PipelineChannel.broadcast_to pipeline, message: "update", pipeline: pipeline.as_api_json
  end
end
