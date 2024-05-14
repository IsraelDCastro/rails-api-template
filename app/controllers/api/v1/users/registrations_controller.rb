module Api
  module V1::Users
    class RegistrationsController < ApplicationController
      def create
        create_user = User.new(user_params)

        if create_user.save
          user = User.specific_user_data.find(create_user.id)
          session[:user_id] = user.id
          payload = { user_id: user.id }
          token = JWT.encode(payload, 'secret')
          render json: {
            success: 'Successfully created account',
            user_created: true,
            session: session,
            token: token,
            user: user
          }
        else
          render json: create_user.errors.full_messages
        end
      end

      def update
        user = User.find(params[:id])

        if user.update(user_params)
          updated_user = User.specific_user_data.find(user.id)
          session[:user_id] = user.id

          render json: {
            success: 'The account had been updated.',
            user_created: true,
            session: session,
            user: updated_user
          }
        else
          render json: user.errors.full_messages
        end
      end

      def delete
        user = User.find(params[:id])
        user.destroy
        if user.destroy
          render json: { success: 'User was deleted successfully.', userAccountDeleted: true }
        else
          render json: { error: "User can't be deleted." }
        end
      end

      private

      def user_params
        params.require(:registration).permit(:name, :last_name, :username, :email, :kind_of_account, :password, :password_confirmation)
      end
    end
  end
end
