# cache-dir-find
cache dir find

### About
Cache all dirs, then find dirs doesn't depend on reading dir;

### Install
Install with npm:

`$ npm install --save cache-dir-find`

### Uses

```
// instance 
const cacheDirFind = require("cache-dir-find");
const cacheDir = cacheDirFind();
cacheDir.add(...);
cacheDir.remove(...);
cacheDir.getChildren(...);
```

```
const {add, remove, getChildren} = require("cache-dir-find");
```

