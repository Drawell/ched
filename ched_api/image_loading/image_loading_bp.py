import json

from flask import Blueprint, make_response, jsonify, request, send_from_directory, send_file
from extensions import token_required
from .image_loading_model import ImageItem
from .image_loading_service import ImageLoadingService

image_loading_bp = Blueprint('image_loading_bp', __name__)


@image_loading_bp.route('/get_images/', methods=['GET'])
@token_required
def get_images(token_data):
    try:
        user_id = token_data['user_id']
        images_list = ImageLoadingService.get_image_list(user_id)
        json_str = json.dumps(list(map(ImageItem.to_dict, images_list)))
        return make_response(json_str, 201)
    except Exception as e:
        return make_response(jsonify({'status': 'server error'}), 500)


@image_loading_bp.route('/upload_image/', methods=['POST'])
@token_required
def upload_image(token_data):
    try:
        user_id = token_data['user_id']
        file = request.files['file']
        status = ImageLoadingService.upload_image(user_id, file)
        return make_response(jsonify(({'status': str(status)})), 201)
    except Exception as e:
        return make_response(jsonify({'status': 'server error'}), 500)


@image_loading_bp.route('/load_image_from_server/<image_id>', methods=['GET'])
@token_required
def load_image_from_server(token_data, image_id):
    try:
        image_id = int(image_id)
        image_path = ImageLoadingService.get_image_full_path(image_id)
        return send_file(image_path)
    except Exception as e:
        return make_response(jsonify({'status': 'server error'}), 500)


@image_loading_bp.route('/delete_image/<image_id>', methods=['GET'])
@token_required
def delete_image(token_data, image_id):
    try:
        image_id = int(image_id)
        ImageLoadingService.delete_image(image_id)
        return make_response({'status': 'ok'}, 201)
    except Exception as e:
        return make_response(jsonify({'status': 'server error'}), 500)
