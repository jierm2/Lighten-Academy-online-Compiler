import re


def test_exercise_B002(code, output):
    username_declared = bool(re.search(r'\busername\s*=\s*', code))
    numOfFriends_declared = bool(re.search(r'\bnumOfFriends\s*=\s*', code))
    favoriteColor_declared = bool(re.search(r'\bfavoriteColor\s*=\s*', code))
    isCodingFun_declared = bool(re.search(r'\bisCodingFun\s*=\s*', code))

    incorrect_variables = []

    if not username_declared:
        incorrect_variables.append(
            ('username', 'str', 'not declared or assigned correctly'))
    elif not re.search(r'username\s*=\s*(\'[^\']*\'|"[^"]*")', code):
        incorrect_variables.append(
            ('username', 'str', 'value not assigned correctly'))

    if not numOfFriends_declared:
        incorrect_variables.append(
            ('numOfFriends', 'int', 'not declared or assigned correctly'))
    elif not re.search(r'numOfFriends\s*=\s*\d+', code):
        incorrect_variables.append(
            ('numOfFriends', 'int', 'value not assigned correctly'))

    if not favoriteColor_declared:
        incorrect_variables.append(
            ('favoriteColor', 'str', 'not declared or assigned correctly'))
    elif not re.search(r'favoriteColor\s*=\s*(\'[^\']*\'|"[^"]*")', code):
        incorrect_variables.append(
            ('favoriteColor', 'str', 'value not assigned correctly'))

    if not isCodingFun_declared:
        incorrect_variables.append(
            ('isCodingFun', 'bool', 'not declared or assigned correctly'))
    elif not re.search(r'isCodingFun\s*=\s*(True|False)', code):
        incorrect_variables.append(
            ('isCodingFun', 'bool', 'value not assigned correctly'))

    if len(incorrect_variables) == 0:
        return True, 'Make sure the variable names and values are declared correctly'
    else:
        incorrect_message = '\nThe following variables are incorrect:\n'
        for var_name, expected_type, reason in incorrect_variables:
            incorrect_message += f'\t{var_name}: Expected type {expected_type}, but {reason}.\n'
        return False, incorrect_message
