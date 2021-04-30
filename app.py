from flask import Flask
from flask_restful import Resource, Api, reqparse
import pandas as pd
import numpy as np
import ast
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
from flask_cors import CORS
app = Flask(__name__)
cors = CORS(app)
api = Api(app)

class Groceries(Resource):
    def get(self):
        return {'grouped_data': grouped_Data.to_dict()}, 200

class GroceriesBasicStats(Resource):
    def get(self):
        temp = d
        temp.index=pd.to_datetime(d.index)
        total_items = len(temp)
        total_days = len(np.unique(temp.index.date))
        total_months = len(np.unique(temp.index.month))
        average_items = total_items / total_days
        unique_items = temp.itemDescription.unique().size
        temp2 = {
            'total_items': total_items,
            'total_days': total_days,
            'total_months': total_months,
            'average_items': average_items,
            'unique_items': unique_items,
        }
        return temp2, 200

class GroceriesItemsSold(Resource):
    def get(self):
        temp = d
        temp.index=pd.to_datetime(d.index)
        by_date = temp.resample("D")['itemDescription'].count()
        by_date.index = by_date.index.strftime('%Y-%m-%d');
        by_month = temp.resample("M")['itemDescription'].count()
        by_month.index = by_month.index.strftime('%Y-%m-%d');
        return {'by_date': by_date.to_dict(), 'by_month': by_month.to_dict()}, 200

class GroceriesItemsValueCount(Resource):
    def get(self):
        temp = data['itemDescription'].value_counts()
        return temp.to_dict(), 200

class GroceriesRuleCloud(Resource):
    def get(self):
        pf = transactions.describe()
        f = pf.iloc[0]-pf.iloc[3]
        a = f.tolist()
        b = list(f.index)
        item = pd.DataFrame([[a[r],b[r]]for r in range(len(a))], columns=['Count','Item'])
        item = item.sort_values(['Count'], ascending=False).head(50)
        return {'item':item.to_dict(), 'rules': rules.to_dict()}, 200

class GroceriesPrediction(Resource):
    def post(self):
        parser = reqparse.RequestParser() 
        parser.add_argument('a1', required=True)
        parser.add_argument('a2', required=False)
        args = parser.parse_args() 
        temp = rules
        if 'a2' in args and args['a2']!='' and args['a2']!=None:
            res1 = args['a1'] + ', ' + args['a2']
            res2 = args['a2'] + ', ' + args['a1']
            temp = temp.where((temp['antecedents']==res1) | (temp['antecedents']==res2)).dropna().sort_values(['lift','confidence'], ascending=False)
        else:
            res = args['a1']
            temp = temp.where((temp['antecedents']==res)).dropna().sort_values(['lift','confidence'], ascending=False)[0:10]
        return {"data": temp.to_dict()}, 200

class GroceriesAllUniqueItems(Resource):
    def get(self):
        x = data['itemDescription'].value_counts()
        return {"items": x.to_dict()},200

api.add_resource(Groceries, '/')
api.add_resource(GroceriesBasicStats, '/basic-stats')
api.add_resource(GroceriesItemsSold, '/filter-items-sold')
api.add_resource(GroceriesItemsValueCount, '/value-count')
api.add_resource(GroceriesRuleCloud, '/rules-cloud')
api.add_resource(GroceriesPrediction, '/predict')
api.add_resource(GroceriesAllUniqueItems, '/items')

if __name__ == '__main__':
    data=pd.read_csv('./Groceries_dataset.csv');
    d=data.set_index(['Date'])
    grouped_Data=d.groupby(['Date'])['itemDescription'].agg(['count'])
    transactions = [a[1]['itemDescription'].tolist() for a in list(data.groupby(['Member_number','Date']))]
    te = TransactionEncoder()
    te_ary = te.fit(transactions).transform(transactions)
    transactions = pd.DataFrame(te_ary, columns=te.columns_)
    freq_items = apriori(transactions, min_support=0.001, use_colnames=True, verbose=1)
    freq_items['length'] = freq_items['itemsets'].apply(lambda x: len(x))
    rules = association_rules(freq_items, metric="confidence", min_threshold=0.001)
    rules["antecedents"] = rules["antecedents"].apply(lambda x: ', '.join(list(x))).astype("unicode")
    rules["consequents"] = rules["consequents"].apply(lambda x: ', '.join(list(x))).astype("unicode")
    app.run('127.0.0.1', 5000, debug=True)  # run our Flask app