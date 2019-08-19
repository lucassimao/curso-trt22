import urllib, sys;
import cgi

fp = open(sys.argv[1], 'r')

print cgi.escape(fp.read())
fp.close()
