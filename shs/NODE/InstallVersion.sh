
unset npm_config_prefix

. $NVM_DIR/nvm.sh 

echo "$1" > .nvmrc
NODE_INSTALL_VERSION=$(nvm install $1)

echo $NODE_INSTALL_VERSION