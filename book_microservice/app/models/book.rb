class Book < ApplicationRecord
  validates :title, presence: true
  validates :author_id, presence: true
end
