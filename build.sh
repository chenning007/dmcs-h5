git pull
rm -rf /usr/local/nginx/html/dmcs
mkdir -p /usr/local/nginx/html/dmcs
echo "copy dist to nginx server ..."
cp -R dist/* /usr/local/nginx/html/dmcs
cp -R ./public/image  /usr/local/nginx/html/dmcs
echo "reload nginx.."
nginx -s reload
echo "succeed!"
