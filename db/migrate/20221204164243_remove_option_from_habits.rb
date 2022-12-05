class RemoveOptionFromHabits < ActiveRecord::Migration[7.0]
  def change
    remove_column :habits, :option
  end
end
