# AI and Machine Learning

Most of this page has moved to: https://www.tomsoderlund.com/ai/ai-introduction

## Setting up local Python development environment

Set up Python, Gradio, etc:

	# Create and activate a “safe” virtual Python environment (exit with command “deactivate”)
	python3 -m venv env
	source env/bin/activate
	
	# Create a .gitignore file to exclude the packages in `env` folder
	echo "env/" >> .gitignore
	
	# Install Gradio
	pip3 install gradio
	
	# Update the list of required packages (do this every time you add packages)
	pip3 freeze > requirements.txt

	# Create a blank app.py file:
	touch app.py

## Deploying on GCP AppEngine

- Create `app.yaml`

		gcloud config set project [app-slug]
		gcloud app deploy app.yaml
		gcloud config set project makamap
		gcloud app browse
		pip freeze > requirements.txt
	
