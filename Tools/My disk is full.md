# My Disk is Full!

Storage Management on Mac

Start JDiskReport
Steam and check usage


## Backup process

S3: https://console.aws.amazon.com/s3/buckets/backup.YOUR-USER-NAME/

    zip -r "./_zips/MYFOLDER.zip" "MYFOLDER/"

## Zip all folders

Usage:

	. ~/zipAllFolders.sh

Script:

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


## Deleting node_modules

https://medium.com/@MarkPieszak/how-to-delete-all-node-modules-folders-on-your-machine-and-free-up-hd-space-f3954843aeda

Find all folders:

    sudo find . -name "node_modules" -type d -prune -exec echo \"{}\" \; | xargs du -chs

See results:

    318M  ./My App 1/node_modules
    1000M ./My App 2/node_modules

Sort list by size, and delete folders:

    sudo rm -rf "./My App 1/node_modules"

(Note the surrounding quotes for folder names with spaces)
