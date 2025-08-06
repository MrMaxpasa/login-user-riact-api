"""
This module starts the API server, loads the DB and registers blueprints
"""
import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.auth import auth
from api.admin import setup_admin
from api.commands import setup_commands

# Configuración de entorno y static
env = os.getenv('FLASK_ENV', 'development')
static_dir = os.path.join(os.path.dirname(__file__), '../dist/')

app = Flask(__name__, static_folder=None)
app.url_map.strict_slashes = False
CORS(app)

# Configuración de base de datos
db_url = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_DATABASE_URI'] = (
    db_url.replace('postgres://', 'postgresql://') if db_url
    else 'sqlite:////tmp/test.db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
Migrate(app, db, compare_type=True)
db.init_app(app)

# Registro de blueprints
app.register_blueprint(api, url_prefix='/api')    # Endpoints API
app.register_blueprint(auth, url_prefix='/api')   # Endpoints Auth

# Admin y comandos CLI
setup_admin(app)
setup_commands(app)

# Manejo de errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Ruta principal / sitemap o frontend
@app.route('/')
def sitemap():
    if env == 'development':
        return generate_sitemap(app)
    return send_from_directory(static_dir, 'index.html')

# Servir assets estáticos
def serve_static(path):
    full = os.path.join(static_dir, path)
    if not os.path.isfile(full): path = 'index.html'
    resp = send_from_directory(static_dir, path)
    resp.cache_control.max_age = 0
    return resp

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
    return serve_static(path)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=port, debug=(env=='development'))