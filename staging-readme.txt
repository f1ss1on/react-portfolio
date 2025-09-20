To build for staging, you must install cross-env:

npm install --save-dev cross-env

Then use the script:

npm run build:staging

This will output the build to the /staging directory for your subdomain deployment.

If you see 'process is not defined', make sure you are running the build with cross-env and not using Vite's --mode for output directory.