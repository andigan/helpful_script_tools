# bash_profile location
~/.bash_profile

# clear the console and clear the terminal log cache
alias cc="clear && printf \'\e[3J\'"

# git selector
alias gb="node node_git_chooser.js"

# npm script selector
alias rc="node npm_script_runner.js"

# show or hide all files in finder (mac)

alias showFiles='defaults write com.apple.finder AppleShowAllFiles YES; killall Finder /System/Library/CoreServices/Finder.app'

alias hideFiles='defaults write com.apple.finder AppleShowAllFiles NO; killall Finder /System/Library/CoreServices/Finder.app'
