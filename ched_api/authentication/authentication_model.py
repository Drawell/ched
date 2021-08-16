from sqlalchemy import Integer, Column, String, DateTime
from sqlalchemy_serializer import SerializerMixin

from extensions import db


class User(db.Model, SerializerMixin):
    serialize_only = ('id', 'name', 'register_date')
    date_format = '%d.%m.%Y'
    datetime_format = '%d.%m.%Y %H:%M'

    __tablename__ = 'User'

    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(100))
    register_date = Column(DateTime)
