# Codello APIs

## authRouter

- POST /signup
- POST /login
- POST /logout

## profileRouter

- GET /profile
- PATCH /profile/edit
- PATCH /profile/password
- DELETE /profile/delete

## connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter

- GET /user/connections
- GET /user/requests/received
- GET /user/feed

## Request Status

- Interested
- Ignored
- Accepted
- Rejected
