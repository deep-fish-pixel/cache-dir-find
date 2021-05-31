# cache-dir-find
cache dir find

### About
Cache all dirs, then find dirs doesn't depend on reading dir;

### Install
Install with npm:

`$ npm install --save cache-dir-find`

### Uses

```
// Get new instance cache
const cacheDirFind = require("cache-dir-find");
const cacheDir = cacheDirFind();
cacheDir.add(...);
cacheDir.remove(...);
cacheDir.getChildren(...);
```

```
// Get this single instance cache
const {add, remove, getChildren} = require("cache-dir-find");
```

