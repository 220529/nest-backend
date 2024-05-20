import os
from odps import ODPS

import sys
import json
import urllib.parse

from datetime import datetime

# 获取当前时间
now = datetime.now()

# 格式化为 "YYYYMMDD"
datatime = now.strftime("%Y%m%d")

# print(datatime)

# 从命令行参数读取输入
eventType = sys.argv[1]
encoded_string = sys.argv[2]

# 解码 URL 编码的字符串
decoded_string = urllib.parse.unquote(encoded_string)

# 将解码后的字符串解析为 JSON
json_params = json.loads(decoded_string)

# 打印解析后的 JSON 数据
# print(json_params.pid)

# 初始化 ODPS 对象

table = "library_project.sa"
# datatime = "20240519"

# 构建参数化查询
sql = """
    INSERT INTO {table}
    PARTITION (datatime = "{datatime}")
    VALUES (
        "{eventType}", "{userId}", "{appId}", "{pid}", "{aid}", "{ua}", "{url}", "{referrer}", "{timestamp}", "{args}"
    )
""".format(eventType=eventType,table=table,datatime=datatime,**json_params)

# 打印最终 SQL
print("Final SQL:", sql)

# 执行数据插入
r = o.execute_sql(sql)