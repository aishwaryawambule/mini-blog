## Mini Blog Application

## Important 
> Note: `EmailAddress is set as unique field, so the card edit/update is authorized based on whether requested author email address matches the card authored email address!`

Project Start Up:

Firstly:
```
install node 
install npm
install mongodb 
```

Secondly: `Install packages defined in package.json file`
```
npm install 
```

Thirdly: 
```
Reference .env.example file
create .env file with keys from .env.example file and values as per your configs
```

For building the project:
```
npm run build 
```

For running the project:
```
npm run start 
```

For creating new db migration file:
``` 
npm run migrate:new  
```

For running db migration:
``` 
npm run migrate:up
```

For revoking latest db migration:
``` 
npm run migrate:down
```

For checking db migration status:
``` 
npm run migrate:status
```

## Swagger 
> Note: `Swagger is enabled for development environment only`

Once service is up on specified port, in case of localhost, the swagger path:
http://localhost:5005/swagger

## GitHub

Repo Link: https://github.com/aishwaryawambule/mini-blog


