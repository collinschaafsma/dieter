class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.text :teaser
      t.integer :user_id
      t.string :slug
      t.datetime :publish_at
      t.boolean :is_draft, :default => true

      t.timestamps
    end
    add_index :posts, :slug, unique: true
  end
end
