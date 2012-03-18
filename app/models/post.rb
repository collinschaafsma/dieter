class Post < ActiveRecord::Base
  extend FriendlyId
  friendly_id :title, :use => :slugged

  validates :title, :content, :user_id, :publish_at, :presence => true
  attr_accessible :title, :content, :teaser, :user_id, :publish_at, :is_draft

  default_scope :order => 'publish_at DESC'
end
