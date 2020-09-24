# UNIX Short Guidebook/Manual

"Shebang":

	#!/bin/sh

Change:

	chmod u+x myscript.sh

## Chaining multiple commands

- `&&`: run if previous success
- `||`: run if previous fail
- `;`: run in either case
- `echo $?`: echo previous status code/result (`0` means success)

Example:

	./runScript.sh && echo "success" || (sudo ./runScript.sh && echo "success" || echo "fail")

## Multiple files

	touch index.{html,js}
	mv some/path/{oldname,newname}

## Folders

	ls
	cd
	pwd
	mkdir -p deep/folder/path
	mkdir {folder1,folder2,folder3}

	ls -R


### Find and delete empty folders

	find . -type d -empty -print
	find . -type d -empty -delete

## File lists

### List files with relative path

List `folder/subfolder/file.ext`:

	find *

	find myFolder/*

List `./folder/subfolder/file.ext`:

	find . -name '*.js' -print

## Finding files

	ls
	find

	find /usr/bin -name 'filename*'
	find . -type d -name '.svn' -exec rm -rf {} \;
	find [dirname] -type f -name '\*.js'

### Finding using grep

	ls -1 | grep json

### Find text inside files

	grep -r --exclude-dir=node_modules "blabla" *
	grep "missionmaptext=" *.ini

	egrep -lir --include=*.{php,html,js} "(searchtext1|searchtext2)" .   # change -lir to -ir to show more...
	egrep -lir --include=Gruntfile.js "(livereload)" .

### Find text on web pages

	curl -v --silent https://server.com/project.json 2>&1 | tr '{' '\n{' | grep 'searchstring' >> output.txt

### Download a file

	wget https://server.com/myfile

### Pretty file tree

	find ./ | sed -e 's/[^-][^\/]*\//--/g;s/--/ |-/'  # add '-type d' for directories only

### Count lines of code (LOCs)

	find . -name '*.js' | xargs wc -l

### Find applications

	which node
	which sass # find command "sass"

## Text files

	cat
	more, less
	tail, head: tail -n 50 log/production.log

### Text File Manipulation

	grep
	awk

	# Only show lines 4 chars
	awk '{ if (length($0) > 4) print }' yourfile > your_output_file.txt

### Search/replace:

http://stackoverflow.com/questions/525592/find-and-replace-inside-a-text-file-from-a-bash-command

	sed -i -e 's/'STRING1'/'STRING2'/g' MyFile.txt
	sed -i -e 's/'"$var1"'/'"$var2"'/g' MyFile.txt

	sed s/search/replace/g old.txt > new.txt

(space = `\ `, backslash = `\b`)

http://www.grymoire.com/Unix/Sed.html

### Search/replace newline

	tr , '\n' < felicias.json > felicias2.json
	grep "slug" felicias2.json
	tr , '\n' < file
	tr "\n" "your chars" < your file

### Split text file

	split -l 10 domains.csv output-

### diff/compare text files

	diff leftfile rightfile


## The VI editor

http://www.cs.fsu.edu/general/vimanual.html

- edit/insert: i
- undo: u
- search: / (search again: n)
- quit: :q! (no save), ZZ (save)
- delete: x or dd


## File manipulation

	cp
	mv
	rm:	rm -r myfolder

	filename/foldername="$(echo $1 | sed "s/.*\///")"

## For loops

	for i in {Apple,Banana}; do echo ${i}; done
	for i in *; do echo ${i}; done
	for i in *.URL; do echo ${i}; cat "${i}"; done

	# Rename multiple, extension:
	for i in *.JPG; do mv ${i} ${i/.JPG}.jpg; done
	for i in *@2x.png; do mv ${i} ${i/@2x.png}-hd.png; done

	# Rename multiple, prefix:
	for i in Old*.jpg; do echo mv ${i} New${i#Old}; done
	for i in *copy.bmp; do echo mv \"${i}\" \"${i}2\"; done

### Bash script: promo_square

	input=./weld_promo_square/*.png
	output=output/promo_square
	format="png -quality 95"
	sizes=("358x358" "1000x800" "414x468" "558x558" "558x756")
	mkdir $output
	for filename in "$input"; do
		echo "$filename"
		for i in "${sizes[@]}"; do
			mogrify -format $format -thumbnail $i^ -extent $i -gravity center -format "$i.png" -path "./$output" "$filename"
		done
	done

### Links

	ln: links, e.g.
	ln -s sourcePath targetPath
	-s = symbolic, 1 source 2 target

### Change owner

	chmod o=rw (a:all, u:user, g:group, o:other = rwx)
	chmod u+rwx
	chmod u+x myscript.sh
	chown -R www drupal-6.15/
	chgrp -R www drupal-6.15/

## Superuser

	su: switch user, su tom
	sudo
	sudo visudo

	nohup: start and continue after hangup

### Show processes:

	ps x | grep node
	ps -ef
	ps aux # with CPU/memory usage
	top

	Port usage - checks port 80:
	lsof -i :80

	check memory: free
	check disk: df -h ./

### Network usage

http://www.macworld.com/article/1143351/netprocesses.html

	lsof -P -i -n | cut -f 1 -d " " | uniq

### Firewall

	ufw allow [PORT]
	ufw allow 3000

### Check version

	lsb_release -a  # "Ubuntu 8.04.1 hardy"

### Variables

	export NEW_RELIC_HOME=lib/config
	export PATH=$PATH:/path/to/my/stuff
	echo $PATHSS domain

### DNS (dns)

Flush DNS:

	dscacheutil -flushcache
	sudo killall -HUP mDNSResponder

Debug DNS:

	host savann.tomorroworld.com
	dig weld.io
	dig @SERVER-IP weld.io
	nslookup weld.io
	nslookup weld.io SERVER-IP

Switch DNS only on localhost, for testing:

	sudo local-cname staging.weld.io origin.cloudfront.net


### Batch Files

### Parameters

	echo It is a $1 day

	STR="Hello World!"
	echo $STR

	#!/usr/bin/env bash

### If/Else

	if [ "$1" = "foo" ]; then
		echo FOO
	elif [ "$1" = "bar" ]; then
		echo BAR
	else
		echo none
	fi

	if [ "$1" = "Either" ] || [ "$1" = "Or" ]; then
	fi

	if [[ -z "$1" ]]; then
		echo "empty"
	else
		echo "full"
	fi

	large_string=abc
	substring=ab
	if ! [ "${large_string/$substring}" = "$large_string" ]; then
		echo "${substring} was found in ${large_string}"
	else
		echo "${substring} is not in ${large_string}"
	fi

### Loops

	for i in $( ls ); do
		echo item: $i
	done

	sleep 1 # wait 1 second

### Functions

	function myFunction {
			echo $1
	}  
	myFunction Hello

	function myFunctionOneLine { echo $1 }
	myFunctionOneLine Hello


### MacOS .command files

	#!/usr/bin/env bash

	# Move Terminal Window to top-right
	osascript -e 'tell application "Terminal"' \
				-e 'set bounds of front window to {480,1,1280,400}' \
				-e 'end tell'

	# Move Terminal Window to bottom-left
	osascript -e 'tell application "Terminal"' \
				-e 'set bounds of front window to {1,400,600,700}' \
				-e 'end tell'

	# Change Terminal theme
	osascript -e 'tell application "Terminal" to set current settings of front window to settings set "Ocean"'

	osascript -e "ignoring application responses"
	osascript -e "end ignoring"

	osascript -e "tell application \"$appname\" to quit with saving"
	osascript -e "tell application \"System Events\" to return every application process whose (name $is_contains \"$arg\" or short name $is_contains \"$arg\" or title $is_contains \"$arg\" or displayed name $is_contains \"$arg\")"`
	osascript -e "tell application \"System Events\" to return every application process whose name $is_contains \"$arg\""`

### Go to starting folder

	currentdir="`dirname \"$0\"`"
	cd "$currentdir" || exit 1

	cd "subfolder"

### Set RVM version

	source ~/.rvm/environments/ruby-1.9.2-p290
	source ~/.rvm/environments/ruby-1.8.7-p352

## Bash script example

	#!/usr/bin/env bash

	if [[ -z "$4" ]]; then
		echo "Syntax:"
		echo ". active-inactive.sh [StartDate] [InactiveBreakoffDate] [EndDate] \"Event name\""
		echo "Example:"
		echo ". active-inactive.sh 2014-02-14 2014-03-05 2014-03-14 \"Open project\""
	else
		REPORTPATH="batchreport"
		echo "Initializing $REPORTPATH..."
		mkdir $REPORTPATH

		echo "Exporting users active in the full period $1 - $3..."
		node mixpanel-extract type:userlist from:$1 to:$3 > $REPORTPATH/temp1.txt
		grep -v '^$' $REPORTPATH/temp1.txt > $REPORTPATH/users-all.txt
		sort $REPORTPATH/users-all.txt -o $REPORTPATH/users-all.txt
		echo "Exporting users active after the breakoff date $2 - $3..."
		node mixpanel-extract type:userlist from:$2 to:$3 > $REPORTPATH/temp2.txt
		grep -v '^$' $REPORTPATH/temp2.txt > $REPORTPATH/users-active.txt
		sort $REPORTPATH/users-active.txt -o $REPORTPATH/users-active.txt
		echo "Extracting inactive users..."
		comm -23 "$REPORTPATH/users-all.txt" "$REPORTPATH/users-active.txt" > "$REPORTPATH/users-inactive.txt"

		echo "Loading users into variables..."
		sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/,/g' $REPORTPATH/users-all.txt > $REPORTPATH/temp3.txt
		ALLUSERS=`cat $REPORTPATH/temp3.txt`
		sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/,/g' $REPORTPATH/users-active.txt > $REPORTPATH/temp3.txt
		ACTIVEUSERS=`cat $REPORTPATH/temp3.txt`
		sed -e ':a' -e 'N' -e '$!ba' -e 's/\n/,/g' $REPORTPATH/users-inactive.txt > $REPORTPATH/temp3.txt
		INACTIVEUSERS=`cat $REPORTPATH/temp3.txt`

		echo "Exporting timeline for active users..."
		node mixpanel-extract from:$1 to:$3 type:timeline events:"$4" users:$ACTIVEUSERS > $REPORTPATH/timeline-active.txt
		echo "Exporting timeline for inactive users..."
		node mixpanel-extract from:$1 to:$3 type:timeline events:"$4" users:$INACTIVEUSERS > $REPORTPATH/timeline-inactive.txt

		echo "Cleaning up..."
		rm $REPORTPATH/temp*.txt
	fi

## MacPorts

`-d` = debug

	port installed
	port list boost*
	sudo port selfupdate
	sudo port install [name]
	sudo port uninstall installed # remove all

### Get old version of software

	cd
	mkdir macports-temp
	cd macports-temp
	svn co  -r 93341 'http://svn.macports.org/repository/macports/trunk/dports/devel/boost/'
	cd boost
	sudo port install
	sudo port install mongodb
	sudo port activate boost @1.49.0_0

## ImageMagick

	# Convert + rename + folder
	mogrify -format png -thumbnail $i^ -extent $i -gravity center -format "$i.png" -path "./$folder" "$1"

	# Resize: ignore aspect ratio
	convert -resize 320x50\! dummy_static.png banner_320x50.png

	# Convert multiple files
	mogrify -format png -path ./PNG *.bmp

	# BMP -> JPG
	mogrify -format jpg -quality 80 -path ./temp *.bmp

	# Resize to smaller
	mogrify -format jpg -resize 1024x -quality 90 -path ./small *.jpg
	mogrify -resize 25% -format jpg -quality 80 -path ./medium *.jpg
	mogrify -resize 10% -format jpg -quality 80 -path ./small *.jpg

	# Resize + Change format multiple images
	mogrify -resize 200% -path ./2X/ *.png // Create 2X images for iOS
	mogrify -resize 800x -quality 80 -path ./Small/ Mamma.jpg
	mogrify -resize 40% -quality 80 *.jpg
	convert -resize 500x -quality 80 "Picture 2.png" Zyked_Teams.jpg

	# Convert + Rename with numbering
	convert -quality 80 *.png majesty2_%02d.jpg

	# Crop + Rename with numbering
	convert -crop 260x397+9+55 *.bmp temp/cropimage_%02d.png

	# Crop Screenshot DS
	convert -crop 256x384+45+47 "Build - Buildings.png" "Cropped/Build - Buildings.png"
	convert -crop 256x384+45+47 *.png Cropped/*.png
	for i in *.png; do convert -crop 256x384+45+47 \"${i}\" \"Cropped/${i}\"; done

### Merge images

http://www.imagemagick.org/Usage/compose/

	convert -resize 220x qr01-25/001_x01aru.png foreground.png
	composite -gravity center -geometry +0-30 foreground.png background.png Output/sticker_01.png

	convert -resize 220x qr01-25/001_x01aru.png qr_scaled.png; composite -gravity center -geometry +0-30 qr_scaled.png sticker_template_aru.png Output/sticker_01.png
	convert -resize 220x 001_x01.png qr_scaled.png; composite -gravity center -geometry +0-45 qr_scaled.png sticker_template.png Output/sticker_01.png

### Collage

	montage '*.png' -geometry +3+3 Zyked-iPhone-Collage.jpg
	montage -label '%t' -resize 300x300 '*.jpg' -geometry +3+3 -tile 3x _Index.jpg
	montage -label '%t\n%wx%h' -resize 250x250 '*.jpg' -geometry +3+3 -tile 3x -frame 5 _Index.jpg

Make long list of images (PPT for instance):

	montage -geometry 500x '*.png' -tile 1x -border 2 slides.jpg

### Animating

	convert -delay 25 -loop 0 +dither Output/frame*.png Output/screenshot_animation.gif


## Time & Date

	date


## Sounds & Voice

	osascript -e 'beep'
	tput bel && sleep 0.33s && tput bel

Say - MacOS:

	say OK
	say -v Samantha The upgrade is now complete
	say -v Alva Hej på dig
	say -v \?

- ar_SA: Maged
- cs_CZ: Zuzana
- da_DK: Sara
- de_DE: Anna
- el_GR: Melina
- en-scotland: Fiona
- en_AU: Karen
- en_GB: Daniel
- en_IE: Moira
- en_IN: Veena
- en_US: Alex
- en_US: Fred
- en_US: Samantha
- en_US: Victoria
- en_ZA: Tessa
- es_AR: Diego
- es_ES: Jorge
- es_ES: Monica
- es_MX: Juan
- es_MX: Paulina
- fi_FI: Satu
- fr_CA: Amelie
- fr_FR: Thomas
- he_IL: Carmit
- hi_IN: Lekha
- hu_HU: Mariska
- id_ID: Damayanti
- it_IT: Alice
- it_IT: Luca
- ja_JP: Kyoko
- ko_KR: Yuna
- nb_NO: Nora
- nl_BE: Ellen
- nl_NL: Xander
- pl_PL: Zosia
- pt_BR: Luciana
- pt_PT: Joana
- ro_RO: Ioana
- ru_RU: Milena
- ru_RU: Yuri
- sk_SK: Laura
- sv_SE: Alva
- th_TH: Kanya
- tr_TR: Yelda
- zh_CN: Ting-Ting
- zh_HK: Sin-ji
- zh_TW: Mei-Jia


## Web server

	python -m SimpleHTTPServer


## Cron / scheduled tasks / daemons

https://www.easycron.com/ - HTTP

https://cloud.google.com/scheduler/

### Linux/macOS: crontab or launchd

https://ole.michelsen.dk/blog/schedule-jobs-with-crontab-on-mac-osx/

	crontab -l

Edit:

	env EDITOR=nano crontab -e
	
In file:

	0 12 * * *  cd ~/Documents/Development/JavaScript/Projects/niche-news && node lib/data/articles

(`Min Hour DayOfMonth Month DayOfWeek`)

Press CTRL+O and CTRL+X to save and exit.

Execute on workdays 1am: `0 1 * * 1-5 myscript.sh`
Execute every 10 minutes: `*/10 * * * * myscript.sh`

#### launchd

https://www.launchd.info/
