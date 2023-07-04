def test_exercise_A002(code, output):
    expected_output = "7\n"
    print('code is ', len(code))
    contains_digit_except_43 = any(char.isdigit() and char not in [
                                   '4', '3'] for char in code)
    count_3 = code.count('3')
    count_4 = code.count('4')
    print('printing', contains_digit_except_43)
    return (
        (expected_output == output) and
        not contains_digit_except_43 and
        ('+' in code) and (count_3 == 1) and (count_4 == 1),
        expected_output,
        "Make sure you sum 3 and 4"
    )
