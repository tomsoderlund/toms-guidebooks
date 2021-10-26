# AWS Lambda

https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-awscli.html

    aws iam create-role --role-name lambda-execute --assume-role-policy-document '{"Version": "2012-10-17","Statement": [{ "Effect": "Allow", "Principal": {"Service": "lambda.amazonaws.com"}, "Action": "sts:AssumeRole"}]}'
    aws iam create-role --role-name lambda-execute --assume-role-policy-document file://trust-policy.json

    aws iam attach-role-policy --role-name lambda-execute --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole

Making functions:

    cd myLambdaFunction && zip -r ../myLambdaFunction.zip * && cd ..

    aws lambda create-function --function-name myLambdaFunction --zip-file fileb://myLambdaFunction.zip --handler index.handler --runtime nodejs14.x --role arn:aws:iam::562328468330:role/lambda-execute

    aws lambda update-function-code --function-name myLambdaFunction --zip-file fileb://myLambdaFunction.zip

    aws lambda delete-function --function-name myLambdaFunction

    aws lambda list-functions --max-items 10


## Yarn

    "lambda-deploy": "cd lambda; echo Creating ZIP archive...; rm myLambdaFunction.zip; cd myLambdaFunction && zip -r ../myLambdaFunction.zip * && cd ..; echo Uploading to AWS Lambda...; aws lambda update-function-code --function-name myLambdaFunction --zip-file fileb://myLambdaFunction.zip; cd ..",


## Code

    exports.handler = async function myLambdaFunction (event, context) {
        // TODO implement
        const response = {
            statusCode: 200,
            body: JSON.stringify('Hello from Lambda!'),
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


## Scheduling events with AWS CloudWatch

https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html

- https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#rules:
- Option: Schedule
- Add Target: select your Lambda function
