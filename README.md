This is a bird studying app that I made.  To get it working on your local machine after cloning it, from the cloned directory:

```bash
npm install
```
That should install [11ty](https://11ty.dev) the static site generator that I'm using to build the site via npm (if you don't have node and npm installed do that first).

Then to generate and run the site:
```bash
npx @11ty/eleventy --serve
```

That should start up a server and build the site into a `_site` folder. If you open your web browser and navigate to: `http://localhost:8080/` you should be ready to go. 
