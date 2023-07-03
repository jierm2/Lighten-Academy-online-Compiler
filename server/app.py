import traceback
import importlib
from subprocess import STDOUT, check_output, TimeoutExpired

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Allow requests only from http://localhost:3000
CORS(app, origins="http://localhost:3000")


@app.route('/execute', methods=["POST"])
def execute_code():
    code = request.json.get("code")
    uid = request.json.get("exercise_id")
    print(uid)
    try:
        # Execute the Python code using check_output with a timeout of 5 seconds
        output = check_output(['python3', '-c', code], stderr=STDOUT, timeout=5)
        output = output.decode()  # Decode the output from bytes to string
        print('uid')
        # Run test cases
        output = output.replace('\r\n', '\n')
        
        if uid:
            print('uid')
            test_module = importlib.import_module(f'tests.test_{uid}')
            test_func = getattr(test_module, f'test_exercise_{uid}')
            expected_output = test_func()
            # Check if the output equals the expected output
            print(f"Expected: {repr(expected_output)}")  # print expected output
            print(f"Actual: {repr(output)}")  # print actual output
            if output == expected_output:
                response = {"output": "Congrats!! ALL TESTS PASSED!!🎉"}
            else:
                response = {"output": f"TESTING FAILED 😔\n\nSolution printed: {expected_output}---\nSubmission printed: {output}---"}
            
            return jsonify(response), 200

        else:
            response = {"output": output}
            return jsonify(response), 200
    except TimeoutExpired:
        response = {"output": "Error: Code execution timed out"}
        return jsonify(response), 200
    except Exception as e:
        traceback.print_exc()  # Print the exception stack trace
        response = {"error": str(e)}
        return jsonify(response), 500


if __name__ == '__main__':
    app.run()
