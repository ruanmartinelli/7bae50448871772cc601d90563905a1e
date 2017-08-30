### Requirements

Node.js 7.6+ because of Async/Await

### Folder structure

Folders are divided using the following structure:

```bash
.
├── /test/                      # unit tests
├── /dist/                      # webpack bundle file
├── /client/                    # client-side react code
│   ├── /pages/                 # Home and Login pages
│   ├── /components/            # presentational components
│   └── /index.js               # react entry point
├── /server/                    # server-side code
│   ├── /controller/            # declaration of routes and handlers
│   ├── /helpers/               # helper functions
|   ├── /middleware/            # middleware functions
│   └── /index.js               # starts server
│   .webpack.config.js          # webpack configuration
└── db.json                     # lowdb file
```

### Running

1. Clone the repo

```bash
git clone https://github.com/ruanmartinelli/7bae50448871772cc601d90563905a1e.git
cd 7bae50448871772cc601d90563905a1e
```

2. Create a `.env` file

```bash
mv .env.example .env
```

3. Add your Twitter configuration in the `.env` file


4. Install dependencies

```bash
yarn install
```

4. Run

```bash
yarn start
```

### Develop

#### Start in dev mode

```bash
yarn run dev
```

#### Run tests

```bash
yarn test
```

