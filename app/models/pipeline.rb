class Pipeline < ApplicationRecord
  validates :slug, uniqueness: true
  has_many :pipeline_applications

  # Manage column for each status :
  PipelineApplication::STATUSES.each do |status|
    
    # Access applications for each status column
    has_many :"#{status}_applications", -> { where(status: status).order('priority ASC') }, class_name: 'PipelineApplication'

    # Rearrange pipeline applications on columns based on applications ids list
    define_method "#{status}_applications_ids=" do |ids|
      ids.each_with_index do |id, index|
        pipeline_applications.where(id: id).update(status: status, priority: index)
      end
    end
  end
  

  def as_api_json
    # Build json with all status columns, same as as_json([incoming_applications: {include: :candidate}, to_meet_applications: {...}, ...])
    includes_hash =  PipelineApplication::STATUSES.map(&->(status) { {"#{status}_applications": {include: :candidate} } }   )
    as_json( include: includes_hash)
  end

  after_save do
    # Sync clients
    PipelineChannel.broadcast_to self, message: "update", pipeline: self.as_api_json
  end
end
