
unset npm_config_prefix

. $NVM_DIR/nvm.sh 

FAIL_UPDATE_NVM_REGEX="(WARNING|exist|N\/A)"

echo "$1" > .nvmrc
NODE_UPDATE_VERSION=$(nvm alias default $1)

echo $NODE_UPDATE_VERSION