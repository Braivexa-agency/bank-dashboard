# Frontend-Backend Connection Guide

This guide explains how to connect the React frontend with the Laravel backend API.

## Prerequisites

1. **Backend Server Running**
   - Navigate to `bank-dashboard-server`
   - Run `php artisan serve` (default: http://localhost:8000)

2. **Frontend Server Running**
   - Navigate to `bank-dashboard`
   - Run `npm run dev` (default: http://localhost:5173)

## Configuration

### 1. Environment Variables

Create a `.env` file in the `bank-dashboard` directory (or copy from `.env.example`):

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

The API client will automatically use this URL. If not set, it defaults to `http://localhost:8000/api`.

### 2. CORS Configuration

The backend CORS is already configured in `bank-dashboard-server/config/cors.php` to allow requests from:
- `http://localhost:5173` (Vite default)
- `http://localhost:3000` (React default)

If you're using a different port, update the `allowed_origins` array in the CORS config.

## API Client Structure

### API Client (`src/lib/api-client.ts`)
- Configured axios instance with base URL
- Request/response interceptors
- Automatic token handling (if using authentication)

### API Services (`src/lib/api/`)
- `information-sheets.ts` - Information sheet operations
- `bank-experiences.ts` - Bank experience operations
- `non-bank-experiences.ts` - Non-bank experience operations
- `disciplinary-actions.ts` - Disciplinary action operations

### React Query Hooks (`src/hooks/`)
- `use-information-sheets.ts` - Information sheet hooks
- `use-bank-experiences.ts` - Bank experience hooks
- `use-non-bank-experiences.ts` - Non-bank experience hooks
- `use-disciplinary-actions.ts` - Disciplinary action hooks

## Usage Examples

### Using React Query Hooks

```tsx
import { useInformationSheets, useCreateInformationSheet } from '@/hooks/use-information-sheets'

function MyComponent() {
  const { data: sheets, isLoading } = useInformationSheets()
  const createMutation = useCreateInformationSheet()

  const handleCreate = async () => {
    await createMutation.mutateAsync({
      matricule: 'EMP001',
      nom: 'Doe',
      prenom: 'John',
      // ... other fields
    })
  }

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      {sheets?.map(sheet => (
        <div key={sheet.id}>{sheet.nom} {sheet.prenom}</div>
      ))}
    </div>
  )
}
```

### Direct API Calls

```tsx
import { informationSheetsApi } from '@/lib/api/information-sheets'

// Get all
const sheets = await informationSheetsApi.getAll()

// Get by ID
const sheet = await informationSheetsApi.getById(1)

// Create
const newSheet = await informationSheetsApi.create({ ... })

// Update
const updated = await informationSheetsApi.update(1, { ... })

// Delete
await informationSheetsApi.delete(1)
```

## Data Transformation

The API services automatically transform data between:
- **Frontend format** (camelCase): `dateOfBirth`, `nationalId`
- **Backend format** (snake_case): `date_of_birth`, `national_id`

You don't need to worry about this transformation - it's handled automatically.

## Testing the Connection

1. **Start both servers:**
   ```bash
   # Terminal 1 - Backend
   cd bank-dashboard-server
   php artisan serve

   # Terminal 2 - Frontend
   cd bank-dashboard
   npm run dev
   ```

2. **Check API health:**
   - Visit: http://localhost:8000/api/information-sheets
   - Should return JSON (empty array if no data)

3. **Check frontend:**
   - Visit: http://localhost:5173
   - Open browser DevTools → Network tab
   - Navigate to a page that uses the API
   - Check for API calls to `http://localhost:8000/api/...`

## Troubleshooting

### CORS Errors
- Ensure backend CORS config includes your frontend URL
- Check that both servers are running
- Verify the API base URL in frontend `.env`

### 404 Errors
- Verify the backend routes are registered in `routes/api.php`
- Check that `bootstrap/app.php` includes the API routes
- Ensure the API base URL is correct

### Connection Refused
- Verify backend server is running on port 8000
- Check firewall settings
- Ensure no other service is using port 8000

### Data Not Loading
- Check browser console for errors
- Verify API responses in Network tab
- Check React Query DevTools for query status
- Ensure database migrations have been run

## Next Steps

1. Update contexts to use API hooks instead of local state
2. Add error handling and loading states
3. Implement authentication if needed
4. Add optimistic updates for better UX

