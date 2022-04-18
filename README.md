# m-tracker
A fun little nest.js app project that uses [chiptune2.js](https://github.com/deskjet/chiptune2.js) and [libopenmpt.js](https://lib.openmpt.org/) to play a variety on module files. (`*.xm`|`*.it`|`*.s3m`|`*.mod`) etc...

Why? Because most media players that support/use libopenmpt ignores sub songs entirely, and will only play sub song 1. Also this loops, it's neat.

Also, technically this software isn't a tracker. You'll just have to live with its name.

## Chiptune2.js

I've included some chaotic additions to `chiptune2.js`, so you won't be able to drop in a more recent copy without some tinkering.

## Playing

By default, I've included [space_debris.mod](https://modarchive.org/index.php?request=view_by_moduleid&query=57925) and a sample db.json file (named `public/data/modules/db.example.json`.)
You'll want to rename that to `db.json`, and then start the development server below. 

To add more modules files simply drop them into the modules folder and include them in `db.json`. Each category adds a dropdown header (has a depth of 1, so don't get fancy!), and the filename includes any paths. So if you had your modules in `public/data/modules/MyCoolModules` they could be under a `My Cool Modules` key, with the file name being `MyCoolModules/absolutebop.s3m`.

## Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

