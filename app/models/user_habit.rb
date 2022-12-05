class UserHabit < ApplicationRecord
  belongs_to :user
  belongs_to :habit

  validates :user_id, uniqueness: { scope: :habit_id, message: "is already chosen for this account. Please add a new habit to this list" }

  accepts_nested_attributes_for :habit

end
