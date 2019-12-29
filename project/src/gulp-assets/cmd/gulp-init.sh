 #!/usr/bin/env bash

# dest path config for gulp
echo "Wordpress Theme folder ?"
read themefolder

echo "destination css folder?"
read cssfolderdest

# replace paths in gulpfile.js
sed -i.bak -e "s/<themefolder>/${themefolder//\//\\/}/g; s/<cssfolderdest>/${cssfolderdest//\//\\/}/g"  gulpfile.js

# end statement
echo "Gulpfile changed!"
