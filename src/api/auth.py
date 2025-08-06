from flask import Blueprint, request, jsonify
from api.models import db, User
from api.utils import APIException

auth = Blueprint('auth', __name__)

@auth.route('/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        raise APIException('Email y password son requeridos', status_code=400)
    if User.query.filter_by(email=email).first():
        raise APIException('Usuario ya existe', status_code=400)
    user = User(email=email, password=password, is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message': 'Usuario creado'}), 201

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        raise APIException('Credenciales inválidas', status_code=401)
    # TODO: Generar y devolver token JWT
    return jsonify({'message': 'Login exitoso'}), 200