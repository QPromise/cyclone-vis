import pandas as pd
from pandas import DataFrame,Series
import csv

# 文件读取路径
read_path = "../static/data/numberByTimeDetail.csv"
st_path = "../static/data/"

# 读取数据
df = DataFrame(pd.read_csv(read_path, usecols=[0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11]))

year = 1990 # 开始年份
new_df = [] # 存放数据


# 分割年份
for i,row in enumerate(df.values):

    date = str(row[0])
    temp_year = date[6 : ]

    if str(temp_year) == str(year): # 为当前年份的数据

        new_df.append(row)

    else:

        # 保存整理好的文件文件
        save_path = st_path + str(year) + ".csv"
        temp = DataFrame(new_df, columns = ["date", "YYYYMMMDD", "BBBB", "DDDD", "H", "I", "LAT", "LONG", "PRES", "WND", "OWD"])
        temp = temp.fillna(int(0))
        temp.to_csv(save_path, encoding = "utf-8", index = False)
        print(year)
        # 将年份+1 数据集初始化
        year = year + 1
        new_df.clear()

        # 将当前的记录追加进新的数据集合中
        new_df.append(row)

# 将最后年份数据保存
save_path = st_path + str(year) + ".csv"
temp = DataFrame(new_df, columns = ["date", "YYYYMMMDD", "BBBB", "DDDD", "H", "I", "LAT", "LONG", "PRES", "WND", "OWD"])
temp = temp.fillna(int(0))
temp.to_csv(save_path, encoding = "utf-8", index = False)