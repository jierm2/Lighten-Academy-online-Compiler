from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import traceback

app = Flask(__name__)
# Allow requests only from http://localhost:3000
CORS(app, origins="http://localhost:3000")


@app.route('/execute', methods=["POST"])
def execute_code():
    code = request.json.get("code")

    try:
        # Execute the Python code using subprocess
        process = subprocess.Popen(
            ['python3', '-c', code], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        output, error = process.communicate()

        # Decode the output and error messages
        output = output.decode()
        error = error.decode()

        # Check if there was an error
        if error:
            response = {"output": output, "error": error}
        else:
            response = {"output": output}

        return jsonify(response), 200
    except Exception as e:
        traceback.print_exc()  # Print the exception stack trace
        response = {"error": str(e)}
        return jsonify(response), 500


if __name__ == '__main__':
    app.run()
