#!/bin/bash

# shell脚本中发生错误，即命令返回值不等于0，则停止执行并退出shell
set -e

mongosh <<EOF
use admin
db.auth("$MONGO_INITDB_ROOT_USERNAME","$MONGO_INITDB_ROOT_PASSWORD")
use nest
db.createCollection("runoob")
db.runoob.insertMany([{ name: "2024", age: 20}])
EOF