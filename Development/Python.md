# Python

- https://www.python.org/
- https://docs.python.org/3/
- https://www.w3schools.com/python/

## From JavaScript to Python

Here are a few key skills and concepts you should learn when transitioning from JavaScript to Python:

1. **Syntax**: Python syntax is quite different from JavaScript. For example, Python uses indentation for blocks instead of `{}`. Also, Python uses `None` instead of `null`, and there is no `undefined` in Python. Understanding the syntax will be key in learning Python effectively.
2. **Typing**: Python is dynamically typed like JavaScript, but Python 3.5 introduced optional type hints. You can declare the expected types of function parameters and return values. This feature is not often used in JavaScript.
3. **Data Structures**: Python includes a number of robust built-in data types that you'll want to be familiar with, such as lists (similar to JavaScript arrays), dictionaries (similar to JavaScript objects), sets, and tuples.
4. **List Comprehensions**: Python offers a powerful construct called "list comprehension" that allows you to create lists in a very concise way.
5. **Functions and Decorators**: Python has first-class functions like JavaScript. You should understand how Python treats functions and how to use decorators to modify the behavior of functions and classes.
6. **Error Handling**: Python's `try`/`except` blocks are similar to JavaScript's `try`/`catch`, but there are subtle differences. Python also uses the `else` and `finally` clauses in error handling.
7. **Libraries and Frameworks**: Familiarize yourself with the Python standard library, and also with external libraries and frameworks that are most relevant to your work, like Flask or Django for web development, NumPy and pandas for data analysis, etc.
8. **Object-Oriented Programming**: While JavaScript has prototype-based inheritance, Python has a more traditional class-based inheritance system. You should understand classes in Python, how inheritance works, and how to use special "dunder" methods to control how your classes behave.
9. **Iterators and Generators**: These are advanced concepts that can be very useful in Python. While JavaScript has similar concepts (for example, generators introduced in ES6), the Python approach could feel different.
10. **Concurrency and Parallelism**: Python's approach to concurrency is different from JavaScript. Python has threads, a Global Interpreter Lock (GIL), and also features like async IO (Python coroutines) which may be similar to JavaScript's Promises and async/await.

## Multiple versions and environments

    # Create a virtual environment to isolate our package dependencies locally:
    python3 -m venv env  ## you can replace `env` with whatever

    # Activate it
    source env/bin/activate
    # On Windows use `env\Scripts\activate`

    # Deactivate when you’re done:
    deactivate

## Package management: PIP and Anaconda

Find packages: https://pypi.org/

    pip3 install torch torchvision

Save requirements file:

    pip3 freeze > requirements.txt

Install from requirements:

    pip3 install -r requirements.txt

### Pipfile

https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/python#python-version

    [[source]]
    url = "https://pypi.org/simple"
    verify_ssl = true
    name = "pypi"

    [packages]
    flask = "*"

    [requires]
    python_version = "3.9"

## Interactive environment

    python3

Type `quit()` or press Ctrl+D to quit (Windows: Ctrl+Z)


## The Python language

### Import modules

    import math
    from math import pi

#### Importing from other local files

Method 1: Import a specific function you want from `my_lib.py`:

    from my_lib import my_function

Method 2: Import the entire file:

    import my_lib as my_lib
    my_lib.my_function(a, b)

Local file in same folder:

    from .my_lib import MyLib

### Data types

- Text string: **`str`**, multiline with 3 quotes (single `"` or double `'`)
- Number: **`int`**, **`float`**, **`complex`**
- Boolean: **`bool`**
- Collections:
  - **`list`** (“array”) e.g. `["apple", "banana", "cherry"]`, get value with `my_list[0]`, length `len(my_list)` (ordered, changeable)
  - **`tuple`** e.g. `("apple", "banana", "cherry")` (ordered, unmutable)
  - **`dict`** (“object/collection”) e.g. `{"name": "value"}`, get `value` with `my_dict["name"]` (ordered from v3.7, changeable)
    - Merge dicts with `new_dict = old_dict | new_values`
  - **`set`** e.g. `{"string", 123, true}` (unordered, unindexed, can add/remove but not change items)
  - **`frozenset`**
  - **`range`** e.g. `range(6)` or `range(0, 10, 2)`
- Binary:
  - **`bytes`** e.g. `b"Hello"`
  - **`bytearray`**
  - **`memoryview`**
- NoneType: **`None`**

Check type with `type(variable)`

Cast with e.g. `str(123)`

#### `str`

		sub_string = string[0:5]

#### `list` (“arrays”)

    my_list.get(0, "default value")

    len(my_list)

Filter:

    filtered_big_list = [item for item in big_list if item.get('name') == 'X']
    filtered_big_list = list(filter(lambda item: item.get('name') == 'X', big_list))

#### `dict` (“collections”)

    my_dict.get("listKey", "default value")

### Functions

    def my_function():
      print("Hello from a function")
      return 1 # Or 'pass'

Lambda (short) function (like JavaScript arrow function): `add10 = lambda n: n + 10`

String function: `f'This is dynamic: {expression}'`

Named parameters when calling: `my_function(param1 = 100)`

### Type hints (Python 3.5+)

    pi: float = 3.142

    def greet(name: str = "Joan") -> str:
      return "Hello, " + name

For multiple return values, use `Tuple`:

    from typing import List, Tuple

    class Calculator:
        def other_costs_specification(costs_for_owner) -> Tuple[List[List], List[List]]:

### Error handling

Try/catch:

    try:
      await my_function()
    except Exception as error:
      return json({ error: error })

Throw error:

    raise TypeError('Argument should be an integer or a float value')

Error types:

`TypeError`, `ValueError`, `KeyError`, `IndexError`, `RuntimeError`, `NotImplementedError`

Custom error type:

    class MyCustomError(Exception):
        pass

    raise MyCustomError("This is a custom error")

### Types and error handling

    def divide(numerator: float, denominator: float) -> float:
        if not isinstance(numerator, (int, float)):
            raise TypeError('Numerator must be a number')
        if not isinstance(denominator, (int, float)):
            raise TypeError('Denominator must be a number')
        if denominator == 0:
            raise ValueError('Cannot divide by zero')
        return numerator / denominator

Multiple types:

    def greet(name: Optional[str] = None):
    def greet(name: Union[str, None] = None):

### Classes

    # person = Person(name, age).create()
    class Person:
      def __init__(self, name, age):
        self.name = name
        self.age = age

      # person.an_object_method(param)
      def an_object_method(self, param):
        # code...

      # Person.a_static_method(param)
      @staticmethod
      def a_static_method(param):
        # code...

Subclassing:

    class Person(species.Human):

### Printing to console

    print("Hello World!")

### Formatting strings

    vat=f"{round(0.20 * total_amount, 2):2f}"

### Conditionals: If/else

    if b > a:
      print("b is greater than a")
    elif a == b:
      print("a and b are equal")
    else:
      print("a is greater than b")

Boolean:

    and/or/not

Ternary expression:

    device = "cuda" if torch.cuda.is_available() else "cpu"

Includes:

    if person in employees:
        print("You’re an employee")

### Loops

    for i in range(1, 5):
      print(i)

`break`, `continue` (skip to next)

    while i < 6:
      print(i)
      i += 1

### Map/reduce

    new_list = map(lambda n: n + 10, my_list)

### Promises and Async/Await

    async def ping_local():
      return await ping_server('192.168.1.1')

### Decorators (`@`)

https://realpython.com/primer-on-python-decorators/

    def print_function_name(func):
        def wrapper(*args, **kwargs):
            print(f"\n◆ Calling '{func.__name__}'...\n", args[1:])
            return func(*args, **kwargs)
        return wrapper

    @print_function_name
    def say_whee():
        print("Whee!")

### System arguments (CLI)

    # If no command line arguments
    if len(sys.argv) == 1:
      print('No command line arguments')
      sys.exit()
    else:
      get_files_in_folder(sys.argv[1])

### Reading environment variables

    import os
    my_variable = os.environ['MY_VARIABLE']

### Files and folders

    def get_files_in_folder(folder):
      files = os.listdir(folder)
      for file in files:
        file_path = os.path.join(folder, file)
        print(file_path)

## More

- Docstrings and `help()`
- num in range(3, 6)
- Make a package https://github.com/learnbyexample/100_page_python_intro/blob/main/100_page_python_intro.md#creating-your-own-package
- PDB debugger


## Testing

Unit testing libraries in Python such as PyUnit and PyTest


## Linting and Prettifying Python Code

Linting: Flake8

    pip install flake8

Formatting: Black:

    pip3 install black

https://betterprogramming.pub/simple-hacks-to-automate-python-code-beautification-5ad934cf5a29


## Web frameworks

- [Django REST Framework](https://www.django-rest-framework.org/): big and complete
- [Flask](https://flask.palletsprojects.com/): smaller

### Flask

Create a `app.py`:

    #!/usr/bin/env python
    # encoding: utf-8

    import json
    from flask import Flask

    app = Flask(__name__)

    @app.route('/')
    def index():
      return json.dumps({ 'message': 'Hello World!' })

Install Flask:

    pip3 install Flask

then run:

    export FLASK_APP=main.py
    flask run

Hot reload:

    export FLASK_DEBUG=true

and open http://127.0.0.1:5000/

#### Environment

    export FLASK_APP=main.py
    export FLASK_DEBUG=true

    export FLASK_RUN_HOST=localhost
    export FLASK_RUN_PORT=4001
