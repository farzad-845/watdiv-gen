#!/bin/bash

MODEL=/opt/watdiv/model/wsdbm-data-model.txt
SCALE=1
QUERY_COUNT=5
RECURRENCE_FACTOR=1

usage() { echo "Usage: [-m path/to/model.txt] [-s <scale>] [-q <query count>] [-r <recurrence factor>] [-o <output path>]" 1>&2; exit 1; }
while getopts ":m:s:q:r:o:" o; do
    case "${o}" in
        m)
            MODEL=${OPTARG}
            ;;
        s)
            SCALE=${OPTARG}
            ;;
        q)
            QUERY_COUNT=${OPTARG}
            ;;
        r)
            RECURRENCE_FACTOR=${OPTARG}
            ;;
        o)
            OUTPUT_PATH=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done

# Generate dataset
echo "Generating model $MODEL with scale $SCALE"
./watdiv -d $MODEL $SCALE > $OUTPUT_PATH/dataset.nt

# Generate queries
mkdir -p $OUTPUT_PATH/queries
for query in /opt/watdiv/testsuite/*.txt; do
    query=$(basename $query)
    echo "Generating query $query with count $QUERY_COUNT and recurrence factor $RECURRENCE_FACTOR"
    ./watdiv -q $MODEL /opt/watdiv/testsuite/$query $QUERY_COUNT $RECURRENCE_FACTOR > $OUTPUT_PATH/queries/$query
done


# generate the compress file for the dataset and queries using tar
cd $OUTPUT_PATH
tar -czvf dataset.tar.gz dataset.nt queries

## remove the folder
# rm -rf dataset.nt queries
