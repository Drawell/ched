from flask import Blueprint, make_response, jsonify, request

import config
from .authentication_service import AuthenticationService

authentication_bp = Blueprint('authentication_bp', __name__)


@authentication_bp.route('/login/', methods=['POST'])
def login():
    try:
        req_data = request.get_json()
        login_ = req_data['login']
        pswd = req_data['pswd']
        token = AuthenticationService.login(login_, pswd)
        if token is None:
            return make_response(jsonify({'status': 'bad user'}), 200)

        return make_response(jsonify({'status': 'ok', 'token': token}), 201)
    except Exception as e:
        return make_response(jsonify({'status': 'server error'}), 401)
