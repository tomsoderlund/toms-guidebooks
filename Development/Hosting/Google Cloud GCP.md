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
