import os

with open('utils-common.js', 'r') as utils_common, \
open('fb-common.js', 'r') as fb_common, \
open('fb-temp.js', 'w+') as fb_temp:
	for line in fb_common:
		fb_temp.write(line)
	for line in utils_common:
		fb_temp.write(line)


with open('fb-temp.js', 'r') as fb_temp, \
open('./firefox/data/fb-ff.js', 'r') as fb_ff, \
open('./firefox/data/fb-exp.js', 'w+') as fb_exp:
	for line in fb_ff:
		fb_exp.write(line)
	for line in fb_temp:
		fb_exp.write(line)

	fb_exp.truncate()

os.remove('fb-temp.js')
