# AWS Lambda

Lambda’s are serverless functions that can be used for API endpoints or scheduled batch jobs.

https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html

    aws iam create-role --role-name lambda-execute --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
    aws iam create-role --role-name lambda-execute --assume-role-policy-document file://trust-policy.json

    aws iam attach-role-policy --role-name lambda-execute --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

## See your Lambda functions

https://eu-west-1.console.aws.amazon.com/lambda/home?region=eu-west-1

## Making Lambda functions

Lambda functions are uploaded to AWS as a ZIP file:

    cd myLambdaFunction && zip -r ../myLambdaFunction.zip * && cd ..

Using `aws` CLI tool:

    aws lambda create-function \
      --function-name myLambdaFunction \
      --zip-file fileb://myLambdaFunction.zip \
      --handler index.handler \
      --runtime nodejs14.x \
      --role arn:aws:iam::[AWS Account Number]:role/lambda-execute

    aws lambda update-function-code \
      --function-name myLambdaFunction \
      --zip-file fileb://myLambdaFunction.zip

    aws lambda delete-function \
      --function-name myLambdaFunction

    aws lambda list-functions --max-items 10

Test Lambda:

    aws lambda invoke --function-name myLambdaFunction \
      --cli-binary-format raw-in-base64-out \
      --payload '{"body":"{\"name\":\"Tom\"}"}' \
      --invocation-type "RequestResponse" response.txt

## Yarn shortcuts

    "lambda-sync-code": "rm -rf lambda/myLambdaFunction/{lib,hooks}; mkdir -p lambda/myLambdaFunction/{lib/data/event-sources/categories,hooks}; cp -r lib/ lambda/myLambdaFunction/lib/; cp -r hooks/ lambda/myLambdaFunction/hooks/; cd lambda/myLambdaFunction && yarn && cd ../..",
    "lambda-test": "yarn lambda-sync-code; node lambda/test.mjs myLambdaFunction",
    "lambda-deploy": "yarn lambda-sync-code; cd lambda; echo Creating ZIP archive...; rm myLambdaFunction.zip; cd myLambdaFunction && zip -r ../myLambdaFunction.zip * && cd ..; echo Uploading to AWS Lambda...; aws lambda update-function-code --function-name myLambdaFunction --zip-file fileb://myLambdaFunction.zip; cd .."


## Code example of a Lambda function

    exports.handler = async function myLambdaFunction (event, context) {
        // TODO implement
        const { name } = typeof event.body === 'string' ? JSON.parse(event.body) : event.body
        const response = {
            statusCode: 200,
            body: JSON.stringify(`Hello ${name} from Lambda!`),
        };
        return response;
    };


## Environment variables

Function page -> Configuration -> Environment variables

    aws lambda update-function-configuration --function-name myLambdaFunction --environment "Variables={BUCKET=my-bucket,KEY2=value}"
    aws lambda get-function-configuration --function-name myLambdaFunction


## Testing locally

    /**
     * testLambdaFunction CLI tool
     * @description CLI tool for running AWS Lambda Functions
     */

    require('dotenv').config({ path: '../.env.local' })

    async function testLambdaFunction ({ functionName, eventObject }) {
      console.log(`Running ${functionName}...`)
      const results = await require(`./${functionName}`).handler(JSON.parse(eventObject))
      console.log(`${functionName} results:`, results)
    }

    const ARGUMENTS = ['functionName:myLambdaFunction', 'eventObject:\'{ "key1"; "value1" }\'']

    if ((process.argv.length - 2) < 1) {
      console.log('Usage: node lambda/test ' + ARGUMENTS.map(str => `[${str.split(':')[0]}]`).join(' '))
      console.log('  E.g: node lambda/test ' + ARGUMENTS.map(str => str.split(':')[1] || '“something”').join(' '))
    } else {
      const argumentObj = process.argv.slice(2).reduce((result, value, index) => ({ ...result, [ARGUMENTS[index] ? ARGUMENTS[index].split(':')[0] : `arg`]: value }), {})
      testLambdaFunction(argumentObj)
    }


## Scheduling events with AWS EventBridge (ex CloudWatch Events)

https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html

- https://eu-west-1.console.aws.amazon.com/events/home?region=eu-west-1#/rules
- Name: “myLambdaFunction” (because schedule can be modified afterwards, but name cannot be changed)
- Option: Schedule
- Select target: “Lambda function”
- Function: (select your Lambda function)
