# crowdmap

A map editor for [Pokémon Polished Crystal](https://github.com/roukaour/polishedcrystal).

Clone inside your polishedcrystal repo. 

Convert map-related graphics to PNG:

    ./gfx.py png gfx/tilesets/*.2bpp.lz gfx/tilesets/roofs/*.2bpp gfx/overworld/*.2bpp

To start the editor, run `python crowdmap/server.py`. It will give you a link to open in your browser (usually [http://127.0.0.1:8000/crowdmap](http://127.0.0.1:8000/crowdmap)).

## Browser

Use Chrome. Firefox has caching issues.
