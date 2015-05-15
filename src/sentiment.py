#!/usr/bin/python

import cPickle as pickle
import nltk.classify.util
from nltk.classify import NaiveBayesClassifier
from nltk.tokenize import word_tokenize
import sys

sys.stderr.write("Started mapper.\n");


def word_feats(words):
    return dict([(word, True) for word in words])

def main(argv):
    count = 0
    classifier = pickle.load(open("classifier.p", "rb"))
    for line in sys.stdin:
        count += 1
        tolk_posset = word_tokenize(line.rstrip())
        d = word_feats(tolk_posset)
        print "LongValueSum:" + " " + str(count / 1000) + "day" + ": " + classifier.classify(d) + "\t" + "1"


if __name__ == "__main__":
    main(sys.argv)