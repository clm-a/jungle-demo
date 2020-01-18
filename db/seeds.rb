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
candidate1 = Candidate.new(display_name: "Steve Jobs", bio: "Producteur de pommes").tap do |candidate|
  candidate.save!
end
candidate2 = Candidate.new(display_name: "Jean-Michel", bio: "Veut être stagiaire gestionnaire de compte").tap do |candidate|
  candidate.save!
end
candidate1.apply_to_pipeline!(pipeline)
candidate2.apply_to_pipeline!(pipeline)