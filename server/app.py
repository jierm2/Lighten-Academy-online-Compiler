import traceback
import importlib
import subprocess
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Allow requests only from http://localhost:3000
CORS(app, origins="http://127.0.0.1:5000")


@app.route('/execute', methods=["POST"])
def execute_code():
    code = request.json.get("code")
    uid = request.json.get("exercise_id")
    print(uid)
    try:
        # Execute the Python code using subprocess.Popen
        process = subprocess.Popen(
            ['python3', '-c', code],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding='utf-8',
        )
        # Wait for process to finish, with a timeout of 5 seconds
        stdout, stderr = process.communicate(timeout=5)

        if process.returncode == 0:  # Process completed successfully
            output = stdout  # Use the captured stdout as the output
        else:
            response = {"output": stderr}
            return jsonify(response), 200

        print('uid')
        # Run test cases
        output = output.replace('\r\n', '\n')

        if uid:
            print('uid')
            test_module = importlib.import_module(f'tests.test_{uid}')
            test_func = getattr(test_module, f'test_exercise_{uid}')
            test = test_func(code, output)
            # Check if the output equals the expected output
            # print expected output
            print(f"Actual: {repr(output)}")  # print actual output
            # [0] = true, [1] = expected result
            if test[0]:
                response = {
                    "output": "Congrats!! ALL TESTS PASSED!!🎉" + ('\n'+test[3] if len(test) > 3 and test[3] is not None else ""), "ok": True
                }

            else:
                response = {
                    "output": f"TESTING FAILED 😔\n\nSolution printed: {test[1]}\n---\nSubmission printed:  {output}" +
                    (f"\n---\n{test[2]}" if len(test) > 2 else ""), "ok": False
                }
                print('response is ', response)
            return jsonify(response), 200

        else:
            response = {"output": output, "ok": True}
            return jsonify(response), 200
    except subprocess.TimeoutExpired:
        response = {
            "output": "Error: Code execution timed out, 5 seconds ⌛, please don't try to break the server", "ok": False}
        return jsonify(response), 200
    except Exception as e:
        traceback.print_exc()  # Print the exception stack trace
        error_message = str(e)
        response = {
            "output": f"An error occurred: {error_message}. Check your code and try again.", "ok": False
        }
        return jsonify(response), 200


if __name__ == '__main__':
    app.run()
