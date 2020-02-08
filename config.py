import os
BASE_DIRS=os.path.dirname(__file__)
options={
    "port":8090

}
settings={
    "static_path":os.path.join(BASE_DIRS,"static"),
    "template_path":os.path.join(BASE_DIRS,"template"),
    "debug":True#tornado是否工作在调试模式下，默认为False即工作在生产模式下
}
"""
    debug为True的好处
    tornado会监控源代码文件，当有保存改动时便会重启服务器，减少我们手动重启的次数
    保存后代码有错，改动后要手动重启

"""