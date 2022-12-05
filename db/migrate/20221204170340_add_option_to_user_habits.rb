class AddOptionToUserHabits < ActiveRecord::Migration[7.0]
  def change
    add_column :user_habits, :option, :string
  end
end
