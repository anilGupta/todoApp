#!/usr/bin/env bash
echo "

   ----------------- Installing Frontend Dependencies -----------------

 "
cd ./frontend
npm install
echo "

   ----------------- Bundling App -----------------

 "
npm run build
echo "

  ----------------- Installing Backend Dependencies -----------------

"
cd ./../backend
npm install
echo "

  ----------------- Serving App -----------------

"
node .
