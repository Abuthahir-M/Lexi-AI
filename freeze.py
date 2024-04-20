from flask_frozen import Freezer
from Find_Definition import app

freezer = Freezer(app)


if __name__ == '__main__':
    freezer.freeze()