# Amazon AWS

## User management - IAM

https://console.aws.amazon.com/iam/

Users -> Access Keys (multiple)

Simulate: Users -> Permissions -> arrow on policy

GetFriday
s3_website

ACL = Access Control List

1. Attach a User Policy: https://console.aws.amazon.com/iam/home

	Name: treat-as-a-variable-name

	{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Effect": "Allow",
				"Action": [
					"s3:GetObject",
					"s3:ListBucket",
					"s3:GetBucketLocation"
				],
				"Resource": [
					"arn:aws:s3:::BUCKETNAME/*",
					"arn:aws:s3:::BUCKETNAME"
				]
			}
		]
	}

2. Add a bucket policy on the Bucket in S3:

	{
		"Version": "2012-10-17",
		"Statement": [
			{
				"Sid": "GetFiles",
				"Effect": "Allow",
				"Principal": {
					"AWS": "*"
				},
				"Action": [
					"s3:GetObject",
					"s3:GetObjectAcl",
					"s3:PutObject",
					"s3:PutObjectAcl"
				],
				"Resource": "arn:aws:s3:::BUCKETNAME/*"
			},
			{
				"Sid": "ListFiles",
				"Effect": "Allow",
				"Principal": {
					"AWS": "*"
				},
				"Action": [
					"s3:ListBucket"
				],
				"Resource": "arn:aws:s3:::BUCKETNAME"
			}
		]
	}

Policy simulator:
https://policysim.aws.amazon.com/home/index.jsp

## DNS: Route 53

https://console.aws.amazon.com/route53


### Simple static website

1. Name bucket as website e.g www.example.com
2. Set a CNAME in DNS pointing to the S3 endpoint


## S3 Storage

### s3_website

s3_website cfg create
s3_website cfg apply
s3_website push

### Config (same user for all sites):
s3_bucket: www.YOUR-USER-NAME.com
s3_endpoint: EU
s3_id: AKIAIKW..
s3_secret: hEjr8


## CORS

Only set in S3, not CloudFront
