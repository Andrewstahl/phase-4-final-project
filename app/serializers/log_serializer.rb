class LogSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :habit_id, :amount, :date
end
