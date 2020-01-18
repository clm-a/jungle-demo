class AddIndexOnPipelineSlug < ActiveRecord::Migration[6.0]
  def change
    add_index :pipelines, :slug, unique: true
  end
end
