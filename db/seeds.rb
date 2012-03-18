# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

20.times do |index|
  Post.create(title: "Title #{index}", content: "Content #{index}",
             user_id: 1, publish_at: Time.new, teaser: "Teaser #{index}")
end
