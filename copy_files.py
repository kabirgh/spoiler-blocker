###################### FIREFOX #####################
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


# tw-ff
# tw-common
# utils-common
with open('./firefox/data/tw-ff.js', 'r') as tw_ff, \
open('tw-common.js', 'r') as tw_common, \
open('utils-common.js', 'r') as utils_common, \
open('./firefox/data/tw-exp.js', 'w+') as tw_exp:
	for line in tw_ff:
		tw_exp.write(line)

	for line in tw_common:
		tw_exp.write(line)

	for line in utils_common:
		tw_exp.write(line)

	tw_exp.truncate()

###################### CHROME #####################
# fb-chrome
# fb-common
# utils-common
with open('./chrome/fb-chr.js', 'r') as fb_chrome, \
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


# tw-chrome
# tw-common
# utils-common
with open('./chrome/tw-chr.js', 'r') as tw_chrome, \
open('tw-common.js', 'r') as tw_common, \
open('utils-common.js', 'r') as utils_common, \
open('./chrome/tw-exp.js', 'w+') as tw_exp:
	for line in tw_chrome:
		tw_exp.write(line)

	for line in tw_common:
		tw_exp.write(line)

	for line in utils_common:
		tw_exp.write(line)

	tw_exp.truncate()
