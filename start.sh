docker run --rm -d \          
  --name backend \
  --network testnet \
  backend:latest

docker run --rm -d \
  --name frontend \
  --network testnet \
  -p 8080:80 \
  frontend:latest