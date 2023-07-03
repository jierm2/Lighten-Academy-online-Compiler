from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import traceback

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

# Initialize a global dictionary to hold the exercise test cases
exercise_test_cases = {
    "print": [
        {
            "name": "Test 1",
            "expected_output": "Howdy, World!"
        }
    ]
}


@app.route('/execute', methods=["POST"])
def execute_code():
    code = request.json.get("code")
    exercise_id = request.json.get("exercise_id")

    try:
        # Execute the Python code using subprocess
        process = subprocess.Popen(['python3', '-c', code],
                                   stdin=subprocess.PIPE,
                                   stdout=subprocess.PIPE,
                                   stderr=subprocess.PIPE)
        output, error = process.communicate()

        # Decode the output and error messages
        output = output.decode()
        error = error.decode()

        # Perform exercise-specific test cases
        if exercise_id in exercise_test_cases:
            test_cases = exercise_test_cases[exercise_id]
            test_results = run_test_cases(test_cases, output)
            code_correct = all(result['test_passed']
                               for result in test_results)
        else:
            test_results = []
            code_correct = False

        # Prepare the response
        response = {"output": output, "error": error,
                    "test_results": test_results, "code_correct": code_correct}

        return jsonify(response), 200

    except Exception as e:
        traceback.print_exc()  # Print the exception stack trace
        response = {"error": str(e)}
        return jsonify(response), 500


def run_test_cases(test_cases, output):
    test_results = []
    for test_case in test_cases:
        expected_output = test_case['expected_output']
        test_passed = output.strip() == expected_output.strip()
        test_result = {
            'test_case': test_case['name'],
            'expected_output': expected_output,
            'actual_output': output,
            'test_passed': test_passed
        }
        test_results.append(test_result)
    return test_results


@app.route('/exercise/<exercise_id>/test', methods=["POST"])
def add_test_case(exercise_id):
    test_case = request.json.get("test_case")
    exercise_test_cases.setdefault(exercise_id, []).append(test_case)
    return jsonify({"message": "Test case added successfully"}), 200


if __name__ == '__main__':
    app.run()
