Sample code for a task that might sound like this:
there is an orders data somewhere, structured

| Order ID     | Company Name | Address | Item Name |
| ------------ | ------------ | ------- | --------- |
| XXXYYZZ0     | Title       | Address |  Item     |

Node.js + TypeScript to implement a solution that:
1.  Show all orders from a given company
2.  Show all orders for a given address
3.  Create a new order
4.  Update an order by a given order identifier
5.  Delete order by a given order identifier
6.  Display how often each item has been ordered, show the items that have been ordered the most at the beginning and sort the names of the items alphabetically.

---
Assumptions:
- Despite relational nature of the table, DB is MongoDB since it is just one table in isolation
- UI design is very basic
- GraphQL/Apollo to provide/interact with an API level
---
**DB cluster was shut down**