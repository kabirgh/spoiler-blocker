# fb-ff
# fb-common
# utils-common
with open('./firefox/data/fb-ff.js', 'r') as fb_ff, \
open('fb-common.js', 'r') as fb_common, \
open('utils-common.js', 'r') as utils_common, \
open('./firefox/data/fb-exp.js', 'w+') as fb_exp:
	for line in fb_ff:
		fb_exp.write(line)

	for line in fb_common:
		fb_exp.write(line)

	for line in utils_common:
		fb_exp.write(line)

	fb_exp.truncate()


# fb-chrome
# fb-common
# utils-common
with open('./firefox/data/fb-chrome.js', 'r') as fb_chrome, \
open('fb-common.js', 'r') as fb_common, \
open('utils-common.js', 'r') as utils_common, \
open('./chrome/fb-exp.js', 'w+') as fb_exp:
	for line in fb_chrome:
		fb_exp.write(line)

	for line in fb_common:
		fb_exp.write(line)

	for line in utils_common:
		fb_exp.write(line)

	fb_exp.truncate()
