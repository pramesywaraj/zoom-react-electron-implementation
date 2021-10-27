
cd `dirname $0`
deviceArch=$(arch)
if [ -d "./node_modules" ];then
	yarn run build-zoom-mac
else
	if [ "$deviceArch" = "arm64" ];then
		yarn install -arch=arm64
	else
		yarn install
	fi
yarn run build-zoom-mac
fi

version=$(./node_modules/.bin/electron --version)
if [ $? -ne  0 ];then
	echo "build fail ,electron not install"
	exit
else
	if [ "$deviceArch" = "arm64" ];then
		sed -i "" 's/11.0.1/'${version#*v}'/g' ./package.json
		sudo node-gyp rebuild -arch=arm64 --target=${version#*v}  --dist-url=https://atom.io/download/electron
	else
		sed -i "" 's/11.0.1/'${version#*v}'/g' ./package.json
		sudo node-gyp rebuild --target=${version#*v}  --dist-url=https://atom.io/download/electron
	fi
fi
cp -Rf ./build/Release/zoomsdk.node  ./sdk/mac && cp -Rf ./build/Release/zoomsdk_render.node  ./sdk/mac