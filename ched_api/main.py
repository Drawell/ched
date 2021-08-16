from flask import Flask


from authentication import authentication_bp
from image_loading import image_loading_bp
import config
from extensions import db


def create_db():
    with app.app_context():
        db.create_all()
        db.session.commit()


def create_app():
    flask_app = Flask(__name__)
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = config.connection_string
    flask_app.register_blueprint(authentication_bp, url_prefix=config.url_prefix)
    flask_app.register_blueprint(image_loading_bp, url_prefix=config.url_prefix)

    db.init_app(flask_app)

    return flask_app


app = create_app()

if __name__ == '__main__':
    app.config['DEBUG'] = True

    #create_db(app)

    app.run()
