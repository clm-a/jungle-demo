class PipelineApplication < ApplicationRecord
  belongs_to :candidate
  belongs_to :pipeline
  enum status: ["incoming", "to_meet", "refused", "accepted"]
end
