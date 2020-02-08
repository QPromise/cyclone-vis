import pandas as pd
from pandas import DataFrame, Series
import json
import numpy as np

# 构造节点数据
def getNode(data):
    temp = {
        "Date": data[0],
        "I": data[5],
        "Lat": data[6],
        "Long": data[7],
        "Pres": data[8],
        "Wnd": data[9],
        "Owd": data[10]
    }

    return temp


# 获取某一年份的数据
def getYearData(year):
    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    # 获取当前年份里面气旋名称的集合
    namelist = df["H"]
    namelist = namelist.drop_duplicates()  # 去重

    dataset = []  # 存放最终的数据集合
    cyclonelist = []  # 存放气旋的数据集

    # 生成气旋的二维列表
    for i in range(0, len(namelist)):
        cyclonelist.append([])

    # 构造数据集合
    for i, row in enumerate(df.values):

        # 将当前行的气旋名称分离出来
        t_name = row[4]

        # 匹配相应的气旋列表
        for j, name in enumerate(namelist):

            if t_name == name:
                # 将当前行追加进相应的气旋列表中
                cyclonelist[j].append(getNode(row))

    # 将气旋列表转换成json格式
    for i, name in enumerate(namelist):
        dataset.append({"Name": name, "Feature": cyclonelist[i]})

    return dataset


# 获取某年某月的数据
def getYearMonthData(year, month):
    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    dataset = []  # 存放所有的数据
    namelist = []  # 存放气旋名称的列表
    cyclonelist = []  # 存放气旋数据的二维列表

    #  获取气旋名称集合
    namelist = df['H']
    namelist = list(namelist.drop_duplicates())

    # 创建二维列表
    for i in range(0, len(namelist)):
        cyclonelist.append([])

    for i, row in enumerate(df.values):

        t_month = int(row[0][:2])  # 获取月份

        if t_month == month:  # 当前行为month的数据

            t_name = row[4]  # 获取气旋名称

            for j in range(0, len(namelist)):

                if t_name == namelist[j]:

                    cyclonelist[j].append(getNode(row))

    # 构造json数据集合
    for i in range(0, len(namelist)):

        if len(cyclonelist[i]) > 0:

            dataset.append({"Name": namelist[i], "Feature": cyclonelist[i]})

    return dataset


# 获取年份范围的数据
def getYearRangeData(start, end):

    dataset = []

    for i in range(start, end + 1):

        dataset.append({"Year": i, "Data": getYearData(i)})

    return dataset


# 获取某年的饼图数据
def getPieYearData(year):

    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    name = ["TD or None", "TD", "TS", "STS", "TY", "STY", "SuperTY"]

    dataset = []

    strengthlist = df["I"]
    strengthlist = list(strengthlist.drop_duplicates())
    if 9 in strengthlist:
        strengthlist.remove(9)
    strengthlist.sort()

    # 存放各个强度相应的数量
    strengthcount = [0] * len(strengthlist)

    # 计算各个强度的数量
    for i, row in enumerate(df.values):

        strength = row[5]

        for j in range(0, len(strengthlist)):

            # 判断是哪个强度值
            if strengthlist[j] == strength:

                # 相应的数量增加1
                strengthcount[j] = strengthcount[j] + 1

    # 构造json数据
    for i in range(0, len(strengthlist)):

        dataset.append({"name": name[i], "value": strengthcount[i]})

    return dataset


# 获取某年某月的饼图数据
def getPieYearMonthData(year, month):

    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    name = ["TD or None", "TD", "TS", "STS", "TY", "STY", "SuperTY"]

    dataset = []

    strengthlist = df['I']
    strengthlist = list(strengthlist.drop_duplicates())
    if 9 in strengthlist:
        strengthlist.remove(9)

    # 存放各个强度的数量
    strengthcount = [0] * len(strengthlist)

    # 计算各个强度的数量值
    for i, row in enumerate(df.values):

        t_month = int(row[0][:2])

        # 判断是否为month月份
        if t_month == month:

            # 将强度分离出来
            strength = row[5]

            for j in range(0, len(strengthlist)):

                if strengthlist[j] == strength:

                    strengthcount[j] = strengthcount[j] + 1

    # 构建json数据格式
    for i in range(0, len(strengthlist)):

        if strengthcount[i] > 0:

            dataset.append({"name": name[i], "value": strengthcount[i]})

    return dataset


# 获取年份范围的饼图数据
def getPieYearRangeData(start, end):

    dataset = []

    # 计算从start至end的时间范围的各个强度的数量
    for i in range(start, end+1):

        if i == start: # 将最开始的年份数据对dataset进行初始化

            dataset = getPieYearData(i)

        else:

            temp = getPieYearData(i)

            # 将其他年份数据加进datase中
            for var in temp:

                for j in dataset:

                    if var["name"] == j["name"]:

                        j["value"] = j["value"] + var['value']

                        break

    
    return dataset


# 获取某年某月的折线图的信息
def getLineYearMonthData(year, month):

    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    dataset = []
    time_list = [] #时间数组
    cyclone_list = [] #存放气旋信息
    intensity_list = [] # 存放气旋强度信息的二维列表
    inten_time_list = [] # 存放各个气旋类型对应各个时间点的中心气压值 二维列表


    strengthlist = df['I'] # 强度列表
    strengthlist = list(strengthlist.drop_duplicates())
    if 9 in strengthlist:
        strengthlist.remove(9)
    
    # 创建气旋强度信息的二维列表
    for i in range(0, len(strengthlist)):
        intensity_list.append([])

    # 创建存放各种类型气旋的各个时间点对应的中心气压值 二维列表
    for i in range(0, len(strengthlist)):
        inten_time_list.append([])

    # 获取时间数组以及对应的气旋信息数组
    for i, row in enumerate(df.values):

        date_row = row[0]
        #print(date_row)
        mm = int(str(date_row)[:2])

        # 判断当前行是否为所选择的年月范围
        if mm == month:

            # 将信息追加进对应的列表中
            if date_row not in time_list:
                time_list.append(date_row)
            cyclone_list.append(row)

        if month < mm:
            break

    # 将时间添加到最后的数据集中
    dataset.append({"TimeList": time_list})

    # 获取相对应的气旋强度的中心气压值
    for i, row in enumerate(cyclone_list):
        date_row = row[0]

        for j, intensity in enumerate(strengthlist):

            if intensity == row[5]: 
                
                # 将对应的信息追加进气旋强度信息的二维列表中
                intensity_list[j].append(row)
                break


    # 根据时间计算各个强度的平均气压值
    for time in time_list:
         
        # 获取各个强度信息列表中的节点
        for i, intenNode in enumerate(intensity_list):

            count = 0
            sum = 0

            # 获取节点中的平均中心气压值
            for var in intenNode:
                
               if var[0] == time:
                  
                   count = count + 1
                   sum = sum + var[8]
            if count == 0:
                inten_time_list[i].append(0)
            else:
                avg = int(sum / count)
                inten_time_list[i].append(avg)

    print(inten_time_list)
    
    dataset.append({"IntenTimeList": inten_time_list})

    return dataset


# 绘制某年的折线图信息
def getLineYearData(year):

    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    dataset = []
    time_list = [] #时间数组
    cyclone_list = [] #存放气旋信息
    intensity_list = [] # 存放气旋强度信息的二维列表
    inten_time_list = [] # 存放各个气旋类型对应各个时间点的中心气压值 二维列表


    strengthlist = df['I'] # 强度列表
    strengthlist = list(strengthlist.drop_duplicates())
    if 9 in strengthlist:
        strengthlist.remove(9)
    
    # 创建气旋强度信息的二维列表
    for i in range(0, len(strengthlist)):
        intensity_list.append([])

    # 创建存放各种类型气旋的各个时间点对应的中心气压值 二维列表
    for i in range(0, len(strengthlist)):
        inten_time_list.append([])

    # 获取时间数组以及气旋信息数组
    for i, row in enumerate(df.values):

        date_row = row[0]

        if date_row not in time_list:
            time_list.append(row[0])

        cyclone_list.append(row)

    # 将时间添加到最后的数据集中
    dataset.append({"TimeList": time_list})

    # 获取相对应的气旋强度的中心气压值
    for i, row in enumerate(cyclone_list):
        
       
        
        date_row = row[0]

        for j, intensity in enumerate(strengthlist):

            if intensity == row[5]: 
                
                # 将对应的信息追加进气旋强度信息的二维列表中
                intensity_list[j].append(row)
                break


    # 根据时间计算各个强度的平均气压值
    for time in time_list:
         
        # 获取各个强度信息列表中的节点
        for i, intenNode in enumerate(intensity_list):

            count = 0
            sum = 0

            # 获取节点中的平均中心气压值
            for var in intenNode:
                
               if var[0] == time:
                  
                   count = count + 1
                   sum = sum + var[8]
            if count == 0:
                inten_time_list[i].append(0)
            else:
                avg = int(sum / count)
                inten_time_list[i].append(avg)
    
    dataset.append({"IntenTimeList": inten_time_list})

    return dataset


# 获取年份范围的折线图信息
def getLineYearRangeData(start, end):

    
    dataset = [] # 总的数据信息

    time_list = [] # 总的时间数组
    inten_time_list = [] # 总的中心气压值信息


    for year in range(start, end+1):

        res = getLineYearData(year)

        

        time_temp = res[0]
        pres_temp = res[1]

        # 将每一年的时间添加进最终的时间数组中
        for var in time_temp["TimeList"]:
            time_list.append(var)

        # 将每一年的中心气压值添加进最终的中心气压值集合中
        for var in pres_temp["IntenTimeList"]:
            inten_time_list.append(var)


    dataset.append({"TimeList": time_list})
    dataset.append({"IntenTimeList": inten_time_list})

    return dataset

# 获取某年某月的热力图信息
def getHotYearData(year):

    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    lat_list = []
    long_list = []
    count_list = []


    for i, row in enumerate(df.values):
        
        lat = int(row[6])
        long = int(row[7])
        if i == 0:
            lat_list.append(lat)
            long_list.append(long)
            count_list.append(1)
        else:
            flag = True
            for j in range(0 ,len(lat_list)):
                if lat == lat_list[j] and long == long_list[j]:
                    count_list[j] = count_list[j] + 1
                    flag = False
            if flag:
                lat_list.append(lat)
                long_list.append(long)
                count_list.append(1)

    dataset = []


    for i in range(0, len(lat_list)):

        temp = {
            'lat':lat_list[i],
            'lng': long_list[i],
           
            'count':count_list[i]
            }

        dataset.append(temp)
    return dataset



# 获取某年某月气压以及速度的柱状图信息
def getBarYearData(year):
    
    read_path = "./static/data/" + str(year) + ".csv"
    df = pd.read_csv(read_path, encoding="utf-8")

    dataset = []
    press = []
    speed = []

    press_min = 10000
    speed_min = 10000
    press_max = 0
    speed_max = 0

    p = [940, 96, 980, 110]
    s = [25, 45, 65, 85]
    p_count = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]   
    s_count = [[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0],[0, 0, 0, 0]]
    
    for i,row in enumerate(df.values):

        c_type = int(row[5])
        press_ = int(row[8])
        speed_ = int(row[9])
        print(c_type)
        flag = True
        for j in range(0, len(p)):
           
            if press_ < p[j] and flag == True and c_type < 9:
                flag = False
                p_count[c_type][j] =  p_count[c_type][j] + 1

        flag = True
        for j in range(0, len(s)):
           
            if speed_ < s[j] and flag == True and c_type < 9:
                flag = False
                s_count[c_type][j] =  s_count[c_type][j] + 1



        #if row[8]< press_min:
        #    press_min = row[8]
        #if row[8] > press_max:
        #    press_max = row[8]
        #if row[9] < speed_min:
        #    speed_min = row[9]
        #if row[9] > speed_max:
        #    speed_max = row[9]

    for j in range(0, 7):

        press.append(p_count[j])
        speed.append(s_count[j])
        
    dataset.append({"press":press, "speed":speed})

    return dataset
#dataset = getBarYearData(2013)
#print(dataset)