class CreatePipelineApplications < ActiveRecord::Migration[6.0]
  def change
    create_table :pipeline_applications do |t|
      t.references :candidate, null: false, foreign_key: true
      t.references :pipeline, null: false, foreign_key: true
      t.integer :status, null: false, default: 0, index: true
      t.timestamps
    end
  end
end
