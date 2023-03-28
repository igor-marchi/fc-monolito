# Monolith structure module based

## Run tests

`npm run test`

## Run server

`npm run server`

# Requests

## Create product

```
curl -d '{"name": "my product", "description": "value2", "price": 230, "stock": 1}' -H "Content-Type: application/json" -X POST localhost:3030/products
```

# Create Client

```
curl -d '{"name": "Jon Doe", "email": "jondoe@domain.com", "document": "00000000", "street": "Some place", "number": "123", "complement": "Ap 400", "city": "my city", "state": "my state", "zipCode": "89213324"}' -H "Content-Type: application/json" -X POST localhost:3030/clients
```

# Checkout

```
curl -d '{"clientId": "0abfb412-803d-4b3a-a224-c5a72fe2bda5", "products": [{ "productId": "356dac99-fce7-46c2-9b26-06a33ffc3da5" }]}' -H "Content-Type: application/json" -X POST localhost:3030/checkout
```

# Invoice

```
curl -H "Content-Type: application/json" -X GET localhost:3030/invoice/:invoiceID
```
