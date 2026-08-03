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

Կայք՝ http://localhost:5000  
Ադմին՝ http://localhost:5000/admin  
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

## CI/CD (GitHub Actions → server)

`main` branch push անելիս Action-ը՝

1. project ZIP է սարքում (**առանց** `node_modules` / `.next`)
2. SCP-ով վերբեռնում է սերվեր
3. unzip է անում `DEPLOY_PATH`-ում
4. սերվերում `npm install` է անում
5. restart

Build-ը (`npm run build`) սերվերում առանձին արա, եթե `.next` չկա։

### GitHub Secrets

Repo → **Settings → Secrets and variables → Actions**՝ ավելացրու՝

| Secret | Example |
|--------|---------|
| `SSH_HOST` | `levshawarma.com` կամ սերվերի IP |
| `SSH_USERNAME` | `wmflggzahnbx` |
| `SSH_PRIVATE_KEY` | SSH private key (ամբողջական) |
| `DEPLOY_PATH` | `/home/wmflggzahnbx/levshawarma.com` |
| `SSH_PORT` | `22` (optional) |
| `SESSION_SECRET` | երկար գաղտնի բանալի (optional) |

### SSH key

Լոկալում՝

```bash
ssh-keygen -t ed25519 -C "github-deploy" -f lev-deploy -N ""
```

`lev-deploy.pub` ավելացրու սերվերի `~/.ssh/authorized_keys`-ում։  
`lev-deploy` private key-ի ամբողջ տեքստը դրիր `SSH_PRIVATE_KEY` secret-ում։

Սերվերում Node-ը պետք է լինի **20.19+** (օր. 20.20)։
