class CreateCandidates < ActiveRecord::Migration[6.0]
  def change
    create_table :candidates do |t|
      t.string :display_name
      t.string :bio
      t.string :avatar_url

      t.timestamps
    end
  end
end
