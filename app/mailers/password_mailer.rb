class PasswordMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.password_mailer.reset.subject
  #
  def reset
    # assigns a token with a purpose and expiry time
    @token = params[:token]
    # sends email
    mail to: params[:user].email
  end
end
