# API Endpoints

This file describes every single endpoint implemented in this API.

The .http files in this folders also provide a way to test these endpoints with ease, all that is necessary is the [Rest Client](https://marketplace.visualstudio.com/items/?itemName=humao.rest-client) extension installed in Visual Studio Code. It is important to start testing from auth.http because most of the API calls will depend on the logged user token, and you obtain that code via the login endpoint.

**Important:** Also make sure to update the environment variables contained on each .http file.
