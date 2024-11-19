import os
from flask import Flask, request, jsonify
import memcache
from flask_cors import CORS

app = Flask(__name__)

# Habilitar CORS para todas las rutas
CORS(app)

MEMCACHED_HOST = os.getenv('MEMCACHED_HOST')
if not MEMCACHED_HOST:
    raise EnvironmentError("La variable de entorno MEMCACHED_HOST no está configurada.")

mc = memcache.Client([MEMCACHED_HOST], debug=0)

@app.route('/user', methods=['PUT', 'GET'])
def user():
    if request.method == 'PUT':
        data = request.get_json()
        if not data or 'user' not in data:
            return jsonify({"error": "Invalid input"}), 400
        
        users = mc.get('users') or []
        users.append(data)
        mc.set('users', users)
        return jsonify({"message": "User added"}), 201

    if request.method == 'GET':
        users = mc.get('users') or []
        return jsonify(users)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
