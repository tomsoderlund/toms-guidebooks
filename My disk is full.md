# My Disk is Full!

Storage Management on Mac

Start JDiskReport
Steam and check usage


## Backup process

S3: https://console.aws.amazon.com/s3/buckets/backup.YOUR-USER-NAME/

    zip -r "./_zips/MYFOLDER.zip" "MYFOLDER/"

# Zip all folders
. ~/zipAllFolders.sh


    #!/bin/sh

    excludeList="_backedup,_zips"

    mkdir _backedup
    mkdir _zips

    for folderName in */; do

      archiveName=${folderName%/}

      if [ "${excludeList/$archiveName}" = "$excludeList" ]; then
        echo "\nZipping “${archiveName}”...\n"
        zip -r "./_zips/${archiveName}.zip" "${archiveName}/"
        mv "${archiveName}/" _backedup/
      fi

    done


## To make backup of:

Pictures/_To sort

Oberon
