class HabitsController < ApplicationController

  def index
    render json: Habit.all
  end

end
