#!/bin/bash

# Start backend
(cd edtechServer && npm run dev) &

# Start frontend
(cd edtech && npm start) &

# Wait for both processes
wait
