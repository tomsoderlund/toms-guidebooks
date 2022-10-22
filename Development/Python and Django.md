# Python and Django

- https://www.python.org/
- https://docs.python.org/3/
- https://www.w3schools.com/python/

## Switch versions

## Package management: PIP and Anaconda

	pip install torch torchvision
	
	# To ensure Python 3:
	pip3 install torch torchvision

## Import modules

    import math

    from math import pi

## Data types

- Text: str
- Number: int, float, complex
- Boolean: bool
- Sequence: list, tuple, range
- Mapping: dict
- Set: set, frozenset
- Binary: bytes, bytearray, memoryview
- None: NoneType

## Functions

    def my_function():
      print("Hello from a function")
      return 1 # Or 'pass'

Lambda (short) function: `add10 = lambda n : n + 10`

String function: `f'This is dynamic: {expression}'`

Named parameters when calling: `my_function(param1 = 100)`

## Classes

	class Person:
	  def __init__(self, name, age):
	    self.name = name
	    self.age = age

## If/else

    if b > a:
      print("b is greater than a")
    elif a == b:
      print("a and b are equal")
    else:
      print("a is greater than b")

## Try/catch

		try:
		  await my_function()
		except Exception as error:
		  return json({ error: error })

## Promises and Async/Await

    async def ping_local():
      return await ping_server('192.168.1.1')
