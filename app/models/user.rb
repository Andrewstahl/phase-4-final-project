class User < ApplicationRecord
  has_many :user_habits
  has_many :habits, through: :user_habits

  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true
  validates :password, presence: true
end
