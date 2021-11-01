## Working

### Search

Exclude:

https://www.sublimetext.com/docs/3/projects.html
https://coderwall.com/p/bk90bw/exclude-a-directory-from-searching-in-sublime-text-2

See Browse Packages, file `Packages/User/Preferences.sublime-settings`

Cmd+P:

    "index_exclude_patterns": ["folder1/*", "folder2/*"]

Left-side folder tree list, Find in all:
    
    "file_exclude_patterns": ["file1"],
    "folder_exclude_patterns": ["folder1", "folder2"],

Old:

    -node_modules/,-.tmp/,-build/,-builds/,-bundle/,-out/,-dist/,-yarn*,-.next/,-__sapper__/,-.sass-cache/

Note: no initial slash /

Find irregular whitespace:

    "irregular whitespace": " "


### Difference

1. Simply select the two files (ie, by holding Ctrl on Windows or ⌘ on OS X) you want to compare in the sidebar (make sure you have navigated to the folder containing them, through "Open Folder..." or in a project),
2. Right click and select Diff files.


### Snippets

/Users/YOUR-USER-NAME/Library/Application\ Support/Sublime\ Text\ 3/Packages/User/Snippets

Open up Sublime Text.
Goto Tools->New Snippet.
Modify the contents inside of the block <content><![CDATA[ snippet_here ]]></content>
Enable your tab trigger.
Save the file as filename.sublime-snippet.
In a new file type in the tab trigger name and press tab!


## Configuring Sublime

### Package Control

https://sublime.wbond.net

### Themes

* http://colorsublime.com
* http://tmtheme-editor.herokuapp.com
* Package Control
