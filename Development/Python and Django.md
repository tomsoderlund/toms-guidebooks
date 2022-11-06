# Python and Django

- https://www.python.org/
- https://docs.python.org/3/
- https://www.w3schools.com/python/


## Multiple versions and environments

    # Create a virtual environment to isolate our package dependencies locally:
    python3 - mvenv my-new-env

    # Activate it
    source my-new-env/bin/activate  # On Windows use `my-new-env\Scripts\activate`

    # Deactivate when you’re done:
    deactivate

## Package management: PIP and Anaconda

Find packages: https://pypi.org/

    pip install torch torchvision
    
    # To ensure Python 3:
    pip3 install torch torchvision

## Interactive environment

    python

Press Ctrl+D to quit (Windows: Ctrl+Z)

## The Python language

### Import modules

    import math
    from math import pi

### Data types

- Text: str
- Number: int, float, complex
- Boolean: bool
- Sequence: list, tuple, range
- Mapping: dict
- Set: set, frozenset
- Binary: bytes, bytearray, memoryview
- None: NoneType

### Functions

    def my_function():
      print("Hello from a function")
      return 1 # Or 'pass'

Lambda (short) function: `add10 = lambda n : n + 10`

String function: `f'This is dynamic: {expression}'`

Named parameters when calling: `my_function(param1 = 100)`

### Classes

    # person = Person(name, age).create()
    class Person:
      def __init__(self, name, age):
        self.name = name
        self.age = age

      # person.an_instance_method(param)
      def an_instance_method(param):
        # code...

      # Person.a_static_method()
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

Variables:

    device = "cuda" if torch.cuda.is_available() else "cpu"

### Try/catch

    try:
      await my_function()
    except Exception as error:
      return json({ error: error })

### Promises and Async/Await

    async def ping_local():
      return await ping_server('192.168.1.1')


## Web frameworks

- [Django REST Framework](https://www.django-rest-framework.org/): big and complete
- [Flask](https://flask.palletsprojects.com/): smaller
