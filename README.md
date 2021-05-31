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
cacheDir.getParent(...);
cacheDir.exist(...);
```

```
// Get this single instance cache
const { add, remove, getChildren, getParent, exist } = require("cache-dir-find");
```

