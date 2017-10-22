#!/bin/bash

# Converts a csv data file into the expected major / total formats.
# $1 -> filename


prefix=`basename ${1} _dl.csv`
major="${prefix}_major.csv"
total="${prefix}_total.csv"

head -1 $1 >> $major
grep $1 -e "major" >> $major

head -1 $1 >> $total
grep $1 -e "total" >> $total
