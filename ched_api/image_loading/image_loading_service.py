import os
from datetime import datetime
from enum import Enum

from sqlalchemy import func

import config
from extensions import db
from .image_loading_model import ImageItem


class UploadImageStatusEnum(Enum):
    uploaded = 0
    oversize = 1
    max_number_exceed = 2

    def __str__(self):
        return self.name


class ImageLoadingService:
    @staticmethod
    def _generate_filename(file, user_id, image_id):
        return f'usr{user_id}_img{image_id}.{file.filename[-3:]}'

    @staticmethod
    def upload_image(user_id, file):
        now = datetime.now()
        image_item = ImageItem(user_id=user_id, load_date=now)
        db.session.add(image_item)
        db.session.flush()
        filename = ImageLoadingService._generate_filename(file, user_id, image_item.image_id)

        image_item.image_name = filename
        db.session.commit()
        file.save(os.path.join(config.images_folder, filename))
        return UploadImageStatusEnum.uploaded

    @staticmethod
    def get_image_list(user_id):
        images = ImageItem.query.filter(ImageItem.user_id == user_id).order_by(
            ImageItem.load_date).all()
        return images

    @staticmethod
    def get_image_full_path(image_id):
        image = ImageItem.query.get(image_id)
        return os.path.join(config.images_folder, image.image_name)

    @staticmethod
    def delete_image(image_id):
        image = ImageItem.query.get(image_id)

        filepath = os.path.join(config.images_folder, image.image_name)
        if os.path.exists(filepath):
            os.remove(filepath)

        if image is not None:
            db.session.delete(image)
            db.session.commit()
