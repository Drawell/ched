from flask import Flask

from extensions import db
from authentication import authentication_bp
import config


def create_app():
    flask_app = Flask(__name__)
    #flask_app.config['SQLALCHEMY_DATABASE_URI'] = ''
    flask_app.register_blueprint(authentication_bp, url_prefix=config.url_prefix)

    db.init_app(flask_app)

    return flask_app


app = create_app()

if __name__ == '__main__':
    app.config['DEBUG'] = True
    app.run()
