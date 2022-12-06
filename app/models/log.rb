class Log < ApplicationRecord
  belongs_to :user
  belongs_to :habit

  validates :amount, presence: true
  validates :date, presence: true
  validates :description, presence: true

  accepts_nested_attributes_for :habit
  
end
