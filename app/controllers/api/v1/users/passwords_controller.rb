module Api
  module V1::Users
    class PasswordsController < ApplicationController
      def update
        # update user password
        create_session = User.find_by(email: params[:email])
        user = User.find(params[:id])
        if create_session.present? && create_session.authenticate(params[:current_password]) && params[:password]
          user.update(password: params[:password], password_confirmation: params[:password_confirmation])
          render json: { success: 'Successfully updated password', password_updated: true } if user.save
        else
          render json: { error: 'Please add a valid passwond.' }
        end
      end

      def request_reset_password_user
        user = User.find_by(email: params[:email])
        if user
          payload = { user_email: user.email, exp: Time.now.to_i + 900 }
          token = JWT.encode(payload, 'secret')
          user.update(reset_password_token: token)
          PasswordMailer.with(user: user, token: token).reset.deliver_later

          render json: { success: true, jwt: token }
        else
          render json: { failure: true, token_error: 'Authentication Failed :(',
                         error: 'Sorry, this user with this email does not exist, please check the email or create an account.' }
        end
      end

      def check_user_reset_token
        begin
          decode_token = JWT.decode(params[:token], 'secret', algorithm: 'HS256')
          user = User.find_by(email: decode_token[0]['user_email'])
          if user.present?
            render json: { success: true, decode_token: decode_token[0]['user_email'], decode_token_expire_date: Time.at(decode_token[0]['exp']).strftime("%I:%M %p") }
          end
        rescue JWT::ExpiredSignature
          render json: { failure: true, error: 'This token had expired, please request new to reset your password.' }
        end
      end

      def reset_password_user
        begin
          decode_token = JWT.decode(params[:token], 'secret', algorithm: 'HS256')
          user = User.find_by(email: decode_token[0]['user_email'])
          if user.present?
            user.update(password: params[:password], password_confirmation: params[:password_confirmation])
            render json: { success: true, message: 'Password was successfully changed.', user: user, decode_token: decode_token[0]['user_email'],
                           decode_token_expire_date: Time.at(decode_token[0]['exp']).strftime("%I:%M %p") }
          end
        rescue JWT::ExpiredSignature
          render json: { failure: true, error: 'This token had expired, please request new to reset your password.' }
        end
      end

      private

      def password_params
        params.require(:password).permit(:password, :password_confirmation)
      end
    end
  end
end
