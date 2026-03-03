# Clean Architecture Workshop (Bun)

This project contains **3 APIs**:

1. `main-api`: the API your consumers call.
2. `provider-a-api`: first upstream albums source.
3. `provider-b-api`: second upstream albums source.

To run the APIs, use the following command:

```bash
docker-compose up
```

This will start all three APIs on the following ports:

- `main-api`: http://localhost:3000
- `provider-a-api`: http://localhost:3001
- `provider-b-api`: http://localhost:3002

You can test the `main-api` by sending a GET request to `http://localhost:3000/albums`.
