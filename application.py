import tornado.web
from views import myhandler as handler
import config


class Application(tornado.web.Application):

    def __init__(self):

        handlers=[

            (r"/", handler.IndexHandler),
            (r"/cycloneyearmonth", handler.YearMonthHandler),
            (r"/cycloneyear", handler.YearHandler),
            (r"/cycloneYearRange", handler.YearRangeHandler),
            (r"/cyclonepieyearmonth", handler.PieYearMonthHanlder),
            (r"/cyclonepieyear", handler.PieYearHanlder),
            (r"/cyclonepieyearrange", handler.PieYearRangeHandler),
            (r"/cyclonelineyearmonth", handler.LineYearMonthHandler),
            (r"/cyclonelineyear", handler.LineYearHandler),
            (r"/cyclonelineyearrange", handler.LineYearRangeHandler),
            (r"/cyclonehotyearmonth", handler.HotYearMonthHandler),
            (r"/cyclonehotyear", handler.HotYearHandler),
            (r"/cyclonehotyearrange", handler.HotYearRangeHandler),

            (r"/line", handler.LineHandler)

        ]

        super(Application, self).__init__(handlers,**config.settings)