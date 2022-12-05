class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  skip_before_action :authorized, only: :create
  
  # GET /users
  def index
    render json: User.all
  end
  
  # POST /users
  def create
    @user = User.create!(user_params)
    session[:user_id] = @user.id
    render json: @user, status: :created
  end
  
  # GET /me
  def show
    @user = User.find(session[:user_id])
    render json: @user, includes: :user_habits
  end
  
  # PATCH/PUT /me
  def update
    user = User.find(session[:user_id])
    user.update!(user_params)
    render json: user
    # if @user
    #   @user.update!(user_params)
    #   render json: @user
    # else
    #   render_unauthorized_user_response
    # end
  end

  # DELETE /me
  def destroy
    @user = current_user
    @user.destroy
    head :no_content
  end
    
  private
  
  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
  
  # def current_user
  #   @user = User.find(session[:user_id])
  # end
  
  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  
  def render_unauthorized_user_response
    render json: { error: "Unauthorized User" }, status: unauthorized
  end

end
