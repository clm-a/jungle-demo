class ChangePriorityDefaultsToZero < ActiveRecord::Migration[6.0]
  def change
    change_column :pipeline_applications, :priority, :integer, default: 0
  end
end
