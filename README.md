# react-generic-table-component

This demonstrates generic table component for react.

## Introduction

This generic React Table Component puts away the pain of setting up tables (or Table Library) in different parts of your app separately and it gets harder if Data should be fetched from an API. With this component one can use any Table library or even plain old HTML table and make it custom and reusable throughout a single or multiple app. Just set up this component with some common configuration and just add specific configuration at the time of using that component.
Also It is worth noting that this component is useful only if the structure of API and payload being sent is similar (i.e. request params). But it can be further modified as per need.

## Usage

This Component can be used in any app. Few notable features of this component are as below.

-  Declarative configuration
-  Built-in and configurable:
   -  Sorting
   -  Selectable Rows
   -  Pagination
   -  Responsive

## Description

Libraries used in this component:
React Data Table component (For table and style : https://www.npmjs.com/package/react-data-table-component )
Lodash (For more flexibility and easy usage: https://www.npmjs.com/package/lodash )
Axios (Promise based HTTP client for the browser : https://www.npmjs.com/package/axios )

### General API Payload and description:

It is assumed that API payload should be of following format :

-  {
-  query: {},
-  options: {
-       select: {},
-       limit: 10,
-       page: 1,
-       sort: {},
-       pagination: true,
-       populate: [],
-  },
-  search: {},
-  }

Where,

-  Query: Object. It is an object which can be configured to send custom queries to the API.
-  Options: Options contains many other configuration items like:
   -  Select: Object. To get selected fields from generic API.
   -  Limit: Number. To limit response size according to the number of records to display (Only if pagination is needed).
   -  Page: Number.To get data for specific pages.
   -  Sort: Object. This object can be configured to get already sorted data but field name from API.
   -  Pagination: Boolean. To indicate that paginated data should be returned.
   -  Populate: Array. This can be configured to populate data from another table if needed.
-  Search: Object. To configure a search query.
   Note: Above query object can be changed and configured according to need and API requirements and table library used.

### Working:

These components work by accepting props from parent components. These “props” contain all the data and configuration for this component.
This component is built in a way that it can have some basic configurations already made. But some of these props are mandatory like “dataURL” (API endpoint to fetch data) and other configuration that the table component library uses.
When the component is first rendered it will fetch data to display in the table with given configuration (default) or custom configuration passed through props.
Query parameters are updated when props change and data is fetched again. To achieve this React “useEffect” hook is used. There are several checks and conditions applied in such a way that data is fetched again only if the configuration object is changed. Update is made in such a way that can optimize API response and app performance in general.
Custom functions for custom sorting and pagination can be set up according to needs. They can change depending on the third party table library used.
