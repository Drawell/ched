from sqlalchemy.orm import relationship

from extensions import db
from sqlalchemy import Column, Integer, String, Date, ForeignKey, DateTime, Sequence
from sqlalchemy_serializer import SerializerMixin


class ImageItem(db.Model, SerializerMixin):
    serialize_only = ('image_id', 'user_id', 'image_name', 'load_date')
    date_format = '%d.%m.%Y'
    datetime_format = '%d.%m.%Y %H:%M'

    __tablename__ = 'Image_item'

    image_id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer)
    image_name = Column(String(100))
    load_date = Column(DateTime)

    #user = relationship("User", backref='images')
