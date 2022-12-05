class UserHabitsController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # GET /user_habits
  def index
    render json: UserHabit.all, include: {habit: { only: [:name] }} 
  end

  # GET /user_habits/:user_id
  def show
    user = User.find(session[:user_id])
    if user
      render json: user #, each_serializer: NestedHabitSerializer
    else
      render json: { error: "Unauthorized User" }, status: unauthorized
    end
  end
  
  # POST /user_habits
  def create
    user = User.find(session[:user_id])
    if user
      user_habit = UserHabit.create!({
        user_id: user.id,
        habit_id: user_habits_params[:habit_id],
        option: user_habits_params[:option],
        amount: user_habits_params[:amount],
        frequency: user_habits_params[:frequency]
      })
      render json: user_habit, include: {habit: { only: [:name] }}
    else
      user_habit = UserHabit.create!(user_habits_params)
      render json: user_habit, include: habits
    end
  end
  
  # PATCH/PUT /user_habits/:id
  def update
    user = User.find(session[:user_id])
    if user
      user_habit = UserHabit.find(params[:id])
      user_habit.update(user_habits_params)
      render json: user_habit
    end
  end

  # DELETE /user_habits/:id
  def destroy
    user_habit = UserHabit.find(params[:id])
    user_habit.destroy
    head :no_content
  end

  private

  def user_habits_params
    params.permit(:user_id, :habit_id, :option, :amount, :frequency)
  end

  def render_unprocessable_entity(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
