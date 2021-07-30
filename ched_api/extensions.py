from functools import wraps

import jwt
from flask import request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy

import config

db = SQLAlchemy()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return make_response(jsonify({'status': 'Token is missing!'}), 401)

        try:
            token_data = jwt.decode(token, config.secret_key, algorithms='HS256')
            # current_user = User.query.filter_by(public_id=data['public_id']).first()
        except Exception as e:
            return make_response(jsonify({'status': 'Token is invalid!'}), 401)

        return f(token_data, *args, **kwargs)

    return decorated

