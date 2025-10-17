# 🚀 Production Deployment Guide

## Database Integration Setup

### Step 1: Upload Files
Upload the `admin/` folder to your shared hosting:
```
yourdomain.com/
├── admin/
│   ├── api/
│   ├── includes/
│   ├── uploads/
│   ├── config.php
│   ├── database.sql
│   ├── data.php
│   └── index.html
```

### Step 2: Database Setup
1. Create a MySQL database in cPanel
2. Import `admin/database.sql`
3. Update `admin/config.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'your_database_name');
define('DB_USER', 'your_db_username');
define('DB_PASS', 'your_db_password');
```

### Step 3: Set Permissions
```bash
chmod 755 admin/
chmod 644 admin/*.php
chmod 777 admin/uploads/
```

### Step 4: Test
- Visit: `yourdomain.com/admin/`
- Login: `admin` / `admin123`
- Add test project
- Check API: `yourdomain.com/admin/data.php?endpoint=all`

### Step 5: Update React Build
Update your production build to point to the correct API:
```javascript
// In usePortfolioData.jsx
const response = await fetch('/admin/data.php?endpoint=all');
```

### Step 6: Security
- Change admin password immediately
- Consider adding SSL certificate
- Restrict admin access by IP if needed

## 🎯 Current Status
- ✅ Database schema created
- ✅ PHP API endpoints working
- ✅ Admin interface functional
- ✅ React integration complete
- ✅ Fallback system in place
- ✅ Loading/error states handled

## 📱 Admin Features
- Add/Edit/Delete portfolio projects
- Upload and manage images
- Organize gallery categories
- Technology stack management
- Project status control (active/inactive)
- Featured project toggle

## 🔧 API Endpoints
- `GET /admin/data.php?endpoint=all` - Get all data
- `GET /admin/data.php?endpoint=projects` - Projects only
- `GET /admin/data.php?endpoint=gallery` - Gallery only
- `POST /admin/api/projects.php` - CRUD operations
- `POST /admin/api/upload.php` - File uploads

## 🐛 Troubleshooting
- **Database connection error**: Check config.php credentials
- **API returns empty**: Verify database has data
- **Images not loading**: Check uploads/ folder permissions
- **Login fails**: Verify admin_users table exists

Your portfolio now has a professional CMS backend! 🎉