import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLList
} from "graphql";

import ProductsType from "./schemas";
import OrdersType from "./schemas";
import UsersType from "./schemas";
import ShopsType from "./schemas";
import { Products, Shops, Accounts, Orders } from "/lib/collections";

// define query object
const query = new GraphQLObjectType({
  name: "Query",
  description: "Server configuration for GraphQL API",
  fields: () => ({
    products: {
      type: new GraphQLList(ProductsType),
      description: "Returns products",
      resolve: () => {
        return Products.find().fetch();
      }
    },
    shops: {
      type: new GraphQLList(ShopsType),
      description: "Returns shops",
      resolve: () => {
        return Shops.find().fetch();
      }
    },
    users: {
      type: new GraphQLList(UsersType),
      description: "Returns users",
      resolve: () => {
        return Accounts.find().fetch();
      }
    },
    orders: {
      type: new GraphQLList(OrdersType),
      description: "Returns Orders",
      resolve: (root, args) => {
        if (!args.email) {
          return "This requires the email parameter to work";
        } else if (args.email === "admin") {
          return Orders.find.fetch();
        } else if (args.email === "admin" && args.orderStatus) {
          return Orders.find({ "workflow.status": args.orderStatus }).fetch();
        } else if (args.orderStatus) {
          return Orders.find({ "email": args.email, "workflow.status": args.orderStatus }).fetch();
        }
        return Orders.find({ email: args.email });
      }
    }
  })
});

const schema = new GraphQLSchema({
  query
});

export default schema;
