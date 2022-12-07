class User < ApplicationRecord
  has_many :user_habits, dependent: :destroy
  has_many :habits, through: :user_habits
  has_many :logs, dependent: :destroy

  has_secure_password

  validates :username, presence: true
  validates :username, uniqueness: true
end
