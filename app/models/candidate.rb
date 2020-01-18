class Candidate < ApplicationRecord
  has_many :pipeline_applications


  def apply_to_pipeline! pipeline
    if pipeline_applications.map(&:pipeline).include?(pipeline)
      errors.add(:pipeline_applications, :duplicate) 
    else
      pipeline_applications.create(pipeline: pipeline)
    end
  end
end
