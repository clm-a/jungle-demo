# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

pipeline = Pipeline.new(name: "Stage - Account Manager", slug: 'stage-account-manager').tap do |pipeline|
  pipeline.save! 
end
candidate = Candidate.new(display_name: "Steve Jobs", bio: "Producteur de pommes").tap do |candidate|
  candidate.save!
end
candidate.apply_to_pipeline!(pipeline)