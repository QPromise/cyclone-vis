from tornado.web import RequestHandler
from views import mytools
import json

# home
class IndexHandler(RequestHandler):#视图类比，业务处理类
    #处理get请求的，不能处理post请求
    def get(self):
        self.render("index.html")

class LineHandler(RequestHandler):

    def get(self):
        self.render("Demo.html")
   

# 绘制某年某月的气旋信息
class YearMonthHandler(RequestHandler):

    def post(self, *args, **kwargs):

        year = int(self.get_argument("year"))
        month = int(self.get_argument("month"))

        dataset = mytools.getYearMonthData(year, month)

        #print(dataset)

        self.write(json.dumps(dataset))

# 绘制某年的气旋信息
class YearHandler(RequestHandler):

    def post(self, *args, **kwargs):

        year = int(self.get_argument("year"))
        
        dataset = mytools.getYearData(year)

        self.write(json.dumps(dataset))

 
# 绘制某个年限范围的气旋信息
class YearRangeHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        start = int(self.get_argument("start"))
        end = int(self.get_argument("end"))

        dataset = mytools.getYearRangeData(start, end)

        self.write(json.dumps(dataset))




# 绘制某年某月的饼图信息
class PieYearMonthHanlder(RequestHandler):

    def post(self, *args, **kwargs):

        year = int(self.get_argument("year"))
        month = int(self.get_argument('month'))

        dataset = mytools.getPieYearMonthData(year, month)

        self.write(json.dumps(dataset))

# 绘制某年的饼图信息
class PieYearHanlder(RequestHandler):

    def post(self):

        year = int(self.get_argument("year"))

        dataset = mytools.getPieYearData(year)

        print(dataset)

        self.write(json.dumps(dataset))


# 绘制年份范围的饼图的信息
class PieYearRangeHandler(RequestHandler):
    
    def post(self, *args, **kwargs):
        
        start = int(self.get_argument("start"))
        end = int(self.get_argument("end"))
        dataset = mytools.getPieYearRangeData(start, end)
        #for year in range(start, end+1):

        #    dataset = mytools.getPieYearData(year)
        #    print(dataset)

        self.write(json.dumps(dataset))


# 绘制某年某月的折线图的信息
class LineYearMonthHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        year = int(self.get_argument("year"))
        month = int(self.get_argument("month"))

        dataset = mytools.getLineYearMonthData(year, month)

        self.write(json.dumps(dataset))

# 绘制某年的折线图的信息
class LineYearHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        year = int(self.get_argument("year"))

        dataset = mytools.getBarYearData(year)

        self.write(json.dumps(dataset))

# 绘制年份范围的折线图信息
class LineYearRangeHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        start = int(self.get_argument("start"))
        end = int(self.get_argument("end"))

        dataset = mytools.getLineYearRangeData(start, end)

        self.write(json.dumps(dataset))

#  绘制某年某月的热力图的信息
class HotYearMonthHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        year = int(self.get_argument("year"))
        month = int(self.get_argument("month"))

        dataset = mytools.getHotYearMonthData(year, month)

        self.write(json.dumps(dataset))

#  绘制某年的热力图的信息
class HotYearHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        year = int(self.get_argument("year"))

        dataset = mytools.getHotYearData(year)

        print(dataset)
        self.write(json.dumps(dataset))


#  绘制年份范围的热力图的信息
class HotYearRangeHandler(RequestHandler):

    def post(self, *args, **kwargs):
        
        start = int(self.get_argument("start"))
        end = int(self.get_argument("end"))

        dataset = mytools.getHotYearRangeData(start, end)

        self.write(json.dumps(dataset))

