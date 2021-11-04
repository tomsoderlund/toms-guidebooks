# Go

https://golang.org/

## CLI tool

Run

    go run myapp.go

Compile:

    go build myapp.go

## Code example

	package main
	
	import "fmt"
	
	func main() {
	  fmt.Println("Hello World")
	}

Note: `package main` = compiles to executable file.

## Packages

https://pkg.go.dev/std

	import (
	  "package1"
	  p2 "package2"
	)

### Documentation

	go doc fmt
	go doc fmt.Println


## Building a RESTful API

https://golang.org/doc/tutorial/web-service-gin
