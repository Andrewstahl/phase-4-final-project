class HabitsController < ApplicationController

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # GET /habits
  def index
    render json: Habit.all
  end

  # POST /habits
  def create
    @habit = Habit.create!(habit_params)
    render json: @habit, status: :created
  end

  # PATCH/PUT /habits/:id
  def update
    @habit = Habit.find(params[:id])
    @habit.update!(habit_params)
    render json: @habit
  end
  
  def destroy
    @habit = Habit.find(params[:id])
    @habit.destroy
    head :no_content
  end

  private

  def habit_params
    params.permit(:name)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
