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

## The Go language

### Variables

	var firstName string
	var age int8 // int8-64, uint8-64
	var percentageWater float = 0.70
	var isHuman bool = false

	const earthsGravity = 9.80665

### Structs/Collections

	type album struct {
	    ID     string  `json:"id"`
	    Title  string  `json:"title"`
	    Artist string  `json:"artist"`
	    Price  float64 `json:"price"`
	}

	// albums slice to seed record album data.
	var albums = [] album {
	    {ID: "1", Title: "Blue Train", Artist: "John Coltrane", Price: 56.99},
	    {ID: "2", Title: "Jeru", Artist: "Gerry Mulligan", Price: 17.99},
	    {ID: "3", Title: "Sarah Vaughan and Clifford Brown", Artist: "Sarah Vaughan", Price: 39.99},
	}

## Building a RESTful API

https://golang.org/doc/tutorial/web-service-gin

## Go on AWS Lambda with Docker

https://hub.docker.com/r/amazon/aws-lambda-go

	docker pull amazon/aws-lambda-go
