class UserHabit < ApplicationRecord
  belongs_to :user
  belongs_to :habit

  accepts_nested_attributes_for :habit

end
