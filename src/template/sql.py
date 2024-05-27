import os
from odps import ODPS
import sys

# 从命令行参数读取输入
sql = sys.argv[1]

# 初始化 ODPS 对象
access_id = ''
secret_access_key = ''
project = 'library_project'
endpoint = 'http://service.cn-beijing.maxcompute.aliyun.com/api'

o = ODPS(access_id, secret_access_key, project, endpoint=endpoint)

# 打印最终 SQL
print("Final SQL:", sql)

# 执行数据插入
r = o.execute_sql(sql)