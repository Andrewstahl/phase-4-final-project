class Log < ApplicationRecord
  belongs_to :user
  belongs_to :habit

  validates :amount, presence: true
  validates :date, presence: true
  validates :description, presence: true
end
