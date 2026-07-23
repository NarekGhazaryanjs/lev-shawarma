# LEV Shawarma

Բարեկամի համար՝ կլոն արա և սերվերը մեկ հրամանով բացիր։

## Արագ մեկնարկ (Windows)

1. Տեղադրիր [Node.js LTS](https://nodejs.org) (եթե չկա)
2. Կլոն արա և գործարկիր․

```bash
git clone https://github.com/NarekGhazaryanjs/lev-shawarma.git
cd lev-shawarma
scripts\start-here.cmd
```

Կամ ձեռքով․

```bash
npm install
npm run setup
npm start
```

Կայք՝ http://localhost:3000  
Ադմին՝ http://localhost:3000/admin  
Մուտք՝ `admin` / `levadmin`

## Mac / Linux

```bash
git clone https://github.com/NarekGhazaryanjs/lev-shawarma.git
cd lev-shawarma
chmod +x scripts/start-here.sh
./scripts/start-here.sh
```

## Ինչ է անում setup-ը

- ստեղծում է `.env` (եթե չկա)
- գեներացնում է Prisma client
- ստեղծում է SQLite DB
- լցնում է սկզբնական տվյալները (մենյու, էջեր, ադմին)

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS 4
- Prisma + SQLite
- iron-session + bcryptjs

## Պորտ 3000-ը զբաղված է Windows-ում

Եթե `npm start`-ը տալիս է `EACCES`, մեկ անգամ **Administrator**-ով գործարկիր․

```
scripts\fix-port-3000.cmd
```

Հետո վերագործարկիր համակարգիչը և նորից `npm start`։

## Production

- `.env`-ում դրիր ուժեղ `SESSION_SECRET`
- փոխիր ադմինի գաղտնաբառը
- production-ում ավելի լավ է PostgreSQL
