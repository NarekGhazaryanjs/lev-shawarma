# LEV Shawarma

Full-stack website for LEV Shawarma with menu, gallery, and admin panel.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Prisma + SQLite
- iron-session + bcryptjs

## Run

```bash
npm start
```

Site: http://localhost:3000  
Admin: http://localhost:3000/admin

### Port 3000 blocked on Windows?

If `npm start` fails with `EACCES`, Windows has reserved port 3000.
Run once as **Administrator**:

```
scripts\fix-port-3000.cmd
```

Then restart the PC and run `npm start` again.

### Admin credentials (change after first login in production)

- Username: `admin`
- Password: `levadmin`

## Admin features

- Menu items CRUD with image upload
- Categories CRUD
- Gallery CRUD
- Site settings (phone, address, social links)

## Production notes

- Set a strong `SESSION_SECRET` in `.env`
- Change the default admin password
- Consider PostgreSQL instead of SQLite for production hosting
