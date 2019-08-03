## toy-netflix-carousel
Coding exercise implementing Netflix's hover effect trademark on its carousel. [View demo](https://github.com/srph/toy-netflix-carousel).

![Preview](preview.gif)

### Setup
- Install the dependencies
```bash
npm i
```

- Copy `.env.example` to `.env`, and setup your environment config. Update the `API_CLIENT_*` based on the output from `php artisan passport:client --password` (refer to instructions above).
```bash
cp .env.example .env
```

- Start Parcel, and you're all good.
```bash
npm start
```