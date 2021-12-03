# Go

https://golang.org/


## CLI tool

Run

    go run myapp.go

Compile:

    go build myapp.go


## Code example

	package main
	
	import ("fmt")
	
	func main() {
	  fmt.Println("Hello World")
	}

Note: `package main` = compiles to executable file.

	func HandleLambdaEvent(event MyEvent) (MyResponse, error) {
	  return MyResponse{Message: fmt.Sprintf("%s is %d years old!", event.Name, event.Age)}, nil
	}

Note: returns _multiple_ values (`MyResponse, error`).


## Packages

https://pkg.go.dev/std

	import (
	  "package1"
	  p2 "package2"
	)

### Documentation

	go doc fmt
	go doc fmt.Println

### Local packages

You define your `module my_app` in `go.mod`, then you can reference subfolders e.g. `import "my_app/internal/pkg/db"`


## Linting and formatting

	go vet main.go

	go fmt main.go
	gofmt -w main.go


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

### Private and public

	privateFunction
	PublicFunction

### Short variable declarations with `:=`

	myVariable := aFunction()

### Underscore `_` assignment

	stringBody, _ := json.Marshal(body)

This just ignores the second value.

### Tags (e.g. JSON field names)

Tags: https://medium.com/golangspec/tags-in-golang-3e5db0b8ef3e

	user.Tag.Lookup("json")

### JSON

`Unmarshal` = Parse

	body := BodyParameters{}
	json.Unmarshal([]byte(req.Body), &body)

`Marshal` = Format as string

	data, error := json.Marshal(pigeon)
	fmt.Println(string(data))


## Building a RESTful API

https://golang.org/doc/tutorial/web-service-gin


## Go on AWS Lambda with Docker

https://github.com/Binogi/golang-aws-lambda-docker
