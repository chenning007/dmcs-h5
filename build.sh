git pull
npm  run build
rm -rf /usr/local/nginx/html/dmcs
mkdir -p /usr/local/nginx/html/dmcs
echo "copy dist to nginx server ..."
cp -R dist/* /usr/local/nginx/html/dmcs
echo "reload nginx.."
/usr/local/nginx/sbin/nginx -s reload
echo "succeed!"
