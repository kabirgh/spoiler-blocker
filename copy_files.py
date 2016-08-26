# Copies files common to both the chrome and firefox extensions into the
# correct folders.

from shutil import copy2


copy2('./fb-common.js', './firefox/data/')
copy2('./fb-common.js', './chrome')

copy2('./tw-common.js', './firefox/data/')
copy2('./tw-common.js', './chrome')
