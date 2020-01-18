class AddPriorityToPipelineApplications < ActiveRecord::Migration[6.0]
  def change
    add_column :pipeline_applications, :priority, :integer
  end
end
