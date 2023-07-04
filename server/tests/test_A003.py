import cmath


def test_exercise_A003(code, output):
    tolerance = 1e-10
    complex_value = 1.2246467991473532e-16j
    return (cmath.isclose(complex(output[:-1]), 0, abs_tol=tolerance) & ('0' not in code) & ('1.2246467991473532e-16j' not in code), complex_value, 'did not run the proper equation,and the result should not be a string', '1.2246467991473532e-16 is extremely close to zero!, so e^(πi) + 1 = 0')
