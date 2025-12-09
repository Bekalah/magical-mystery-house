# API Documentation

## Endpoints

### Base URL
```
https://api.example.com/v1
```

## Authentication

All API requests require authentication via Bearer token.

```
Authorization: Bearer <token>
```

## Rate Limiting

- 100 requests per minute per IP
- 1000 requests per hour per user

## Error Handling

All errors follow this format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {}
  }
}
```

## Status Codes

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
