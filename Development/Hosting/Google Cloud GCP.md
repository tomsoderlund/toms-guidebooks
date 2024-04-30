# Google Cloud Platform (GCP)

## Cloud Function in Python

    gcloud init

    gcloud functions deploy my_function
      --runtime python38 \
      --memory 512MB \
      --trigger-http \
      --allow-unauthenticated \
      --gen2 \
      --set-env-vars VAR1=VALUE1

`package.json`:

    "gcp-deploy": "eval $(grep '^POSTGRES_URL' .env.local) && cd lambda/stock_predict && gcloud functions deploy stock_predict --runtime python38 --trigger-http --allow-unauthenticated --gen2 --set-env-vars POSTGRES_URL=${POSTGRES_URL}"

## Cron / Scheduler

https://console.cloud.google.com/cloudscheduler

## App Engine

Create `app.yaml`:

    runtime: python39
    entrypoint: gunicorn -b main:app

CLI:

    gcloud config set project [app-slug]
    gcloud app deploy app.yaml
    gcloud app browse

## Google Cloud Translation API

    gcloud iam service-accounts create \
        translation-quickstart \
        --project short-fairytales

    gcloud projects \
        add-iam-policy-binding \
        short-fairytales \
        --member='serviceAccount:translation-quickstart@short-fairytales.iam.gserviceaccount.com' \
        --role='roles/cloudtranslate.user'

    gcloud iam service-accounts keys \
        create key.json --iam-account \
        translation-quickstart@short-fairytales.iam.gserviceaccount.com

    export GOOGLE_APPLICATION_CREDENTIALS=key.json
