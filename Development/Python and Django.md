# Python and Django

https://www.python.org/

https://docs.python.org/3/

## Switch versions

## Import modules

    import math

    from math import pi

## Functions

    def my_function():
      print("Hello from a function")
      return 1 # Or 'pass'

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
