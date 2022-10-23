#!/bin/bash
PROJECT_DIR="$PWD"
CONFIG_DIR=cardano-config/

if test -e $CONFIG_DIR; then
    echo "remove old config files"
    rm -r $CONFIG_DIR
fi

mkdir -p $CONFIG_DIR
cd $CONFIG_DIR
echo "start downloading to '"$CONFIG_DIR"'.."

wget https://raw.githubusercontent.com/input-output-hk/cardano-world/master/docs/environments/preprod/alonzo-genesis.json
wget https://raw.githubusercontent.com/input-output-hk/cardano-world/master/docs/environments/preprod/byron-genesis.json
wget https://raw.githubusercontent.com/input-output-hk/cardano-world/master/docs/environments/preprod/config.json
wget https://raw.githubusercontent.com/input-output-hk/cardano-world/master/docs/environments/preprod/shelley-genesis.json
wget https://raw.githubusercontent.com/input-output-hk/cardano-world/master/docs/environments/preprod/topology.json

cd $PROJECT_DIR

mkdir -p cardano-node/config && cp -rf $CONFIG_DIR/* cardano-node/config
mkdir -p app/config && cp $CONFIG_DIR/shelley-genesis.json ./app/config/shelley-genesis.json

