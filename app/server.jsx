import path from 'path'
import { fetchComponentDataBeforeRender } from 'api/fetchComponentDataBeforeRender';

export default function render( req, res ) {
  res.send( renderFullPage( '', {} ) )
}

function renderFullPage( html, initialState ) {
  return `<!doctype html>
<html>
  <head>
    <meta charset=utf-8 />
    <title>WordPress, Reactified.</title>
  </head>
  <body>
    <div id="app">Welcome!</div>
    <script>
      window.__INITIAL_STATE__ = ${JSON.stringify( initialState )};
    </script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
  </body>
</html>`
}
