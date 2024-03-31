echo "Switching to branch master"
git checkout master

echo "Building app... (Can also use npm instead of yarn)"
yarn run build

echo "Deploying files to server..."
scp -r build/* root@172.232.30.72:/var/www/172.232.30.72

echo "Done!"