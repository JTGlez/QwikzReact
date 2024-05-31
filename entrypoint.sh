#!/bin/sh

# Generate env-config.js
echo "window._env_ = {" > /usr/share/nginx/html/env-config.js
echo "  VITE_API_URL: \"${VITE_API_URL}\"," >> /usr/share/nginx/html/env-config.js
echo "  VITE_API_KEY: \"${VITE_API_KEY}\"," >> /usr/share/nginx/html/env-config.js
echo "  VITE_APP_ID: \"${VITE_APP_ID}\"," >> /usr/share/nginx/html/env-config.js
echo "  VITE_AUTH_DOMAIN: \"${VITE_AUTH_DOMAIN}\"," >> /usr/share/nginx/html/env-config.js
echo "  VITE_MESSAGING_SENDER_ID: \"${VITE_MESSAGING_SENDER_ID}\"," >> /usr/share/nginx/html/env-config.js
echo "  VITE_PROJECT_ID: \"${VITE_PROJECT_ID}\"," >> /usr/share/nginx/html/env-config.js
echo "  VITE_STORAGE_BUCKET: \"${VITE_STORAGE_BUCKET}\"" >> /usr/share/nginx/html/env-config.js
echo "}" >> /usr/share/nginx/html/env-config.js

# Start Nginx
nginx -g "daemon off;"