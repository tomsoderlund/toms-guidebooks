# Python

- https://www.python.org/
- https://docs.python.org/3/
- https://www.w3schools.com/python/


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

    pip install torch torchvision
    
    # To ensure Python 3:
    pip3 install torch torchvision

### Requirements file

Save:

    pip freeze > requirements.txt

Install:

    pip install -r requirements.txt

## Interactive environment

    python

Type `quit()` or press Ctrl+D to quit (Windows: Ctrl+Z)


## The Python language

### Import modules

    import math
    from math import pi

### Data types

- Text: **str**
- Number: **int**, **float**, **complex**
- Boolean: **bool**
- Collections:
  - **list** (“array”) e.g. `["apple", "banana", "cherry"]` (ordered, changeable)
  - **tuple** e.g. `("apple", "banana", "cherry")` (ordered, unchangeable)
  - **dict** (“object/collection”) e.g. `{"name": "value"}` (ordered from v3.7, changeable)
    - Merge dicts with `new_dict = old_dict | new_values`
  - **set** e.g. `{"string", 123, true}` (unordered, unindexed, can add/remove but not change items)
  - **frozenset**
  - **range** e.g. `range(6)` or `range(0, 10, 2)`
- Binary:
  - **bytes** e.g. `b"Hello"`
  - **bytearray**
  - **memoryview**
- NoneType: **None**

Check type with `type(variable)`

Cast with e.g. `str(123)`

### Functions

    def my_function():
      print("Hello from a function")
      return 1 # Or 'pass'

Lambda (short) function: `add10 = lambda n: n + 10`

String function: `f'This is dynamic: {expression}'`

Named parameters when calling: `my_function(param1 = 100)`

### Type hints (Python 3.5+)

    pi: float = 3.142

    def greet(name: str = "Joan") -> str:
      return "Hello, " + name

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

### Loops

    for i in range(1, 5):
      print(i)

`break`, `continue` (skip to next)

    while i < 6:
      print(i)
      i += 1

### Map/reduce

    new_list = map(lambda n: n + 10, my_list)

### Error handling

Try/catch:

    try:
      await my_function()
    except Exception as error:
      return json({ error: error })

Throw error:

    raise TypeError('Argument should be an integer or a float value')

### Promises and Async/Await

    async def ping_local():
      return await ping_server('192.168.1.1')

### Decorators (`@`)

https://realpython.com/primer-on-python-decorators/

    def my_decorator(func):
        def wrapper():
            print("Something is happening before the function is called.")
            func()
            print("Something is happening after the function is called.")
        return wrapper

    @my_decorator
    def say_whee():
        print("Whee!")


## More

- Docstrings and `help()`
- num in range(3, 6)
- Make a package https://github.com/learnbyexample/100_page_python_intro/blob/main/100_page_python_intro.md#creating-your-own-package
- PDB debugger


## Testing

Unit testing libraries in Python such as PyUnit and PyTest


## Linting and Prettifying Python Code

    pip install black

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

    pip install Flask

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
