class LogSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :amount, :date, :description
  # belongs_to :user
  belongs_to :habit
end
