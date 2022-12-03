class UserHabitsController < ApplicationController

  def index
    render json: UserHabit.all
  end

  def show
    user = User.find(session[:user_id])
    if user
      render json: user, include: habits
    else
      render json: { error: "Unauthorized User" }, status: unauthorized
    end
  end

end
