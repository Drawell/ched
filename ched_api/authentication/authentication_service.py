import datetime
import jwt
import config


class AuthenticationService:

    @staticmethod
    def login(login: str, password: str):
        if login == 'admin' and password == '123':
            return AuthenticationService.encode_auth_token(1)

        return None

    @staticmethod
    def encode_auth_token(user_id):
        payload = {
            'user_id': user_id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30),
        }
        token = jwt.encode(payload, config.secret_key, algorithm='HS256')
        return token
