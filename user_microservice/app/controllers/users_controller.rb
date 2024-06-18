class UsersController < ApplicationController
  def verify_token
    token = request.headers['Authorization']&.split(' ')&.last

    if token
      begin
        payload = JWT.decode(token, Rails.application.secrets.secret_key_base).first
        @current_user = User.find_by(id: payload['sub'])
        render json: { message: 'Token is valid' }, status: :ok
      rescue JWT::DecodeError, ActiveRecord::RecordNotFound
        render json: { error: 'Unauthorized' }, status: :unauthorized
      end
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
end
