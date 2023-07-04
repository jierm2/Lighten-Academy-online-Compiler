import re


def test_exercise_B001(code, output):
    age_declared = bool(re.search(r'\bage\s*=\s*13\b', code))
    pi_declared = bool(re.search(r'\bpi\s*=\s*3\.14\b', code))
    letter_declared = bool(re.search(r'\bletter\s*=\s*\'X\'\s*\b', code)
                           ) | bool(re.search(r'\bletter\s*=\s*\"X\"\s*\b', code))
    isCSAwesome_declared = bool(re.search(r'\bisCSAwesome\s*=\s*True\b', code))
    print(code)
    variables_correct = age_declared and pi_declared and letter_declared and isCSAwesome_declared

    incorrect_variables = []
    if not age_declared:
        incorrect_variables.append(
            ('age', '13', 'not declared or assigned correctly'))
    if not pi_declared:
        incorrect_variables.append(
            ('pi', '3.14', 'not declared or assigned correctly'))
    if not letter_declared:
        incorrect_variables.append(
            ('letter', '\'X\'', 'not declared or assigned correctly'))
    if not isCSAwesome_declared:
        incorrect_variables.append(
            ('isCSAwesome', 'True', 'not declared or assigned correctly'))

    if variables_correct:
        return True, 'Make sure the variable names and values are declared correctly'
    else:
        incorrect_message = '\nThe following variables are incorrect:\n'
        for var_name, expected_value, reason in incorrect_variables:
            incorrect_message += f'\t{var_name}: Expected {expected_value}, but {reason}.\n'

        return False, incorrect_message, '', 'Actual:\n' + incorrect_message, '\n'
