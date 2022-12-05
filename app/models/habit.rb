class Habit < ApplicationRecord
  has_many :user_habits
  has_many :users, through: :user_habits

  # Prevents the name habit from being created a second time
  validates :name, uniqueness: { scope: :name, message: "should be unique. Please pick an option from the list or create a new habit" }

end
