# Amazon AWS

## User management - IAM

- **Users** (e.g. `tomsoderlund`, `logging-app`): represents a Person or Service, often with long-term permissions.
- **User groups** (e.g. `Admins`): collection of IAM users. You can use user groups to specify long-term permissions for a collection of users, e.g. an “Admins” group.
- **Roles** (e.g. `AWSServiceRoleForSupport`): is intended to be assumable by anyone who needs it, is often temporary, has no login credentials.
- **Policies** (permissions, e.g. `AmazonRDSFullAccess`): a collection of access rights for an identity or resource. Can be attached to Users/User groups/Roles.
- **Tags**: key-value pairs that you can add to AWS resources to help identify, organize, or search for resources.
- **ACL**: Access Control List

https://console.aws.amazon.com/iam/

- Users → Access Keys (multiple)
- Simulate permissions: Users → Permissions → arrow on policy
- Policy simulator: https://policysim.aws.amazon.com/home/index.jsp

### Example: Access an S3 bucket

1. Attach a User Policy: https://console.aws.amazon.com/iam/home

	Name: `treat-as-a-variable-name`

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

### Config (same user for all sites)

	s3_bucket: www.YOURWEBSITE.com
	s3_endpoint: EU
	s3_id: AKIAIKW..
	s3_secret: hEjr8


## CORS

Only set in S3, not CloudFront


## CloudFront

- Override time
- Alternate Domain Names (CNAMEs)
	- Needs a Custom SSL Certificate
	- Request or Import a Certificate with ACM
- Route 53: "A" to Alias "d3htstcz5zldi1.cloudfront.net."


## RDS Databases

- Mindful of _region_, e.g. Sweden https://eu-north-1.console.aws.amazon.com/rds/home?region=eu-north-1
- Create new database:
	- Aurora PostgreSQL (AWS’ own Postgres-compatible)
	- Production not Test
	- DB cluster identifier = `my-project-slug`
	- Credentials: Self-managed
	- Serverless v2: low capacity (0.5 - 16?)
	- Don’t create an Aurora Replica
	- Don’t connect to an EC2 compute resource
	- Public access: Yes
- After, set Inbound Rules (firewall): https://eu-north-1.console.aws.amazon.com/ec2/home?region=eu-north-1#SecurityGroups:

Example credentials:

- Host*: `[my-project-slug].cluster-[CLUSTER_ID].eu-north-1.rds.amazonaws.com`
- Username: `postgres`
- Password: (from AWS Secrets Manager)
- Database: `postgres`

*Note: you also get a read-only host on `.cluster-ro-`

### Migrate from ElephantSQL to AWS RDS

	# Export from old database
	PGPASSWORD='[PASSWORD]' pg_dump -h balarama.db.elephantsql.com -U [USERNAME] -W [USERNAME] > [PROJECTNAME].sql

	# Import to new database
	PGPASSWORD='[PASSWORD]' psql -h [PROJECTNAME].cluster-[CLUSTER_ID].eu-north-1.rds.amazonaws.com -U postgres -W postgres < [PROJECTNAME].sql

Export from AWS:

	PGPASSWORD='[PASSWORD]' pg_dump -h [PROJECTNAME].cluster-[CLUSTER_ID].eu-north-1.rds.amazonaws.com -U postgres -W postgres > [PROJECTNAME].sql
