# Minnie
React-based WordPress Client

Demo: https://kucrut.org/

## Installation

### WordPress
1. Install and activate [Minnie theme](https://github.com/kucrut/wp-minnie).
2. Go to *Appearance* > *Menus*, create two menus and assign them to the *Social* and *Primary* locations.
3. Install and activate these plugins:
  - [WP REST API](https://wordpress.org/plugins/rest-api/)
  - [Bridge](https://github.com/kucrut/wp-bridge)
  - [Bridge: Menus](https://github.com/kucrut/wp-bridge-menus)
  - [Bridge: Post Formats](https://github.com/kucrut/wp-bridge-post-formats)
  - [Application Passwords](https://github.com/georgestephanis/application-passwords) (only needed if you want to preview unpublished posts)
4. Go to *Settings* > *Permalinks* and set the structure to `/blog/%postname%`

### Minnie
1. Clone this repo.
2. Copy `app/config.js-dist` to `app/config.js`. Use your WordPress site's URL as the value of `apiUrl`.
3. Copy (and customize) `process.json-dist` to `process.json`.
4. Install [pm2](http://pm2.keymetrics.io/): `npm install -g pm2`
5. Run `npm install`
6. Run `pm2 start process.json`

### Server
1. Copy and customize the example [Nginx config](etc/nginx.conf).
2. Restart Nginx service.

## Developing
1. Run `npm run dev`.
2. Develop away.

## Contributing
...

## License
[GPL v3](http://www.gnu.org/licenses/gpl-3.0.en.html)
