from flask import Flask, request, jsonify
from flask_cors import CORS
from threading import Thread
import subprocess
import traceback
import time
import os
import pty

app = Flask(__name__)
# Allow requests only from http://localhost:3000
CORS(app, origins="http://localhost:3000")

sessions = {}

def handle_output(sid, master_fd):
    while True:
        try:
            output = os.read(master_fd, 1024).decode()
        except OSError:
            break  # This happens when the child process has ended
        sessions[sid]['outputs'].append(output)
        time.sleep(0.1)  # To prevent busy looping

@app.route('/start', methods=["POST"])
def start_session():
    sid = request.json.get("sid")
    if sid in sessions:
        return jsonify({"error": "Session already exists"}), 400

    master_fd, slave_fd = pty.openpty()
    process = subprocess.Popen(
        ['python3', '-i'],
        stdin=slave_fd,
        stdout=slave_fd,
        stderr=slave_fd,
        close_fds=True,
    )
    os.close(slave_fd)  # Only the child should have this fd open
    Thread(target=handle_output, args=(sid, master_fd)).start()
    sessions[sid] = {'process': process, 'fd': master_fd, 'outputs': []}
    return jsonify({"message": "Session started"}), 200

@app.route('/execute', methods=["POST"])
def execute_code():
    sid = request.json.get("sid")
    code = request.json.get("code")
    if sid not in sessions:
        return jsonify({"error": "Session not found"}), 400

    os.write(sessions[sid]['fd'], (code + '\n').encode())
    time.sleep(0.1)  # Give the Python interpreter some time to process the command
    outputs = sessions[sid]['outputs']
    sessions[sid]['outputs'] = []
    return jsonify({"outputs": outputs}), 200

@app.route('/stop', methods=["POST"])
def stop_session():
    sid = request.json.get("sid")
    if sid not in sessions:
        return jsonify({"error": "Session not found"}), 400

    sessions[sid]['process'].terminate()
    os.close(sessions[sid]['fd'])
    del sessions[sid]
    return jsonify({"message": "Session stopped"}), 200

if __name__ == '__main__':
    app.run(debug=True)
