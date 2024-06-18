class Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_user!

  respond_to :json

  def create
    user = User.new(sign_up_params)
    if user.save
      render json: { message: 'User registered successfully', user: user }, status: :created
    else
      render json: { error: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :name, :bio)
  end
end
