# Minnie
React-based WordPress Client

Demo: http://r.kucrut.org/

## Installation

### Server
1. Copy (and customize) the example [Nginx config](etc/nginx.conf).
2. Restart Nginx service.

### WordPress
1. [Install WordPress](http://codex.wordpress.org/Installing_WordPress).
2. Install and activate [Minnie theme](https://github.com/kucrut/wp-minnie).
3. Go to *Appearance* > *Menus*, create two menus and assign them to the *Social* and *Primary* locations.
4. Install and activate these plugins:
  - [WP REST API](https://wordpress.org/plugins/rest-api/)
  - [Bridge](https://github.com/kucrut/wp-bridge)
5. Go to *Settings* > *Permalinks* and set the structure to `/blog/%postname%`

### App
1. Clone this repo.
2. Copy `app/api/config.json-dist` to `app/api/config.json`
3. Copy (and customize) `process.json-dist` to `process.json`. Set `WP_API_HOST` to your WordPress site's *Home URL*.
4. Install [pm2](http://pm2.keymetrics.io/): `npm install -g pm2`
5. Run `npm install`
6. Run `pm2 start process.json`

## Developing
1. Run `WP_API_HOST=http://minnie.dev npm run dev`. Make sure to use your WordPress site's URL here.
2. Develop away.

## Contributing
...

## License
[GPL v3](http://www.gnu.org/licenses/gpl-3.0.en.html)
