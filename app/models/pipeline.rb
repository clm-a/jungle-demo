class Pipeline < ApplicationRecord
  validates :slug, uniqueness: true
  has_many :pipeline_applications
  has_many :incoming_applications, -> { where(status: :incoming).order('priority ASC') }, class_name: 'PipelineApplication'
  has_many :to_meet_applications,   -> { where(status: :to_meet).order('priority ASC') }, class_name: 'PipelineApplication'
  
  def incoming_applications_ids= ids
    ids.each_with_index do |id, index|
      pipeline_applications.where(id: id).update(status: :incoming, priority: index)
    end
  end
  def to_meet_applications_ids= ids
    ids.each_with_index do |id, index|
      pipeline_applications.where(id: id).update(status: :to_meet, priority: index)
    end
  end
end
