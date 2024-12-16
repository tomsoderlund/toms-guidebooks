# My Disk is Full!

TreeSize for macOS

- DaisyDisk
    - Visualize your disk usage with an interactive sunburst diagram.
    - Allows browsing folders in a tree view and quickly identifying large files/folders.
    - Paid but offers a free trial.
- Disk Drill
    - File recovery tool with a disk analyzer feature.
    - Shows folder sizes in a tree view.
- GrandPerspective
    - Lightweight and free tool to visualize disk usage.
    - Treemap view rather than tree, but you can explore folders.
- SpaceLens by MacPaw
    - Part of the CleanMyMac suite.
    - Displays folder sizes in a tree view.
- TreeSize for macOS
    - Similar to the popular Windows tool, TreeSize shows folders in a tree format with size info.

Built-In Options
- Finder (Sort by Size)
    - Open Finder, navigate to your drive or folder.
    - Right-click and select “Get Info” on folders to check sizes. (Cumbersome for many folders.)
- Terminal Command
    - Use du (disk usage) to get a tree view of folder sizes:

du -sh * | sort -h

- Add -c to summarize total disk usage.
- Replace * with the folder path if you want to analyze a specific location.


Storage settings on Mac

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

(Note: the surrounding quotes for folder names with spaces)
