class Pipeline < ApplicationRecord
  validates :slug, uniqueness: true
  has_many :pipeline_applications
  has_many :incoming_applications, -> { where(status: :incoming) }, class_name: 'PipelineApplication'
  has_many :to_meet_applications,   -> { where(status: :to_meet) }, class_name: 'PipelineApplication'
  
  def incoming_applications_ids= ids
    pipeline_applications.where(id: ids).update_all(status: :incoming)
  end
  def to_meet_applications_ids= ids
    pipeline_applications.where(id: ids).update_all(status: :to_meet)
  end
end
