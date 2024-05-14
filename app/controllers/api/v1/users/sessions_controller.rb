module Api
  module V1::Users
    class SessionsController < ApplicationController

      def create
        create_session = User.find_by(email: params[:email])
        user = User.specific_user_data.find_by(email: params[:email])
        # finds existing user, checks to see if user can be authenticated
        if create_session.present? && create_session.authenticate(params[:password])
          # sets up user.id sessions
          session[:user_id] = create_session.id
          payload = { user_id: user.id }
          token = JWT.encode(payload, 'secret')

          render json: {
            success: 'Successfully logged in.',
            user: user,
            session: session,
            token: token,
            user_signed_in: true
          }
        else
          render json: { error: 'Invalid email or password.' }
        end
      end

      def destroy
        # deletes user session
        session[:user_id] = nil
        render json: { success: 'Successfully logged out' }
      end
    end
  end
end