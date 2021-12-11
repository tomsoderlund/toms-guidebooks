# Git

## Start new

	cd /path/to/your/project

	touch .gitignore
	touch README.md
	touch LICENSE.md

	git init
	git remote add origin https://github.com/YOUR-USER-NAME/eurocard.se-exporter.git
	# OR git remote add origin https://YOUR-USER-NAME@bitbucket.org/ORG-NAME/repo-name.git

(modify files)

	git add .
	git commit -m "First commit"
	git push -u origin master

Quick:

	git commit -a -m "Description" && git push
	git add . && git commit -a -m "Description" && git push

## Clone existing

	cd /path/to/your/project
	git clone https://YOUR-USER-NAME@bitbucket.org/ORG-NAME/repo-name.git .

(modify files)

	git add .
	git commit -m "Update"
	git push

## Clone others

	git clone https://github.com/XXXX/YYYY.git *your-project-name*

## Commit updates

	git status
	git add .
	git commit -m 'Update'
	git push

## Checkout version

## Cherrypick

	git cherry-pick commitID

## Heroku

	heroku create myappname
	git push heroku master
	git push -f heroku HEAD:master #non-master branch

# Information

	git branch # list branches
	git branch -a # list remote branches

	git status

	git log # history

	git log | grep [searchstring]


	git config --get remote.origin.url
	git remote show origin

## Search commits:

	git log -g --grep=Feature

## Forks

https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork

	# 1. Fetch the branches from the upstream repository
	git fetch upstream
	# 2. Merge the changes from upstream/master into your local master branch
	git merge upstream/master

Custom fork in `package.json`:

	username/repo#branch-name

	"botkit": "jonchurch/botkit#multi-hears",
	"mongoose-crudify": "git+https://github.com/tomsoderlund/mongoose-crudify.git",

## Troubleshooting

### Test a specific commit - history

	git checkout [hash]
	git checkout master

### Undo/revert/rollback/unstage/reset

	git checkout . # this removes all changes marked in red

	# Setting your branch to exactly match the remote branch can be done in two steps:
	git fetch origin
	git reset --hard origin/BRANCHNAME

	git reset 0d1d7fc32e5a947fbd92ee598033d85bfc445a50
	git reset --hard 0d1d7fc32e5a947fbd92ee598033d85bfc445a50

	git revert HEAD~3 # rollback 3 commits

Reset/rollback to _specific_ commit:

- Empty the working tree: `git rm -r --cached . && git clean -f -d`
- Bring the working tree to the state we want: `git checkout c366a0de9fe00309a3427c25903e876bfd42fd35 .`
- Create the revert commit: `git add --all && git commit -m "revert to c366a0de9fe00309a3427c25903e876bfd42fd35"`

Unstage file not yet committed:

	git reset <file>

	git reset --hard # revert uncommitted files

	git branch -D production # delete local branch
	git checkout production # get new from server
	git branch -D production && git checkout production   # do both

### Undo & Redo commit

	git commit -m "Something terribly misguided"
	git reset HEAD~

...edit files as necessary

	git add ...
	git commit -c ORIG_HEAD

### Delete branch both locally and remotely

	git branch -d MYBRANCH && git push origin :MYBRANCH   # (caps D for force deletion)

	git checkout -b production # get new from server, create branch

	git reset --hard @~1 # back 1 step

	git reset --hard origin/mybranch # clear staged commits and go back to version on GitHub

	git reset HEAD <file> # unstages the file in the current commit.
	git rm --cached <file> # will unstage the file for future commits also. It's unstaged untill it gets added again with git add <file>.

### Undo a commit and redo

		git commit ...              (1)
		git reset --soft 'HEAD^'    (2)

	$ edit                        (3)

		git add ....                (4)
		git commit -c ORIG_HEAD     (5)

### Bisect for finding errors/bugs

(first find a good version by testing randomly or using git log)

	git bisect start
	git bisect bad  # Current version is bad
	git bisect good ddff66ee  # Commit 'ddff66ee' is known to be good
	git bisect reset

## Move files

	git mv oldname newname

is just shorthand for::

	mv oldname newname
	git add newname
	git rm oldname

## Move folders

	mkdir include
	mv common include
	git rm -r common
	git add include/common

## Branching/merging

git pull = git fetch + git merge

Create branch:

	git checkout -b my-branch   # same as: git branch my-branch + git checkout my-branch

(.. make edits, then commit:)

	git commit -a -m 'Bla bla'

Merging:

	git checkout master
	git merge my-branch

	git branch -d my-branch # delete

Switch branch:

	git checkout my-branch

### Delete branch

List branches:

	git branch

Delete local branch:

	git branch -d my-branch
	git branch -D my-branch  # force

Delete remote branch:

	git push -d origin my-branch

Delete BOTH branches:

	git branch -d my-branch; git push --delete origin my-branch

## Empty commit

    git commit -m 'Empty commit to force new build' --allow-empty

## Raymond Goo

Here is my workflow:

Work on master branch, change stuff:

	git commit # to master
	git push # to master

These steps merges master into stage:

	git checkout stage
	git merge master
	git push
	git checkout master

## Move folder case

mkdir src/temp
git mv src/Common/* src/temp/

rm src/Common
mkdir src/common
git mv src/temp/* src/common/

## Move a complex file structure

1. Copy files
2. Create 2 file lists:

	find * | grep -v -E '.DS_Store|node_modules|build' > ../git-before.txt
	find * | grep -v -E '.DS_Store|node_modules|build' > ../git-after.txt

Sheet: https://docs.google.com/spreadsheets/d/1E7bQpNLCp_V9yVl1v6Ifxw9Dsn_eA7R_IBTlwj4QS0E/edit

## Licenses

	"license": "UNLICENSED",
	"license": "ISC",

## Submodules

	git submodule init
	git submodule update

https://git-scm.com/book/en/v2/Git-Tools-Submodules#_cloning_submodules
